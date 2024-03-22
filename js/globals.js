import * as THREE from 'three';
import { OBJLoader } from '../Libraries/three.js/examples/jsm/loaders/OBJLoader.js';
import { OrbitControls } from '../Libraries/three.js/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from '../Libraries/three.js/examples/jsm/loaders/GLTFLoader.js';
import * as YUKA from '../Libraries/yuka-master/build/yuka.module.js';
import { PointerLockControls } from '../Libraries/three.js/examples/jsm/controls/PointerLockControls.js';
import { Water } from '../Libraries/three.js/examples/jsm/objects/Water.js';
import {EffectComposer} from "../Libraries/three.js/examples/jsm/postprocessing/EffectComposer.js";
import {RenderPass} from "../Libraries/three.js/examples/jsm/postprocessing/RenderPass.js";
import { MTLLoader } from '../Libraries/three.js/examples/jsm/loaders/MTLLoader.js';


const width = window.innerWidth, height = window.innerHeight;
export const camera = new THREE.PerspectiveCamera(85, width / height, 0.1, 400);
camera.position.set(0, 5, 10);   
                                           //set initial camera location
export const scene = new THREE.Scene();