// Notes: 
// 1. your code should be inside the drawSymbol() function (please do not use draw() function for sending commands)
// 2. use only these drawing p5 primitives atm: line, rect, circle

let line_color = [233, 29, 98];

// called just once (not in loop)
function drawSymbol() {

  CD.sg.rectMode(CORNER);
  let h = 200;
  CD.rect(44, CD.height / 2 - h / 2, 355, h);
  let x = 0;
  let y = CD.height / 2 - h / 2;
  let w = 355 / 3;
  for (let i = 0; i < 3; i++) {
    x = i * w;
    CD.line(x + 80, y, x + 140, y + h);
  }
  // rect(420, CD.height / 2, 111, 444);
  // rect(530, CD.height / 2, 100, 100);

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