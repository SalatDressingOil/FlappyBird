// 288  512 
//git add -A
//git commit -m ""
//git push
vkBridge.send("VKWebAppInit", {});
vkBridge.subscribe((e) => {
    console.log('bridge event', e);
  });


  var delayInMilliseconds = 1000; //1 second

vkBridge.send("VKWebAppShowNativeAds", {ad_format:"interstitial"})
.then(data => console.log(data.result))
.catch(error => console.log(error));
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

document.addEventListener("keydown",moveUp);
document.addEventListener("click",moveUp);
var t1 = (new Date).getTime();
var t2 = 0;
var k = 0;
var z = 5;
var schet = 0;
var pi_180 = Math.PI/180
function moveUp(){
    console.log('click')
    //alert('click')
    t1 = (new Date).getTime();
    schet = 10;
    z=5
    //yPos -= 20;
}
var pipe = [];

pipe[0]={
    x: cvs.width,
    y: 0
}
function draw(){
    ctx.drawImage(bg,0,0);
    for (var i = 0; i < pipe.length; i++){
         
        if (xPos + bird.width >= pipe[i].x 
            && xPos <= pipe[i].x + pipeUp.width 
            && (yPos <= pipe[i].y + pipeUp.height 
                || yPos + bird.height >= pipe[i].y + pipeUp.height+gap) 
                || yPos + bird.height >= cvs.height - fg.height){
                    
                    xPos = 10;
                    yPos = 150;
                    pipe = [];

                    pipe[0]={
                        x: cvs.width,
                        y: 0
                    }
                    score = 0;
                    t1 = (new Date).getTime();
                    k=0

        }

        ctx.drawImage(pipeUp, pipe[i].x,pipe[i].y);
        ctx.drawImage(pipeBottom, pipe[i].x,pipe[i].y + pipeUp.height + gap);
        pipe[i].x-=1;

        if (pipe[i].x == 100){
            pipe.push({
                x: cvs.width,
                y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height 
            });
        }
        if (pipe.length > 2){
            pipe.shift()
        }

        if (pipe[i].x == 5){
            score++;
        }
    
    }

    t2 = ((new Date).getTime() - t1)/100;
    if (schet > 0){
        yPos -= t2*3;
        schet-=1;
        if (k>-10){
            k-=10
        }
    }
    else{
        if (z>=3){
            z-=1
        }
        if (k<85){
            k+=z
        }
    }
    console.log(schet,k)
        if ( t2 > 2 ){
            yPos += t2/1.2;
        }
    ctx.drawImage(fg,0,cvs.height - fg.height);
    //xPos=0
    //yPos=0

    ctx.translate(xPos+bird.width/2,yPos+bird.height/2);
    ctx.rotate(k*pi_180);
    ctx.drawImage(bird,-bird.width / 2, -bird.height / 2, bird.width, bird.height)
    //ctx.drawImage(bird,xPos,yPos);
    ctx.rotate((360-k)*pi_180);

    ctx.setTransform(1,0,0,1,0,0);
    //ctx.fillRect(xPos+bird.width/2,yPos+bird.height/2,5,5)

    ctx.fillStyle = "#000";
    ctx.font = "20px Verdana";

    ctx.fillText("Счет: " + score, 10, cvs.height - 20);
    requestAnimationFrame(draw);
};
pipeBottom.onload = draw();



function fun(){
}