# R20 assembly guide verification

The local production build was inspected at 1280 × 800 and 390 × 844. All 124 CAD references loaded, including 41 selected printed components. Node 22.23.3 passed six integrity/control-data tests and the Vite production build. See [machine-readable evidence](assembly-checks.json).

[Assembled](assembly-assembled.png), [fully exploded](assembly-exploded.png), [all sequence views](assembly-steps.png), [provisional band mounts](assembly-band-mounts.png), and [mobile](assembly-mobile.png) are actual browser screenshots.

## Visual review and corrections

The UI extends the existing R07 simulator's white/gray/yellow controls and typography. CAD appearance was compared directly against the pinned R20 FreeCAD assembly preview. No AI robot imagery or Blender substitute is used.

- Geometry: full robot silhouette, compact stance, head/jaw and removable band match the R20 source placement.
- Colour: explicit sRGB interpretation matches the simulator; the initial lighter linear interpretation was corrected.
- Surface treatment: crease-aware normals smooth curved CAD surfaces while retaining sharp edges; printed bearing supports keep plastic shading.
- Framing: maximum explosion originally clipped the head. Visible-bounds fitting now covers complete and isolated geometry, including mobile.
- Instructions: changing steps clears stale selected-part captions and resets instruction scrolling. The right panel scrolls independently on desktop and becomes normal page content on mobile.
- Labels: human-readable names supplement exact CAD identifiers. Compact walking feet retain their historical source object IDs.
- Scope: introduction/sequence/parts controls are requested assembly functionality, not additional marketing copy. Status text differentiates CAD review, provisional guidance and missing physical evidence.

Actual search, isolation, hide/restore, colour, step navigation, transparency, provisional hardware and reset controls were exercised. Local warm model-loading samples ranged 244.8–395.4 ms with a median of 288.8 ms; the renderer remained idle between interactions. These observations are not a claim about public network loading or physical phone performance.

The six additional band hardware instances are optional wireframe fit envelopes. CAD-reference counts do not imply a complete purchased-part BOM, and compound fastener quantities remain unresolved. No insertion-path, tool-access, strength or wiring certification is claimed.
