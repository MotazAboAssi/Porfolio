# Font preload verification

Run from the workspace root:

- `pnpm --filter @workspace/portfolio check:font-preloads` — offline check of the actual inline scripts in `index.html`: saved Arabic emits exactly two distinct WOFF2 font preloads with anonymous CORS; saved English, missing/invalid preferences and denied storage access emit none.
- `pnpm --filter @workspace/portfolio check:font-preloads:live` — additionally starts the already-installed `chromium` in a fresh temporary profile and loads the unchanged document head from a temporary local server. Override the executable with `CHROMIUM_BIN` if necessary. No app workflow, dependencies or paid services are required.

The live check reads Google's stylesheet response using the running browser's user agent. It selects the normal Regular (400) IBM Plex Sans Arabic **arabic** subset and Inter **latin** subset, including a variable weight range that contains 400. It compares their WOFF2 URLs exactly with the preloads, loads both faces, and checks successful CORS responses plus a single preload-initiated resource/request per font. Browser cache is disabled so a warm disk cache cannot conceal duplicate requests. This is a focused font-delivery harness, not a full-page layout/CLS or language-switching test.

Both commands exit nonzero on verification failures. The live command also fails on missing Chromium, network failures, unrecognized stylesheet formats/subsets, missing CORS permission or timeouts. It never silently substitutes cached CSS. An offline pass explicitly does **not** claim that live URLs or request reuse passed.

If Google changes a URL, inspect the live normal/Regular font-face and its subset before updating `index.html`; do not copy a URL from a different subset or weight. Rerun the live command afterward. Keep this network-dependent check separate from the ordinary offline build; neither command is a build hook.
