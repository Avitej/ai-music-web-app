song = "";
song2 = "";

song1_status  = "";
song2_status  = "";

leftWristScore = 0;
leftWristX = 0;
leftWristY = 0;

rightWristScore = 0;
rightWristX = 0;
rightWristY = 0;

function preload()
{
	song = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}
function setup() {
	canvas =  createCanvas(600, 500);
	canvas.center();

	video = createCapture(VIDEO);
	video.hide();

	poseNet = ml5.poseNet(video, modelLoaded);
	poseNet.on('pose', gotPoses);
}
function gotPoses(results){
	if(results.length > 0)
	{
		console.log(results);
		leftWristX = results[0].pose.leftWrist.x;
		leftWristY = results[0].pose.leftWrist.y;
		console.log("leftwristx = " + leftWristX +" leftwristY = " + leftWristY);

		rightWristX = results[0].pose.rightWrist.x;
		rightWristY = results[0].pose.rightWristY.y;
		console.log("rightwristx = " + rightWristX +" rightwristY = " + rightWristY);

		leftWristScore = results[0].pose.keypoints[9].score;
		rightWristScore = results[0].pose.keypoints[10].score;
	}
}
function play() {
	song.play();
	song.setVolume(1);
	song.rate(1);
}
function draw() {
	image(video, 0, 0, 600, 500);
	song1_status = song.isPlaying();
	fill("#FF0000");
	stroke("#FF0000");
	if(leftWristX > 0.2){
		circle(leftWristX, leftWristY, 20);
		song2.stop();
		if(song1_status = false){
			song1.play()
			document.getElementById("song").innerHTML = "song 1"
		}
	}
	song2_status = song2.isPlaying();
	if(leftWristX > 0.2){
		circle(leftWristX, leftWristY, 20);
		song2.stop();
		if(song1_status = false){
			song1.play()
			document.getElementById("song").innerHTML = "song 2"
		}
	}
}
function modelLoaded() {
	console.log("poseNet is intialized.");
}
