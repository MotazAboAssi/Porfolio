---
name: Mixed-script font loading
description: Why Arabic layout stabilization requires testing Latin fallback arrival as well as Arabic fonts.
---

Treat the Latin font used by mixed-script Arabic text as part of the critical Arabic loading path. Prefer the smallest causally verified preload set over preloading every font weight.

**Why:** Staged font releases showed that the Arabic navigation changes row count when its regular face arrives, while Inter arriving after the Arabic medium face can make the mixed-script hero line collapse and expand. Preloading all faces avoided movement but unnecessarily delayed first paint through bandwidth contention.

**How to apply:** When changing font delivery, inspect actual rendered fonts and individual swap geometry, then compare cold English and Arabic loading measurements. Preserve the final font metrics and design; measure paint-time regressions as well as CLS. Keep explicit preload URLs aligned with the font stylesheet.
