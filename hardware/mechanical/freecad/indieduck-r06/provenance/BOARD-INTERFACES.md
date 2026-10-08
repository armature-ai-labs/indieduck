# IndieDuck board mechanical evidence, 7 October 2026

Coordinates, source URLs and SHA-256 values are in `board-interfaces.json`. Original official source downloads are retained beside it. All measurements are CAD-file values, not physical measurements.

| Board | PCB outline | Holes | Important constraints |
|---|---|---|---|
| Radxa ZERO3W V1.11 | nominal65 ×30 ×1.6mm; DXF outline65.001648 ×30.005528 | Four Ø2.8mm. Exact centre coordinates in JSON, small asymmetry is present in both DXF and STEP. | Complete STEP envelope includes male GPIO header, below-board components and port overhangs. No cable shapes. |
| Pollen D1 HAT |65 ×30.9mm, R3.5 corners. KiCad thickness1.0mm | Four Ø2.7mm at u3.495/61.495, v3.495/26.495, giving58 ×23 pattern | Production STEP includes a complete PiZero2W reference. Exclude it. Its HAT PCB is0.595mm thick, conflicting with1.0mm KiCad. |

Use a board-local top-view frame: u right along the65mm edge, v from port-side edge toward GPIO edge. Radxa native DXF uses this frame. HAT transformation is u=KiCadX−71.3975, v=84.54−KiCadY. Mount both through deliberately adjustable independent supports until actual boards/header combination are checked.

The HAT integrated LSM6DSV16X U12 centre is u23.5,v17.5. Package KiCad rotation−90° does not determine runtime IMU axes by itself.

HAT connector footprint courtyard boxes are recorded, but they are not cable keep-outs. Retain access above the JST/terminal connectors and tool access to terminal screws. Radxa connectors overhang the port-side edge. Keep this edge accessible without forcing cable bends against the shell.

This mechanical task does not validate GPIO electrical compatibility, pinmux, power, firmware or thermal behaviour. No project/CAD files were edited.
