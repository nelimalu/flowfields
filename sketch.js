let noiseMap;
let particles;
class Particle{
  constructor(){
    this.x=random(-180,0);
    this.y=random(-180,180);
  }
  
  display(){
    fill(100,50,150);
    ellipse(this.x,this.y,3,3);
  }
  
  update(){
    this.x+=5*cos(noiseMap[int((this.x+180)/10)][int((this.y+180)/10)]);
    this.y+=5*sin(noiseMap[int((this.x+180)/10)][int((this.y+180)/10)]);
    if(this.x>180)this.x=0;
    if(this.y>180)this.y=0;
    
  }
}
function setup() {
  createCanvas(400, 400);
  rectMode(CENTER);
  angleMode(DEGREES);
      noiseMap = [];
  particles = [];
  for(let i=0;i<100;i++){
    append(particles,new Particle())
  }
}
function draw() {
  background(220);
  for(let i=0;i<37;i++){
    noiseMap[i]=[];
  }
  display();
}

function display(){
  push();
  translate(width/2,height/2);
  scale(1,-1);
  line(-180,0,180,0);
  line(0,-180,0,180);
  slopeLines();
  for(let i=0;i<100;i++){
    particles[i].update();
    particles[i].display();
  }
  pop();  
}

function slopeLines(){
  for(let i=-180;i<=180;i+=10){
    for(let j=-180;j<=180;j+=10){
      push();
      translate(i,j);
      rotate(atan(slopeEquation(i,j)));
      noiseMap[(i+180)/10][(j+180)/10]=atan(slopeEquation(i,j));
      line(-4,0,4,0);
      pop();
    }
  }
}

function slopeEquation(x,y){
  let slope = x-y;
  return slope;
}

