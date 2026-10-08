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
CAD = ROOT / 'hardware/mechanical/freecad/indieduck-r06'
MANIFEST = ROOT / 'SHA256SUMS.txt'


def digest(path):
    result = hashlib.sha256()
    with path.open('rb') as stream:
        for block in iter(lambda: stream.read(1024 * 1024), b''):
            result.update(block)
    return result.hexdigest()


def files():
    return sorted(p for p in ROOT.rglob('*') if p.is_file()
                  and not any(x in {'.git', '__pycache__'} for x in p.relative_to(ROOT).parts)
                  and p != MANIFEST and p.name != '.DS_Store' and p.suffix != '.pyc')


def check():
    errors = []
    inventory = files()
    for path in inventory:
        if path.is_symlink() or path.suffix.lower() in {'.fcbak', '.fcstd1', '.3mf', '.gcode', '.brep'}:
            errors.append(f'Unexpected release asset: {path.relative_to(ROOT)}')
    part_map = json.loads((CAD / 'part-map.json').read_text())
    expected = set(part_map['parts'])
    if len(expected) != 33 or len(part_map['references']) != 52:
        errors.append('R06 inventory must contain 33 printed parts and 52 reference objects')
    for kind in ('stl', 'step'):
        actual = {p.stem for p in (CAD / kind).glob('*.' + kind)}
        if kind == 'step':
            actual.discard('IndieDuck_R06_printed_parts_assembled')
        if actual != expected:
            errors.append(f'{kind} inventory differs from part-map.json')
    for path in sorted(CAD.rglob('*.FCStd')):
        with zipfile.ZipFile(path) as archive:
            if archive.testzip():
                errors.append(f'Damaged native archive: {path.name}')
            document = ET.fromstring(archive.read('Document.xml'))
        for name, expected_value in [('License', 'Apache License, Version 2.0'),
                                     ('CreatedBy', 'Armature AI Labs')]:
            node = document.find(f'./Properties/Property[@name="{name}"]/String')
            if node is None or node.get('value') != expected_value:
                errors.append(f'Unexpected {name}: {path.name}')
        for link in document.iter('XLink'):
            filename = link.get('file', '')
            if filename and (Path(filename).is_absolute() or '..' in Path(filename).parts
                             or not (path.parent / filename).is_file()):
                errors.append(f'Unresolved or nonportable native link: {path.name}: {filename}')
    source_map = json.loads((CAD / 'provenance/R06-source-map.json').read_text())
    if {row['object'] for row in source_map['part_source_map']} != expected:
        errors.append('R06 provenance does not cover the selected parts')
    def check_assets(value):
        if isinstance(value, dict):
            if 'path' in value and 'sha256' in value:
                path = ROOT / value['path']
                if not path.is_file() or digest(path) != value['sha256']:
                    errors.append(f'Provenance hash mismatch: {value["path"]}')
            for child in value.values():
                check_assets(child)
        elif isinstance(value, list):
            for child in value:
                check_assets(child)
    check_assets(source_map)
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
    print(f'PASS: {len(inventory)} release files, 33 part export pairs and native archive metadata.')
    print('Integrity only. Recorded CAD checks and physical tests have separate scopes.')
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
