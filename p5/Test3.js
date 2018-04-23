var x = 80;
var y = 30;
var w = 80;
var h = 60;

var x1;
var y1;
var x2;
var y2;
var lastOne;
var distance;

function setup() {
    console.log("hello");
    createCanvas(800, 400);
    x1 = 20;
    y1 = 20;
    x2 = 20;
    y2 = 100;
    lastOne = width - 20
    distance = (lastOne - 20) / 4
}
function draw() {
    background(255);
    var spaceBeteenNotes = (distance + 20) / 5
    var notesAmount = 3

    for (var j = 0; j <= notesAmount; j++) {
        drawRectangles(notesAmount, spaceBeteenNotes, x1, j)
    }
}

function drawRectangles(notesAmount, spaceBeteenNotes, x1, j) {

    var rectWidth = spaceBeteenNotes - 10;
    if (j == notesAmount) {
        rectWidth = spaceBeteenNotes + 10;
    }
    x = x1 + spaceBeteenNotes - 7 + (spaceBeteenNotes * j)
    y = 60
    w = rectWidth
    h = 40
    if ((mouseX > x) && (mouseX < x + w) && (mouseY > y) && (mouseY < y + h)) {
        if (mouseIsPressed) {
            fill(128, 65, 244);
            stroke(128, 65, 244)
        }
        else {
            fill(66, 92, 244, 200);
            stroke(66, 92, 244, 200);
        }
    }
    else {
        fill(204, 101, 192, 127);
        stroke(204, 101, 192, 127);
    }
    rect(x, y, w, h);

    stroke(0);
    fill(0);
    text("m1", x1 + spaceBeteenNotes + (spaceBeteenNotes * y), 95);
}