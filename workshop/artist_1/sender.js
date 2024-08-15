let color = [204, 219, 56];
let DA = new DrawingApp(color);
let sliderControl;

function setup() {
  createCanvas(DA.width, DA.height);

  sliderControl = new SliderControl(2, 50, 14, 10, height + 10, '200px', DA);

  DA.connect(draw_all);

  //noLoop(); // need to loop for mouseDragged to work
}

function draw_all() {
  strokeWeight(2);
  background(0);
  let numberOfPlaceholders = sliderControl.getValue();
  DA.sendNumberOfPlaceholders(numberOfPlaceholders);
  
  stroke(DA.strokeColor);

  arrow(0);
  arrow(44);
  arrow(222);
  arrow(-150);

  // now send
  DA.send_all_commands();
}

function arrow(x) {

  let xx = DA.width / 2 + x;
  line(0, 0, xx, DA.height / 2);
  line(xx, DA.height / 2, 0, DA.height);
}

function mouseDragged() {
  //line(mouseX, mouseY, pmouseX, pmouseY);
}