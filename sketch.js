let video;
let poseNet;
let pose;
let skeleton;
let eyeimg;
let mouthimg;

function preload(){
  eyeimg = loadImage('https://cdn.glitch.me/7ffdbf88-a307-4e9f-889b-02e20588ee3d%2Feye.png?v=1638764876585');
  mouthimg = loadImage('https://cdn.glitch.me/7ffdbf88-a307-4e9f-889b-02e20588ee3d%2Fmouf.png?v=1638765578944');
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);
}

function gotPoses(poses) {
  //console.log(poses);
  if (poses.length > 0) {
    pose = poses[0].pose;
    skeleton = poses[0].skeleton;
  }
}


function modelLoaded() {
  console.log('poseNet ready');
}

function draw() {
  image(video, 0, 0);

  if (pose) {
    let eyeR = pose.rightEye;
    let eyeL = pose.leftEye;
    let d = dist(eyeR.x, eyeR.y, eyeL.x, eyeL.y);
    fill(255, 0, 0);
    image(mouthimg, pose.nose.x-50, pose.nose.y+20, d);

    fill(0, 0, 255);
    ellipse(pose.rightWrist.x, pose.rightWrist.y, 32);
    ellipse(pose.leftWrist.x, pose.leftWrist.y, 32);

    image(eyeimg, pose.rightEye.x-50, pose.rightEye.y-50, d);
    image(eyeimg, pose.leftEye.x-50, pose.leftEye.y-50, d);

    for (let i = 0; i < pose.keypoints.length; i++) {
      let x = pose.keypoints[i].position.x;
      let y = pose.keypoints[i].position.y;
      fill(0,255,0);
      ellipse(x,y,16,16);
    }

    for (let i = 0; i < skeleton.length; i++) {
      let a = skeleton[i][0];
      let b = skeleton[i][1];
      strokeWeight(2);
      stroke(255);
      line(a.position.x, a.position.y,b.position.x,b.position.y);
    }
  }
}
