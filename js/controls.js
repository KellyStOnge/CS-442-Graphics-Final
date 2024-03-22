import * as THREE from 'three';

const width = window.innerWidth, height = window.innerHeight;
export const camera = new THREE.PerspectiveCamera(85, width / height, 0.1, 400);
camera.position.set(0, 5, 10);  

// Controls state
let controlsState = {
    moveForward: false,
    moveBackward: false,
    moveLeft: false,
    moveRight: false,
    moveUp: false,
    moveDown: false,
    rotateLeft: false,
    rotateRight: false,
};

// Event listeners for keyboard controls
document.addEventListener('keydown', function (event) {
    switch (event.code) {
        case 'KeyW': controlsState.moveForward = true; break;
        case 'KeyA': controlsState.moveLeft = true; break;
        case 'KeyS': controlsState.moveBackward = true; break;
        case 'KeyD': controlsState.moveRight = true; break;
        case 'ArrowUp': controlsState.moveUp = true; break;
        case 'ArrowDown': controlsState.moveDown = true; break;
        case 'ArrowLeft': controlsState.rotateLeft = true; break;
        case 'ArrowRight': controlsState.rotateRight = true; break;
    }
});

document.addEventListener('keyup', function (event) {
    switch (event.code) {
        case 'KeyW': controlsState.moveForward = false; break;
        case 'KeyA': controlsState.moveLeft = false; break;
        case 'KeyS': controlsState.moveBackward = false; break;
        case 'KeyD': controlsState.moveRight = false; break;
        case 'ArrowUp': controlsState.moveUp = false; break;
        case 'ArrowDown': controlsState.moveDown = false; break;
        case 'ArrowLeft': controlsState.rotateLeft = false; break;
        case 'ArrowRight': controlsState.rotateRight = false; break;
    }
});

// Assuming you have a THREE.Vector3 to hold the direction of movement and a rotation speed
let moveDirection = new THREE.Vector3(0, 0, 0);
let rotationSpeed = 0.35; // Rotation speed

export function updateCameraPositionAndRotation(deltaTime) {
    // Camera direction vector for forward/backward movement
    let direction = new THREE.Vector3();
    camera.getWorldDirection(direction);
    
    // Movement speed adjustment
    let speed = 10.0;
    
    // Forward and backward movement
    if (controlsState.moveForward) camera.position.addScaledVector(direction, speed * deltaTime);
    if (controlsState.moveBackward) camera.position.addScaledVector(direction, -speed * deltaTime);
    
    // Left and right strafe movement
    let right = new THREE.Vector3();
    camera.getWorldDirection(right);
    right.cross(camera.up);
    if (controlsState.moveLeft) camera.position.addScaledVector(right, -speed * deltaTime);
    if (controlsState.moveRight) camera.position.addScaledVector(right, speed * deltaTime);
    
    // Up and down movement (consider Y-axis as global up direction)
    if (controlsState.moveUp) camera.position.y += speed * deltaTime;
    if (controlsState.moveDown) camera.position.y -= speed * deltaTime;

    // Camera rotation with left and right arrows
    let rotationAmount = 0.05; // Adjust rotation speed as needed
    if (controlsState.rotateLeft) camera.rotation.y += rotationAmount;
    if (controlsState.rotateRight) camera.rotation.y -= rotationAmount;
}




// Export controls state so it can be accessed by other modules
export { controlsState };
