var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeUp = new Image();
var pipeBottom = new Image();
bird.src = "img/bird.png";
bg.src = "img/bg.png"; 
fg.src = "img/fg.png"; 
pipeUp.src = "img/pipeUp.png"; 
pipeBottom.src = "img/pipeBottom.png"; 
var score = 0;

var gap = 90;

var xPos = 10;
var yPos = 150;

var grav = 1.5;
document.addEventListener("keydown",moveUp)

var t1 = (new Date).getTime();
function moveUp(){
    t1 = (new Date).getTime();
    yPos -= 20;
}
var pipe = [];

pipe[0]={
    x: cvs.width,
    y: 0
}
function draw(){
    ctx.drawImage(bg,0,0);
    for (var i = 0; i < pipe.length; i++){

        ctx.drawImage(pipeUp, pipe[i].x,pipe[i].y);
        ctx.drawImage(pipeBottom, pipe[i].x,pipe[i].y + pipeUp.height + gap);
        pipe[i].x-=1;

        if (pipe[i].x == 125){
            pipe.push({
                x: cvs.width,
                y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height 
            });
        }
        if (pipe.length > 3){
            pipe.shift()
        }
        if (xPos + bird.width >= pipe[i].x 
            && xPos <= pipe[i].x + pipeUp.width 
            && (yPos <= pipe[i].y + pipeUp.height 
                || yPos + bird.height >= pipe[i].y + pipeUp.height+gap) 
                || yPos + bird.height >= cvs.height - fg.height){
            location.reload();
        }

        if (pipe[i].x == 5){
            score++;
        }

    }



    ctx.drawImage(fg,0,cvs.height - fg.height);
    ctx.drawImage(bird,xPos,yPos);

    var t2 = ((new Date).getTime() - t1)/100;

    console.log(t2);

    if ( t2 > 1 ){
        yPos += t2;
    }


    ctx.fillStyle = "#000";
    ctx.font = "20px Verdana";

    ctx.fillText("Счет: " + score, 10, cvs.height - 20);
    requestAnimationFrame(draw);
};
pipeBottom.onload = draw();



function fun(){
}
