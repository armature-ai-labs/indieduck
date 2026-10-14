#!/usr/bin/env python3
"""Check the published inventory without requiring FreeCAD or a slicer."""
import argparse
import hashlib
import json
from pathlib import Path
import sys
import xml.etree.ElementTree as ET
import zipfile

ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / 'SHA256SUMS.txt'


def digest(path):
    result = hashlib.sha256()
    with path.open('rb') as stream:
        for block in iter(lambda: stream.read(1024 * 1024), b''):
            result.update(block)
    return result.hexdigest()


def files():
    return sorted(p for p in ROOT.rglob('*') if p.is_file()
                  and not any(x in {'.git', '__pycache__', 'node_modules', 'dist', 'test-results', '.vite'} for x in p.relative_to(ROOT).parts)
                  and p != MANIFEST and p.name != '.DS_Store' and p.suffix != '.pyc')


def check():
    errors = []
    inventory = files()
    for path in inventory:
        if path.is_symlink() or path.suffix.lower() in {'.fcbak', '.fcstd1', '.3mf', '.gcode', '.brep'}:
            errors.append(f'Unexpected release asset: {path.relative_to(ROOT)}')
    if any(p.suffix == '.FCStd' for p in inventory):
        errors.append('Native CAD belongs in indieduck-cad, not this repository')
    guide = ROOT / 'assembly-guide/public/model'
    if guide.exists() and (guide / 'manifest.json').exists():
        model = json.loads((guide / 'manifest.json').read_text())
        parts = model['parts']
        if len(parts) != 141 or len({p['id'] for p in parts}) != 141:
            errors.append('R25 guide must contain 141 distinct visible CAD components')
        if sum(p['category'] == 'printed' for p in parts) != 55:
            errors.append('R25 guide must identify 55 printed components')
        for part in parts:
            path = guide / part['mesh']
            if not path.is_file():
                errors.append(f'Missing guide mesh: {part["id"]}')
        manifest = guide / 'SHA256SUMS.txt'
        if not manifest.exists():
            errors.append('Missing R25 guide asset checksum manifest')
        else:
            for line in manifest.read_text().splitlines():
                sha, name = line.split('  ', 1)
                path = guide / name
                if not path.is_file() or digest(path) != sha:
                    errors.append(f'R25 guide checksum mismatch: {name}')
    return inventory, errors


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--write-manifest', action='store_true',
                        help='Refresh hashes after reviewing an intentional change')
    args = parser.parse_args()
    try:
        inventory, errors = check()
        expected = {str(p.relative_to(ROOT)): digest(p) for p in inventory}
        if args.write_manifest and not errors:
            MANIFEST.write_text(''.join(f'{sha}  {name}\n' for name, sha in expected.items()))
        recorded = {}
        for line in MANIFEST.read_text().splitlines():
            sha, name = line.split('  ', 1)
            if name in recorded:
                errors.append(f'Duplicate manifest entry: {name}')
            recorded[name] = sha
        if recorded != expected:
            for name in sorted(recorded.keys() | expected.keys()):
                if recorded.get(name) != expected.get(name):
                    errors.append(f'Missing, extra or changed file: {name}')
    except (OSError, ValueError, KeyError, zipfile.BadZipFile, ET.ParseError) as exc:
        errors = [str(exc)]
    if errors:
        print('\n'.join(errors), file=sys.stderr)
        return 1
    print(f'PASS: {len(inventory)} release files and the R25 guide inventory (141 components, 55 printed).')
    print('Integrity only. Recorded CAD checks and physical tests have separate scopes.')
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
