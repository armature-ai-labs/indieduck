# Contributing to IndieDuck

Please keep each change focused and explain the problem, affected part or interface, and evidence for the result. Use an issue for fit observations or a design proposal before making a broad mechanical revision.

## CAD and print changes

- Keep the native Parts and Assembly files together. Edit the native features, recompute both documents and retain the selected export inventory in `part-map.json`.
- Describe which dimensions changed and why. Preserve joint centres and mating interfaces unless the change explicitly addresses them.
- Include matching STEP/STL exports and update the source record for changed geometry. Retain upstream attribution; do not introduce source geometry with unclear redistribution terms.
- Record FreeCAD version, units, solid validity, mesh closure, STEP round-trip results and native link resolution. Give photos and measurements for physical claims, with printer, material, settings and part revision.
- Distinguish as-printed results from hand-fitted parts. Do not infer durability, walking or skating from a single fit test.

## Release integrity

Run `python3 tools/check_release.py` from the repository root. After reviewing an intentional file change, refresh the inventory with `python3 tools/check_release.py --write-manifest`, then run the checker again. Review the manifest diff alongside the changed assets. Updating a hash does not validate geometry or clear an open physical test.

Keep generated backups, temporary files, printer jobs, credentials and local machine paths out of contributions. The issue and pull-request templates request the evidence needed to understand a change; they do not require hardware tests for documentation-only edits.
