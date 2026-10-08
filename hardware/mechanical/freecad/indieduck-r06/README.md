# IndieDuck R06 mechanical prototype

08-10-2026. **IndieDuck by Armature AI Labs, adapted from Open Duck Mini and inspired by Pollen Robotics’ MicroDuck.**

R06 combines the selected soft head, oval eyes, tapered articulated bill and Rounded web feet. Physical printing, fit, strength and powered behaviour remain untested.

## Open and edit

1. Open [Parts](IndieDuck_R06_Parts.FCStd), then [Assembly](IndieDuck_R06_Assembly.FCStd) in FreeCAD. Keep them in the same directory. The assembly references 33 selected printable parts and 52 simple hardware envelopes through 85 relative links.
2. Edit source features in Parts and recompute both documents. Native structural features, spreadsheets, shell lofts, booleans and mirrors are preserved. Some appearance profiles are unconstrained or stored BREP shapes. The two retained `Original_Foot_L` and `Original_Sole_L` features preserve earlier independently authored geometry; the selected foot and sole reconnect to native source bodies.
3. Export only the 33 names in [part-map.json](part-map.json). Hidden construction history is not an additional print list. `ref_*` objects represent component clearance envelopes, not printable hardware.
4. The per-part [STEP](step/) and [STL](stl/) files use millimetres in the assembled robot frame. The combined STEP contains the selected printed parts. Use the [oriented first-fit meshes](print-test/README.md) for the initial print sequence.

R06 reduces the thigh divider height from 21.5 to 21.2 mm to remove edge-only contact. Thigh covers increase from 1.5 to 2 mm while retaining their mating faces and hole centres. The selected head, bill and foot study geometry is otherwise retained. Native CAD remains the editable source; STEP and STL are exports.

## Scope and remaining work

The [recorded checks](validation/README.md) cover nominal geometry, exports and document portability. The first build needs actual HD-1910 servos, horns, bearing and fastener fit evidence. A complete procurement/fastener BOM, manufacturing drawing set and assembly manual are still open.

Body refinement is a priority: the present shell envelope is 115 × 72 × 67 mm. The [model comparison](validation/body-proportions-comparison.json) records the smaller referenced MicroDuck envelope and the same 50 mm neck joint spacing. Lower front shoulders are a proposed direction; joint centres, electronics fit, cable access and structure must be preserved or explicitly revalidated. This publication does not change the casing geometry.

Hip second supports, electrical/header compatibility, full cable routing, battery/regulator envelopes, eye/lip retention, strength, roller retention and motor/policy operation remain unresolved. Simple hardware envelopes do not prove fit of purchased components.

## Sources

Read [NOTICE](provenance/NOTICE), the current [R06 source map](provenance/R06-source-map.md), its [machine-readable asset map](provenance/R06-source-map.json), and the filtered [source register](provenance/source-register.csv). The v0.5 source map is retained as historical provenance. Original Radxa CAD, the HAT STEP's embedded Raspberry Pi model, Pollen MicroDuck meshes and the pending-rights XGO reconstruction are excluded.
