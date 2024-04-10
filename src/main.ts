import '/src/resources/styles/styles.scss';
import { Character } from './types';

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
const collisionBoxElement = document.querySelector<HTMLDivElement>('.npc__collision-box');

/////////////////////////// NULL EXCEPTIONS //////////////////////////////
if (!heroCharacter || !npcCharacter12 || !collisionBoxElement) {
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
let currentImageIndex = 0;
let isJumping = false;
let jumpHeight = 80; 
let jumpSpeed = 10; 
let jumpForwardDash = 4;
let gravity = 3; 
let jumpReturnPosition = 0;
let npcMovementSpeed = 5;

/////////////////////////// CHARACTER OBJECTS //////////////////////////////
const hero: Character = {
  x: 0, // X-coordinate of the character's position
  y: 0, // Y-coordinate of the character's position
  width: 90, // Width of the character's box container
  height: 50
}

const npc12: Character = {
  x: 300, // X-coordinate of the character's position
  y: 240, // Y-coordinate of the character's position
  width: 20, // Width of the character's box container
  height: 40,
  img: npcCharacterSprites[6],
}

const collisionBox = {
  x: npc12.x,
  y: npc12.y,
  width: npc12.width,
  height: npc12.height,
  border: {
    thickness: '1px',
    style: 'solid',
    color: 'red',
  }
}

collisionBoxElement.style.position = 'absolute';
collisionBoxElement.style.width = `${collisionBox.width}px`;
collisionBoxElement.style.height = `${collisionBox.height}px`; 
collisionBoxElement.style.border = `${collisionBox.border.thickness} ${collisionBox.border.style} ${collisionBox.border.color}`;


console.log(collisionBoxElement.style.border);


// console.log(collisionBoxElement);

const npcRun = () => {
  npcCharacter12.style.position = 'absolute';
  npcCharacter12.style.width = `${npc12.width}px`;
  npcCharacter12.style.height = `${npc12.height}px`;
  npcCharacter12.style.left = `${npc12.x}px`;
  npcCharacter12.style.top = `${npc12.y}px`;
  npcCharacter12.style.backgroundImage = `url('${npc12.img}')`;
}
npcRun();

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