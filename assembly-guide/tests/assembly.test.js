import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {groupFor,explosionOffset,componentLinks,visiblePart,CAD_REV,displayLabel} from '../src/model.js';
const model=JSON.parse(fs.readFileSync(new URL('../public/model/manifest.json',import.meta.url)));
const steps=JSON.parse(fs.readFileSync(new URL('../src/steps.json',import.meta.url)));
const parts=model.parts;
test('complete pinned R25 inventory, printable export links and actual meshes',()=>{
 assert.equal(model.revision,'R25');assert.equal(parts.length,141);assert.equal(new Set(parts.map(p=>p.id)).size,141);
 const printed=parts.filter(p=>p.category==='printed');assert.equal(printed.length,51);
 for(const part of parts){assert.ok(fs.existsSync(new URL('../public/model/'+part.mesh,import.meta.url)));assert.equal(part.source_commit,CAD_REV);assert.equal(part.color.length,3);}
 for(const part of printed){const links=componentLinks(part);assert.ok(links.native.includes(CAD_REV));assert.ok(links.step.endsWith('.step'));assert.ok(links.stl.endsWith('.stl'));}
});
test('presentation offsets never change source coordinates or identity',()=>{
 const original=JSON.stringify(parts);for(const part of parts){assert.ok(explosionOffset(part,0).every(x=>x===0));const offset=explosionOffset(part,1);assert.ok(offset.every(Number.isFinite));assert.ok(offset.some(x=>x!==0));}
 assert.equal(JSON.stringify(parts),original);
});
test('all components have guide coverage and physically verified claims absent',()=>{
 const groups=new Set(steps.steps.flatMap(s=>s.groups));for(const part of parts)assert.ok(groups.has(groupFor(part)),part.id);
 assert.ok(steps.steps.every(s=>['CAD-reviewed','provisional'].includes(s.status)));
 assert.equal(groupFor({id:'A_ref_CameraLens'}),'electronics');assert.equal(groupFor({id:'A_R18_NeckBearing693'}),'neck');
 assert.equal(groupFor({id:'HelmetRoof'}),'covers');assert.equal(groupFor({id:'ShinCap_L'}),'covers');assert.equal(groupFor({id:'CameraFace'}),'covers');assert.equal(groupFor({id:'A_HeadBase'}),'head');
});
test('hide/isolate/focus are reversible and independent of transforms',()=>{
 const p={id:'foot',group:'feet'};const s={hidden:[],isolated:null,focus:false,step:{groups:['feet']}};
 assert.equal(visiblePart(p,s),true);assert.equal(visiblePart(p,{...s,hidden:['foot']}),false);
 assert.equal(visiblePart(p,{...s,isolated:'head'}),false);assert.equal(visiblePart(p,{...s,focus:true,step:{groups:['head']}}),false);
 assert.equal(visiblePart(p,s),true);
});
test('copied asset checksum manifest matches every delivered visual file',()=>{
 const dir=new URL('../public/model/',import.meta.url);
 for(const line of fs.readFileSync(new URL('SHA256SUMS.txt',dir),'utf8').trim().split('\n')){const [hash,name]=line.split('  ');assert.equal(crypto.createHash('sha256').update(fs.readFileSync(new URL(name,dir))).digest('hex'),hash,name);}
});

test('human labels preserve the exact source identity separately',()=>{
 assert.equal(displayLabel({id:'A_ref_servo_left_ankle'}),'Left ankle servo');
 assert.equal(displayLabel({id:'FacetedFoot_L'}),'Left Faceted foot');
 assert.equal(displayLabel({id:'A_R18C_PitchClampNut_L'}),'Left Pitch Clamp Nut');
});
