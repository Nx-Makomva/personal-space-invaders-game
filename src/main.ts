import "./src/resources/styles/styles.scss";
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
const startScreen = document.querySelector<HTMLDivElement>(".game__start-screen");
const gameOverScreen = document.querySelector<HTMLDivElement>(".game__end-screen");
const startButton = document.querySelector<HTMLDivElement>(".game__start-button");
const instructionsButton = document.querySelector<HTMLDivElement>(".game__instructions-button");
const instructionsScreen = document.querySelector<HTMLDivElement>(".game__instructions");
const gameBackground = document.querySelector<HTMLDivElement>(".game__background");
const lifeOne = document.querySelector<HTMLDivElement>(".one");
const lifeTwo = document.querySelector<HTMLDivElement>(".two");
const lifeThree = document.querySelector<HTMLDivElement>(".three");

/////////////////////////// NULL EXCEPTIONS //////////////////////////////
if (
  !heroCharacter ||
  !npcCharacter12 ||
  !npcCollision ||
  !heroCollisionBox ||
  !scoreBox ||
  !startScreen ||
  !gameOverScreen ||
  !startButton ||
  !gameBackground ||
  !instructionsButton ||
  !instructionsScreen ||
  !lifeOne ||
  !lifeTwo ||
  !lifeThree
) {
  throw new Error("Issues with selector");
}

/////////////////////////// VARIABLES //////////////////////////////////

const heroFrameRate = 10;
const npcFrameRate = 8;
let scoreCounterTimeout: number;
let heroRunTimeout: number;
let npcRunTimeout: number;
let startTime: number;
let livesLeft = 3;
let score = 0;
let currentImageIndex = 0;
let isJumping = false;
let jumpHeight = 100;
let jumpSpeed = 15;
let jumpForwardDash = 4;
let gravity = 5;
let jumpReturnPosition = 0;
let npcMovementSpeed = 25;

/////////////////////////// CHARACTER IMAGES //////////////////////////////
const npcCharacterSprites = [
  "./src/resources/character-sprites/npc-0.png",
  "./src/resources/character-sprites/npc-2.png",
  "./src/resources/character-sprites/npc-4.png",
  "./src/resources/character-sprites/npc-6.png",
  "./src/resources/character-sprites/npc-8.png",
  "./src/resources/character-sprites/npc-10.png",
  "./src/resources/character-sprites/npc-12.png",
  "./src/resources/images/WHAM.png",
];

const heroImagesRun = [
  "./src/resources/character-sprites/mc-run(1).png",
  "./src/resources/character-sprites/mc-run(2).png",
  "./src/resources/character-sprites/mc-run(3).png",
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
  x: 550, // X-coordinate of the character's position
  y: 240, // Y-coordinate of the character's position
  width: 20, // Width of the character's box container
  height: 40,
};

// track current location of hero on screen
//event listener on window for key
// animate hero has event passed as callback function
const heroRun = () => {
  // if event then run this else run the rest
  heroCharacter.style.width = `${hero.width}px`;
  heroCharacter.style.height = `${hero.height}px`;
  heroCharacter.style.backgroundImage = `url('${heroImagesRun[currentImageIndex]}')`;
  currentImageIndex = (currentImageIndex + 1) % heroImagesRun.length;
  heroCollisionBox.style.width = `${hero.width - 30}px`;
  heroCollisionBox.style.height = `${hero.height}px`;
  heroRunTimeout = setTimeout(heroRun, 1000 / heroFrameRate);
};

const scoreTotal = () => {
  scoreBox.innerText = `Score: ${score.toLocaleString()}`;

  if (!startTime) {
    startTime = performance.now();
  }

  const survivalTime = performance.now();
  const elapsedTime = Math.floor((survivalTime - startTime) / 1000);

  score += elapsedTime;

  scoreBox.innerText = `Score: ${score.toLocaleString()}`;
  scoreCounterTimeout = setTimeout(scoreTotal, 100);
};

startScreen.classList.add("hide");
gameBackground.style.backgroundImage = "none";
gameOverScreen.classList.add('hide');

instructionsButton.addEventListener("click", () => {
  instructionsScreen.classList.add("hide");
  startScreen.classList.add("show-flex");
});

/////////////////////////// START GAME //////////////////////////////////

startButton.addEventListener("click", () => {
  startScreen.classList.remove("show-flex");
  if (gameBackground) {
    gameBackground.style.backgroundImage = `url('./src/resources/environment/office(2).png')`;
    gameBackground.style.animation = "sceneMovement 9s linear infinite";
  }

  scoreBox.classList.add("show");
  const randomImageIndex = Math.floor(
    Math.random() * (npcCharacterSprites.length - 1)
  );
  npcCharacter12.style.backgroundImage = `url('${npcCharacterSprites[randomImageIndex]}')`;

  scoreTotal();
  heroRun();
  npcRun();
  // setTimeout(npcRun, 2000);
});

// on button press
// if statements // on button click switch array // have it all in one function and switch between using default value


/////////////////////////// RESTART GAME //////////////////////////////////
const restartGame = () => {
  startTime = 0;
  livesLeft = 3;
  score = 0;
  currentImageIndex = 0;
  isJumping = false;

  lifeOne.classList.remove("game__life-remove");
  lifeTwo.classList.remove("game__life-remove");
  lifeThree.classList.remove("game__life-remove");

  gameBackground.style.animation = "sceneMovement 9s linear infinite";

  // startButton.disabled = false
  scoreTotal();
  heroRun();
  npcRun();

}

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

/////////////////////////////// COLLISION CHECK ////////////////////////////////////

const checkCollision = () => {
  const heroRect = heroCollisionBox.getBoundingClientRect();
  const npcRect = npcCharacter12.getBoundingClientRect();
  if (
    heroRect.x + 17 < npcRect.x + npcRect.width &&
    heroRect.x + 17 + heroRect.width - 17 > npcRect.x &&
    heroRect.y < npcRect.y + npcRect.height &&
    heroRect.y + heroRect.height > npcRect.y
  ) {
    removeGameLife();
    score -= 100;
    gravity = 50;
    jumpForwardDash = 0;
    heroCharacter.style.width = "40px";
    heroCharacter.style.height = "40px";
    heroCharacter.style.backgroundImage = `url('${npcCharacterSprites[7]}')`;
    npcCharacter12.style.width = "40px";
    npcCharacter12.style.height = "40px";
    npcCharacter12.style.backgroundImage = `url('${npcCharacterSprites[7]}')`;

    setTimeout(() => {
      npcCharacter12.style.display = "none";
      gravity = 5;
      jumpForwardDash = 4;

      if (livesLeft > 0) {
        npcRunTimeout = setTimeout(npcRun, 1000);
      }
    }, 500);

    clearTimeout(npcRunTimeout);
  }
};

const endGame = () => {
  clearTimeout(npcRunTimeout);
  clearTimeout(heroRunTimeout);
  clearTimeout(scoreCounterTimeout);
  gameBackground.style.animation = "none";
  gameOverScreen.classList.remove('hide');
};

gameOverScreen.addEventListener('click', () => {
  gameOverScreen.classList.add('hide');
  restartGame();
})

const removeGameLife = () => {
  livesLeft -= 1;

  if (livesLeft === 2) {
    lifeOne.classList.add("game__life-remove");
  } else if (livesLeft === 1) {
    lifeTwo.classList.add("game__life-remove");
  } else if (livesLeft === 0) {
    lifeThree.classList.add("game__life-remove");
    console.log("last life is gone");
    endGame();
  }
};

const npcRun = () => {
  const npcBounds = npcCharacter12.getBoundingClientRect();
  npcCharacter12.style.position = "absolute";
  npcCharacter12.style.width = `${npc12.width}px`;
  npcCharacter12.style.height = `${npc12.height}px`;
  npcCharacter12.style.left = `${npc12.x}px`;
  npcCharacter12.style.top = `${npc12.y}px`;

  if (npcBounds.x <= 0) {
    const randomImageIndex = Math.floor(
      Math.random() * (npcCharacterSprites.length - 1)
    );
    npcCharacter12.style.backgroundImage = `url('${npcCharacterSprites[randomImageIndex]}')`;

    npcCharacter12.style.display = "block";
    npc12.x = window.innerWidth;
  }

  npc12.x -= npcMovementSpeed;
  npcCharacter12.style.left = `${npc12.x}px`;
  npcRunTimeout = setTimeout(npcRun, 1000 / npcFrameRate);
  checkCollision();
};

// How to stagger npc entries? e.g. have it randomly allocate how many show up on screen at the same time
// but with at least 250px distance between them.

// NEXT STEPS:
// add score counter based on time spent survivng
// add game over screen and handle restarting game
// add start screen to initialise game only when player clicks start - use classList add & remove to switch between displays being shown or hidden
// Add difficulty for npc speed increasing and number of npc increasing the longer player survives
