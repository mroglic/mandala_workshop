// Notes: 
// 1. your code should be inside the drawSymbol() function (please do not use draw() function for sending commands)
// 2. use only these drawing p5 primitives atm: line, rect, circle

let line_color = [2, 168, 244];

// called just once (not in loop)
function drawSymbol() { 

  // Circle properties
  let circleX = 55;
  let circleY = height / 2;
  let circleDiameter = 365;
  let circleRadius = circleDiameter / 2;

  // Calculate tangent points (approximately equilateral triangle)
  let angle = TWO_PI / 3;
  let tangentPoints = [];
  for (let i = 0; i < 3; i++) {
    let x = circleX + circleRadius * cos(angle * i);
    let y = circleY + circleRadius * sin(angle * i);
    tangentPoints.push(createVector(x, y));
  } 
  
  CD.circle(circleX, circleY, circleDiameter);

  // Draw the triangle using lines
  for (let i = 0; i < tangentPoints.length; i++) {
    let nextIndex = (i + 1) % tangentPoints.length;
    let shift = 185;
    // skip the middle line
    if (i != 1) {
      CD.line(tangentPoints[i].x + shift, tangentPoints[i].y, tangentPoints[nextIndex].x + shift, tangentPoints[nextIndex].y);
    }
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