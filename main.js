Alarm = "";
status = "";
objects = [];

function preload(){
    Alarm = loadSound("alarm_tone.mp3");
    
  
  }

function setup(){
    canvas = createCanvas(380,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status: object detecting";
    
    
}

function modelLoaded() {
    console.log("Model loaded");
    status = true;
    objectDetector.detect(video, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    }
        console.log(results);
        objects = results;
}

function draw() {
    image(video, 0, 0, 640, 420);
    
    
    if (status != "") {
        
        for (var i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status: object detected";

            if (objects[i].label != "person") {
                document.getElementById("no_of_objects").innerHTML = "Baby not found";
                Alarm.play();

            } else {
                document.getElementById("no_of_objects").innerHTML = "Baby found!";
                Alarm.stop();
            }
        }
    }

    
    
    }


