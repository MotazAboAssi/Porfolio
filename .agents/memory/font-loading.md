---
name: Mixed-script font loading
description: Why Arabic layout stabilization requires testing Latin fallback arrival as well as Arabic fonts.
---

Treat the Latin font used by mixed-script Arabic text as part of the critical Arabic loading path. Prefer the smallest causally verified preload set over preloading every font weight.

**Why:** Staged font releases showed that the Arabic navigation changes row count when its regular face arrives, while Inter arriving after the Arabic medium face can make the mixed-script hero line collapse and expand. Preloading all faces avoided movement but unnecessarily delayed first paint through bandwidth contention.

**How to apply:** When changing font delivery, inspect actual rendered fonts and individual swap geometry, then compare cold English and Arabic loading measurements. Preserve the final font metrics and design; measure paint-time regressions as well as CLS. Keep explicit preload URLs aligned with the font stylesheet.

Check Google Fonts URLs using the actual browser's stylesheet response, not a generic or abbreviated command-line user agent.

**Why:** Google varies font formats and subset URLs by user agent; an abbreviated Chrome header returned unsplit TrueType faces while installed Chromium received subsetted WOFF2 faces. A successful fetch alone does not prove a preload matches what the browser consumes.

**How to apply:** Compare the named subset and normal Regular weight from the browser response, then verify the face loads and consumes one preload-initiated request. Treat unavailable network evidence as a failed live check, not an offline success.
