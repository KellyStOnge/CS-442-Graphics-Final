# CS-442-Graphics-Final
CS 442 is the computer graphics course at WSU Vancouver. It Focuses on learning the frameworks of computer graphics using javascript and Open GL 


# 3D Underwater Scene Project

## Overview
This project presents a complex, interactive 3D underwater scene using Three.js, a JavaScript library that uses WebGL and YUKA Ai Vehicles. The scene features a detailed underwater environment with dynamic lighting, textures, and animations, providing a rich and immersive experience.

## Demo
- Click me to see a full demo via Youtube

[![Final Demo](https://i.ytimg.com/vi/waSicRvg03U/hqdefault.jpg)](https://youtu.be/waSicRvg03U?si=KReRRs2hrlTTWjlj "CS 442 Computer Graphics Final Project ")



### Key Features
- **Parent-Child Relationships**: Objects like a Yellow Submarine with moving propeller and Ai vehicle control, a sunken pirate ship with attached algae and fish swimming in schools demonstrate the parent-child relationship. The movement of the parent object affects the child objects while maintaining their independence.
- **Dynamic Lighting**: The scene includes dynamic lights that simulate underwater lighting conditions using Phong and Goureaud lighting models.
- **Multiple Textures**: Various textures are used to create a realistic underwater environment. These include textures for fish, seaweed, rocks, and the seabed.
- **Moving Camera**: The camera can be controlled using the keyboard, allowing users to explore the underwater scene from different perspectives.
- **Additional Features**:
    - **Particle Effects**: Implemented to simulate elements like floating particles in the water.
    - **Shadows**: Realistic shadows enhance the depth and realism of the scene.
    - **Sky-box**: A cubemap is used to create a surrounding sky-box, giving the impression of a vast underwater environment.
    - **Reflective Surface**: A surface that mirrors the scene below for more realistic underwater experience.

## Setup and Running the Project
To set up and run this project, follow these steps:

1. **Clone the Repository**

2. **Install Dependencies**
Navigate to the project directory and install the necessary dependencies:

3. **Run the Project**
Download and move into the directory, from there you will need to start the project using a local server. You can use any HTTP server; here's an example using `http-server`:
Once the server starts, open your browser and go to `http://127.0.0.1:8080\index.html` (or the port provided in your terminal). 

## Controls
- **W, A, S, D**: Move forward, left, backward, right
- **Arrow Keys**: Rotate the camera left, right, ascend and descend
- **Click**: Look around statically

## Technologies Used
- Three.js
- JavaScript
- WebGL
- Yuka Ai Vehicle

## Credits
- Textures: https://free3d.com/3d-models/obj
- Models: https://free3d.com/3d-models/obj
- Three.js Documentation: [https://threejs.org/docs/](https://threejs.org/docs/)
- YUKA Ai https://mugen87.github.io/yuka/docs/Vehicle.html

## License
This project is open source and available under the [MIT License](LICENSE).

## Contributing
Contributions to this project are welcome. Please fork the repository and submit a pull request.

---

This README provides a general overview of the project. For more detailed documentation, please refer to the code comments or additional documentation files in the repository.
