import * as THREE from 'three';
import { scene } from './globals.js';


export function initializeScene() {

    const width = window.innerWidth, height = window.innerHeight;

    // Initialize the camera and scene
    const camera = new THREE.PerspectiveCamera(85, width / height, 0.1, 400);
    camera.position.set(0, 5, 10);                                              //set initial camera location
    const scene = new THREE.Scene();
}

export function addLighting() {
    //LIGHTING===================================================


    const directionalLight = new THREE.DirectionalLight(0xffffe0, 1);
        directionalLight.position.set(0, 1, 0);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 2048;  // Higher resolution
        directionalLight.shadow.mapSize.height = 2048; // Higher resolution
        directionalLight.shadow.bias = -0.0001;        // Adjust as necessary to reduce artifacts



    const directionalLight2 = new THREE.DirectionalLight(0x5e6b87, 1);
        directionalLight2.position.set(0, 1, 0);
        directionalLight2.castShadow = true;
        directionalLight2.shadow.mapSize.width = 2048;  // Higher resolution
        directionalLight2.shadow.mapSize.height = 2048; // Higher resolution
        directionalLight2.shadow.bias = -0.0001;        // Adjust as necessary to reduce artifacts


    directionalLight.intensity = 10;    //  intensity 
    scene.add(directionalLight);
    scene.add(directionalLight2);

     const ambientLight = new THREE.AmbientLight(0x00001f, 10.0); // Soft blue light
 
     scene.add(ambientLight);

   
    function lerpColor(color1, color2, factor) { // this transitions lighter at top to bluer bottom
        var result = color1.clone();
        result.lerp(color2, factor);
        return result;
    }

    const shallowColor = new THREE.Color(0xa4dfed); // light color at the surface
    const deepColor = new THREE.Color(0x001e0f);    //  deep blue color for deeper depths

    
}

export function addSkybox() {
    //SkyBox====================================================================
    const textureLoader = new THREE.TextureLoader();
    // Load Skybox Textures
    const skyboxImagePaths = [
        '/Assets/skybox/Underwater_Box_Left.jpg',      //left
        '/Assets/skybox/Underwater_Box_Right.jpg',     //right
        '/Assets/skybox/Underwater_Box_Top.jpg',       // top
        '/Assets/skybox/Underwater_Box_Bottom.jpg',    // bottom
        '/Assets/skybox/Underwater_Box_Front.jpg',     // front
        '/Assets/skybox/Underwater_Box_Back.jpg',      // left
        

    ];

    const skyboxMaterials = skyboxImagePaths.map(image => {
        const texture = textureLoader.load(image);
        texture.wrapS = THREE.ClampToEdgeWrapping;
        texture.wrapT = THREE.ClampToEdgeWrapping;
        return new THREE.MeshBasicMaterial({ map: texture, side: THREE.BackSide });
    });

    const skyboxGeometry = new THREE.BoxGeometry(400, 40, 400); 
    const skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterials);
    scene.add(skybox);
    skybox.position.set(0, -5, 0); // Move the skybox down


//END SKYBOX======================================================================
}

export function addFog() {
    //FOG=============================================================================

    // Create exponential fog
    const fogDensity = 0.006;                               // density of the fog
    const fogColorExp = new THREE.Color(0x6495ED);          // color

    scene.fog = new THREE.FogExp2(fogColorExp, fogDensity); // add to scene

//FOG============================================================================
}
