import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import {
  assertBrowserEndpoint,
  assertFontReuse,
  assertLiveUrls,
  assertStylesheetResponse,
  checkOffline,
  stylesheetUrls,
} from './check-font-preloads.mjs';

const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
const arabicUrl = 'https://fonts.gstatic.com/s/ibmplexsansarabic/v99/arabic.woff2';
const latinUrl = 'https://fonts.gstatic.com/s/inter/v99/latin.woff2';
const validCss = `
/* arabic */
@font-face {
  font-family: 'IBM Plex Sans Arabic';
  font-style: normal;
  font-weight: 400;
  src: url(${arabicUrl}) format('woff2');
}
/* latin */
@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  src: url(${latinUrl}) format('woff2');
}`;

const validFontEvidence = (url = arabicUrl) => ({
  url,
  requests: [{ request: { url }, requestId: 'font-request' }],
  failures: [],
  responses: [{
    requestId: 'font-request',
    response: { status: 200, headers: { 'Access-Control-Allow-Origin': '*' } },
  }],
  resources: [{ name: url, initiatorType: 'link' }],
  link: { href: url, as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' },
  origin: 'http://127.0.0.1:1234',
});

test('offline fixture accepts the current Arabic-only preload behavior', () => {
  assert.deepEqual(checkOffline(html), [
    'https://fonts.gstatic.com/s/ibmplexsansarabic/v15/Qw3CZRtWPQCuHme67tEYUIx3Kh0PHR9N6Ys43PW5fslBEg0.woff2',
    'https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa1ZL7W0Q5nw.woff2',
  ]);
});

test('offline fixture rejects a missing anonymous CORS hint', () => {
  const fixture = html.replace("preload.crossOrigin = 'anonymous';", '');
  assert.throws(() => checkOffline(fixture), /anonymous CORS/);
});

test('offline fixture rejects English hints and static preload markup', () => {
  const englishHints = html.replace(
    "=== 'ar') {",
    "=== 'ar' || localStorage.getItem('motaz-portfolio-language') === 'en') {",
  );
  assert.throws(() => checkOffline(englishHints), /Unexpected hints for en/);
  assert.throws(() => checkOffline(html.replace('</head>', '<link rel="preload" as="font"></head>')),
    /Static preloads/);
});

test('offline fixture remains safe when storage access or reads are denied', () => {
  assert.doesNotThrow(() => checkOffline(html));
});

test('stylesheet fixture requires the intended subsets and a Regular face', () => {
  assert.deepEqual(stylesheetUrls(validCss), [arabicUrl, latinUrl]);

  const wrongSubset = validCss.replace('/* arabic */', '/* latin */');
  assert.throws(() => stylesheetUrls(wrongSubset), /IBM Plex Sans Arabic Regular \(arabic\)/);

  const missingSubset = validCss.replace(/\/\* arabic \*\/[\s\S]*?(?=\/\* latin \*\/)/, '');
  assert.throws(() => stylesheetUrls(missingSubset), /IBM Plex Sans Arabic Regular \(arabic\)/);

  const noRegularWeight = validCss.replace(
    "font-family: 'IBM Plex Sans Arabic';\n  font-style: normal;\n  font-weight: 400;",
    "font-family: 'IBM Plex Sans Arabic';\n  font-style: normal;\n  font-weight: 500 600;",
  );
  assert.throws(() => stylesheetUrls(noRegularWeight), /IBM Plex Sans Arabic Regular \(arabic\)/);
});

test('stylesheet fixture rejects malformed CSS and font URLs', () => {
  assert.throws(() => stylesheetUrls('not a stylesheet'), /IBM Plex Sans Arabic Regular/);
  assert.throws(() => stylesheetUrls(validCss.replace(arabicUrl, 'https://fonts.gstatic.com/bad.ttf')),
    /Cannot find WOFF2 URL/);
});

test('live fixture rejects changed preload URLs', () => {
  assert.doesNotThrow(() => assertLiveUrls([arabicUrl, latinUrl], [latinUrl, arabicUrl]));
  assert.throws(() => assertLiveUrls([arabicUrl, latinUrl], [arabicUrl, 'https://fonts.gstatic.com/other.woff2']),
    /STALE FONT PRELOAD/);
});

test('live fixtures fail explicitly when stylesheet network or browser evidence is unavailable', () => {
  assert.throws(() => assertStylesheetResponse(undefined), /stylesheet did not respond/);
  assert.throws(() => assertStylesheetResponse({ response: { status: 503 } }), /stylesheet HTTP failure/);
  assert.throws(() => assertBrowserEndpoint(undefined, undefined, 'no DevTools endpoint'),
    /Chromium did not start/);
  assert.throws(() => assertBrowserEndpoint(undefined, new Error('spawn chromium ENOENT'), ''),
    /spawn chromium ENOENT/);
});

test('live fixture accepts one CORS-enabled preload request and rejects duplicate requests', () => {
  assert.doesNotThrow(() => assertFontReuse(validFontEvidence()));
  const duplicate = validFontEvidence();
  duplicate.requests.push({ request: { url: arabicUrl }, requestId: 'duplicate-request' });
  assert.throws(() => assertFontReuse(duplicate), /Font preload was not reused/);
});
