import '/src/resources/styles/styles.scss';
import { Character, CollisionBox } from './types';

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

/////////////////////////// QUERY SELECTOR /////////////////////////////////
const heroCharacter = document.querySelector<HTMLDivElement>('#hero');
const npcCharacter12 = document.querySelector<HTMLDivElement>('.npc-12');
const npcCollision = document.querySelector<HTMLDivElement>('.npc__collision-box');

/////////////////////////// NULL EXCEPTIONS //////////////////////////////
if (!heroCharacter || !npcCharacter12 || !npcCollision) {
  throw new Error('Issues with selector');
}

/////////////////////////// VARIABLES //////////////////////////////////
const npcCharacterSprites = [
  'src/resources/character-sprites/npc-0.png',
  'src/resources/character-sprites/npc-2.png',
  'src/resources/character-sprites/npc-4.png',
  'src/resources/character-sprites/npc-6.png',
  'src/resources/character-sprites/npc-8.png',
  'src/resources/character-sprites/npc-10.png',
  'src/resources/character-sprites/npc-12.png',
]

const heroImagesRun = [
  'src/resources/character-sprites/mc-run(1).png',
  'src/resources/character-sprites/mc-run(2).png',
  'src/resources/character-sprites/mc-run(3).png',
]

const runFrameRate = 10;
const npcFrameRate = 8;
let currentImageIndex = 0;
let isJumping = false;
let jumpHeight = 80; 
let jumpSpeed = 10; 
let jumpForwardDash = 4;
let gravity = 2.5; 
let jumpReturnPosition = 0;
let npcMovementSpeed = 13;

/////////////////////////// CHARACTER OBJECTS //////////////////////////////

///// Move these objects to separate files /////
const hero: Character = {
  x: 0, // X-coordinate of the character's position
  y: 0, // Y-coordinate of the character's position
  width: 90, // Width of the character's box container
  height: 50
}

const npc12: Character = {
  x: 200, // X-coordinate of the character's position
  y: 240, // Y-coordinate of the character's position
  width: 20, // Width of the character's box container
  height: 40,
  img: npcCharacterSprites[6],
}

const heroCollision: CollisionBox = {
  // create a collision box for the hero so npc character 
  // has a reference to crash into something


}

/////////////////////////// START GAME //////////////////////////////////
// const handleStartGame = (event: MouseEvent) => {
//   animateHero();
// }

// beginGameButton.addEventListener('click', handleStartGame);


/////////////////////////// HERO ANIMATION //////////////////////////////////

const animateHero = () => {
  heroCharacter.style.width = `${hero.width}px`;
  heroCharacter.style.height = `${hero.height}px`;
  heroCharacter.style.backgroundImage = `url('${heroImagesRun[currentImageIndex]}')`;
  currentImageIndex = (currentImageIndex + 1) % heroImagesRun.length;
    setTimeout(animateHero, 1000 / runFrameRate);
}

animateHero();

// on button press 
// if statements // on button click switch array // have it all in one function and switch between using default value

/////////////////////////// HERO JUMP HANDLER AND EVENT LISTENER //////////////////////////////////

const handleArrowUp = (event: KeyboardEvent) => {
  
  if (event.key === 'ArrowUp'&& !isJumping) {
    isJumping = true;
    jump();
  }
}
    
document.addEventListener('keydown', handleArrowUp);


const fall = () => {
  if (hero.y < 0) { // Check if the hero is above the ground level
    hero.y += gravity;
    hero.x += jumpReturnPosition;
    heroCharacter.style.top = `${hero.y}px`;
    heroCharacter.style.right = `${hero.x}px`;
    setTimeout(fall, 1000 / 60); 
  } else {
    hero.y = 0; 
    hero.x = 0;
    heroCharacter.style.top = `${hero.y}px`;
    heroCharacter.style.right = `${hero.x}px`;
    isJumping = false; // Set isJumping to false when the hero reaches the ground
  }
}

const jump = () => {
  if (hero.y >= -jumpHeight) {
    hero.y -= jumpSpeed;
    hero.x -= jumpForwardDash;
    heroCharacter.style.top = `${hero.y}px`;
    heroCharacter.style.right = `${hero.x}px`;
    setTimeout(jump, 1000 / 60);
  } else {
    fall();
  }
}

npcCharacter12.style.position = 'absolute';
npcCharacter12.style.width = `${npc12.width}px`;
npcCharacter12.style.height = `${npc12.height}px`;
npcCharacter12.style.left = `${npc12.x}px`;
npcCharacter12.style.top = `${npc12.y}px`;
npcCharacter12.style.backgroundImage = `url('${npc12.img}')`;
// console.log(collisionBoxElement);

const npcRun = () => {

  npc12.x -= npcMovementSpeed;
  npcCharacter12.style.left = `${npc12.x}px`;
    setTimeout(npcRun, 1000 / npcFrameRate);

  // if (`${npc12.x}px` <= `${heroCharacter.style.right}px`){
  //   npcCharacter12.style.display = 'none';
  // }
console.log(`${npc12.x}px`);
console.log(`${heroCharacter.style.right}px`);
console.log(`${hero.x}`);



  // Some conditionals in here to switch out the picture of what npc is being used.
  // The change should occur when collision box hits far left of the game container
  // How to stagger npc entries? e.g. have it randomly allocate how many show up on screen at the same time
  // but with at least 250px distance between them.

// console.log(npc12.x);
// console.log(npcCharacter12.style.left);

}
// npcRun(); 










// have wider container running whole length of bottom screen
// to allow other divs to move across it 
// find way to have the divs x axis to contantly move and if it's 
// style.left position is equal to the hero's style.right then that's a collision


  // NEXT STEPS:
 // handle collision events with colleagues - use divs and identify collisions 
 // with x & y positions. Create collision box objects that are equal to the dimensions of characters or less
 // add score counter based on time spent survivng
 // add game over screen and handle restarting game
 // add start screen to initialise game only when player clicks start - use classList add & remove to switch between displays being shown or hidden