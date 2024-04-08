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
  x: -30, // X-coordinate of the character's position
  y: -100, // Y-coordinate of the character's position
  width: 750, // Width of the character's box container
  height: 150
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
  'src/resources/character-sprites/mc-run(4).png',
  'src/resources/character-sprites/mc-run(5).png',
  'src/resources/character-sprites/mc-run(6).png',
  'src/resources/character-sprites/mc-run(7).png',
]



let currentImageIndex = 0;
const runFrameRate = 9;


const animateRun = () => {
  heroCharacter.style.width = '950px';
  heroCharacter.style.height = '50px';
  heroCharacter.style.backgroundImage = `url('${heroImagesRun[currentImageIndex]}')`;
  currentImageIndex = (currentImageIndex + 1) % heroImagesRun.length;
    setTimeout(animateRun, 1000 / runFrameRate);

}







  // NEXT STEPS:
 // add event listeners for character jumping - SPACEBAR key press
 // add colleagues to the scene and handle their movement
 // handle collision events with colleagues 
 // add score counter based on time spent survivng
 // add game over screen and handle restarting game
 // add start screen to initialise game only when player clicks start