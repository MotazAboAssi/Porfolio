---
name: Safe media inspection
description: Prevent inspection commands from overwriting owner-provided source assets.
---

For ImageMagick inspection, construct the complete input argument list explicitly and put the temporary output path last. Never place an output path before inputs that xargs will append.

**Why:** ImageMagick treats its final positional argument as the output, and can write an image even when it also reports an error. A malformed inspection command can therefore overwrite an original source asset.

**How to apply:** Keep inspection output under `/tmp`, snapshot original asset hashes before processing, and verify originals against those hashes afterward. Do not treat a failed command as proof that no files were written.
