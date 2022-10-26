// 288  512 
//git add -A
//git commit -m ""
//git push

vkBridge.send("VKWebAppInit", {});
vkBridge.subscribe(event => {
    console.log('standartn_sub_bridge',event)
    if (!event.detail) {
      return;
    }
  
    switch(event.detail.type) {
      case 'VKWebAppOpenCodeReaderResult':
        if (event.detail.data.result) {
          // Обработка события в случае успеха
          console.log(event.detail.data.result);
        } else {
          // Ошибка
        }
        break;
      case 'VKWebAppOpenCodeReaderFailed':
        // Обработка события в случае ошибки
        console.log(event.detail.data.error_type, event.detail.data.error_data);      
        break;
    }
  });

var bird = new Image();
bird.src = "img/bird.png";
var bg = new Image();
bg.src = "img/bg.png"; 
var fg = new Image();
fg.src = "img/fg.png"; 
var pipeUp = new Image();
pipeUp.src = "img/pipeUp.png"; 
var pipeBottom = new Image();
pipeBottom.src = "img/pipeBottom.png";
function no_zero_img_size() {
    console.log('non-load')
    if (pipeBottom.width==0){
        setTimeout(no_zero_img_size, 20);
    }
    else{
        var imgM = [bird,bg,fg,pipeUp,pipeBottom]
        console.log(imgM.length)
        for (var i=0;i<imgM.length;i++){
            imgM[i].width*=zn
            imgM[i].height*=zn
            console.log(imgM[i].width)
        }
    }
  }

vkBridge.send("VKWebAppShowNativeAds", {ad_format:"interstitial"})
.then(data => console.log(data.result))
.catch(error => console.log(error));


var cvs = document.getElementById("canvas");
//var zn = cvs.height/cvs.width;

var min_zn = 0
var max_zn = 0
if (document.documentElement.clientHeight<document.documentElement.clientWidth){
    max_zn=document.documentElement.clientHeight
    min_zn=document.documentElement.clientWidth
}
else{
    max_zn=document.documentElement.clientWidth
    min_zn=document.documentElement.clientHeight
}
var zn = min_zn/max_zn
zn*=0.97
setTimeout(no_zero_img_size, 20);

cvs.height*=zn
cvs.width*=zn
vkBridge.send("VKWebAppResizeWindow", {"width": cvs.width, "height": cvs.height});

var ctx = cvs.getContext("2d");
ctx.fillStyle = "#000";
ctx.font = 30*zn+"px Verdana";

//console.log(zn,zn1)
//console.log(innerWidth,innerHeight)
//console.log(cvs.width,cvs.height)


//pipeBottom.onload = function(){}

/*
var zn = bg.width/bg.height
bg.height=innerHeight*1
bg.width=bg.height*zn

var zn = bird.width/bird.height
bird.height=innerHeight*0.05
bird.width=bird.height*zn

var zn = fg.width/fg.height
fg.height=innerHeight*0.05
fg.width=fg.height*zn

var zn = pipeUp.width/pipeUp.height
pipeUp.height==innerHeight*0.05
pipeUp.width=pipeUp.height*zn

var zn = pipeBottom.width/pipeBottom.height
pipeBottom.height=innerHeight*0.05
pipeBottom.width=pipeBottom.height*zn
*/

var score = 0;

var gap = 186*zn;

var xPos = 20;
var yPos = 150;
var grav = 1*zn;

document.addEventListener("keydown",moveUp);
document.addEventListener("click",moveUp);
var pi_180 = Math.PI/180

var t1 = (new Date).getTime();
var t2 = 0;
var k = 0;
var creat_board_int = 0;



var z = 3*zn;
var non = 10*zn
var schet = 1*zn;
var pixel_pipe_move = 3*zn

function moveUp(){
    console.log('click')
    //alert('click')
    t1 = (new Date).getTime();
    schet = 15*zn;
    non = 1*zn
    z = 3*zn
    //yPos -= 20;
}
var pipe = [];

/*
pipe[0]={
    gap_ran: 0,
    x: cvs.width,
    y: 0,
}
*/
pipe.push({
    gap_ran: Math.random()*10,
    x: cvs.width,
    y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height
});
//ctx.scale(2.5,2.5)

function draw(){
    //ctx.save();
    //ctx.clearCanvas();
    //ctx.scale(bg.width / cvs.width, bg.height / cvs.height);
    //bg.width=cvs.width
    //bg.height=cvs.height
    //ctx.save();
    //ctx.clearCanvas();
    //ctx.scale(1,1);
    //ctx.scale(innerWidth / cvs.width, innerHeight / cvs.height);
    ctx.drawImage(bg,0,0,bg.width,bg.height);
    for (var i = 0; i < pipe.length; i++){
        if (xPos + bird.width-5 >= pipe[i].x 
            && xPos <= pipe[i].x + pipeUp.width 
            && (yPos <= pipe[i].y + pipeUp.height 
                || yPos + bird.height-5 >= pipe[i].y + pipeUp.height+gap-pipe[i].gap_ran) 
                || yPos + bird.height-5 >= cvs.height - fg.height){
                    
                    xPos = 20;
                    yPos = 150;

                    schet = 1*zn;
                    non=10*zn
                    z=3*zn

                    pipe = [];
                    
                    pipe[0]={
                        gap_ran: Math.random()*10,
                        x: cvs.width,
                        y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height
                    }
                    score = 0;
                    t1 = (new Date).getTime();
                    k=0

        }
        //console.log(pipe.length , pipe[i].x/3,pipe[i].y)
        if (pipe[i].x<-pipeUp.width){
            pipe.shift()
        }
        //console.log(pipe[i].x,pixel_pipe_move,pipe[i].x/pixel_pipe_move,pipe.length,pipe[i].x,pipe[i].y)
        ctx.drawImage(pipeUp, pipe[i].x,pipe[i].y,pipeUp.width,pipeUp.height);
        ctx.drawImage(pipeBottom, pipe[i].x,pipe[i].y + pipeUp.height + gap - pipe[i].gap_ran,pipeBottom.width,pipeBottom.height);
        pipe[i].x-=pixel_pipe_move;
        creat_board_int = Math.round(pipe[i].x/pixel_pipe_move)
        if (creat_board_int == 27){
            pipe.push({
                gap_ran: Math.random()*10,
                x: cvs.width,
                y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height
            });
        }
        if (creat_board_int == 20){
            score++;
        }
    
    }

    t2 = ((new Date).getTime() - t1)/100;
    if (schet > 0){
        yPos -= t2*schet ;
        //console.log(t2,schet,t2*schet)
        schet-=(t2*schet)/5;
        if (k>-3){
            k-=8
        }
    }
    else{
        if (non>0){
            non-=1
            k+=1
        }
        else{
            if (z>=3){
                z-=1
            }
            if (k<85){
                k+=z
            }
        }
    }
    //console.log(schet,k)
        if ( t2 > 2 ){
            yPos += t2*grav;
        }
    ctx.drawImage(fg,0,cvs.height - fg.height,fg.width,fg.height);
    //xPos=0
    //yPos=0

    ctx.translate(xPos+bird.width/2,yPos+bird.height/2);
    ctx.rotate(k*pi_180);
    ctx.drawImage(bird,-bird.width / 2, -bird.height / 2, bird.width, bird.height)
    //ctx.drawImage(bird,xPos,yPos);
    ctx.rotate((360-k)*pi_180);

    ctx.setTransform(1,0,0,1,0,0);
    //ctx.fillRect(xPos+bird.width/2,yPos+bird.height/2,5,5)
    //ctx.strokeText("Счет: " + score, 10, cvs.height - 20);
    ctx.fillText("Счет: " + score, 10, cvs.height - 20, 1000);

    //ctx.restore();
    requestAnimationFrame(draw);
};
pipeBottom.onload = draw();



function fun(){
}
