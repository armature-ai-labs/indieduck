#!/usr/bin/env python3
import csv
import hashlib
import json
from pathlib import Path
root = Path(__file__).resolve().parents[1]
model = root / 'public/model'
manifest = json.loads((model / 'manifest.json').read_text())
hardware = json.loads((root / 'src/hardware.json').read_text())
(model / 'additional-hardware.json').write_text(json.dumps(hardware, indent=2) + '\n')
with (model / 'components.csv').open('w') as stream:
    writer = csv.writer(stream)
    writer.writerow(['id', 'label', 'category', 'reference_quantity', 'physical_quantity', 'material', 'status', 'native_object'])
    for part in manifest['parts']:
        compound = 'Fasteners' in part['id']
        writer.writerow([part['id'], part['label'], part['category'], 1, 1 if part['category'] == 'printed' else ('unresolved compound' if compound else 'reference only; confirm purchase quantity'), part['material'], 'provisional' if part['provisional'] else 'CAD reference; fit unverified', part['native_object']])
    for item in hardware['items']:
        writer.writerow([item['id'], item['label'], 'additional hardware envelope', 0, item['quantity'], 'supplier unselected', 'provisional', 'not in source CAD'])
paths = sorted(p for p in model.rglob('*') if p.is_file() and p.name != 'SHA256SUMS.txt')
(model / 'SHA256SUMS.txt').write_text(''.join(f'{hashlib.sha256(p.read_bytes()).hexdigest()}  {p.relative_to(model)}\n' for p in paths))
