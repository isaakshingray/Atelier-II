var myX = 0;
var myY = 0;

function setup(){
	createCanvas(600, 600);
}

function draw(){
	if (myX - mouseX > 100 || mouseX - myX > 100){
		if(myY - mouseY > 100 || mouseY - myY > 100){
			text("Francisco", mouseX, mouseY);
			myX = mouseX;
			myY = mouseY;
		}	
	}
}