// Notes: 
// 1. your code should be inside the drawSymbol() function (please do not use draw() function for sending commands)
// 2. use only these drawing p5 primitives atm: line, rect, circle

let line_color = [139, 194, 222];

// called just once (not in loop)
function drawSymbol() {
  
  // your code here


  
  CD.sendAllCommands();
}

// ================================================
// Please do not change functions below
// ================================================

let CD;

function setup() {
  CD = new CollabDraw(line_color);
  CD.connect(drawSymbol);   
} 

function draw() {
  background(0);
  image(CD.sg, 0, 0);

  if (isMouseDown && isMouseInsideCanvas()) {
    stroke(255);
    line(startX, startY, mouseX, mouseY);
  }
} 

let isMouseDown = false;
let startX, startY, endX, endY;

function mousePressed() {
  isMouseDown = true;
  startX = mouseX;
  startY = mouseY;
}

function mouseReleased() {
  isMouseDown = false;
  endX = mouseX;
  endY = mouseY;

  if (isMouseInsideCanvas()) {
    CD.line(startX, startY, endX, endY);
    CD.sendAllCommands();
  }
}

function isMouseInsideCanvas() {
  return mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height;
}