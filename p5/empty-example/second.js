function setup(){
	createCanvas(600, 600);
}

function draw(){
	//background(frameCount%255);
	fill(mouseX, mouseY, 100);
	if(mouseIsPressed){
		//console.log("Francisco", mouseX, mouseY);
		translate(mouseX, mouseY); // changing 0, 0 reference point
		rotate(frameCount/5);
		text("Francisco", 0, 0);
		pop(); // restores previous state
		// push(); = start a new drawing state
	}
	else{
		text("Francisco", mouseX, mouseY);
	}
}