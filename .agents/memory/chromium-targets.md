---
name: Chromium target selection
description: Avoid attaching local browser verification to an extension background target.
---

When using the installed Chromium through DevTools Protocol, select a target whose type is `page`, rather than the first entry from the discovery endpoint.

**Why:** The installed browser can expose an extension background target first. Attaching there can leave navigation and DOM checks inspecting the extension instead of the application.

**How to apply:** Filter discovery results by target type before opening the page session, and assert the application URL and expected DOM are present before testing.
