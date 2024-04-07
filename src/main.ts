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

const canvas = document.querySelector<HTMLCanvasElement>('#canvas')!;
const context = canvas.getContext('2d')!;

if (!canvas) {
  throw new Error('Issue with selector');
}

if (canvas) {
  canvas.width = canvas.offsetWidth
  canvas.height = canvas.offsetHeight

} else {
  console.error('Canvas element not found');
  
}
  
  const heroImage = [
    'src/resources/character-sprites/mc-run(1).png',
    'src/resources/character-sprites/mc-run(2).png',
    'src/resources/character-sprites/mc-run(3).png',
  ]

 
  let hero: Character = {
    x: 0,
    y: 250,
    width: 100,
    height: 50,
    };



let currentFrameIndex = 0;

const heroImages = heroImage.map((img) => {
  let imageShowing = new Image();
  imageShowing.src = img;
  return imageShowing;
})

const animateHeroImage = () => {
  context.clearRect(0, 0, canvas.width, canvas.height);

  if (context){
      context.drawImage(heroImages[currentFrameIndex], hero.x, hero.y, hero.width, hero.height)
    }

      currentFrameIndex = (currentFrameIndex + 1) % heroImages.length;
      setTimeout(animateHeroImage, 100)
   
  }

  animateHeroImage();

 