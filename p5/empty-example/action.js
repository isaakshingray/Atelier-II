var shouldIPlay = true;

function setup(){
	createCanvas(600, 600);
	ele = createAudio('sound.mp3');
	ele.autoplay(true);
	radio = createRadio();
	radio.option('off');
	radio.option('on');
}

function draw(){
}

function mousePressed(){
	rect(mouseX, mouseY, 100, 100);
	// createP('this is some text');
	ele.speed(mouseX/width);
	ele.volume(mouseY/height);

	if(radio.value() === 'on'){
		ele.loop();
		console.log("on");
	} else{
		ele.noLoop();
		console.log("off");
	}

	if(shouldIPlay){
		ele.play();
	} else{
		ele.pause();
	}
	shouldIPlay = !shouldIPlay;
}