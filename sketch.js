let noiseMap;
let particles;
let width,height;
let particleCount;
let negative=-1;
class Particle{
  constructor(){
    this.negative = int(random(0,2))*2-1
    this.antiFlip = false;
    this.prevVector=0;
    this.finished=false;
    this.timeStart=20;
    this.timer=this.timeStart;
    this.scaleX=2;
    this.scaleY=2;
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
    //stroke(0,map(this.y,-height/20,height/20,66,158)+map(-abs(this.x),-3/4,0,100,150),map(-abs(this.y),-height/20,-5,0,100)) 
    //stroke(map(dist(abs(this.x),abs(this.y),0,0),0,20,255,0),map(dist(abs(this.x),abs(this.y),0,0),0,20,100,0),0)
    //console.log(map(this.x,-width/2,width/2,0,255));
    //stroke(10+map(abs(this.y),0,height/20,0,150),66+map(abs(this.y),0,height/20,0,150),120+map(abs(this.y),0,height/20,0,150))
    stroke(255);
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
    if(this.antiFlip && abs(-1*noiseMap[int((this.x+width/20))][int((this.y+height/20))]-this.prevVector)>abs(noiseMap[int((this.x+width/20))][int((this.y+height/20))]-this.prevVector)){
        this.negative=1;
    }else if(this.antiFlip && abs(-1*noiseMap[int((this.x+width/20))][int((this.y+height/20))]-this.prevVector)<abs(noiseMap[int((this.x+width/20))][int((this.y+height/20))]-this.prevVector)){
        this.negative=-1;
    }
    //console.log(noiseMap[int((this.x+width/20))][int((this.y+height/20))])
    //console.log(abs(this.negative*noiseMap[int((this.x+width/20))][int((this.y+height/20))]-this.prevVector),abs(noiseMap[int((this.x+width/20))][int((this.y+height/20))]-this.prevVector))
    this.prevX=this.x;
    this.prevY=this.y;
    this.prevVector = this.negative*noiseMap[int((this.x+width/20))][int((this.y+height/20))];
    this.x+=this.negative*cos(noiseMap[int((this.x+width/20))][int((this.y+height/20))])/10;
    this.y+=this.negative*sin(noiseMap[int((this.x+width/20))][int((this.y+height/20))])/10;
    
    if(this.x>width/20 || this.x<-width/20 || this.y<-height/20 || this.y>height/20){
        
        // this.spawnX();
        // this.spawnY();
        this.finished=true;
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
    background(0,5);
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

function slopeEquation(x,y){
  //let slope = 1-x*y/50
  //let slope = 10*Math.tan(x), timer 20
  let slope = x*y/50
  return slope;
}

