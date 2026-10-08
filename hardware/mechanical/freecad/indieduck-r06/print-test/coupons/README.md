# IndieDuck R06 removable first-fit coupons

Prepared 08-10-2026. These independently authored test pieces do not alter any final robot part or interface. No physical print or fit test has been performed.

| Coupon | Editable native source | Exchange/print exports | Overall size |
| --- | --- | --- | --- |
| Hole fit | `IndieDuck_R06_Hole_Fit_Coupon.FCStd` | Same basename `.step` and `.stl` | 80 × 45 × 4 mm |
| Ankle bearing fit | `IndieDuck_R06_Bearing_Fit_Coupon.FCStd` | Same basename `.step` and `.stl` | 80 × 28 × 4 mm |

Each file contains a `Dimensions` spreadsheet, named Part boxes/cylinders and sequential Part boolean cuts. Change the spreadsheet's nominal dimensions and recompute. These are editable native feature histories, not constrained sketches. The generator checks a diameter change, restores it, saves, reopens and recomputes. The accompanying JSON records that evidence, geometry validity, STL closure/volume and STEP round-trip checks. SVG top views project the actual CAD edges.

All dimensions are nominal millimetres with **no print compensation**. Requested first print: P2S, 0.4 mm nozzle, 0.20 mm layer height, PLA, flat base on the bed, hole axes vertical and bearing pockets facing upward. AMS 2 Pro may supply PLA. Use the [first-fit print guide](../README.md) to recreate and inspect the settings in Bambu Studio. Configured 3MF projects are not included. These source/export files are not printer jobs. TPU 95A sole printing is a separate job supplied from the external spool, per the selected workflow.

## Read the hole plate

View from above, with the large 5 × 5 mm corner cutout at the **upper left**. One, two and three small notches along the top edge mark columns left to right. One, two and three small notches on the left edge mark rows top to bottom. Use the large corner key to distinguish the top from the underside. Hole centres are X = 20, 40, 60 mm measured from the left edge; row Y values are measured from the bottom edge. All nine holes pass through the 4 mm plate.

| Left-edge row code | Purpose | Y | Column 1 | Column 2 | Column 3 |
| --- | --- | --- | --- | --- | --- |
| 1 notch, top | M2 self-tapping pilot comparison | 34 | Ø1.6 | Ø1.7 | Ø1.8 |
| 2 notches, middle | M2 clearance comparison | 22 | Ø2.2 | Ø2.3 | Ø2.4 |
| 3 notches, bottom | Locator socket comparison | 10 | Ø3.0 | Ø3.1 | Ø3.2 |

## Read the bearing plate

Pockets face upward and the large corner cutout is upper left. The top-edge tally codes identify columns 1 to 3. Centres are at X = 15, 40, 65 mm and Y = 14 mm. This coupon represents the design standard's **4 mm total seat thickness**: a 3 mm-deep pocket leaves a **1 mm floor**, with Ø11 mm through-clearance. It does not have an additional 4 mm floor below the pocket.

| Top-edge column code | Pocket diameter | Pocket depth | Remaining floor | Centre through-hole |
| --- | --- | --- | --- | --- |
| 1 notch | Ø15.0 | 3 | 1 | Ø11 |
| 2 notches | Ø15.1 | 3 | 1 | Ø11 |
| 3 notches | Ø15.2 | 3 | 1 | Ø11 |

The bearing plate compares the fit of the specified 10 × 15 × 3 mm ankle bearing. A preferred coupon fit is evidence for a future reviewed adjustment, not permission to change robot dimensions automatically.

## Provenance

Coupon geometry and feature history were independently authored for Armature AI Labs. Apache-2.0. Interface test dimensions are recorded in `coupon-dimensions-and-validation.json` and the tables above. No upstream meshes or robot geometry were copied into these coupons.

## Skate interface fixture

`IndieDuck_R06_Skate_Interface_Fixture.FCStd` retains the original IndieDuck adapter's deck, two nominal Ø3.1 mm sockets on 37 mm centres and M2 retaining-key pilot, with the wheel forks omitted. The deck is 77 × 50 × 4 mm. `SkateDeckFitFixture` and `RetainingKey_L` STEP/STL files accompany it. The key is oriented on its back for printing and requires support inspection in the PLA first-fit process. This is a non-rolling interface test, not a usable skate. No stock MicroDuck attachment compatibility is asserted.
