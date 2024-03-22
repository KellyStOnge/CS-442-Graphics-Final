import * as THREE from 'three';
import { OBJLoader } from '/Libraries/three.js/examples/jsm/loaders/OBJLoader.js';
import { OrbitControls } from '/Libraries/three.js/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from '/Libraries/three.js/examples/jsm/loaders/GLTFLoader.js';
import * as YUKA from '/Libraries/yuka-master/build/yuka.module.js';
import { PointerLockControls } from '/Libraries/three.js/examples/jsm/controls/PointerLockControls.js';
import { Water } from '/Libraries/three.js/examples/jsm/objects/Water.js';
import {EffectComposer} from "/Libraries/three.js/examples/jsm/postprocessing/EffectComposer.js";
import {RenderPass} from "/Libraries/three.js/examples/jsm/postprocessing/RenderPass.js";
import { MTLLoader } from '/Libraries/three.js/examples/jsm/loaders/MTLLoader.js';
import { controlsState , updateCameraPositionAndRotation, camera} from './controls.js';
//IMPORTS=====================================================================================

//INITIALIZATION=====================================================================================

const width = window.innerWidth, height = window.innerHeight;
const scene = new THREE.Scene();
const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();


//FISH===============FISH===============FISH=============FISH==================
//FISH===============FISH===============FISH=============FISH==================

let fish;

// loads the texture
const textureLoader = new THREE.TextureLoader();
textureLoader.load('/Assets/redFish/gtrfishred.png', function (texture) {
    const material = new THREE.MeshStandardMaterial({ map: texture });
    
    //loads the object
    const loader = new OBJLoader();
    loader.load(
        '/Assets/redFish/Fish (Red).obj',
        function (object) {
            object.scale.set(1.0, 1.0, 1.0); //  scale of model

            // texture apply to all children
            object.traverse(function (child) {
                if (child instanceof THREE.Mesh) {
                    child.material = material;
                    child.castShadow = true;
        			child.receiveShadow = true;
                }
            });
            
            // add object to scene
            scene.add(object);
            fish = object; // fish for animating
        },
        function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        function (error) {
            console.log('An error happened');
        }
    );
});

// POPULATE MORE FISH!!!!======================================================

function addFish() {
    // loads the texture
    textureLoader.load('/Assets/redFish/gtrfishred.png', function (texture) {
        const material = new THREE.MeshStandardMaterial({ map: texture });

        //loads the object
        const loader = new OBJLoader();
        loader.load(
            '/Assets/redFish/Fish (Red).obj',
            function (object) {
                object.scale.set(1.0, 1.0, 1.0); // scale

                // texture to all child meshes in the OBJ model
                object.traverse(function (child) {
                    if (child instanceof THREE.Mesh) {
                        child.material = material;
                        child.castShadow = true;
        				child.receiveShadow = true;
                    }
                });

                // Randomize position and rotation
                const xRange = 400; // Spread in the X direction
                const yRange = 13;  // Spread in the Y direction
                const zRange = 400; // Spread in the Z direction

                object.position.x = Math.random() * xRange - xRange / 2;
                object.position.y = Math.random() * yRange - 10; // Keeping your original Y range
                object.position.z = Math.random() * zRange - zRange / 2;

                // Add the textured object to the scene
                scene.add(object);
            },
            function (xhr) {
                console.log((xhr.loaded / xhr.total * 100) + '% loaded');
            },
            function (error) {
                console.log('An error happened');
            }
        );
    });
}

const numberOfFish = 100; 

// Add the fish to the scene
for (let i = 0; i < numberOfFish; i++) {
    addFish();
}

let entityManager = new YUKA.EntityManager(); //YUKA modeling
let time = new YUKA.Time();

function  wanderingFish(){


let fish2; 

// loads the texture
const textureLoader2 = new THREE.TextureLoader();
textureLoader2.load('/Assets/redFish/gtrfishred.png', function (texture) {
    const material = new THREE.MeshStandardMaterial({ map: texture });

    //loads obj
    const loader = new OBJLoader();
    loader.load(
        '/Assets/redFish/Fish (Red).obj',
        function (object) {

            // reset any rotations first
            object.rotation.set(0, 0, 0);
            object.scale.set(1.0, 1.0, 1.0); //scale
            object.rotation.y = -Math.PI/2 ;
            //object.rotation.x = -Math.PI/2 ;

            
            object.traverse(function (child) {
                if (child instanceof THREE.Mesh) {
                    child.material = material;
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });
               

               object.userData = {
                    amplitude: 2, // maximum vertical movement distance
                    frequency: Math.random() * 0.005 + 0.001, // random frequency
                    phase: Math.random() * Math.PI * 2 // random phase
                };
                //add to scene
                scene.add(object);
           
            fish2 = object; 

            const vehicle = new YUKA.Vehicle(); //new instance of the  yuka vehicle system
              

            const wanderBehavior = new YUKA.WanderBehavior();

            wanderBehavior.radius = 5;     // radius of the wander circle
            wanderBehavior.distance = 10;  // distance the wander circle is projected in front of the agent
            wanderBehavior.jitter = 100;   // the amount of random displacement added each second
            
            vehicle.maxSpeed = 5;           // set a maximum speed
            vehicle.maxForce = 10;          // set a maximum steering force


            vehicle.position.copy(vehicle.position); // copy the initial position from the loaded model
            vehicle.setRenderComponent( fish2, sync );


            vehicle.steering.add( wanderBehavior ); // adds the wandering behavior to each fish

            entityManager.add( vehicle );           // add to the entity manager for boundary
                                                    //behavior etc

        },
        function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        function (error) {
            console.log('An error happened');
        }
    );
});
}


function  wanderingFish2(){

let fish2

// Load the texture
const textureLoader2 = new THREE.TextureLoader();
textureLoader2.load('/Assets/Fish/fish01_cute_c.png', function (texture) {
    const material = new THREE.MeshStandardMaterial({ map: texture });

    const loader = new OBJLoader();
    loader.load(
        '/Assets/Fish/fish01.obj',
        function (object) {

                                                // reset any rotations first
            object.rotation.set(0, 0, 0);
            object.scale.set(0.1, 0.1, 0.1);    // scale
            object.rotation.y = -Math.PI/3 ;
            //object.rotation.x = -Math.PI/2 ;

            
            object.traverse(function (child) {
                if (child instanceof THREE.Mesh) {
                    child.material = material;
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });
            
                                                //add object to scene
            scene.add(object);
            fish2 = object;                     // assign the loaded object to the fish variable

            const vehicle = new YUKA.Vehicle();
               
            const wanderBehavior = new YUKA.WanderBehavior();

            wanderBehavior.radius = 5;          // radius of the wander circle
            wanderBehavior.distance = 10;       // distance the wander circle is projected in front of the agent
            wanderBehavior.jitter = 100;        // the amount of random displacement added each second
            
            vehicle.maxSpeed = 5;               // Set a maximum speed
            vehicle.maxForce = 10;              // Set a maximum steering force


            vehicle.position.copy(vehicle.position); // Copy the initial position from the loaded model
            vehicle.setRenderComponent( fish2, sync );



            vehicle.steering.add( wanderBehavior );

            entityManager.add( vehicle );
        },
        function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        function (error) {
            console.log('An error happened');
        }
    );
});
}

function wanderingFish3() {
    //shark texture
    const sharkTextureLoader = new THREE.TextureLoader();
    sharkTextureLoader.load('/Assets/SHARK/Shark_LP_diffuse.png', function (sharkTexture) {
        const sharkMaterial = new THREE.MeshStandardMaterial({ map: sharkTexture });

        //shark model
        const sharkLoader = new OBJLoader();
        sharkLoader.load('/Assets/SHARK/Shark_LP.obj', function (shark) {
            shark.scale.set(8.1, 8.1, 8.1);                         // scale
            shark.rotation.y = -Math.PI / 3;

            shark.traverse(function (child) {
                if (child instanceof THREE.Mesh) {
                    child.material = sharkMaterial;
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });

            // Function to load and attach a feeder fish to the shark
            const addFeederFish = (relativePosition) => {
                const feederFishLoader = new OBJLoader();
                feederFishLoader.load('/Assets/hhshark.obj', function (feederFish) {
                    feederFish.scale.set(0.1, 0.1, 0.1);                        // scale
                    feederFish.position.set(relativePosition.x, relativePosition.y, relativePosition.z);
                    feederFish.rotation.y = -Math.PI / 2;
                    feederFish.traverse(function (child) {
                        if (child instanceof THREE.Mesh) {
                            child.material = new THREE.MeshStandardMaterial({ color: 0xaaaaaa });
                            child.castShadow = true;
                            child.receiveShadow = true;
                        }
                    });

                    // add the feeder fish as a child of the shark
                    shark.add(feederFish);
                });
            };

            // add feeder fish at different positions around the shark
            addFeederFish(new THREE.Vector3(0.5, 0, 0));   // Right side
            addFeederFish(new THREE.Vector3(-0.5, 0, 0));  // Left side
            addFeederFish(new THREE.Vector3(0.5, 0, 0.5));   // Front
            

            // YUKA vehicle for the shark
            const sharkVehicle = new YUKA.Vehicle();
            sharkVehicle.maxSpeed = 5;
            sharkVehicle.maxForce = 10;
            sharkVehicle.position.copy(shark.position);
            sharkVehicle.setRenderComponent(shark, sync);

            const wanderBehavior = new YUKA.WanderBehavior();
            wanderBehavior.radius = 5;
            wanderBehavior.distance = 10;
            wanderBehavior.jitter = 100;
            sharkVehicle.steering.add(wanderBehavior);

            entityManager.add(sharkVehicle);

            // add shark to scene
            scene.add(shark);
        });
    });
}

//Loop Generating Fish===============================================

// Add the fish to the scene
for (let i = 0; i < numberOfFish; i++) {
    wanderingFish();
    wanderingFish2();
    //wanderingFish3();
}


let numberOfFish2 = 6;

for (let i = 0; i < numberOfFish2; i++) {

    wanderingFish3();
}

//================================================================

function pirateShip(){

    const loader = new OBJLoader();
    const mtlLoader = new MTLLoader();

// load material first
    mtlLoader.load('/Assets/ship.mtl', function (materials) {
        materials.preload();
        loader.setMaterials(materials);

        // load ship
        loader.load('/Assets/ship.obj', function (ship) {
            
            ship.scale.set(0.7, 0.7, 0.7); // 
            ship.rotation.y = Math.PI; // 
            ship.position.set(-100, -13, -10); 
            ship.rotation.x = Math.PI /4;  // upward sunk
            scene.add(ship); 
        });
    });


}

pirateShip();

function pirateShip2(){

    const loader = new OBJLoader();
    const mtlLoader = new MTLLoader();

    mtlLoader.load('/Assets/ship.mtl', function (materials) {
        materials.preload();
        loader.setMaterials(materials);

       
        loader.load('/Assets/ship.obj', function (ship) {
           
            ship.scale.set(0.7, 0.7, 0.7); 
            ship.rotation.y = Math.PI; 
            ship.position.set(-100, -30, 100);
            ship.rotation.x = -(Math.PI/4); // angle it soo it looks downward sunk
            scene.add(ship); 
        });
    });


}

pirateShip2();


function addStoneColumns() {
    const loader = new OBJLoader();
    const textureLoader = new THREE.TextureLoader();
    const numberOfColumns = 10;
    const circleRadius = 50; // radius of the circle where columns will be placed

    // texture for the stone columns
    textureLoader.load('/Assets/concrete_0001_base_color_4k.jpg', function (texture) {
        const stoneMaterial = new THREE.MeshStandardMaterial({ map: texture });

        // stone column model
        loader.load('/Assets/Broken Pillar.obj', function (columnModel) {
            for (let i = 0; i < numberOfColumns; i++) {
               
                let columnClone = columnModel.clone();

                //position for each column
                let angle = (i / numberOfColumns) * Math.PI * 2; 
                let x = Math.cos(angle) * circleRadius;
                let z = Math.sin(angle) * circleRadius;

                //stone texture material to each mesh in the column model
                columnClone.traverse(function (child) {
                    if (child instanceof THREE.Mesh) {
                        child.material = stoneMaterial;
                    }
                });

                columnClone.scale.set(8,8,8);
                // Set the position of the column
                columnClone.position.set(x +100, -24, z - 130); //sea floor's y position

               
                scene.add(columnClone);
            }
        });
    });
}

addStoneColumns();

function addMarbleStatue() {
    const loader = new OBJLoader();
    const textureLoader = new THREE.TextureLoader();

    
    textureLoader.load('/Assets/concrete_0001_base_color_4k.jpg', function (texture) {
        const statueMaterial = new THREE.MeshStandardMaterial({ map: texture });

        // statue model
        loader.load('/Assets/statue.obj', function (statue) {
            // Apply the texture material to each mesh in the statue model
            statue.traverse(function (child) {
                if (child instanceof THREE.Mesh) {
                    child.material = statueMaterial;
                }
            });

            statue.position.set(100, -24, -130);
            statue.scale.set(0.19, 0.19, 0.19); 

            // add statue to the scene
            scene.add(statue);
        });
    });
}

addMarbleStatue();

//================================================================

let fire;

function addVolcano() {
    const loader = new OBJLoader();
    const mtlLoader = new MTLLoader();

    // dark brown material for the volcano
    const volcanoMaterial = new THREE.MeshStandardMaterial({ color: 0x654321 }); // dark brown color

    // volcano model
    loader.load('/Assets/volcano.obj', function (volcano) {
        // Apply the material to the volcano
        volcano.traverse(function (child) {
            if (child instanceof THREE.Mesh) {
                child.material = volcanoMaterial;
            }
        });

        // position and scale the volcano
        volcano.position.set(100, -24, 130); 
        volcano.scale.set(20, 20, 20); 

        scene.add(volcano);

        // fire object
        mtlLoader.load('/Assets/fire.mtl', function (materials) {
            materials.preload();
            loader.setMaterials(materials);
            loader.load('/Assets/fire.obj', function (fire) {
               
                fire.position.set(volcano.position.x, volcano.position.y + 5, volcano.position.z); // Adjust as necessary
                fire.scale.set(.1, .1, .1); 

                scene.add(fire);

                // red point light for the glow effect
                const redLight = new THREE.PointLight(0xff0000, 1, 100);
                redLight.position.copy(fire.position);
                scene.add(redLight);

            
            });
        });
    });
}

addVolcano();

//================================================================

//====PARTICLES============================================================

const particleGeometry = new THREE.BufferGeometry();
const particleCount = 1000;
const posArray = new Float32Array(particleCount * 3); // x, y, z for each particle
for (let i = 0; i < particleCount * 3; i++) {
    // Random positions for particles
    posArray[i] = (Math.random() - 0.5) * 200; // spread particles over a larger area
}
particleGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

const particleMaterial = new THREE.PointsMaterial({
    size: 0.3,
    transparent: true,
    color: 0xffffff
});

const particleMesh = new THREE.Points(particleGeometry, particleMaterial);
scene.add(particleMesh);


//EASTER ISLAND HEAD!!!+==================================================
function Easter(objPath, position, eyeLightPositions) {
    // Load the .obj file
    const loader = new OBJLoader();
    loader.load(objPath, function (object) {
        object.rotation.set(0, 0, 0);

         object.rotation.y = -Math.PI/2 ;
        object.scale.set(0.05, 0.05, 0.05);
        object.traverse(function (child) {
            if (child instanceof THREE.Mesh) {
                // Apply material, if needed
                child.material = new THREE.MeshStandardMaterial({ color: 0xaaaaaa });
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });

        object.position.set(position.x, position.y, position.z);
        scene.add(object);
    });
}

Easter('/Assets/moai_vol.2.obj', new THREE.Vector3(70, -24, 20));


//===RANDOM ROCKS===============================================================================================

function populateRocks() {
    const loader = new OBJLoader();
    const rockInstances = 50; // number of rocks 
    const areaSize = 400;     // rock distribution

    // dark grey material
    const rockMaterial = new THREE.MeshStandardMaterial({ color: 0x888c8d }); 

    //generate random positions
    function getRandomPosition() {
        return {
            x: Math.random() * areaSize - areaSize / 2,
            y: -24, // Assuming the floor is at y = 0
            z: Math.random() * areaSize - areaSize / 2
        };
    }

    //rock model
    loader.load('/Assets/Low-Poly Rocks.obj', function (rockModel) {
        for (let i = 0; i < rockInstances; i++) {
            let rockClone = rockModel.clone();
            rockClone.traverse(function (child) {
                if (child instanceof THREE.Mesh) {
                    child.material = rockMaterial;
                }
            });

            //random position for each rock
            const position = getRandomPosition();
            rockClone.position.set(position.x, position.y, position.z);

            // randomize scale and rotation 
             rockClone.scale.set(Math.random()*3,Math.random()*3,Math.random()*3);
             rockClone.rotation.set(0,Math.random()*2,0);

            scene.add(rockClone);
        }
    });
}

populateRocks();

//===RANDOM SEAWEED===============================================================================================

function populateSeaweed() {
    const loader = new OBJLoader();
    const textureLoader = new THREE.TextureLoader();
    const seaweedInstances = 100; 
    const areaSize = 400; 

    //seaweed
    textureLoader.load('/Assets/seaweedTEX/seaweed_diffuse.png', function (texture) {
        const seaweedMaterial = new THREE.MeshStandardMaterial({ map: texture });

        // seaweed model
        loader.load('/Assets/seaweedList.obj', function (seaweedModel) {
            for (let i = 0; i < seaweedInstances; i++) {
                let seaweedClone = seaweedModel.clone();
                seaweedClone.traverse(function (child) {
                    if (child instanceof THREE.Mesh) {
                        child.material = seaweedMaterial;
                    }
                });

                //random positions
                function getRandomPosition() {
                    return {
                        x: Math.random() * areaSize - areaSize / 2,
                        y: -24, 
                        z: Math.random() * areaSize - areaSize / 2
                    };
                }

                //random position for each seaweed
                const position = getRandomPosition();
                seaweedClone.position.set(position.x, position.y, position.z);

                //randomize scale or rotation
                seaweedClone.scale.set(Math.random() * 3, Math.random() * 10, Math.random() * 3);
                
                scene.add(seaweedClone);
            }
        });
    });
}

populateSeaweed();

//===RANDOM CORAL===============================================================================================

function populateCoral() {
    const loader = new OBJLoader();
    const rockInstances = 20; 
    const areaSize = 400; 

    
    const rockMaterial = new THREE.MeshStandardMaterial({ color: 0xf88379 }); // coral color

    //random positions
    function getRandomPosition() {
        return {
            x: Math.random() * areaSize - areaSize / 2,
            y: -24, // Assuming the floor is at y = 0
            z: Math.random() * areaSize - areaSize / 2
        };
    }

    // coral model
    loader.load('/Assets/coral.obj', function (rockModel) {
        for (let i = 0; i < rockInstances; i++) {
            let rockClone = rockModel.clone();
            rockClone.traverse(function (child) {
                if (child instanceof THREE.Mesh) {
                    child.material = rockMaterial;
                }
            });

            //random position for each rock
            const position = getRandomPosition();
            rockClone.position.set(position.x, position.y, position.z);

            //randomize scale or rotation if desired
             rockClone.scale.set(Math.random()/3,Math.random()/3,Math.random()/3);
             rockClone.rotation.set(0,Math.random()*2,0);

            scene.add(rockClone);
        }
    });
}

populateCoral();

//SUBMARINE==PROPELLER================================

let submarinePropeller; 

function addPropellerToSubmarine(submarine) {
    //propeller model
    const propellerLoader = new OBJLoader();
    propellerLoader.load('/Assets/prop/prop.obj', function (propeller) {
        propeller.scale.set(0.02, 0.02, 0.02);                      // scale
        propeller.position.set(0, 0, -9);                           // position to the back of the submarine
        propeller.rotation.x = Math.PI /2;
        submarinePropeller = propeller;                             // reference to the propeller for animation
        submarine.add(submarinePropeller);                          // add to scene
    });
}

//SUBMARINE============================================================================

let submarineVehicle; // This will be our YUKA vehicle that represents the submarine

function addSubmarine() {
    // sub texture
    textureLoader.load('/Assets/uploads_files_1830876_Textures/Textures.jpg', function (texture) {
        const material = new THREE.MeshStandardMaterial({ map: texture });

        // sub OBJ file
        const loader = new OBJLoader();
        loader.load('/Assets/uploads_files_1830876_Textures/uploads_files_1830876_Format3.obj', function (submarine) {
            submarine.scale.set(1.0, 1.0, 1.0);     // scale 
            
            addPropellerToSubmarine(submarine);     // the prop function 
            
            submarine.traverse(function (child) {
                if (child instanceof THREE.Mesh) {
                    child.material = material;
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });

             // create a spotlight
            const createSpotlight = (x, y, z) => {
                const spotlight = new THREE.SpotLight(0xffffff, 1, 100, Math.PI / 4, 5);
                spotlight.position.set(x, y, z);
                spotlight.target.position.set(x, y - 10, z - 10); // Adjust target position
                return spotlight;
            };

            // spotlights positions
            const leftSpotlight = createSpotlight(-5, 0, 5); // Adjust position as needed
            const rightSpotlight = createSpotlight(5, 0, 5 ); // Adjust position as needed

            submarine.add(leftSpotlight);
            submarine.add(rightSpotlight);
            scene.add(leftSpotlight.target);
            scene.add(rightSpotlight.target);

            // position of submarine
            submarine.position.set(Math.random() * 20 - 10, -15, Math.random() * 20 - 10);

            // create a light
            const createLight = (x, y, z) => {
                const light = new THREE.PointLight(0xffffff, 1, 150);
                light.position.set(x, y, z);
                return light;
            };

                                                 // decrease spacing between the light
            const portHoleSpacing = 2.2;         // closer spacing
            const portHolePositions = [-portHoleSpacing, 0, portHoleSpacing];  // adjusted positions

            //side port holes
            for (let i = 0; i < portHolePositions.length; i++) {
                let zPosition = portHolePositions[i];
                // Left side lights
                submarine.add(createLight(-5, 2.1, zPosition));
                // Right side lights
                submarine.add(createLight(5, 2.1, zPosition));
            }

                // YUKA vehicle for sub
                submarineVehicle = new YUKA.Vehicle();
                submarineVehicle.position.copy(submarine.position);  
                submarineVehicle.setRenderComponent(submarine, sync);

                // add a wander behavior to the vehicle
               
                const wanderBehavior = new YUKA.WanderBehavior();
                wanderBehavior.radius = 5;                      // radius of the wander circle
                wanderBehavior.distance = 10;                   // distance of wander circle 
                wanderBehavior.jitter = 100;                    // random displacement added each second
                
                submarineVehicle.maxSpeed = 5;                  // maximum speed
                submarineVehicle.maxForce = 10;                 // maximum steering force


                submarineVehicle.steering.add(wanderBehavior);
                

                // add vehicle to the YUKA entity manager
                entityManager.add(submarineVehicle);

            // add submarine to the scene
            scene.add(submarine);

        });
    });
}

addSubmarine();

//Spongebob===============================================================

//SPONGEBOBS==HOUSE=======================================================

function BOB() {
    const loader = new OBJLoader();

    // Materials
    const topMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 }); // Green
    const bottomMaterial = new THREE.MeshStandardMaterial({ color: 0xffc000 }); // Yellow-orange

    // Load the bottom part
    loader.load('/Assets/pineapple/bottom.obj', function (bottomPart) {
        bottomPart.traverse(function (child) {
            if (child instanceof THREE.Mesh) {
                child.material = bottomMaterial;
            }
        });
        bottomPart.scale.set(0.01, 0.01, 0.01);
        bottomPart.position.set(80, -20, 20); // Desired coordinates

        // Load the top part as a child of the bottom part
        loader.load('/Assets/pineapple/top.obj', function (topPart) {
            topPart.traverse(function (child) {
                if (child instanceof THREE.Mesh) {
                    child.material = topMaterial;
                }
            });

            // Rotate the top part 180 degrees on the X axis
            topPart.rotation.x = Math.PI ; // 180 degrees in radians

            bottomPart.rotation.x = Math.PI;

            topPart.position.y = -24; 
            bottomPart.add(topPart); // add top part as a child of bottom part
        });
        scene.add(bottomPart); // add bottom part (with top part attached) to the scene
    });
}

BOB();

//PATRICKS=HOUSE===============================================================

function patricksHouse() {
    const loader = new OBJLoader();
    const textureLoader = new THREE.TextureLoader();

    // Load the texture for patricks house
    const squidwardTexture = textureLoader.load('/Assets/Rock1/Rock-Texture-Surface.jpg', function(texture) {
        // Create the material with the loaded texture
        const squidwardMaterial = new THREE.MeshStandardMaterial({ map: texture });

        // Load and position patricks house
        loader.load('/Assets/Rock1/Rock1.obj', function (squidwardHouse) {
            squidwardHouse.traverse(function (child) {
                if (child instanceof THREE.Mesh) {
                    child.material = squidwardMaterial;
                }
            });

            squidwardHouse.scale.set(2, 3, 1); 
            squidwardHouse.position.set(65, -24.2, 20); // position next to the pineapple

            scene.add(squidwardHouse); 
        });
    });
}

patricksHouse();

//-------------------------------------------------------------

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

//-------WATER SURFACE------------------------------------------------------

    const waterGeometry = new THREE.PlaneGeometry(1000, 1000);

    const water = new Water(
        waterGeometry, {
            textureWidth: 1024,
            textureHeight: 1024,
            waterNormals: new THREE.TextureLoader().load('/Assets/textures/waternormals.jpg', function (texture) {
                texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
            }),
            alpha: 1.0,
            sunDirection: directionalLight.position.clone().normalize(),
            sunColor: 0xffffff,
            waterColor: 0x001e0f,
            distortionScale: 3.7,
            fog: scene.fog !== undefined
        }
    );

    water.rotation.x = Math.PI / 2;
    water.position.y = 13;            //the level water surface appears
    scene.add(water);


//-------------------------------------------------------------

//--------RENDERER -----------------------------------------------------

    // Set up the WebGL renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    document.body.appendChild(renderer.domElement);

    const controls = new PointerLockControls(camera, renderer.domElement);
          document.addEventListener('click', function () {
          controls.lock();
    });
    
    
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Or use THREE.PCFShadowMap for softer edges
    renderer.gammaOutput = true;
    renderer.gammaFactor = 2.2;


//SEA FLOOR====================================================================

    // texture loader
    const seafloorTexture = new THREE.TextureLoader().load('/Assets/skybox/Underwater_Box_Bottom.jpg'); // Path to your image file

    const seafloorMaterial = new THREE.MeshPhongMaterial({ map: seafloorTexture });

    //plane geometry that will receive the material
    const planeGeometry = new THREE.PlaneGeometry(400, 400);         // same size as skybox
    const seafloor = new THREE.Mesh(planeGeometry, seafloorMaterial);

    
    seafloor.rotation.x = -Math.PI / 2;
    seafloor.position.y = -24;

    // ensure the plane can receive shadows
    seafloor.receiveShadow = true;
    scene.add(seafloor);


//SkyBox====================================================================

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

//BOUNDARY==FOR===ENTITYS=============================================================

    const boundarySize = 380; // boundary size

    function checkBoundary(entity) {
        if (entity.position.x > boundarySize / 2) entity.position.x = boundarySize / 2;
        if (entity.position.x < -boundarySize / 2) entity.position.x = -boundarySize / 2;
        if (entity.position.y > boundarySize / 2) entity.position.y = boundarySize / 2;
        if (entity.position.y < -boundarySize / 2) entity.position.y = -boundarySize / 2;
        if (entity.position.z > boundarySize / 2) entity.position.z = boundarySize / 2;
        if (entity.position.z < -boundarySize / 2) entity.position.z = -boundarySize / 2;
    }


    function updateEntities() {
        entityManager.entities.forEach(entity => {
            checkBoundary(entity);
        });
    }

//BOUNDARY==FOR===ENTITYS=============================================================

//FOG=============================================================================

    // Create exponential fog
    const fogDensity = 0.006;                               // density of the fog
    const fogColorExp = new THREE.Color(0x6495ED);          // color

    scene.fog = new THREE.FogExp2(fogColorExp, fogDensity); // add to scene

//FOG============================================================================

// SYNC EVERTHING======================

    let lastTime = performance.now();

    function sync(entity, renderComponent) {
        renderComponent.position.copy(entity.position);
        renderComponent.quaternion.copy(entity.rotation);

    }

//ANIMATION=LOOP================================================================

    function animation(time) {
                                                                                        //Update the YUKA entityManager with the time delta
        const now = performance.now();
        const deltaTime = (now - lastTime) / 1000;                                      // convert to seconds
        lastTime = now;

        updateEntities();

                                                                                         // Update YUKA's simulation
        entityManager.update(deltaTime);
        // Movement logic
        velocity.x -= velocity.x * 10.0 * deltaTime;
        velocity.z -= velocity.z * 10.0 * deltaTime;

        updateCameraPositionAndRotation(deltaTime);                                     //updates camera see control.js 

        
        const maxIntensity = 10;                                                        // maximum intensity lights
        const waterSurfaceY = 40; 
        const cameraHeightBelowSurface = waterSurfaceY - camera.position.y;
        const fadeDistance = 70;

                                                                                        // color factor based on camera's depth
        const colorFactor = Math.min(cameraHeightBelowSurface / fadeDistance, 5);       // clamped between 0 and 5

                                                                                        // adjust the color of ambient and directional lights
                                                                                        // natural color (less blue) at surface, darker blue at depth
        ambientLight.color = lerpColor(shallowColor, deepColor, colorFactor);
        directionalLight.color = lerpColor(shallowColor, deepColor, colorFactor);
        directionalLight2.color = lerpColor(shallowColor, deepColor, colorFactor);

        if (submarinePropeller) {
            submarinePropeller.rotation.y += 0.3; // This value controls the speed of rotation
        }

        scene.children.forEach(child => {
            if (child.userData && child.userData.frequency) {
                let data = child.userData;
                let verticalMovement = Math.sin(time * data.frequency + data.phase) * data.amplitude;
                child.position.y += verticalMovement; //bounce fish up and down
            }
        });


        renderer.render(scene, camera);

    }//ANIMATION LOOP============================================================================================

    renderer.setAnimationLoop(animation);

    animation();
