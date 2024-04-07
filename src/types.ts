
export type Environment = {
  width: number; // Width of the environment
  height: number; // Height of the environment
  backgroundColor: string; // Background color of the environment
  gravity: number; // Strength of gravity affecting objects in the environment
};  

export type Character = {
  x: number; // X-coordinate of the character's position
  y: number; // Y-coordinate of the character's position
  width: number; // Width of the character's box container
  height: number; // Height of the character's box container
}