var notes = [60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72];

var minorThird = [
  { note: 0, duration: 200, display: "C" },
  { note: 3, duration: 400, display: "D#" },
];

var majorThird = [
  { note: 0, duration: 200, display: "C" },
  { note: 4, duration: 400, display: "E" },
];

var perfectFourth = [
  { note: 0, duration: 200, display: "C" },
  { note: 5, duration: 400, display: "F" },
];

var trigger = 0;
var autoplay = true;
var osc;

function setup() {
  var myCanvas = createCanvas(640, 480);
  myCanvas.parent('ilP2-color');
  background(220, 180, 200);

    // A triangle oscillator
    osc = new p5.TriOsc();
    // Start silent
    osc.start();
    osc.amp(0);
}

function draw() {
  if (mouseIsPressed) {
    fill(0);
  } else {
    fill(255);
  }
  ellipse(mouseX, mouseY, 80, 80);

  if (autoplay && millis() > trigger){
    playNote(notes[song[index].note], song[index].duration);
    trigger = millis() + song[index].duration;
    // Move to the next note
    index ++;
  // We're at the end, stop autoplaying.
  } 
}

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
