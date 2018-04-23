var x1;
var y1;
var x2;
var y2;
var lastOne;
var distance;

var x;
var y;
var w;
var h;

function setup() {
    var myCanvas = createCanvas(800, 400);
    myCanvas.parent('game');


    lastOne = width - 20
    distance = (lastOne - 20) / 4



    var musicSheet = {
        m1: [1, 2, 3, 4],
        m2: [5, 3, 5, 3],
        m3: [3, 3, 2, 2, 1]
    };
}


function draw() {
    textSize(14);
    textFont("Helvetica");
    var spaceBeteenNotes = (distance + 20) / 5
    var notesAmount = 3
    background(255);

    x1 = 20;
    y1 = 20;
    x2 = 20;
    y2 = 100;

    for (var i = 0; i <= 5; i++) {
        stroke(0);
        fill(0);
        line(x1, y1, x2, y2);

        drawNotes(notesAmount, x1, spaceBeteenNotes)

        for (var j = 0; j <= notesAmount; j++) {
            drawRectangles(notesAmount, spaceBeteenNotes, x1, j)
        }

        x1 = x1 + distance;
        x2 = x2 + distance;
    }
}

function drawNotes(notesAmount, x1, spaceBeteenNotes) {
    for (var y = 0; y <= notesAmount; y++) {
        text(y + 1, x1 + spaceBeteenNotes - 15 + (spaceBeteenNotes * y), 60);
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
    console.log(mouseX , x, mouseX , x+w , mouseY , y , mouseY , y+h);
    if ((mouseX > x) && (mouseX < x+w) && (mouseY > y) && (mouseY < y+h)) {
       
        if (mouseIsPressed) {
            fill(128, 65, 244);
            stroke(128, 65, 244);
        }
        else
        {
        fill(66, 92, 244, 200);
        stroke(66, 92, 244, 200);
        }
    }
    else
    {
       //fill(66, 92, 244, 127);
        //stroke(66, 92, 244, 127);
    fill(204, 101, 192, 127);
    stroke(204, 101, 192, 127);
    }

    rect(x, y, w, h);
    stroke(0);
    fill(0);
    text("m1", x1 + spaceBeteenNotes + (spaceBeteenNotes * j), 95);
}