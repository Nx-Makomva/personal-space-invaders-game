import './resources/styles/styles.scss';
import { Character } from "./types";


/////////////////////////// QUERY SELECTOR /////////////////////////////////
const heroCharacter = document.querySelector<HTMLDivElement>("#hero");
const npcCharacter12 = document.querySelector<HTMLDivElement>(".npc-12");
const npcCollision = document.querySelector<HTMLDivElement>(".npc__collision-box");
const heroCollisionBox = document.querySelector<HTMLDivElement>(".hero__collision-box");
const scoreBox = document.querySelector<HTMLDivElement>(".score-counter");
const startScreen = document.querySelector<HTMLDivElement>(".game__start-screen");
const gameOverScreen = document.querySelector<HTMLDivElement>(".game__end-screen");
const gameOverScreenButton = document.querySelector<HTMLDivElement>(".game__end-screen-button");
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
  !gameOverScreenButton ||
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
const attackSound = new Audio('src/resources/audio/hits/6.ogg');
const collisionSound = new Audio('src/resources/audio/hits/ohmy.wav');
let attackLoopCount = 0;
let shouldClearTimeout = true;
let scoreCounterTimeout: number;
let heroRunTimeout: number;
let heroAttackTimeout: number;
let npcRunTimeout: number;
let isGameStarted = false;
let startTime: number;
let livesLeft = 3;
let score = 0;
let currentImageIndex = 0;
let isAttacking = false;
let isJumping = false;
let jumpHeight = 110;
let jumpSpeed = 15;
let jumpForwardDash = 5;
let gravity = 5;
let jumpReturnPosition = 0;
let npcMovementSpeed = 25;

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

const heroImagesAttack = [
  "src/resources/character-sprites/mc-attack00.png",
  "src/resources/character-sprites/mc-attack02.png",
  "src/resources/character-sprites/mc-attack03.png",
  "src/resources/character-sprites/mc-attack04.png",
  "src/resources/character-sprites/mc-attack05.png",
  "src/resources/character-sprites/mc-attack06.png",
  "src/resources/character-sprites/mc-attack07.png",
  "src/resources/character-sprites/mc-attack17.png",
  "src/resources/character-sprites/mc-attack18.png",
  "src/resources/character-sprites/mc-attack19.png",
  "src/resources/character-sprites/mc-attack20.png",
  "src/resources/character-sprites/mc-attack21.png",
]

/////////////////////////// CHARACTER OBJECTS //////////////////////////////

///// Move these objects to separate files /////
const hero: Character = {
  x: 0,
  y: 0,
  width: 90,
  height: 40,
};

const npc12: Character = {
  x: 550,
  y: 240,
  width: 20, 
  height: 40,
};

/////////////////////////// HERO ATTACK FUNCTIONS //////////////////////////////////
const playAttackSound = () => {
  attackSound.play();
};

const heroAttack = () => {
  if (isAttacking) {
    if (attackLoopCount < 1) {
      if (currentImageIndex < heroImagesAttack.length) {
        heroCharacter.style.width = `${hero.width + 100}px`;
        heroCharacter.style.height = `${hero.height + 100}px`;
        heroCharacter.style.top = `${hero.y}px`;
        heroCharacter.style.left = `${hero.x}px`; 
        gameBackground.style.height =  `280px`;
     
        heroCharacter.style.backgroundImage = `url('${heroImagesAttack[currentImageIndex]}')`;
        currentImageIndex++;
        
        heroAttackTimeout = setTimeout(heroAttack, 40);

        const heroRect = heroCollisionBox.getBoundingClientRect();
        const npcRect = npcCharacter12.getBoundingClientRect();
        if (
          heroRect.x < npcRect.x + npcRect.width &&
          heroRect.x + heroRect.width + 120 > npcRect.x &&
          heroRect.y < npcRect.y + npcRect.height &&
          heroRect.y + heroRect.height + 120 > npcRect.y
        ) {
          playAttackSound();
          score += 100;
          npcCharacter12.style.width = "40px";
          npcCharacter12.style.height = "40px";
          npcCharacter12.style.backgroundImage = `url('${npcCharacterSprites[7]}')`;

        }
      } else {
        attackLoopCount++;
        currentImageIndex = 0;
        heroAttack();
      }
    } else {
      isAttacking = false;
      shouldClearTimeout = false;
      attackLoopCount = 0;
      heroRun();
    }
  }
};
  
/////////////////////////// HERO RUN FUNCTIONS //////////////////////////////////
const heroRun = () => {
  isAttacking = false;
  shouldClearTimeout = true;
  clearTimeout(heroAttackTimeout);
  
  heroCharacter.style.width = `${hero.width}px`;
  heroCharacter.style.height = `${hero.height}px`;
  heroCharacter.style.backgroundImage = `url('${heroImagesRun[currentImageIndex]}')`;
  currentImageIndex = (currentImageIndex + 1) % heroImagesRun.length;
  heroCollisionBox.style.width = `${hero.width - 30}px`;
  heroCollisionBox.style.height = `${hero.height}px`;
  heroRunTimeout = setTimeout(heroRun, 1000 / heroFrameRate);
  // }
};

/////////////////////////// HERO ATTACK EVENT LISTENER //////////////////////////////////
document.addEventListener('keydown', (event) => {
  
  if (event.key === " " && !isAttacking && isGameStarted) {
    isAttacking = true;

    if (shouldClearTimeout) {
      clearTimeout(heroRunTimeout);
    }

    heroAttack();
  }    
});

/////////////////////////// NPC RUN FUNCTION //////////////////////////////////
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

    npcMovementSpeed = Math.floor(Math.random() * 10) + 55;
    let variation = Math.floor(Math.random() * 6) + 10;
    npcMovementSpeed += variation;
    console.log(npcMovementSpeed);
    
  }
 
  npc12.x -= npcMovementSpeed;
  npcCharacter12.style.left = `${npc12.x}px`;
  npcRunTimeout = setTimeout(npcRun, 1000 / npcFrameRate);
  checkCollision();
};


/////////////////////////// SCORE COUNT FUNCTION //////////////////////////////////
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
  startGame();
});

const startGame = () => {
  isGameStarted = true;
  startScreen.classList.remove("show-flex");
  if (gameBackground) {
    gameBackground.style.backgroundImage = `url('src/resources/environment/office(2).png')`;
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

}


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

const fall = () => {
  if (hero.y < 0) {
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
    isJumping = false;
  }
};

const heroJump = () => { 
  if (hero.y >= -jumpHeight) {
    hero.y -= jumpSpeed;
    hero.x -= jumpForwardDash;
    
    heroCharacter.style.top = `${hero.y}px`;
    heroCharacter.style.right = `${hero.x}px`;   
    setTimeout(heroJump, 1000 / 60);
  } else {
    fall();
  }
};

const jump = () => {
  if (!isJumping) {
    isJumping = true; 
    heroJump();
  }
};


document.addEventListener("keydown", (event: KeyboardEvent) => {
  if (event.key === "ArrowUp") {
    jump();
  }
});

/////////////////////////////// COLLISION CHECK ////////////////////////////////////
const playCollisionSound = () => {
  collisionSound.play();
};
const checkCollision = () => {
  const heroRect = heroCollisionBox.getBoundingClientRect();
  const npcRect = npcCharacter12.getBoundingClientRect();
  if (
    heroRect.x + 17 < npcRect.x + npcRect.width &&
    heroRect.x + 17 + heroRect.width - 17 > npcRect.x &&
    heroRect.y < npcRect.y + npcRect.height &&
    heroRect.y + heroRect.height > npcRect.y
  ) {
    playCollisionSound();
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
  clearTimeout(heroAttackTimeout);
  clearTimeout(scoreCounterTimeout);
  gameBackground.style.animation = "none";
  gameOverScreen.classList.remove('hide');
};

gameOverScreenButton.addEventListener('click', () => {
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
    endGame();
  }
};
