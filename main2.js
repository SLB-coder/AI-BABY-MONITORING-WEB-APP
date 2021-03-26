sound = "";
status = "";
object =  [];

function preload(){
    sound = loadSound("alarm_tone.mp3");
}
function setup(){
    canvas = createCanvas(500,400);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd' , modelLoaded);
    
    
}
function modelLoaded(){
    console.log("Model Loaded !");
    
    status = true;
    objectDetector.detect(video,gotResult);
}
function gotResult(error,results){
    if (error){
        console.error(error);
    }
    else{
        console.log(results);
        objects = results;
        document.getElementById("Detecting Objects");
    }
}
function draw(){
    image(video,0,0,500,400);
    if (status != ""){
        
        for (var i = 0; i < objects.length ; i++){
            document.getElementById("status").innerHTML = "Status : Objects Detected !";
            if (objects[i].label != "person" ){
                sound.play();
                document.getElementById("objects").innerHTML = "Baby Not Found";
            }
            else if (objects[i].label == "person") {
                sound.stop();
                document.getElementById("objects").innerHTML = "Baby Found";
            }
        }
    }
  
}