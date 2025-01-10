let noiseMap;
let particles;
let width,height;
let particleCount;
let negative=-1;

let treeBool=false;
let heartBool=false;
let waterBool=false;
let forestBool=false;
let sunBool=false;

let respawn=true;
let antiFlip=false;
let vel=5;

class Particle{
  constructor(){
    this.negative = int(random(0,2))*2-1
    this.prevVector=0;
    this.finished=false;
    this.timeStart=100;
    this.timer=this.timeStart;
    this.scaleX=1;
    this.scaleY=1;
    this.spawnX();
    this.spawnY();
  }
  
  display(){
    if(this.finished){
        return;
    }
    //fill(100*this.x/40+100,100*this.y/25+100,this.prevVector+100);
    //fill(255);  
    //stroke(100*this.x/40+100,100*this.y/25+100,this.prevVector+100);
    //stroke(map(this.y,-height/20,height/20,33,255),map(this.y,-height/20,height/20,66,158)+map(-abs(this.x),-2,0,100,150),map(this.y,-height/20,height/20,156,0)) 
    
    
    //christmas tree
    if(treeBool){
        stroke(0,map(this.y,-height/20,height/20,66,158)+map(-abs(this.x),-3/4,0,100,150),map(-abs(this.y),-height/20,-5,0,100)) 
    }
    
    //heart
    if(heartBool){
        stroke(map(dist(abs(this.x),abs(this.y),0,0),0,20,255,50),map(dist(abs(this.x),abs(this.y),0,0),0,5,100,50),50)
    }

    //water
    if(waterBool){
        stroke(10+map(abs(this.x),0,width/40,150,0),66+map(abs(this.x),0,width/40,150,0),120+map(abs(this.x),0,width/20,150,0))
    }

    //forest
    if(forestBool){
        stroke(20,51,6);
    }

    //sun
    if(sunBool){
        if(dist(this.x,this.y,0,0)<20){
            stroke('#f29100')
        }else if(Math.random()*100<1){
            stroke(255)
        }else{
            stroke(0)
        }
    }
    
    
    strokeWeight(3);
    line(10*this.x,10*this.y,this.prevX*10,this.prevY*10); 
    //ellipse(this.x*10,this.y*10,3,3);
  }
  
  update(){
    this.timer--;
    if(this.timer<=0){
        //this.x=random(-width/40,width/40);
        //this.y=random(-height/30,height/30);
        //this.x=int(random(-width/100,width/100))*5;
        //this.y=int(random(-height/100,height/100))*5;
        this.spawnX();
        this.spawnY();
        this.timer=this.timeStart;
        this.finished=false;
        return;
    }
    if(this.finished){
        return;
    }
    if(antiFlip && abs(-1*noiseMap[int((this.x+width/20))][int((this.y+height/20))]-this.prevVector)>abs(noiseMap[int((this.x+width/20))][int((this.y+height/20))]-this.prevVector)){
        this.negative=1;
    }else if(antiFlip && abs(-1*noiseMap[int((this.x+width/20))][int((this.y+height/20))]-this.prevVector)<abs(noiseMap[int((this.x+width/20))][int((this.y+height/20))]-this.prevVector)){
        this.negative=-1;
    }
    //console.log(noiseMap[int((this.x+width/20))][int((this.y+height/20))])
    //console.log(abs(this.negative*noiseMap[int((this.x+width/20))][int((this.y+height/20))]-this.prevVector),abs(noiseMap[int((this.x+width/20))][int((this.y+height/20))]-this.prevVector))
    this.prevX=this.x;
    this.prevY=this.y;
    this.prevVector = this.negative*noiseMap[int((this.x+width/20))][int((this.y+height/20))];
    this.x+=vel*this.negative*cos(noiseMap[int((this.x+width/20))][int((this.y+height/20))])/10;
    this.y+=vel*this.negative*sin(noiseMap[int((this.x+width/20))][int((this.y+height/20))])/10;
    
    if(this.x>width/20 || this.x<-width/20 || this.y<-height/20 || this.y>height/20){
        
        if(respawn){
            this.spawnX();
            this.spawnY();
        }else{
            this.finished=true;
        }
    }
  }

  spawnX(){
    this.x=int(random(-width/(this.scaleX*20),width/(20*this.scaleX)))*this.scaleX;
    this.prevX=this.x;
  }
  
  spawnY(){
    this.y=int(random(-height/(this.scaleY*20),height/(this.scaleY*20)))*this.scaleY;
    this.prevY=this.y;
  }
}


let alpha=5;
function setup() {
    width = 800;    
    height = 500;
    createCanvas(width, height);
    rectMode(CENTER);
    angleMode(DEGREES); 
    //noStroke();
    noiseMap = [];
    particles = [];
    particleCount=1000;
    for(let i=0;i<width/2+1;i++){
        noiseMap[i]=[];
    }
    for(let i=0;i<particleCount;i++){
      append(particles,new Particle())
    }
    background(0);
    slopeLines();
}
function draw() {
    background(0,alpha);
    display();
}

function display(){
  push();
  translate(width/2,height/2);
  scale(1,-1);
  //line(-width,0,height,0);
  //line(0,-width,0,height);
  
  for(let i=0;i<particleCount;i++){
    // if(particles[i].finished){
    //     continue;
    // }
    particles[i].update();
    particles[i].display();
    
  }
  pop();  
}

function slopeLines(){
  for(let i=-width/20;i<width/20;i+=1){
    for(let j=-height/20;j<height/20;j+=1){
      push();
      translate(i*20,j*20);
      rotate(atan(slopeEquation(i,j)));
      noiseMap[(i+width/20)][(j+height/20)]=atan(slopeEquation(i,j))/*+noise(i,j)*100-50*/;
      stroke(255);
      //line(-4,0,4,0);
      pop();
    }
  }
}
let slope,x,y;
function slopeEquation(x,y){
  if(treeBool){
    slope=-x*y/2;
  }else if(heartBool){
    slope = 1-x*y/50;
  }else if(waterBool){
    slope = 1/Math.sqrt(pow(x,2)+1)*2
  }else if(forestBool){
    slope = Math.tan(10000*x)
  }else if(sunBool){
    slope= 2-x*y/100;
  }
  
  return slope;
}

function tree(){
    background(0)
    treeBool=true;
    heartBool=false;
    waterBool=false;
    forestBool=false;
    sunBool=false;
    alpha=1
    vel=1;
    antiFlip=false;
    respawn=false;
    for(let i=0;i<particleCount;i++){
        particles[i].scaleX=5;
        particles[i].scaleY=5;
        particles[i].timeStart=100;
        particles[i].timer=particles[i].timeStart;
        particles[i].negative = int(random(0,2))*2-1;
        particles[i].spawnX();
        particles[i].spawnY();
    }
    slopeLines();
}

function heart(){
    background(0)
    treeBool=false;
    heartBool=true;
    waterBool=false;
    forestBool=false;
    sunBool=false;
    alpha=20
    vel=5;
    antiFlip=false;
    respawn=false;
    for(let i=0;i<particleCount;i++){
        particles[i].scaleX=1;
        particles[i].scaleY=1;
        particles[i].timeStart=170;
        particles[i].timer=particles[i].timeStart;
        particles[i].negative = int(random(0,2))*2-1;
        particles[i].spawnX();
        particles[i].spawnY();
    }
    slopeLines();
}

function water(){
    background(0)
    treeBool=false;
    heartBool=false;
    waterBool=true;
    forestBool=false;
    sunBool=false;
    alpha=10
    vel=5;
    antiFlip=false;
    respawn=true;
    for(let i=0;i<particleCount;i++){
        particles[i].scaleX=1;
        particles[i].scaleY=1;
        particles[i].timeStart=1000;
        particles[i].timer=particles[i].timeStart;
        particles[i].negative=-1;
        particles[i].spawnX();
        particles[i].spawnY();
    }
    slopeLines();
}

function forest(){
    background(0)
    treeBool=false;
    heartBool=false;
    waterBool=false;
    forestBool=true;
    sunBool=false;
    alpha=10
    vel=5;
    antiFlip=false;
    respawn=true;
    for(let i=0;i<particleCount;i++){
        particles[i].scaleX=1;
        particles[i].scaleY=1;
        particles[i].timeStart=100000;
        particles[i].timer=particles[i].timeStart;
        particles[i].negative = int(random(0,2))*2-1;
        particles[i].spawnX();
        particles[i].spawnY();
    }
    slopeLines();
}

function sun(){
    background(0)
    treeBool=false;
    heartBool=false;
    waterBool=false;
    forestBool=false;
    sunBool=true;
    alpha=10
    vel=5;
    antiFlip=true;
    respawn=true;
    for(let i=0;i<particleCount;i++){
        particles[i].scaleX=1;
        particles[i].scaleY=1;
        particles[i].timeStart=100;
        particles[i].timer=particles[i].timeStart;
        particles[i].negative = int(random(0,2))*2-1;
        particles[i].spawnX();
        particles[i].spawnY();
    }
    slopeLines();
}