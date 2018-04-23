// The midi notes of a scale
var notes = [60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72];
//0c, 1c#, 2d, 3d#, 4e, 5f, 6f#, 7g, 8g#, 9a, 10bb, 11b, 12c

// For automatically playing the song
var index = 0;

var minorThird = [
    { note: 0, duration: 500, display: "C" },
    { note: 3, duration: 600, display: "D#" },
];

var majorThird = [
    { note: 0, duration: 500, display: "C" },
    { note: 4, duration: 600, display: "E" },
];

var perfectFourth = [
    { note: 0, duration: 500, display: "C" },
    { note: 5, duration: 600, display: "F" },
];

var perfectFifth = [
    { note: 0, duration: 500, display: "C" },
    { note: 7, duration: 600, display: "G" },
];

var minorSixth = [
    { note: 0, duration: 500, display: "C" },
    { note: 8, duration: 600, display: "D#" },
];

var majorSixth = [
    { note: 0, duration: 500, display: "C" },
    { note: 9, duration: 600, display: "E" },
];

var minorSeventh = [
    { note: 0, duration: 500, display: "C" },
    { note: 10, duration: 600, display: "Bb" },
];

var majorSeventh = [
    { note: 0, duration: 500, display: "C" },
    { note: 11, duration: 600, display: "B" },
];

var notesNamesL0 = ["Perfect Fourth", "Perfect Fifth", "Perfect Fourth", "Perfect Fifth", "Perfect Fourth", "Perfect Fifth", "Perfect Fourth", "Perfect Fifth"];
var songNamesL0 = ["perfectFourth", "perfectFifth", "perfectFourth", "perfectFifth", "perfectFourth", "perfectFifth", "perfectFourth", "perfectFifth"];
var notesNamesL1 = ["Perfect Fourth", "Perfect Fifth", "Minor Sixth", "Major Sixth", "Perfect Fourth", "Perfect Fifth", "Minor Sixth", "Major Sixth"];
var songNamesL1 = ["perfectFourth", "perfectFifth", "minorSixth", "majorSixth", "perfectFourth", "perfectFifth", "minorSixth", "majorSixth"];
var notesNamesL2 = ["Minor Third", "Major Third", "Perfect Fourth", "Perfect Fifth", "Minor Third", "Major Third", "Perfect Fourth", "Perfect Fifth"];
var songNamesL2 = ["minorThird", "majorThird", "perfectFourth", "perfectFifth", "minorThird", "majorThird", "perfectFourth", "perfectFifth"];
var colorNamesL2 = [70, 133, 191, 154, 231, 118, 246, 135, 46, 180, 3, 24, 70, 133, 191, 154, 231, 118, 246, 135, 46, 180, 3, 24];
var majorSeventhImg;
var minorSeventhImg;
var perfectFourthImg;
var perfectFifthImg;
var notesNamesL3 = ["Perfect Fourth", "Perfect Fifth", "Minor Seventh", "Major Seventh", "Perfect Fourth", "Perfect Fifth", "Minor Seventh", "Major Seventh"];
var songNamesL3 = ["perfectFourth", "perfectFifth", "minorSeventh", "majorSeventh", "perfectFourth", "perfectFifth", "minorSeventh", "majorSeventh"];
var notesNames = ["Question 1", "Question 2", "Question 3", "Question 4", "Question 5", "Question 6", "Question 7", "Question 8"];
var shuffledSongs = [];
var results = [];

var trigger = 0;
var autoplay = false;
var osc;
var songName = "minorThird"
var title = ""
var learning = 0
var colorCounter = 0

window.onload = function () {
    document.getElementById("btnPlay").onclick = function () { playNoteOnClick() };
    document.getElementById("btnNext").onclick = function () { changeSongName() };
    document.getElementById("btnTest").onclick = function () { openTest() };
    document.getElementById("btnAgree").onclick = function () { startTest() };
    document.getElementById("p4").onclick = function () { saveResult("p4") };
    document.getElementById("p5").onclick = function () { saveResult("p5") };
    document.getElementById("m6").onclick = function () { saveResult("m6") };
    document.getElementById("M6").onclick = function () { saveResult("M6") };
    document.getElementById("m3").onclick = function () { saveResult("m3") };
    document.getElementById("M3").onclick = function () { saveResult("M3") };
    document.getElementById("m7").onclick = function () { saveResult("m7") };
    document.getElementById("M7").onclick = function () { saveResult("M7") };
}
function setup() {
    // A triangle oscillator
    osc = new p5.TriOsc();
    // Start silent
    osc.start();
    osc.amp(0);

    learning0()
    majorSeventhImg = loadImage("/artificial-synesthesia/bootstrap/img/majorSeventh.jpg");
    minorSeventhImg = loadImage("/artificial-synesthesia/bootstrap/img/minorSeventh.jpg");
    perfectFourthImg = loadImage("/artificial-synesthesia/bootstrap/img/perfectFourth.jpg");
    perfectFifthImg = loadImage("/artificial-synesthesia/bootstrap/img/perfectFifth.jpg");
}

function playNoteOnClick() {
    console.log("playNoteOnClick")
    if (!autoplay) {
        index = 0;
        autoplay = true;
    }

    if (testPart.value == "Test0" ||
    testPart.value == "Test1" ||
    testPart.value == "Test2" ||
    testPart.value == "Test3") {
        document.getElementById("answersButtons").style.display = "block"
        document.getElementById("answersHeader").style.display = "block"
}

}

function playNote(note, duration) {
    osc.freq(midiToFreq(note));
    // Fade it in
    osc.fade(0.5, 0.2);

    // If we sest a duration, fade it out
    if (duration) {
        setTimeout(function () {
            osc.fade(0, 0.2);
        }, duration - 50);
    }
}

function draw() {

    if (songName == "minorThird") {
        // If we are autoplaying and it's time for the next note
        if (autoplay && millis() > trigger) {
            playNote(notes[minorThird[index].note], minorThird[index].duration);
            trigger = millis() + minorThird[index].duration;
            // Move to the next note
            index++;
            // We're at the end, stop autoplaying.
        } else if (index >= minorThird.length) {
            autoplay = false;
        }
    }

    if (songName == "majorThird") {
        // If we are autoplaying and it's time for the next note
        if (autoplay && millis() > trigger) {
            playNote(notes[majorThird[index].note], majorThird[index].duration);
            trigger = millis() + majorThird[index].duration;
            // Move to the next note
            index++;
            // We're at the end, stop autoplaying.
        } else if (index >= majorThird.length) {
            autoplay = false;
        }
    }

    if (songName == "perfectFourth") {
        // If we are autoplaying and it's time for the next note
        if (autoplay && millis() > trigger) {
            playNote(notes[perfectFourth[index].note], perfectFourth[index].duration);
            trigger = millis() + perfectFourth[index].duration;
            // Move to the next note
            index++;
            // We're at the end, stop autoplaying.
        } else if (index >= perfectFourth.length) {
            autoplay = false;
        }
    }

    if (songName == "perfectFifth") {
        // If we are autoplaying and it's time for the next note
        if (autoplay && millis() > trigger) {
            playNote(notes[perfectFifth[index].note], perfectFifth[index].duration);
            trigger = millis() + perfectFifth[index].duration;
            // Move to the next note
            index++;
            // We're at the end, stop autoplaying.
        } else if (index >= perfectFifth.length) {
            autoplay = false;
        }
    }

    if (songName == "minorSixth") {
        // If we are autoplaying and it's time for the next note
        if (autoplay && millis() > trigger) {
            playNote(notes[minorSixth[index].note], minorSixth[index].duration);
            trigger = millis() + minorSixth[index].duration;
            // Move to the next note
            index++;
            // We're at the end, stop autoplaying.
        } else if (index >= minorSixth.length) {
            autoplay = false;
        }
    }

    if (songName == "majorSixth") {
        // If we are autoplaying and it's time for the next note
        if (autoplay && millis() > trigger) {
            playNote(notes[majorSixth[index].note], majorSixth[index].duration);
            trigger = millis() + majorSixth[index].duration;
            // Move to the next note
            index++;
            // We're at the end, stop autoplaying.
        } else if (index >= majorSixth.length) {
            autoplay = false;
        }
    }

    if (songName == "minorSeventh") {
        // If we are autoplaying and it's time for the next note
        if (autoplay && millis() > trigger) {
            playNote(notes[minorSeventh[index].note], minorSeventh[index].duration);
            trigger = millis() + minorSeventh[index].duration;
            // Move to the next note
            index++;
            // We're at the end, stop autoplaying.
        } else if (index >= minorSeventh.length) {
            autoplay = false;
        }
    }

    if (songName == "majorSeventh") {
        // If we are autoplaying and it's time for the next note
        if (autoplay && millis() > trigger) {
            playNote(notes[majorSeventh[index].note], majorSeventh[index].duration);
            trigger = millis() + majorSeventh[index].duration;
            // Move to the next note
            index++;
            // We're at the end, stop autoplaying.
        } else if (index >= majorSeventh.length) {
            autoplay = false;
        }
    }
}

function learning0() {
    songName = songNamesL0[learning]
    console.log(songName)
    title = notesNamesL0[learning]
    console.log(title)
    var titleHtml = document.getElementById("ilP0-title");
    titleHtml.textContent = notesNamesL0[learning]
}

function learning1() {
    songName = songNamesL1[learning]
    console.log(songName)
    title = notesNamesL1[learning]
    console.log(title)
    var titleHtml = document.getElementById("ilP1-title");
    titleHtml.textContent = notesNamesL1[learning]
}

function learning2() {
    songName = songNamesL2[learning]
    console.log(songName)
    title = notesNamesL2[learning]
    console.log(title)
    var titleHtml = document.getElementById("ilP2-title");
    titleHtml.textContent = notesNamesL2[learning]

    var myCanvas = createCanvas(640, 480);
    myCanvas.parent('ilP2-color');

    background(colorNamesL2[colorCounter], colorNamesL2[colorCounter + 1], colorNamesL2[colorCounter + 2]);
    var titleColor = "rgb(" + colorNamesL2[colorCounter] + "," + colorNamesL2[colorCounter + 1] + "," + colorNamesL2[colorCounter + 2] + ")"
    document.getElementById("ilP2-title").style.color = titleColor;
    colorCounter = colorCounter + 3
}

function learning3() {
    songName = songNamesL3[learning]
    console.log(songName)
    title = notesNamesL3[learning]
    console.log(title)
    var titleHtml = document.getElementById("ilP3-title");
    titleHtml.textContent = notesNamesL3[learning]

    var myCanvas = createCanvas(640, 480);
    myCanvas.parent('ilP3-picture');

    if (learning == 0 || learning == 4) {
        background(perfectFourthImg);
    }
    if (learning == 1 || learning == 5) {
        background(perfectFifthImg);
    }
    if (learning == 2 || learning == 6) {
        background(minorSeventhImg);
    }
    if (learning == 3 || learning == 7) {
        background(majorSeventhImg);
    }

}
function test0() {
    songName = shuffledSongs[learning]
    console.log("Shuffled songs from test1 " + shuffledSongs)
    console.log("Song name from test1 " + songName)
    title = notesNames[learning]
    console.log(title)
    var titleHtml = document.getElementById("ilP0T-title");
    titleHtml.textContent = notesNames[learning]
}

function test1() {
    songName = shuffledSongs[learning]
    console.log("Shuffled songs from test1 " + shuffledSongs)
    console.log("Song name from test1 " + songName)
    title = notesNames[learning]
    console.log(title)
    var titleHtml = document.getElementById("ilP1T-title");
    titleHtml.textContent = notesNames[learning]
}

function test2() {
    songName = shuffledSongs[learning]
    console.log("Shuffled songs from test2 " + shuffledSongs)
    console.log("Song name from test2 " + songName)
    title = notesNames[learning]
    console.log(title)
    var titleHtml = document.getElementById("ilP2T-title");
    titleHtml.textContent = notesNames[learning]
}

function test3() {
    songName = shuffledSongs[learning]
    console.log("Shuffled songs from test3 " + shuffledSongs)
    console.log("Song name from test3 " + songName)
    title = notesNames[learning]
    console.log(title)
    var titleHtml = document.getElementById("ilP3T-title");
    titleHtml.textContent = notesNames[learning]
}


function changeSongName() {
    learning = learning + 1
    console.log("Learning numer:" + learning)

    if (testPart.value == "Learning0" ||
        testPart.value == "Learning1" ||
        testPart.value == "Learning2" ||
        testPart.value == "Learning3") {
        if (learning > 4) {
            document.getElementById("btnTest").style.display = "inline"
        }
    }

    if (testPart.value == "Learning0") {
        if (learning > 7) {
            learning = 0
        }
        learning0()
    }

    if (testPart.value == "Learning1") {
        if (learning > 7) {
            learning = 0
        }
        learning1()
    }
    if (testPart.value == "Learning2") {
        if (learning > 7) {
            learning = 0
            colorCounter = 0
        }
        learning2()
    }

    if (testPart.value == "Learning3") {
        if (learning > 7) {
            learning = 0
            colorCounter = 0
        }
        learning3()
    }
    if (testPart.value == "Test0") {
        if (learning > 7) {
            learning = 0
            console.log("Test Learning numer:" + learning)
            openTest()
        }
        else {
            test0()
        }
    }
    if (testPart.value == "Test1") {
        if (learning > 7) {
            learning = 0
            console.log("Test Learning numer:" + learning)
            openTest()
        }
        else {
            test1()
        }
    }
    if (testPart.value == "Test2") {
        if (learning > 7) {
            learning = 0
            console.log("Test Learning numer:" + learning)
            openTest()
        }
        else {
            test2()
        }
    }
    if (testPart.value == "Test3") {
        if (learning > 7) {
            learning = 0
            console.log("Test Learning numer:" + learning)
            createJson()
            showThanks()
        }
        else {
            test3()
        }
    }
}

function openTest() {
    console.log("open test")
    learning = 0
    var testPart = document.getElementById("testPart")
    if (testPart.value == "Learning3") {
        document.getElementById("ilP3").style.display = "none"

        document.getElementById("btnTest").style.display = "none"
        document.getElementById("btnNext").style.display = "none"

        document.getElementById("ilP3T").style.display = "block"

        document.getElementById("p4").style.visibility = "visible"
        document.getElementById("p5").style.visibility = "visible"
        document.getElementById("m7").style.visibility = "visible"
        document.getElementById("M7").style.visibility = "visible"

        document.getElementById("m3").style.display = "none"
        document.getElementById("M3").style.display = "none"

        document.getElementById("testPart").value = "Test3"
        results[results.length] = "Test3"
        shuffledSongs = shuffleSongs(songNamesL3)

        test3()
    }
    if (testPart.value == "Test2") {
        document.getElementById("ilP3").style.display = "block"
        document.getElementById("btnNext").style.display = "inline"

        document.getElementById("ilP2T").style.display = "none"

        document.getElementById("p4").style.visibility = "hidden"
        document.getElementById("p5").style.visibility = "hidden"
        document.getElementById("m3").style.visibility = "hidden"
        document.getElementById("M3").style.visibility = "hidden"
        document.getElementById("p4").style.backgroundColor = ''
        document.getElementById("p5").style.backgroundColor = ''
        document.getElementById("m3").style.backgroundColor = ''
        document.getElementById("M3").style.backgroundColor = ''
        document.getElementById("p4").style.color = ''
        document.getElementById("p5").style.color = ''
        document.getElementById("m3").style.color = ''
        document.getElementById("M3").style.color = ''
        document.getElementById("answersHeader").style.display = "none"


        document.getElementById("testPart").value = "Learning3"


        learning3()
    }
    if (testPart.value == "Learning2") {
        document.getElementById("ilP2").style.display = "none"

        document.getElementById("btnTest").style.display = "none"
        document.getElementById("btnNext").style.display = "none"

        document.getElementById("ilP2T").style.display = "block"

        document.getElementById("p4").style.visibility = "visible"
        document.getElementById("p5").style.visibility = "visible"
        document.getElementById("m3").style.visibility = "visible"
        document.getElementById("M3").style.visibility = "visible"
        document.getElementById("p4").style.backgroundColor = 'rgb(246, 135, 46)'
        document.getElementById("p5").style.backgroundColor = 'rgb(180, 3, 24)'
        document.getElementById("m3").style.backgroundColor = 'rgb(70, 133, 191)'
        document.getElementById("M3").style.backgroundColor = 'rgb(154, 231, 118)'
        document.getElementById("p4").style.color = 'white'
        document.getElementById("p5").style.color = 'white'
        document.getElementById("m3").style.color = 'white'
        document.getElementById("M3").style.color = 'white'
        document.getElementById("m6").style.display = "none"
        document.getElementById("M6").style.display = "none"

        document.getElementById("testPart").value = "Test2"
        results[results.length] = "Test2"

        shuffledSongs = shuffleSongs(songNamesL2)
        test2()
    }

    if (testPart.value == "Test1") {
        document.getElementById("ilP2").style.display = "block"

        document.getElementById("btnNext").style.display = "inline"

        document.getElementById("ilP1T").style.display = "none"

        document.getElementById("p4").style.visibility = "hidden"
        document.getElementById("p5").style.visibility = "hidden"
        document.getElementById("m6").style.visibility = "hidden"
        document.getElementById("M6").style.visibility = "hidden"

        document.getElementById("answersHeader").style.display = "none"

        document.getElementById("testPart").value = "Learning2"


        learning2()
    }

    if (testPart.value == "Learning1") {


        document.getElementById("ilP1").style.display = "none"
        document.getElementById("btnTest").style.display = "none"
        document.getElementById("btnNext").style.display = "none"

        document.getElementById("ilP1T").style.display = "block"

        document.getElementById("p4").style.visibility = "visible"
        document.getElementById("p5").style.visibility = "visible"
        document.getElementById("m6").style.visibility = "visible"
        document.getElementById("M6").style.visibility = "visible"

        document.getElementById("testPart").value = "Test1"
        results[results.length] = "Test1"

        shuffledSongs = shuffleSongs(songNamesL1)
        test1()
    }

    if (testPart.value == "Test0") {
        document.getElementById("ilP0T").style.display = "none"

        document.getElementById("ilP1").style.display = "block"

        document.getElementById("p4").style.visibility = "hidden"
        document.getElementById("p5").style.visibility = "hidden"
        document.getElementById("btnNext").style.display = "inline"
        document.getElementById("answersHeader").style.display = "none"

        document.getElementById("testPart").value = "Learning1"

        learning1()
    }

    if (testPart.value == "Learning0") {
        document.getElementById("intro").style.display = "none"

        document.getElementById("ilP0").style.display = "none"
        document.getElementById("btnTest").style.display = "none"
        document.getElementById("btnNext").style.display = "none"

        document.getElementById("ilP0T").style.display = "block"

        document.getElementById("p4").style.visibility = "visible"
        document.getElementById("p5").style.visibility = "visible"

        document.getElementById("testPart").value = "Test0"
        results[results.length] = "Test0"

        shuffledSongs = shuffleSongs(songNamesL0)
        test0()
    }


}

function createJson() {
    var json = {};

    var now = new Date();
    json.id = now;

    json.test = results

    saveJSON(json, 'lion.json');
    function sendJsonResult(results) {
        fetch("https://testwebhooks.com/c/artificial-synesthesia", {method: "POST", mode: 'no-cors', body: JSON.stringify(results)}).catch(() => {}).then((response) => console.log("Data has been send"))
     }
}

function saveResult(answer) {
    results[results.length] = answer
    console.log("result:" + results)
    document.getElementById("answersButtons").style.display = "none"
    changeSongName()
}

function shuffleSongs(songsArray) {
    console.log("shuffling songs")
    shuffledSongs = shuffle(songsArray, true);
    print(shuffledSongs);

    results[results.length] = shuffledSongs

    return shuffledSongs
}

function showThanks(){
    document.getElementById("test").style.display = "none"
    document.getElementById("thanks").style.display = "block"
}

function startTest(){
    document.getElementById("consent").style.display = "none"
    document.getElementById("test").style.visibility = "visible"
}