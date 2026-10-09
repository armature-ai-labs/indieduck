# R20 interactive assembly guide

Actual R20 CAD geometry in Three.js, using the published standing pose. FreeCAD remains the mechanical source. No Blender scene is required.

```sh
npm ci
npm test
npm run dev
npm run build
```

Use Node 22.12 or newer. The production base path is `/indieduck/`. Open the URL printed by Vite. GitHub Pages deploys `dist` from the repository workflow.

## Assets and revisions

`public/model/manifest.json` identifies every displayed component. Mesh vertices retain CAD world coordinates in millimetres: x forward, y left, z up. Browser presentation offsets never mutate those vertices. `src/steps.json` contains the revisioned guide sequence. `public/model/SHA256SUMS.txt` records geometry and manifest hashes.

The 41 selected printed components link to the pinned R20 CAD commit, including native files, matching STEP/STL and the printed-component BOM. Purchased reference shapes are represented individually in the viewer. Additional band hardware is recorded separately in `src/hardware.json` and copied into the delivered model metadata. Wireframe envelopes locate provisional screw axes and fit spaces, not manufacturer geometry. Unknown harness details remain labelled gaps. The component CSV counts CAD references separately from physical purchase quantities; compound fastener counts remain unresolved. Run `python3 tools/refresh-assets.py` after intentional model or additional-hardware metadata changes.

Assembly arrows indicate presentation separation only, not verified insertion paths. No assembly step is physically verified. `CAD-reviewed` applies only to the complete-view placement comparison, not manufacturing readiness.

## Performance contract

Target: an interactive desktop/mobile browser for the complete R20 component set. Load meshes with four concurrent requests and render on demand when controls or state change. Preserve every component identity and assembled transform. There is no idle animation loop. Browser QA records load time, triangles and idle render count via `window.__assemblyGuide`; device performance is not inferred from desktop testing.

## Source terms

See `THIRD_PARTY_NOTICES.md` at repository root. Software licensing does not relicense imported geometry. Asset source terms accompany the copied model package.
