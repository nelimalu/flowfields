let noiseMap;
let particles;
let width,height;
let particleCount;
class Particle{
  constructor(){
    this.x=int(random(-width/100,width/100))*5;
    this.y=int(random(-height/100,height/100))*5;
    this.negative = int(random(0,2))*2-1
    this.prevVector=0;
    this.prevX=this.x;
    this.prevY=this.y;
    this.finished=false;
    this.timer=100;
  }
  
  display(){
    //fill(100*this.x/40+100,100*this.y/25+100,this.prevVector+100);
    //fill(255);  
    //stroke(100*this.x/40+100,100*this.y/25+100,this.prevVector+100);
    //stroke(map(this.y,-height/20,height/20,33,255),map(this.y,-height/20,height/20,66,158)+map(-abs(this.x),-2,0,100,150),map(this.y,-height/20,height/20,156,0)) 
    stroke(0,map(this.y,-height/20,height/20,66,158)+map(-abs(this.x),-3/4,0,100,150),map(-abs(this.y),-height/20,-5,0,50)) 

    //console.log(map(this.x,-width/2,width/2,0,255));
    strokeWeight(3);
    line(10*this.x,10*this.y,this.prevX*10,this.prevY*10); 
    //ellipse(this.x*10,this.y*10,3,3);
  }
  
  update(){
    this.timer--;
    if(this.timer<=0){
        //this.x=random(-width/20,width/20);
        //this.y=random(-height/20,height/20);
        this.x=int(random(-width/100,width/100))*5;
        this.y=int(random(-height/100,height/100))*5;
        this.prevX=this.x;
        this.prevY=this.y;
        this.timer=100;
        //this.finished=false;
        this.finished=false;
        return;
    }
    if(abs(-1*noiseMap[int((this.x+width/20))][int((this.y+height/20))]-this.prevVector)>abs(noiseMap[int((this.x+width/20))][int((this.y+height/20))]-this.prevVector)){
        this.negative=1;
    }else if(abs(-1*noiseMap[int((this.x+width/20))][int((this.y+height/20))]-this.prevVector)<abs(noiseMap[int((this.x+width/20))][int((this.y+height/20))]-this.prevVector)){
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
        
        // this.x=random(-width/20,width/20);
        // this.y=random(-height/20,height/20);
        // this.prevX=this.x;
        // this.prevY=this.y;
        this.finished=true;
    }
    
    
    //console.log(this.prevVector);
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
    if(particles[i].finished){
        continue;
    }
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
  let slope = -x*y/2
  return slope;
}

