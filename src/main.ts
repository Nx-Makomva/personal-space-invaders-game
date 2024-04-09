import './resources/styles/styles.css'
import { Character } from './types'
// import confetti from 'canvas-confetti';
 
/*
  Define canvas dimensions
  Create a canvas object that holds:
  height, width, 
  background colour
  scene
  static objects 

  Objects
    - Canvas
    - Hero
      - Functions inside this object for 
          1. running, jumping, attacking and dying 
    - Colleagues
      - Functions:
        1. movement e.g. speed, death
    - Scene
      - 
*/

const heroCharacter = document.querySelector<HTMLDivElement>('#hero');

const hero: Character = {
  x: 30, // X-coordinate of the character's position
  y: -100, // Y-coordinate of the character's position
  width: 750, // Width of the character's box container
  height: 50
}

if (!heroCharacter){
  throw new Error('Issues with selector');
}

// const handleStartGame = (event: MouseEvent) => {
//   animateHero();
// }

// beginGameButton.addEventListener('clcik', handleStartGame);


const heroImagesRun = [
  'src/resources/character-sprites/mc-run(1).png',
  'src/resources/character-sprites/mc-run(2).png',
  'src/resources/character-sprites/mc-run(3).png',

]


const runFrameRate = 8;
let currentImageIndex = 0;
let isJumping = false;
let jumpHeight = 100; // Adjust as needed
let jumpSpeed = 15; // Adjust as needed
let gravity = 5; // Adjust as needed

const animateHero = () => {
  heroCharacter.style.width = `${hero.width}px`;
  heroCharacter.style.height = `${hero.height}px`;
  heroCharacter.style.backgroundImage = `url('${heroImagesRun[currentImageIndex]}')`;
  currentImageIndex = (currentImageIndex + 1) % heroImagesRun.length;
    setTimeout(animateHero, 1000 / runFrameRate);
}


animateHero();


const handleSpacebarPress = (event: KeyboardEvent) => {
  if (event.key === ' ' && !isJumping) {
    isJumping = true;
    jump();
  }
}
    
document.addEventListener('keydown', handleSpacebarPress);


const fall = () => {
  if (hero.y < 0) { // Check if the character is above the ground level
    hero.y += gravity; // Increase the y-position of the character to simulate gravity
    heroCharacter.style.top = `${hero.y}px`;
    setTimeout(fall, 1000 / 60); // Recursively call fall function for smooth animation
  } else {
    hero.y = 0; // Ensure the character doesn't go below the ground level
    heroCharacter.style.top = `${hero.y}px`;
    isJumping = false; // Set isJumping to false when the character reaches the ground
  }
}

const jump = () => {
  if (hero.y >= -jumpHeight) {
    hero.y -= jumpSpeed;
    heroCharacter.style.top = `${hero.y}px`;
    setTimeout(jump, 1000 / 60);
  } else {
    fall();
  }
}


  // NEXT STEPS:
 // add event listeners for character jumping - SPACEBAR key press
 // add colleagues to the scene and handle their movement
 // handle collision events with colleagues 
 // add score counter based on time spent survivng
 // add game over screen and handle restarting game
 // add start screen to initialise game only when player clicks start