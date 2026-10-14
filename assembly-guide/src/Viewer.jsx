import React, {useEffect, useRef, useState} from 'react';
import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {STLLoader} from 'three/addons/loaders/STLLoader.js';
import {toCreasedNormals} from 'three/addons/utils/BufferGeometryUtils.js';
import {explosionOffset, visiblePart} from './model.js';
import hardware from './hardware.json';

export default function Viewer({parts, state, onSelect, onReady, view, resetKey}) {
  const host=useRef(), sceneRef=useRef(), selectRef=useRef(onSelect);
  const [progress,setProgress]=useState(0), [error,setError]=useState('');
  selectRef.current=onSelect;
  useEffect(()=>{
    let disposed=false;
    const element=host.current, scene=new THREE.Scene();
    scene.background=new THREE.Color('#f7f8f9');
    const camera=new THREE.PerspectiveCamera(36,1,0.1,4000); camera.up.set(0,0,1);
    const renderer=new THREE.WebGLRenderer({antialias:true,preserveDrawingBuffer:true});
    renderer.setPixelRatio(Math.min(devicePixelRatio,2)); renderer.setClearColor('#f7f8f9');
    element.appendChild(renderer.domElement);
    const controls=new OrbitControls(camera,renderer.domElement); controls.enableDamping=false; controls.minDistance=60;controls.maxDistance=1600;
    scene.add(new THREE.HemisphereLight(0xffffff,0x697078,1.8));
    const light=new THREE.DirectionalLight(0xffffff,2);light.position.set(150,-160,400);scene.add(light);
    const fill=new THREE.DirectionalLight(0xffffff,0.6);fill.position.set(-100,220,170);scene.add(fill);
    const grid=new THREE.GridHelper(650,26,0xd5dadd,0xe9edef);grid.rotation.x=Math.PI/2;grid.position.z=-2;scene.add(grid);
    const meshes=new Map(), arrows=new THREE.Group(), fasteners=new THREE.Group();scene.add(arrows,fasteners);
    for(const item of hardware.items){
      let geometry, x;
      if(item.kind==='screw'){geometry=new THREE.CylinderGeometry(1,1,10,16);x=-15.5083;}
      else if(item.kind==='washer'){geometry=new THREE.CylinderGeometry(2.15,2.15,0.5,16);x=-10.7583;}
      else {geometry=new THREE.CylinderGeometry(2.4826,2.4826,1.8,6);x=-19.1;}
      geometry.rotateZ(Math.PI/2);const mesh=new THREE.Mesh(geometry,new THREE.MeshStandardMaterial({color:0x63a9b9,transparent:true,opacity:0.55,wireframe:true}));
      mesh.position.set(x,item.mount_axis_mm[1],item.mount_axis_mm[2]);fasteners.add(mesh);
    }fasteners.visible=false;
    const diagnostics={ready:false,parts:0,renders:0,loadMs:0,triangles:0};window.__assemblyGuide=diagnostics;
    const started=performance.now();
    const render=()=>{if(disposed)return;renderer.render(scene,camera);diagnostics.renders++;};
    const bounds=new THREE.Box3(), center=new THREE.Vector3(0,0,150);
    function setView(name='Three-quarter'){
      const dirs={'Three-quarter':[1,-1,0.65],Front:[1,0,0],Rear:[-1,0,0],Left:[0,1,0],Right:[0,-1,0],Top:[0,0,1],Underside:[0,0,-1]};
      const dir=new THREE.Vector3(...(dirs[name]||dirs['Three-quarter'])).normalize();
      controls.target.copy(center);camera.position.copy(center).addScaledVector(dir,650);camera.up.set(0,0,1);
      if(name==='Top'||name==='Underside')camera.up.set(1,0,0);
      controls.update();render();
    }
    function fitVisible(){
      const visible=[...meshes.values()].filter(m=>m.visible);if(!visible.length)return;
      const box=new THREE.Box3();for(const mesh of visible){mesh.updateMatrixWorld();box.union(new THREE.Box3().setFromObject(mesh));}
      const target=box.getCenter(new THREE.Vector3()), size=box.getSize(new THREE.Vector3());
      const direction=camera.position.clone().sub(controls.target).normalize();
      const right=new THREE.Vector3().crossVectors(camera.up,direction).normalize(),up=new THREE.Vector3().crossVectors(direction,right).normalize();
      const tangent=Math.tan(THREE.MathUtils.degToRad(camera.fov/2));let distance=90;
      for(const x of [box.min.x,box.max.x])for(const y of [box.min.y,box.max.y])for(const z of [box.min.z,box.max.z]){
        const point=new THREE.Vector3(x,y,z).sub(target),depth=point.dot(direction);
        distance=Math.max(distance,Math.abs(point.dot(right))/(tangent*camera.aspect)+depth,Math.abs(point.dot(up))/tangent+depth);
      }distance*=1.2;
      controls.target.copy(target);camera.position.copy(target).addScaledVector(direction,distance);controls.update();render();
    }
    const resize=()=>{const {width,height}=element.getBoundingClientRect();if(!width||!height)return;renderer.setSize(width,height);camera.aspect=width/height;camera.updateProjectionMatrix();if(diagnostics.ready)fitVisible();else render();};
    const observer=new ResizeObserver(resize);observer.observe(element);controls.addEventListener('change',render);
    const raycaster=new THREE.Raycaster(),pointer=new THREE.Vector2();let down;
    const pointerdown=e=>{down=[e.clientX,e.clientY];};
    const click=e=>{if(!down||Math.hypot(e.clientX-down[0],e.clientY-down[1])>5)return;const r=renderer.domElement.getBoundingClientRect();pointer.set((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1);raycaster.setFromCamera(pointer,camera);const hits=raycaster.intersectObjects([...meshes.values()].filter(m=>m.visible));selectRef.current(hits[0]?.object.userData.part.id||null);};
    renderer.domElement.addEventListener('pointerdown',pointerdown);renderer.domElement.addEventListener('pointerup',click);
    sceneRef.current={scene,meshes,arrows,fasteners,render,setView,fitVisible,diagnostics};resize();setView();
    const loader=new STLLoader();let cursor=0,loaded=0;
    const worker=async()=>{while(cursor<parts.length&&!disposed){const part=parts[cursor++];const raw=await loader.loadAsync(import.meta.env.BASE_URL+'model/'+part.mesh);const geometry=toCreasedNormals(raw,Math.PI/3);if(raw!==geometry)raw.dispose();if(disposed){geometry.dispose();return;}geometry.computeBoundingBox();
      const color=new THREE.Color().setRGB(...part.color,THREE.SRGBColorSpace);const material=new THREE.MeshStandardMaterial({color,metalness:part.category==='purchased'&&/metal|steel|alumin|bearing|horn/i.test(part.material+' '+part.label)?0.55:0.02,roughness:0.55});
      const mesh=new THREE.Mesh(geometry,material);mesh.userData.part=part;mesh.userData.originalColor=color.clone();meshes.set(part.id,mesh);scene.add(mesh);bounds.union(geometry.boundingBox);diagnostics.triangles+=geometry.attributes.position.count/3;loaded++;setProgress(loaded);render();}};
    Promise.all(Array.from({length:4},worker)).then(()=>{if(disposed)return;bounds.getCenter(center);diagnostics.ready=true;diagnostics.parts=loaded;diagnostics.loadMs=performance.now()-started;setView();fitVisible();onReady(diagnostics);}).catch(e=>{if(!disposed)setError(e.message);});
    return()=>{disposed=true;observer.disconnect();controls.dispose();meshes.forEach(m=>{m.geometry.dispose();m.material.dispose();});renderer.dispose();element.replaceChildren();sceneRef.current=null;};
  },[parts]);
  useEffect(()=>{
    const v=sceneRef.current;if(!v)return;
    for(const [id,mesh] of v.meshes){const p=mesh.userData.part;mesh.visible=visiblePart(p,state);mesh.position.set(...explosionOffset(p,state.explosion));mesh.material.color.copy(mesh.userData.originalColor);if(state.colors[id])mesh.material.color.set(state.colors[id]);
      mesh.material.transparent=state.transparent&&p.group==='covers';mesh.material.opacity=mesh.material.transparent?0.22:1;mesh.material.depthWrite=!mesh.material.transparent;
      const highlighted=state.selected===id;const stepHighlight=!['overview','review'].includes(state.step.id)&&state.step.groups.includes(p.group);mesh.material.emissive.set(highlighted||stepHighlight?0x875711:0x000000);mesh.material.emissiveIntensity=highlighted?0.3:stepHighlight?0.07:0;}
    for(const arrow of [...v.arrows.children]){arrow.line.material.dispose();arrow.cone.material.dispose();}v.arrows.clear();
    v.fasteners.visible=state.showHardware&&v.fasteners.children.length>0;
    v.fasteners.position.set(...explosionOffset({group:'covers',id:'band'},state.explosion));
    if(state.directions&&state.explosion>0&&state.step.id!=='overview'){
      const seen=new Set();for(const mesh of v.meshes.values()){const p=mesh.userData.part;if(!mesh.visible||!state.step.groups.includes(p.group)||seen.has(p.group))continue;seen.add(p.group);const c=mesh.geometry.boundingBox.getCenter(new THREE.Vector3());const offset=new THREE.Vector3(...explosionOffset(p,state.explosion));if(offset.length()<1)continue;const arrow=new THREE.ArrowHelper(offset.clone().negate().normalize(),c.clone().add(offset),offset.length(),0xb4801b,8,4);v.arrows.add(arrow);}
    }v.diagnostics.selected=state.selected;v.diagnostics.visible=[...v.meshes.values()].filter(m=>m.visible).length;v.diagnostics.explosion=state.explosion;v.diagnostics.provisionalHardware=state.showHardware;v.render();
  },[state,progress]);
  useEffect(()=>{const v=sceneRef.current;if(!v)return;if(view==='Fit visible')v.fitVisible();else {v.setView(view);if(v.diagnostics.ready)v.fitVisible();}},[view,resetKey]);
  useEffect(()=>{if(progress===parts.length)sceneRef.current?.fitVisible();},[state.explosion,state.focus,state.isolated,state.hidden,state.step.id,progress]);
  return <div className="canvas-host" ref={host} aria-label="Interactive R25 CAD assembly">{progress<parts.length&&!error&&<div className="loading" role="status"><strong>Loading R25 CAD</strong><span>{progress} / {parts.length} components</span></div>}{error&&<div className="loading" role="alert">Unable to load CAD: {error}</div>}</div>;
}
