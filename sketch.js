let noiseMap;
let particles;
let width,height;
class Particle{
  constructor(){
    this.x=-width/2
    this.y=random(-height/2,height/2);
  }
  
  display(){
    fill(255,0,0);
    ellipse(this.x,this.y,3,3);
  }
  
  update(){
    this.x+=2*cos(noiseMap[int((this.x+width/2)/10)][int((this.y+height/2)/10)]);
    this.y+=2*sin(noiseMap[int((this.x+width/2)/10)][int((this.y+height/2)/10)]);    
  }
}
function setup() {
    width = 800;
    height = 500;
    createCanvas(width, height);
    rectMode(CENTER);
    angleMode(DEGREES); 
    noStroke();
    noiseMap = [];
    particles = [];
    for(let i=0;i<width/2+1;i++){
        noiseMap[i]=[];
    }
    for(let i=0;i<100000;i++){
      append(particles,new Particle())
    }
    background(50,5,40);
    slopeLines();
}
function draw() {
    background(50,5,40,5);
    display();
}

function display(){
  push();
  translate(width/2,height/2);
  scale(1,-1);
  //line(-width,0,height,0);
  //line(0,-width,0,height);
  
  for(let i=0;i<100;i++){
    particles[i].update();
    particles[i].display();
  }
  pop();  
}

function slopeLines(){
  for(let i=-width/2;i<width/2;i+=10){
    for(let j=-height/2;j<height/2;j+=10){
      push();
      translate(i,j);
      rotate(atan(slopeEquation(i,j)));
      noiseMap[(i+width/2)/10][(j+height/2)/10]=atan(slopeEquation(i,j))+noise(i,j)*100-50;
      console.log(noise(i,j))
      //line(-4,0,4,0);
      pop();
    }
  }
}

function slopeEquation(x,y){
  let slope = 0;
  return slope;
}

