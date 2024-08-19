// Notes: 
// 1. your code should be inside the drawSymbol() function (please do not use draw() function for sending commands)
// 2. use only these drawing p5 primitives atm: line, rect, circle

let line_color = [139, 194, 74];

// called just once (not in loop)
function drawSymbol() {
  let num_of_lines = 9;
  let deltaH = height / (num_of_lines - 1);
  let x = 0;
  let y = 0;
  let length = 10;
  for (let i = 0; i < num_of_lines; i++) {
    y = i * deltaH;
    let d = abs(height / 2 - y);
    length = map(d, 0, width / 2, width, 10);
    CD.line(x, y, x + length, y);
  }

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