export const CAD = 'https://github.com/armature-ai-labs/indieduck-cad';
export const CAD_REV='2c8f35c2e9099d557cc1b96fd58b1257f03fe3b8';
export function groupFor(p) {
  const s = `${p.id} ${p.body} ${p.label}`.toLowerCase();
  if (/band|shell|bodyfront|bodyback|eyering|o2_eye|twoeyeface|helmet|torso|pelvis|hipcowl|thighcap|shincap|toecap|facebezel|opticalring|headrim|rearheadbumper|cameraface/.test(s)) return 'covers';
  if (/foot|sole|ankle|roller|skate|wheel/.test(s)) return 'feet';
  if (/thigh|shank|knee/.test(s)) return 'legs';
  if (/cameracarrier/.test(s)) return 'head';
  if (/radxa|hat|battery|regulator|power|imu|pcb|camera|tof|nfc|speaker|mic_|indicator/.test(s)) return 'electronics';
  if (p.body === 'head_pitch_link') return 'neck';
  if (/neck/.test(s)) return 'neck';
  if (/mouth|jaw|head|beak|rollcradle|rollservo/.test(s)) return 'head';
  return 'trunk';
}
export function explosionOffset(p, amount) {
  const group = p.group || groupFor(p);
  const lateral = /(?:_L(?:_|$)|left)/i.test(p.id) ? 1 : /(?:_R(?:_|$)|right)/i.test(p.id) ? -1 : 0;
  const offsets = { feet:[25,lateral*55,-28], legs:[0,lateral*60,0], trunk:[-25,lateral*25,15], electronics:[-75,0,15], neck:[0,0,60], head:[20,0,105], covers:[50,lateral*70,90] };
  const v = offsets[group] || offsets.trunk;
  // Presentation separation only. Original mesh vertices and joint positions are untouched.
  return v.map(n => n * amount);
}
export function componentLinks(p) {
  const root = `${CAD}/blob/${CAD_REV}/`;
  const raw = `${CAD}/raw/${CAD_REV}/`;
  return {
    native: p.native ? root+p.native : null,
    step: p.step ? raw+p.step : null,
    stl: p.stl ? raw+p.stl : null,
    bom: '/indieduck/model/components.csv',
  };
}
export function visiblePart(p, {hidden, isolated, focus, step}) {
  return !hidden.includes(p.id) && (!isolated || p.id===isolated) && (!focus || !step || step.groups.includes(p.group || groupFor(p)));
}

export function displayLabel(p) {
  if(p.label && !p.label.startsWith('A_'))return p.label;
  let name=p.id.replace(/^A_/,'').replace(/^ref_/,'').replace(/^R[0-9]+C?_/,'').replace(/^O2_/,'');
  const servo=name.match(/^(servo|horn)_(left|right)_(.+)$/);
  if(servo)return `${servo[2][0].toUpperCase()+servo[2].slice(1)} ${servo[3].replaceAll('_',' ')} ${servo[1]}`;
  name=name.replace(/EyeL$/,'Eye_L').replace(/EyeR$/,'Eye_R');
  const side=/_L$/.test(name)?'Left ':/_R$/.test(name)?'Right ':'';name=name.replace(/_[LR]$/,'');
  const known={FacetedFoot:'faceted foot',FacetedSole:'TPU sole',ToeCap:'toe cap',ShinCap:'shin cap',ThighCap:'slotted thigh cap',HipCowl:'hip cowl',ShankStructure:'shank structure',Yaw:'hip yaw support',HipL:'hip roll support',TorsoFront:'torso front panel',TorsoRear:'torso rear panel',TorsoAccent:'torso inlay',PelvisFront:'pelvis front panel',PelvisRear:'pelvis rear panel',HelmetRoof:'helmet roof',HelmetLower:'helmet lower band (prints upside down)',HeadRim:'head rim',RearHeadBumper:'rear head bumper',FaceBezel:'face bezel',CameraFace:'camera face',CameraCarrier:'camera carrier',OpticalRing:'optical ring',AngularJaw:'jaw',JawSurround:'jaw surround',HeadBase:'head base'};
  name=known[name]||name.replace(/([a-z0-9])([A-Z])/g,'$1 $2').replaceAll('_',' ');
  return side+name.charAt(0).toUpperCase()+name.slice(1);
}
