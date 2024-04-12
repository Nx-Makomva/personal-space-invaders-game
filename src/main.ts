import "/src/resources/styles/styles.scss";
import { Character } from "./types";

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
const heroCharacter = document.querySelector<HTMLDivElement>("#hero");
const npcCharacter12 = document.querySelector<HTMLDivElement>(".npc-12");
const npcCollision = document.querySelector<HTMLDivElement>(".npc__collision-box");
const heroCollisionBox = document.querySelector<HTMLDivElement>(".hero__collision-box");
const scoreBox = document.querySelector<HTMLDivElement>(".score-counter");

/////////////////////////// NULL EXCEPTIONS //////////////////////////////
if (!heroCharacter || !npcCharacter12 || !npcCollision || !heroCollisionBox || !scoreBox) {
  throw new Error("Issues with selector");
}

/////////////////////////// VARIABLES //////////////////////////////////

const heroFrameRate = 10;
const npcFrameRate = 8;
let score = 2000000;
let currentImageIndex = 0;
let isJumping = false;
let jumpHeight = 100;
let jumpSpeed = 10;
let jumpForwardDash = 4;
let gravity = 2.5;
let jumpReturnPosition = 0;
let npcMovementSpeed = 11;

/////////////////////////// CHARACTER IMAGES //////////////////////////////
const npcCharacterSprites = [
  "src/resources/character-sprites/npc-0.png",
  "src/resources/character-sprites/npc-2.png",
  "src/resources/character-sprites/npc-4.png",
  "src/resources/character-sprites/npc-6.png",
  "src/resources/character-sprites/npc-8.png",
  "src/resources/character-sprites/npc-10.png",
  "src/resources/character-sprites/npc-12.png",
  "src/resources/images/WHAM.png",
];

const heroImagesRun = [
  "src/resources/character-sprites/mc-run(1).png",
  "src/resources/character-sprites/mc-run(2).png",
  "src/resources/character-sprites/mc-run(3).png",
];

/////////////////////////// CHARACTER OBJECTS //////////////////////////////

///// Move these objects to separate files /////
const hero: Character = {
  x: 0, // X-coordinate of the character's position
  y: 0, // Y-coordinate of the character's position
  width: 90, // Width of the character's box container
  height: 40,
};

const npc12: Character = {
  x: 200, // X-coordinate of the character's position
  y: 240, // Y-coordinate of the character's position
  width: 20, // Width of the character's box container
  height: 40,
};

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
  heroCollisionBox.style.width = `${hero.width - 30}px`;
  heroCollisionBox.style.height = `${hero.height}px`;
  setTimeout(animateHero, 1000 / heroFrameRate);
};

animateHero();

// on button press
// if statements // on button click switch array // have it all in one function and switch between using default value

/////////////////////////// HERO JUMP AND FALL FUNCTIONS //////////////////////////////////

document.addEventListener("keydown", (event: KeyboardEvent) => {
  if (event.key === "ArrowUp" && !isJumping) {
    isJumping = true;
    jump();
  }
});

const fall = () => {
  if (hero.y < 0) {
    // Check if the hero is above the ground level
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
};

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
};

/////////////////////////////// SCORE COUNTER ////////////////////////////////////////
const scoreTotal = () => {
  scoreBox.innerText = `Score: ${score.toLocaleString()}`;

};

scoreTotal(); // find way to put commas 
/////////////////////////////// COLLISION CHECK ////////////////////////////////////

const checkCollision = () => {
  const heroRect = heroCollisionBox.getBoundingClientRect();
  const npcRect = npcCharacter12.getBoundingClientRect();
  if (
    heroRect.x + 26 < npcRect.x + npcRect.width &&
    heroRect.x + 26 + heroRect.width - 26 > npcRect.x &&
    heroRect.y < npcRect.y + npcRect.height &&
    heroRect.y + heroRect.height > npcRect.y
  ) {
    gravity = 50;
    jumpForwardDash = 0;
    heroCharacter.style.width = "70px";
    heroCharacter.style.height = "70px";
    heroCharacter.style.backgroundImage = `url('${npcCharacterSprites[7]}')`;
    npcCharacter12.style.width = "50px";
    npcCharacter12.style.height = "50px";
    npcCharacter12.style.backgroundImage = `url('${npcCharacterSprites[7]}')`;

    setTimeout(() => {
      // isCollision = true;
      npcCharacter12.style.display = "none";
      gravity = 2.5;
      jumpForwardDash = 4;
    }, 500);
  }
};

const npcRun = () => {
  console.log(npcCharacter12.style.backgroundImage);
  const npcBounds = npcCharacter12.getBoundingClientRect();

  if (npcBounds.x <= 0) {
    npcCharacter12.style.display = "block";
    npcCharacter12.style.backgroundImage = `url('${npcCharacterSprites[1]}')`;
    // url image only changes for 2 seconds before switching back to 6.
    // Loop through images after each boundary cross? loop through randomly?
    console.log(npcCharacter12.style.backgroundImage);

    npc12.x = window.innerWidth; // change this to be equal to the game container's width. too much spillover
    console.log(npc12.x);
  }

  npcCharacter12.style.position = "absolute";
  npcCharacter12.style.width = `${npc12.width}px`;
  npcCharacter12.style.height = `${npc12.height}px`;
  npcCharacter12.style.left = `${npc12.x}px`;
  npcCharacter12.style.top = `${npc12.y}px`;
  npcCharacter12.style.backgroundImage = `url('${npcCharacterSprites[6]}')`;

  npc12.x -= npcMovementSpeed;
  npcCharacter12.style.left = `${npc12.x}px`;
  checkCollision();
  setTimeout(npcRun, 1000 / npcFrameRate);
};

npcRun();

// How to stagger npc entries? e.g. have it randomly allocate how many show up on screen at the same time
// but with at least 250px distance between them.

// NEXT STEPS:
// add score counter based on time spent survivng
// add game over screen and handle restarting game
// add start screen to initialise game only when player clicks start - use classList add & remove to switch between displays being shown or hidden
// Add difficulty for npc speed increasing and number of npc increasing the longer player survives
