# First-fit printing

Print the smallest useful test first and record the result before committing to a full robot. These are prototype settings from the R06 preparation work, not a validated manufacturing process.

## Setup

The selected printer is a **Bambu Lab P2S with AMS 2 Pro**, a **standard-flow 0.4 mm nozzle**, and a **Textured PEI plate**. Start rigid fit tests in **PLA**. Print the separate **TPU 95A sole from the external spool**, bypassing AMS and the filament buffer as described in the [P2S manual](https://csm.bblcdn.com/hub/9425242c00344b0e801b6179f9a243aa.pdf).

Use 0.20 mm layers, three walls, five top/bottom layers and 20% gyroid infill. For PLA, the recorded candidate uses automatic tree supports, build plate only, at a 30° threshold. TPU uses no supports. Match temperatures, flow, cooling, drying and chamber/door setup to the actual filament and installed printer profile. Record every deviation. The CAD dimensions have no printer compensation applied.

These settings are also recorded in [first-fit-settings.json](first-fit-settings.json). Import meshes into Bambu Studio using the installed P2S printer and appropriate material profile, enter the settings, slice and inspect all layers. Do not assume settings accompany an STL. Save your own project after review.

## Sequence and files

| Step | Material | Included meshes | Inspect before continuing |
| --- | --- | --- | --- |
| 1 | PLA | `coupons/IndieDuck_R06_Hole_Fit_Coupon.stl`, `coupons/IndieDuck_R06_Bearing_Fit_Coupon.stl`, `coupons/SkateDeckFitFixture.stl`, `coupons/RetainingKey_L.stl` | Pilot/clearance fits, bearing seat, locator/key engagement and support access |
| 2 | PLA | Six individual meshes under `oriented/`: Yaw_L, HipL_L, Thigh_L, Shank_L, ThighPlate_L, RoundedFoot_L | Servo/horn fit, screw access, bearing seating, cable clearance and support removal |
| 3 | TPU 95A | `TPU_sole_arranged.stl` | Sole seating, retention, removal and locator/latch condition |

The oriented leg meshes retain their candidate positions on a 256 × 256 mm bed; [orientation-manifest.json](orientation-manifest.json) records transforms and bounds. Importing separately may recenter objects, so inspect spacing and orientation again. Lay the hole and bearing coupons flat, with pockets facing upward. The key export is already turned onto its back and needs support inspection. The original per-part robot STL files are in the assembled frame and are not a prearranged print plate.

Use the [coupon map](coupons/README.md) and [physical test checklist](coupons/physical-test-checklist.md). Trial the actual left-leg hardware before choosing a future dimensional revision. The skate fixture has no wheels and tests IndieDuck's own removable interface; it does not establish compatibility with stock MicroDuck accessories.

## Recorded slicer result

Local R06 projects were reopened and previewed in Bambu Studio 02.08.02.61. The recorded estimates were 30.40 g / 1 h 05 min for the coupons, 76.38 g / 2 h 47 min for the rigid leg and 21.12 g / 1 h 32 min for the sole. These are estimates from local projects, not actual print results or guaranteed outputs of a newly recreated project. See the [normalized recorded slice summary](../validation/recorded-slice-summary.json).

Configured 3MF jobs, vendor profiles and manufacturer G-code templates are intentionally kept outside this Apache-focused repository. No printer connection, dispatch, adhesion, dimensional accuracy or support-removal success is claimed.
