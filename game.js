// 288  512 
//git add -A
//git commit -m ""
//git push
var height_ = 800
var width_ = 480
vkBridge.send("VKWebAppInit", {});
vkBridge.send("VKWebAppResizeWindow", {"width": 480, "height": 800});
vkBridge.subscribe(event => {
    console.log('standartn_sub_bridge',event)
    if (!event.detail) {
      return;
    }
  
    switch(event.detail.type) {
      case "VKWebAppUpdateConfig":
        height_ = event.detail.data.viewport_height
        width_ = event.detail.data.viewport_width
        console.log('VKWebAppUpdateConfig:',height_,width_)
        break
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

var score = 0;

var gap = 186;

var xPos = 20;
var yPos = 150;
var grav = 1;

var pi_180 = Math.PI/180

var t1 = (new Date).getTime();
var t2 = 0;
var k = 0;
var creat_board_int = 0;

var z = 3;
var non = 10
var schet = 1;
var pixel_pipe_move = 3

var zn = 0
var min_zn = 0
var max_zn = 0

if (height_==0){
    height_=innerHeight
    width_=innerWidth
}
if (height_>width_){
    max_zn=height_
    min_zn=width_
}
else{
    max_zn=width_
    min_zn=height_
}
console.log(max_zn/720,max_zn,720)
zn = max_zn/720
zn *= 1
var cvs = document.getElementById("canvas");
cvs.height*=zn
cvs.width*=zn

var ctx = cvs.getContext("2d");
ctx.fillStyle = "#000";
ctx.font = 30*zn+"px Verdana";

gap *= zn
grav *= zn
z *= zn;
non *= zn
schet *= zn;
pixel_pipe_move *= zn


//setTimeout(vk_bridge_event_config, 1);
function no_zero_img_size() {
    console.log('non-load')
    if (pipeBottom.width==0){
        setTimeout(no_zero_img_size, 10);
    }
    else{
        var imgM = [bird,bg,fg,pipeUp,pipeBottom]
        console.log(imgM.length)
        for (var i=0;i<imgM.length;i++){
            imgM[i].width*=zn
            imgM[i].height*=zn
            console.log(imgM[i].width)
        }
        //console.log("")
    }
}
setTimeout(no_zero_img_size, 1);
document.addEventListener("keydown",moveUp);
document.addEventListener("click",moveUp);

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
pipe.push({
    gap_ran: Math.random()*10,
    x: cvs.width,
    y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height
});

//setTimeout(vk_bridge_no_event_confin, 1);
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
    ctx.clearRect(0, 0, cvs.width, cvs.height);
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

