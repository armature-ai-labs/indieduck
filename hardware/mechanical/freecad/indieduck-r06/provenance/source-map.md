# IndieDuck v0.5 source and modification record

IndieDuck by Armature AI Labs, adapted from Open Duck Mini and inspired by Pollen Robotics’ MicroDuck.

Recorded 07-10-2026. This is a local prototype candidate. No publication has been performed. The machine-readable part map, source files and SHA-256 values are in [source-map.json](source-map.json).

## Attribution and retained source evidence

Open Duck Mini by Antoine Pirrone and contributors is pinned at `b23317a485b3cec7d8417f352478778b3475173c`. Its [Apache-2.0 licence](upstream-notices/open-duck-mini/LICENSE) and the [Jaime Machuca](upstream-notices/jaime-bdx/README.md) and [Justin Andrews / Codezombie23](upstream-notices/justin-park-head/README.md) READMEs are preserved verbatim. Their relative image links refer to the upstream folders; source images are not bundled. No upstream NOTICE file was present in the inspected checkout. [NOTICE](NOTICE) records IndieDuck's attribution and changes.

| IndieDuck objects | Source relationship | IndieDuck changes |
| --- | --- | --- |
| Trunk, Neck, HeadPitch, HeadYaw, HeadCore, Yaw_L, HipL_L, Thigh_L, Shank_L, Foot_L | Whitelisted native PartDesign bodies from the existing independently authored IndieDuck parts document | Preserve verified joint and component interfaces; retain editable features and exclude unrelated objects/dependencies |
| HeadShell, HeadCap | Attributed Park Head form reference, Justin Andrews | New native sketches, own envelope and wall thickness, service opening and fixing layout |
| BodyFront, BodyBack | Attributed Jaime BD-X cover form reference, Jaime Machuca | New native sketches, IndieDuck internal envelope, openings, port access and fixing layout |
| EyeRing_L/R, EyeLens_L/R | Attributed Park Head eye arrangement | Equal round eyes, without camera-specific bores, built with native sketches |

The part names define provenance mapping, not a statement that every feature has passed validation. Use the CAD inventory and validation report for actual completion. Mirrored instances inherit the source part's attribution. New geometry is an attributed adaptation and is not identical to the upstream solids. Armature AI Labs is credited for its engineering changes, not ownership of upstream work.

The full original IndieDuck documents and the two upstream STEP files are hashed but not copied into this package. The final release document must contain only the intended native bodies, their necessary features and approved parameters. Hidden objects also count as distributed content.

## Board dimensional evidence

[board-interfaces.json](board-interfaces.json) retains the factual measurements, original source URLs and source hashes. [BOARD-INTERFACES.md](BOARD-INTERFACES.md) records measurement caveats. None of these values are physical measurements of the purchased boards.

- Radxa ZERO 3W V1.11: nominal 65 × 30 × 1.6 mm PCB, four nominal Ø2.8 mm holes. Hole centres have small asymmetries in both official DXF and STEP; do not replace them with an assumed symmetric pattern. Purchased 4 GB eMMC board revision remains to be checked.
- Pollen HAT D1 at `78f60f711f519e8b57c4b1ea937bd2bb8249b1d3`: KiCad outline 65 × 30.9 mm, 1.0 mm PCB, four Ø2.7 mm holes on a 58 × 23 mm pattern. The STEP's PCB is approximately 0.595 mm thick and includes a Raspberry Pi Zero 2 W reference. Use KiCad for board dimensions and conservatively reserve component space; verify the produced board.
- The HAT integrated LSM6DSV16X U12 is the current body IMU. Package rotation does not establish runtime sensor axes. This supersedes the earlier separate bus-IMU plan.
- Keep adjustable independent mounts until the actual Radxa/HAT header and hole alignment have been checked. Connector courtyards do not describe plug bodies, insertion travel or cable bend clearances.
- This mechanical evidence does not validate GPIO wiring, pinmux, power supply, control timing, firmware or thermal behaviour.

Only numerical dimensions are used to author simple reference envelopes. The original Radxa CAD files and the HAT STEP, including its embedded Raspberry Pi model, are excluded. Their hashes identify the private reference evidence and do not constitute a redistribution licence.

## Exclusions and validation boundary

The D10 XGO study remains separate. No XGO mesh, converted solid, traced profile or derivative B-rep enters this package. Pollen MicroDuck meshes, non-commercial community CAD, old shell attempts and inherited reference groups are also excluded. Existing joint positions and manufacturer interfaces are used as numerical facts.

The source audit does not establish fit, load capacity or walking performance. Those require the separate CAD checks, printed samples, actual component assembly and behaviour trials recorded in the project validation plan.
