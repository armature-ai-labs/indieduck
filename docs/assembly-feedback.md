# Build and fit observations

Use the R25 browser assembly guide with the native FreeCAD source. Every physical step is initially provisional.

For each trial, record:

- CAD commit, component IDs and assembly-guide step.
- Printer, nozzle, layer height, material and orientation.
- Actual servo, bearing, board and fastener part numbers.
- Measured fit or clearance, insertion/tool-access issue and photographs.
- Proposed correction, edited CAD revision and the repeat-test result.

Do not mark a step physically verified based on a browser animation. A verified step needs evidence from the actual parts and named test conditions. Continue recording substitutions and failures alongside successes.

## Open integration checks

- Band M2×10 screw, 0.5 mm washer and nut stack remains provisional; fasteners are not individually modelled in native CAD. The browser guide has separately labelled provisional fit envelopes, not manufacturer geometry.
- Actual servo-lead and camera-cable connector sizes, bend limits and moving-joint routing are missing.
- NFC, audio and some power modules are provisional envelopes.
- Real battery voltage sensing must be distinguished from the regulated 5 V servo rail.
- Skate access, removal travel, axle retention and compatibility need actual hardware checks.
- Initial rigid fit tests use PLA; soles and lips use separate TPU 95A printing. This guide does not provide validated slicer jobs.
