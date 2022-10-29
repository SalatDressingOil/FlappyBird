  // 288  512 
//git add -A
//git commit -m ""
//git push
var height_ = 0
var width_ = 0
vkBridge.send("VKWebAppInit", {});
//vkBridge.send("VKWebAppResizeWindow", {"width": 480, "height": 800});
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
//bird.src = "img/owl.gif";
var fg = new Image();
fg.src = "img/fg.png"; 
var pipeUp = new Image();
pipeUp.src = "img/pipeUp.png"; 
var pipeBottom = new Image();
pipeBottom.src = "img/pipeBottom.png";
var bg = new Image();
bg.src = "img/bg.png"; 

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
//var non = 10
var schet = 1;
var pixel_pipe_move = 3

var zn = 0
var zn_height = 0
var zn_width = 0

var cvs = document.getElementById("canvas");
var ctx = 0;

var imgM = [bird,bg,fg,pipeUp,pipeBottom]
function no_zero_img_size() {
        console.log(imgM.length)
        for (var i=0;i<imgM.length;i++){
            imgM[i].width*=zn
            imgM[i].height*=zn
            console.log("ширина",imgM[i].width)
        }
        //console.log("")
}

function moveUp(){
  if (!flag){
    console.log('click')
    //alert('click')
    t1 = (new Date).getTime();
    schet = 15*zn;
    //non = 1*zn
    z = 3*zn
    //yPos -= 20;
  }
  else{
    flag = false
    xPos = 20;
    yPos = 150;

    schet = 1*zn;
    //non=10*zn
    z=3*zn
    grav=1*zn
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
}
document.addEventListener("keydown",moveUp);
document.addEventListener("click",moveUp);
var pipe = [];
var particl = [];
//setTimeout(vk_bridge_no_event_confin, 1);
function initdraw(){
  zn_width = innerWidth/bg.width
  zn_height = innerHeight/bg.height
  if (zn_width<zn_height){
    zn=zn_width
  }
  else{
    zn=zn_height
  }
  console.log(zn,bg.height,bg.width,innerHeight,innerWidth)
  zn *= 1
  cvs.height*=zn
  cvs.width*=zn

  ctx = cvs.getContext("2d");
  ctx.fillStyle = "#000";
  ctx.font = 30*zn+"px Verdana";

  gap *= zn
  grav *= zn
  z *= zn;
  //non *= zn
  schet *= zn;
  pixel_pipe_move *= zn
  no_zero_img_size()
  pipe.push({
    gap_ran: Math.random()*10,
    x: cvs.width,
    y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height
  });
  /*
  particl.push({
    x_z:Math.random()-0.5,
    y_z:Math.random()-0.5,
    x: Math.round(Math.random()*10),
    y: Math.round(Math.random()*10),
    rad:10
  });
  */
  draw()
}
var flag = false;
function draw(){
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    ctx.drawImage(bg,0,0,bg.width,bg.height);
    var cvs_fg = cvs.height - fg.height
    var yPos_bird = yPos + bird.height

    var bool_pos = yPos_bird >= cvs_fg 
    var bool_pos_5_zn = yPos_bird >= cvs_fg - 200*zn
    for (var i = 0; i < pipe.length; i++){
        if (!flag && (xPos + bird.width-5 >= pipe[i].x 
            && xPos <= pipe[i].x + pipeUp.width 
            && (yPos <= pipe[i].y + pipeUp.height 
                || yPos + bird.height >= pipe[i].y + pipeUp.height+gap-pipe[i].gap_ran) 
                || bool_pos)){
                  /*
                  if (!flag){
                    particl = [];
                    for (var g = 0; g<20; g++){
                      particl.push({
                        x_z:Math.random()-0.5,
                        y_z:Math.random()-0.5,
                        x: xPos + Math.round((Math.random()/2)*10),
                        y: yPos + Math.round((Math.random()/2)*10),
                        rad:20
                      });
                    }
                    console.log(particl)
                    ctx.fillStyle="white"
                    for (var g = 0; g<20; g+=0.1){
                      for (var gg = 0; gg<20; gg++){
                        ctx.fillRect(particl[gg].x, particl[gg].y, particl[gg].rad-g, particl[gg].rad-g)
                        particl[gg].x+=particl[gg].x_z
                        particl[gg].y+=particl[gg].y_z
                        //console.log(g,gg)
                      }
                      //ctx.drawImage(bg,0,0,bg.width,bg.height);
                    }
                  }
                  */
                    flag = true
                    grav=3
                    schet=0
                    //non=0
                    //bridge.send("VKWebAppShowNativeAds", {ad_format:"interstitial"})


                    /*
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
                    */

        }
        //console.log(pipe.length , pipe[i].x/3,pipe[i].y)
        if (pipe[i].x<-pipeUp.width){
          pipe.shift()
        }
        //console.log(pipe[i].x,pixel_pipe_move,pipe[i].x/pixel_pipe_move,pipe.length,pipe[i].x,pipe[i].y)
        ctx.drawImage(pipeUp, pipe[i].x,pipe[i].y,pipeUp.width,pipeUp.height);
        ctx.drawImage(pipeBottom, pipe[i].x,pipe[i].y + pipeUp.height + gap - pipe[i].gap_ran,pipeBottom.width,pipeBottom.height);  
        if (!flag){
          pipe[i].x-=pixel_pipe_move;
          if (creat_board_int == 20){
            score++;
           }
        }
        creat_board_int = Math.round(pipe[i].x/pixel_pipe_move)
        if (creat_board_int == 27){
        pipe.push({
          gap_ran: Math.random()*10,
          x: cvs.width,
          y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height
          });
        }
    }

    t2 = ((new Date).getTime() - t1)/100;
    if (schet > 0){
        var t2_schet = t2*schet
        yPos-=t2_schet;
        //console.log(t2,schet,t2_schet)
        schet-=t2_schet/5;
    }
    if (t2<2){
      k-=z*2
      if (k<-15){
        k=-15
      }
    }
    else{
      if (z>=3){
        z-=1
      } 
      if (k<90){
          k+=z*0.7
      }
      if (k>90){
        k=90
      }
  }
       // if (non>0){
            //non-=1
            //k+=1
        //}

    //console.log(schet,k)
    //console.log(t2,k,z,schet)
        if ( t2 > 2){
          if (!bool_pos){
            yPos += t2*grav;
            if (yPos>cvs_fg-bird.height){
              yPos=cvs_fg-bird.height
            }
          }
          if(flag && bool_pos_5_zn){
            console.log(1234)
            //non=0
            z=12*zn
          }
        }
        //console.log(z)
    ctx.drawImage(fg,0,cvs.height - fg.height,fg.width,fg.height);
    //xPos=0
    //yPos=0
    //ctx.fillRect(xPos+bird.width/2,yPos+bird.height/2,5,5)
    ctx.translate(xPos+bird.width/2,yPos+bird.height/2);
    
    ctx.rotate(k*pi_180);
    ctx.drawImage(bird,-bird.width / 2, -bird.height / 2, bird.width, bird.height);
    //ctx.drawImage(bird,xPos,yPos);
    ctx.rotate((360-k)*pi_180);
    ctx.setTransform(1,0,0,1,0,0);
    ctx.strokeText("Счет: " + score, 10, cvs.height - 20);
    //ctx.fillText("Счет: " + score, 10, cvs.height - 20, 1000);

    //ctx.restore();
    requestAnimationFrame(draw);
  };
//bg.onload = initdraw();
window.onload= function(){
  console.log("windowload")
  initdraw()
}
