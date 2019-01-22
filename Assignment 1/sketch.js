// Francisco Samayoa ~ Assignment 1: Mushroom Forest

// References mic input example & pointillism example
// https://p5js.org/examples/image-pointillism.html by Dan Shiffman
// https://p5js.org/examples/sound-mic-input.html
// https://p5js.org/examples/interaction-wavemaker.html

var mic;
let offset = 0.5;
let easing = 0.05;
var mushroom, mushroom2;
var smallPoint, largePoint;

var newX = 0; // mouseX > pubnub
var newX2 = 0; // mouseX > PubNub
var newY = 0; // mouseY > pubnub
var newY2 = 0; // mouseY > PubNub
var t = 0; // time variable

var opacity = 255;

var dataServer;
var pubKey = 'pub-c-570f662f-35f0-48b0-be48-9e2b76cb7ecf';
var subKey = 'sub-c-f73902d4-1e53-11e9-b4a6-026d6924b094';

var channelName = "messageChannel";

var value = 0;

function preload() {
  mushroom = loadImage("mushroom.jpg");
  //mushroom2 = loadImage("mushroom2.jpg")
  smallMushroom = loadImage("smallMushroom.png");
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  frameRate(30);
  // smallPoint = 4;
  // largePoint = 40;
  imageMode(CENTER);
  noStroke();
  background(255, 10);
  mushroom.loadPixels();
  smallMushroom.loadPixels();
  //mushroom.blend(mushroom2, 0, 0, window.innerWidth, window.innerHeight, 0, 0, window.innerWidth,
    //window.innerHeight, ADD);
  image(mushroom, width/2, height/2);
  //image(mushroom2, 0, 0);
  image(smallMushroom, width/2, height/2);

  //mic = new p5.AudioIn();
  // By default, it does not .connect() (to the computer speakers)
  //mic.start();

  // initialize pubnub
 dataServer = new PubNub(
 {
   publish_key   : pubKey,  //get these from the pubnub account online
   subscribe_key : subKey,
   ssl: true  //enables a secure connection. This option has to be used if using the OCAD webspace
 });

 //attach callbacks to the pubnub object to handle messages and connections
 dataServer.addListener({ message: readIncoming});
 dataServer.subscribe({channels: [channelName]});
}

function draw() {
  // background(112, 0, 102, 10);
  grass();
  // // Get the overall volume (between 0 and 1.0)
  // var vol = mic.getLevel();
  // var pointillize = map(vol, 0, 1, smallPoint, largePoint);
  // console.log(pointillize);
  //
  // var x = floor(random(mushroom.width));
  // var y = floor(random(mushroom.height));
  // var pix = mushroom.get(x, y);
  // fill(pix, 128);
  // ellipse(x, y, pointillize, pointillize);
  //
  stroke(255, opacity);
  opacity *= 0.99;
  translate(width/2, height);
  var angle = random(0, 6.14);
  branch(281, angle);
  // branch(500, angle);

  let dx = newX - mushroom.width / 2 - offset;
  offset += dx * easing;
  let dy = newY - mushroom.height /  - offset;
  offset += dy * easing;
  tint(255, 127); // Display at half opacity
  image(mushroom, offset, 0);
}

function branch(length, theta) {
  line(0, 0, 0, -length);
  translate(0, -length);

  var a = random(1.0);

  if(length > 2){
    push();
      rotate(theta);
      branch(0.618 * length, theta);
    pop();
    push();
      rotate(-theta);
      branch(0.618 * length, theta);
    pop();

  }
}

function keyReleased(){

  // Send Data to the server to draw it in all other canvases
  dataServer.publish(
    {
      channel: channelName,
      message:{

       x: mouseX,
       y: mouseY

           //get the value from the text box and send it as part of the message
      }
    });
}

function readIncoming(inMessage) //when new data comes in it triggers this function,
{                               // this works becsuse we subscribed to the channel in setup()

  // simple error check to match the incoming to the channelName
  if(inMessage.channel == channelName)
  {
    newX = inMessage.message.x;
    newX2 = inMessage.message.x2;
    newY = inMessage.message.y;
    newY2 = inMessage.message.y2;
    console.log(inMessage.message.x2, inMessage.message.y2);
  }
}

function grass(){
  fill(40, 200, 40);

  // make a x and y grid of ellipses
  for (let x = 0; x <= width; x = x + 30) {
    for (let y = 0; y <= 100; y = y + 30) {
      // starting point of each circle depends on mouse position
      let xAngle = map(mouseX, 0, width, -4 * PI, 4 * PI, true);
      let yAngle = map(mouseY, 0, height, -4 * PI, 4 * PI, true);
      // and also varies based on the particle's location
      let angle = xAngle * (x / width) + yAngle * (y / height);

      // each particle moves in a circle
      let myX = x + 20 * cos(2 * PI * t + angle);
      let myY = y + 20 * sin(2 * PI * t + angle);

      ellipse(myX, myY, 10); // draw particle
    }
  }
  t = t + 0.01; // update time
}
