function setup(){
    canvas = createCanvas(500,700)
    canvas.center()
    video = createCapture(VIDEO)
    video.hide()

    poseNet = ml5.poseNet(video, modelloaded)
    poseNet.on("pose", gotposes)
}
function gotposes(results){
    if(results.length > 0){
        console.log(results)
        srw = results[0].pose.keypoints[10].score
        slw = results[0].pose.keypoints[9].score
        lwx = results[0].pose.leftWrist.x
        lwx = results[0].pose.leftWrist.y
        rwx = results[0].pose.rightWrist.x
        rwy = results[0].pose.rightWrist.y
    }
}
function draw(){
    image(video, 0, 0, 600, 500)
    fill("FF0000")
    stroke("000000")
    if(slw > 0.2){
    rect(lwx,lwy,20,10)

    inwly = Number(lwy)
    remove_decimals = floor(inwly)
    volume = remove_decimals/500;
    document.getElementById("volume").innerHTML = "volume = "+volume
    song.setVolume(volume)
    }

    if(srw > 0.2){
    if(rwy >0 && rwy <= 100){
        document.getElementById("speed").innerHTML = "speed = 0.5x"
        song.rate(0.5)
    }
    if(rwy >100 && rwy <= 200){
        document.getElementById("speed").innerHTML = "speed = 1x"
        song.rate(1)
    }
    if(rwy >200 && rwy <= 300){
        document.getElementById("speed").innerHTML = "speed = 1.5x"
        song.rate(1.5)
    }
    if(rwy >300 && rwy <= 400){
        document.getElementById("speed").innerHTML = "speed = 2x"
        song.rate(2)
    }
    if(rwy >400 && rwy <= 500){
        document.getElementById("speed").innerHTML = "speed = 2.5x"
        song.rate(2.5)
    }
    }
}


song = ""
function preload(){
    song = loadSound("music.mp3")
}

function start(){
    song.play()
    song.setVolume(1)
    song.rate(1)
    
}
function stop(){
    song.stop()
}
function modelloaded(){
    console.log("inisialised posenet")
}
lwx = 0
lwy = 0;
rwx = 0
rwy = 0
