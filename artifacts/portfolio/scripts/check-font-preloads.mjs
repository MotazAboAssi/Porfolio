// No dependencies: Node 24 built-ins; --live additionally uses installed Chromium.
import assert from 'node:assert/strict';
import { readFile, mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { createServer } from 'node:http';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { runInNewContext } from 'node:vm';

function hintsFor(html, language, blocked = false) {
  const scripts = [...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi)]
    .map(match => match[1]).filter(source => source.trim());
  const links = [];
  const document = {
    createElement(tag) {
      assert.equal(tag, 'link');
      return {};
    },
    head: { append: link => links.push(link), appendChild: link => links.push(link) },
  };
  const context = {
    document,
    get localStorage() {
      if (blocked === 'access') throw new Error('Storage access denied');
      return { getItem: key => {
        if (blocked === 'read') throw new Error('Storage read denied');
        assert.equal(key, 'motaz-portfolio-language');
        return language;
      } };
    },
  };
  for (const source of scripts) runInNewContext(source, context, { timeout: 1000 });
  return links;
}

export function checkOffline(html) {
  assert.ok(!/<link\b[^>]*rel=["']preload["']/i.test(html),
    'Static preloads would also affect English visits');
  const links = hintsFor(html, 'ar');
  assert.equal(links.length, 2, 'Saved Arabic must emit exactly two font preloads');
  assert.equal(new Set(links.map(link => link.href)).size, 2, 'Duplicate preloads');
  for (const link of links) {
    assert.equal(link.rel, 'preload');
    assert.equal(link.as, 'font');
    assert.equal(link.type, 'font/woff2');
    assert.equal(link.crossOrigin, 'anonymous', 'Fonts need anonymous CORS for reuse');
    assert.match(link.href, /^https:\/\/fonts\.gstatic\.com\/s\/.+\.woff2$/);
  }
  for (const language of ['en', null, 'unexpected']) {
    assert.deepEqual(hintsFor(html, language), [], `Unexpected hints for ${language}`);
  }
  for (const blocked of ['access', 'read']) {
    assert.deepEqual(hintsFor(html, 'ar', blocked), [], `Blocked storage ${blocked} must not throw or add hints`);
  }
  return links.map(link => link.href);
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// Minimal Chrome DevTools Protocol client, using Node's built-in WebSocket.
async function connect(url) {
  const socket = new WebSocket(url);
  await once(socket, 'open');
  let nextId = 0;
  const pending = new Map();
  const listeners = new Map();
  socket.addEventListener('message', ({ data }) => {
    const message = JSON.parse(data);
    if (message.id) {
      const waiter = pending.get(message.id);
      if (!waiter) return;
      pending.delete(message.id);
      clearTimeout(waiter.timer);
      if (message.error) waiter.reject(new Error(message.error.message));
      else waiter.resolve(message.result);
    } else {
      for (const listener of listeners.get(message.method) ?? []) listener(message.params);
    }
  });
  return {
    close: () => socket.close(),
    on(method, listener) {
      listeners.set(method, [...(listeners.get(method) ?? []), listener]);
    },
    send(method, params = {}) {
      const id = ++nextId;
      return new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
          pending.delete(id);
          reject(new Error(`Cannot check fonts: ${method} timed out`));
        }, 30000);
        pending.set(id, { resolve, reject, timer });
        socket.send(JSON.stringify({ id, method, params }));
      });
    },
  };
}

export function assertStylesheetResponse(cssResponse) {
  assert.ok(cssResponse, 'Cannot check fonts: Google Fonts stylesheet did not respond');
  assert.equal(cssResponse.response.status, 200, 'Google Fonts stylesheet HTTP failure');
  return cssResponse;
}

export function assertBrowserEndpoint(endpoint, launchError, stderr) {
  if (launchError) throw launchError;
  assert.ok(endpoint, `Cannot check fonts: Chromium did not start.\n${stderr.slice(-1500)}`);
  return endpoint;
}

export function assertLiveUrls(expectedUrls, actualUrls) {
  assert.deepEqual([...expectedUrls].sort(), [...actualUrls].sort(),
    'STALE FONT PRELOAD: index.html URLs differ from the live stylesheet. Inspect the named subsets before updating.');
}

export function assertFontReuse({ url, requests, failures, responses, resources, link, origin }) {
  assert.deepEqual(link,
    { href: url, as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' });
  const fontRequests = requests.filter(event => event.request.url === url);
  assert.equal(fontRequests.length, 1, `Font preload was not reused: ${url}`);
  assert.ok(!failures.some(event => event.requestId === fontRequests[0].requestId),
    `Font request failed: ${url}`);
  const response = responses.find(event => event.requestId === fontRequests[0].requestId)?.response;
  assert.equal(response?.status, 200, `Font HTTP failure: ${url}`);
  const allowOrigin = Object.entries(response.headers)
    .find(([name]) => name.toLowerCase() === 'access-control-allow-origin')?.[1];
  assert.ok(allowOrigin === '*' || allowOrigin === origin,
    `Missing font CORS permission: ${url}`);
  assert.deepEqual(resources.filter(entry => entry.name === url),
    [{ name: url, initiatorType: 'link' }], `Expected one reused preload resource: ${url}`);
}

async function checkLive(html, stylesheet, expectedUrls) {
  const profile = await mkdtemp(join(tmpdir(), 'portfolio-font-check-'));
  // Use the real head unchanged, but isolate font loading from the React app.
  const head = html.match(/<head>([\s\S]*?)<\/head>/)?.[1];
  assert.ok(head, 'Missing document head');
  const server = createServer((_request, response) => {
    response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' });
    response.end(`<!doctype html><html><head>${head}</head><body></body></html>`);
  });
  let browser;
  let cdp;
  let stderr = '';
  try {
    server.listen(0, '127.0.0.1');
    await once(server, 'listening');
    browser = spawn(process.env.CHROMIUM_BIN || 'chromium', [
      '--headless', '--no-sandbox', '--disable-dev-shm-usage',
      '--remote-debugging-port=0', `--user-data-dir=${profile}`, 'about:blank',
    ], { stdio: ['ignore', 'ignore', 'pipe'] });
    let launchError;
    browser.on('error', error => { launchError = error; });
    browser.stderr.on('data', data => { stderr += data; });
    const deadline = Date.now() + 15000;
    while (!stderr.includes('DevTools listening on ') && Date.now() < deadline && !launchError) {
      await delay(50);
    }
    const endpoint = stderr.match(/DevTools listening on (ws:\/\/\S+)/)?.[1];
    assertBrowserEndpoint(endpoint, launchError, stderr);
    const origin = new URL(endpoint).origin.replace('ws:', 'http:');
    const targets = await (await fetch(`${origin}/json/list`, { signal: AbortSignal.timeout(5000) })).json();
    const target = targets.find(item => item.type === 'page');
    assert.ok(target, 'Cannot check fonts: Chromium has no page target');
    cdp = await connect(target.webSocketDebuggerUrl);
    await cdp.send('Network.enable');
    await cdp.send('Network.setCacheDisabled', { cacheDisabled: true });
    await cdp.send('Page.enable');
    await cdp.send('Page.addScriptToEvaluateOnNewDocument', {
      source: "localStorage.setItem('motaz-portfolio-language', 'ar');",
    });
    const requests = [];
    const responses = [];
    const failures = [];
    cdp.on('Network.requestWillBeSent', event => requests.push(event));
    cdp.on('Network.responseReceived', event => responses.push(event));
    cdp.on('Network.loadingFailed', event => failures.push(event));
    await cdp.send('Page.navigate', { url: `http://127.0.0.1:${server.address().port}/` });
    let ready = false;
    const loadDeadline = Date.now() + 30000;
    while (!ready && Date.now() < loadDeadline) {
      const { result } = await cdp.send('Runtime.evaluate', { expression: 'document.readyState === "complete"' });
      ready = result.value === true;
      if (!ready) await delay(100);
    }
    assert.ok(ready, 'Cannot check fonts: document/stylesheet loading timed out');
    const cssResponse = assertStylesheetResponse(responses.find(event => event.response.url === stylesheet));
    const cssBody = await cdp.send('Network.getResponseBody', { requestId: cssResponse.requestId });
    const css = cssBody.base64Encoded ? Buffer.from(cssBody.body, 'base64').toString() : cssBody.body;
    const actualUrls = stylesheetUrls(css);
    assertLiveUrls(expectedUrls, actualUrls);
    const loaded = await cdp.send('Runtime.evaluate', {
      expression: `(async () => {
        const results = await Promise.all([
          document.fonts.load('400 16px "IBM Plex Sans Arabic"', 'مرحبا'),
          document.fonts.load('400 16px "Inter"', 'Hello')
        ]);
        await document.fonts.ready;
        return {
          loaded: results.map(faces => faces.length > 0 && faces.every(face => face.status === 'loaded')),
          links: [...document.querySelectorAll('link[rel="preload"]')].map(link => ({
            href: link.href, as: link.as, type: link.type, crossOrigin: link.crossOrigin
          })),
          resources: performance.getEntriesByType('resource').map(entry => ({
            name: entry.name, initiatorType: entry.initiatorType
          }))
        };
      })()`,
      awaitPromise: true,
      returnByValue: true,
    });
    assert.ok(!loaded.exceptionDetails, `Cannot load font faces: ${JSON.stringify(loaded.exceptionDetails)}`);
    const evidence = loaded.result.value;
    assert.deepEqual(evidence.loaded, [true, true], 'Both live font faces must load successfully');
    assert.equal(evidence.links.length, 2, 'Browser must emit exactly two preloads');
    for (const url of actualUrls) {
      assertFontReuse({
        url,
        requests,
        failures,
        responses,
        resources: evidence.resources,
        link: evidence.links.find(link => link.href === url),
        origin: `http://127.0.0.1:${server.address().port}`,
      });
      console.log(`PASS live: stylesheet match, CORS, loaded face, one reused preload request: ${url}`);
    }
  } finally {
    cdp?.close();
    if (browser?.pid && browser.exitCode === null) {
      const exited = once(browser, 'exit');
      browser.kill('SIGKILL');
      await exited;
    }
    server.closeAllConnections();
    await new Promise(resolve => server.close(resolve));
    await rm(profile, { recursive: true, force: true, maxRetries: 5 });
  }
}

export function stylesheetUrls(css) {
  const faces = [...css.matchAll(/(?:\/\*\s*([^*]+?)\s*\*\/\s*)?@font-face\s*\{([^}]+)\}/g)];
  return [
    ['IBM Plex Sans Arabic', 'arabic'],
    ['Inter', 'latin'],
  ].map(([family, subset]) => {
    const matches = faces.filter(([, label, body]) => {
      const weights = body.match(/font-weight:\s*([\d ]+);/)?.[1].trim().split(/\s+/).map(Number);
      return label?.trim() === subset
        && body.includes(`font-family: '${family}'`)
        && /font-style:\s*normal;/.test(body)
        && weights && weights[0] <= 400 && weights.at(-1) >= 400;
    });
    assert.equal(matches.length, 1, `Cannot uniquely check ${family} Regular (${subset}) in live stylesheet`);
    const url = matches[0][2].match(/src:\s*url\((https:\/\/[^)]+\.woff2)\)\s*format\(['"]woff2['"]\)/)?.[1];
    assert.ok(url, `Cannot find WOFF2 URL for ${family} (${subset})`);
    return url;
  });
}

async function runCli() {
  const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
  const stylesheet = html.match(/<link\b[^>]*href="(https:\/\/fonts\.googleapis\.com\/css2[^"]+)"[^>]*rel="stylesheet"[^>]*>/)?.[1];
  assert.ok(stylesheet, 'Cannot find the existing Google Fonts stylesheet');
  assert.ok(process.argv.slice(2).every(arg => arg === '--live'), 'Only supported option: --live');
  const urls = checkOffline(html);
  console.log('PASS offline: Arabic-only preloads, anonymous CORS, English/unset/invalid preferences, blocked storage.');
  if (process.argv.includes('--live')) await checkLive(html, stylesheet, urls);
  else console.log('Live URLs and request reuse NOT checked. Run check:font-preloads:live (requires network + Chromium).');
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  try {
    await runCli();
  } catch (error) {
    console.error(`FAIL font preload verification: ${error.message}`);
    process.exitCode = 1;
  }
}
