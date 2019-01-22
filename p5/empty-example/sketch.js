function setup() {
  // put setup code here
  createCanvas(500, 500);
}

function draw() {
  // put drawing code here
  background(0, 10);
  fill(mouseX, mouseY, 80);

    if(mousePressed){
    	for(var i = 0; i < 10; i++){
  			ellipse(mouseX+random(30), mouseY+random(30), 30, 30);
  		}
    }
}