// The midi notes of a scale
var notes = [ 60, 62, 64, 65, 67, 69, 71];

// For automatically playing the song
var index = 0;
var song = [
  { note: 4, duration: 400, display: "D" },
  { note: 0, duration: 200, display: "G" },
  { note: 1, duration: 200, display: "A" },
  { note: 2, duration: 200, display: "B" },
  { note: 3, duration: 200, display: "C" },
  { note: 4, duration: 400, display: "D" },
  { note: 0, duration: 400, display: "G" },
  { note: 0, duration: 400, display: "G" }
];
var trigger = 0;
var autoplay = false;
var osc;
console.log("hallo!")
function setup() {
    console.log("hallo!")
  createCanvas(720, 400);
  var div = createDiv("Click to fdplay notes or ")
  div.id("instructions");
  var button = createButton("play song automatically.");
  button.parent("instructions");
  // Trigger automatically playing
  button.mousePressed(function() {
    if (!autoplay) {
      index = 0;
      autoplay = true;
    }
  });

  // A triangle oscillator
  osc = new p5.TriOsc();
  // Start silent
  osc.start();
  osc.amp(0);
}

// A function to play a note
function playNote(note, duration) {
  osc.freq(midiToFreq(note));
  // Fade it in
  osc.fade(0.5,0.2);

  // If we sest a duration, fade it out
  if (duration) {
    setTimeout(function() {
      osc.fade(0,0.2);
    }, duration-50);
  }
}

function draw() {

  // If we are autoplaying and it's time for the next note
  if (autoplay && millis() > trigger){
    playNote(notes[song[index].note], song[index].duration);
    trigger = millis() + song[index].duration;
    // Move to the next note
    index ++;
  // We're at the end, stop autoplaying.
  } else if (index >= song.length) {
    autoplay = false;
  }


  // Draw a keyboard

  // The width for each key
  var w = width / notes.length;
  for (var i = 0; i < notes.length; i++) {
    console.log("example loop")
    var x = i * w;
    // If the mouse is over the key
    if (mouseX > x && mouseX < x + w && mouseY < height) {
      // If we're clicking
      if (mouseIsPressed) {
        fill(100,255,200);
      // Or just rolling over
      } else {
        fill(127);
      }
    } else {
      fill(244,200,66);
    }

    // Draw the key
    rect(x, 0, w-1, height-1);
  }

    var x1 = 20;
    var y1 = 20;
    var x2 = 20;
    var y2 = 100; 
    var lastOne = width - 20
    var distance = (lastOne-20)/4
    var spaceBeteenNotes = (distance + 20) / 5
    var notesAmount = 3

for(var i = 0; i <= 5; i++)
    {
console.log("moja petla!")
        stroke(0);
        fill(0);
        line(x1, y1, x2, y2);
        x1 = x1 + distance;
        x2 = x2 + distance;

    var rectWidth = spaceBeteenNotes - 10;
    fill(204, 101, 192, 127);
    stroke(204, 101, 192, 127);
    for (var y = 0; y <= notesAmount; y++) {
    if (mouseX > x && mouseX < rectWidth + w && mouseY < 60) {
 // If we're clicking
      if (mouseIsPressed) {
        fill(100,255,200);
      // Or just rolling over
      } else {
        fill(127);
      }
    }
    if (y == notesAmount) {
        rectWidth = spaceBeteenNotes + 10;
    }
    rect(x1 + spaceBeteenNotes - 7 + (spaceBeteenNotes * y), 60, rectWidth, 40); //x1, y1, x2, y2 
    stroke(0);
    fill(0);
    text("m1", x1 + spaceBeteenNotes + (spaceBeteenNotes * y), 95);}
}

}

// When we click
function mousePressed() {
  // Map mouse to the key index
  var key = floor(map(mouseX, 0, width, 0, notes.length));
  playNote(notes[key]);
}

// Fade it out when we release
function mouseReleased() {
  osc.fade(0,0.5);
}