const particles = [];


class Vector {
  constructor(magnitude, angle) {
    this.magnitude = magnitude;
    this.angle = angle;
  }

  get_x_component() {
    return this.magnitude / cos(this.angle);
  }

  get_y_component() {
    return this.magnitude / sin(this.angle);
  }

  add(vec2) {
    return vector_from_components(
      vec2.get_x_component() + this.get_x_component(),
      vec2.get_y_component() + this.get_y_component()
    );
  }
}


class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.velocity = this.update_velocity();
  }

  update_velocity() {
    return vector_from_components(
      x_func(this.x, this.y),
      y_func(this.x, this.y)
    );
  }

  move() {
    this.x += cos(this.velocity.angle);// * this.velocity.magnitude;
    this.y += sin(this.velocity.angle);// * this.velocity.magnitude;
    this.velocity = this.update_velocity();
    //console.log(this.velocity);

    if (this.x < 0 || this.x > windowWidth || this.y < 0 || this.y > windowHeight) {
      this.y = random(windowHeight);
      this.x = random(windowWidth);
    }
  }

  draw() {
    fill(255, 255, 255, 1);
    stroke(255,255,255);
    ellipse(this.x, this.y, 3, 3);
  }
}

function vector_from_components(x_magnitude, y_magnitude) {
  let magnitude = sqrt(x_magnitude ** 2 + y_magnitude ** 2);
  let angle = tan(y_magnitude / x_magnitude);
  return new Vector(magnitude, angle);
}

function x_func(x, y) {
  return (noise(x / 1000) * 2 - 1) * 1;
}

function y_func(x, y) {
  return (noise((y + 10000) / 1000) * 2 - 1) * 1;
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(600);
  background(0,0,0,255);

  for (let i = 0; i < 1000; i++) {
    particles.push(new Particle(random(windowWidth), random(windowHeight)));
  }
}

function draw() {
  //background(0,0,0,10);

  for (let particle of particles) {
    particle.move();
    particle.draw();
  }

}