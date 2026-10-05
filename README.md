# capoin-static

## Anti-slop lint

Use Node 24. Install the isolated lint dependencies with `npm ci --prefix tools/oxlint`, then run `npm run lint:anti-slop` from the repository root. CI runs the same check on pushes and pull requests.

All 18 generic anti-slop rules and `oxc/no-accumulating-spread` are errors. The check covers `assets/js/beautypo.js`. CDN libraries are not vendored or linted. The static HTML archive's inline scripts are outside Oxlint coverage. Existing findings are reported without changing source. Source revision and licenses are recorded in [UPSTREAM.md](tools/oxlint/anti-slop/UPSTREAM.md).
