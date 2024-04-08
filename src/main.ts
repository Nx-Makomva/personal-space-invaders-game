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

if (!heroCharacter){
  throw new Error('Issues with selector');
}

const handleSpacebarPress = (event: KeyboardEvent) => {
  if (event.key === ' ') {
    console.log(event);
  }
  
}

document.addEventListener('keypress', handleSpacebarPress);




  // NEXT STEPS:
 // add event listeners for character jumping - SPACEBAR key press
 // add colleagues to the scene and handle their movement
 // handle collision events with colleagues 
 // add score counter based on time spent survivng
 // add game over screen and handle restarting game
 // add start screen to initialise game only when player clicks start