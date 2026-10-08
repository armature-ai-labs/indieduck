# Recorded validation and its limits

The three original R06 geometry reports are retained unchanged:

- `consolidation-checks.json`: selected source comparisons, 178 neutral-pose candidate pairs with no intersections over 0.5 mm³, and six rigid objects fitting the candidate bed layout without mutual intersections.
- `export-checks.json`: 33 valid single native solids and closed STL exports, with recorded volume differences.
- `portable-and-step-checks.json`: native reopen/recompute, 85 locally resolved assembly links after relocation, and 33 valid single-solid STEP round trips.

These are recorded checks from R06 preparation. Copying the reports into a public package does not rerun those CAD checks. `publication-metadata-checks.json` records the fresh public-copy skate-fixture metadata correction and shape comparison. `publication-integrity.json` records fresh package inventory, native archive metadata and source-copy checks. The root `SHA256SUMS.txt` identifies the final published files.

`recorded-slice-summary.json` is a normalized factual summary of the local slicing record. Workstation paths, raw commands, vendor profiles and configured 3MF projects are excluded. The summary preserves source-report hashes so it is identifiable as a derivative record rather than a new slice.

`body-proportions-comparison.json` contains numerical shell measurements and pinned source URLs/hashes. Reference MicroDuck meshes are not included. This comparison supports an open body-refinement task and does not change R06 CAD.

The fit-coupon folder contains separate recorded geometry and parameter-edit checks. No listed check establishes physical dimensions, bearing or servo fit, structural strength, assembly durability, motor operation, walking, skating, get-up/roll behaviour or policy transfer. Record those outcomes separately when tested.
