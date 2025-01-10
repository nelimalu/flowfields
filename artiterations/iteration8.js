const PIXEL_SIZE = 30;
const OCTAVE = 50;
// const NUM_PARTICLES = 10000;
const DENSITY = 100;

const PARTICLE_MAG = 3;
const VECTOR_MAG = PARTICLE_MAG / 3;

const particles = [];

var OFFSET = 0;
const START = Date.now();
const END = 5000;


class Particle {
	constructor(x, y) {
		this.set_x(x);
		this.set_y(y);
		this.prev_x = this.x;
		this.prev_y = this.y;
		this.velocity = p5.Vector.random2D();
		this.velocity.setMag(PARTICLE_MAG);
	}

	set_x(new_position) {
		this.x = new_position;
		this.flow_x = Math.floor(new_position / PIXEL_SIZE);
	}

	set_y(new_position) {
		this.y = new_position;
		this.flow_y = Math.floor(new_position / PIXEL_SIZE);
	}

	get_vector() {
		let v = createVector(
			noise((this.flow_x + OFFSET) / OCTAVE, (this.flow_y + OFFSET) / OCTAVE) * 2 - 1,
			noise((this.flow_x + 1000000 + OFFSET) / OCTAVE, (this.flow_y + 1000000 + OFFSET) / OCTAVE) * 2 - 1
		);
		v.setMag(VECTOR_MAG);
		return v;
	}

	move() {
		let push_vector = this.get_vector();
		this.velocity.add(push_vector);
		this.velocity.setMag(PARTICLE_MAG);

		this.prev_x = this.x;
		this.prev_y = this.y;

		this.set_x(this.x + this.velocity.x);
		this.set_y(this.y + this.velocity.y);
	}

	thickness() {
		return 3 * sin(Date.now() / 100) + 5;
	}

	draw() {
		stroke(255,255,255,255);
		strokeWeight(this.thickness());
		//noStroke();
		// ellipse(this.x, this.y, 1, 1);
		let angle = atan2(this.prev_y - this.y, this.prev_x - this.x);
		let distance = dist(this.x, this.y, this.prev_x, this.prev_y) - 0.5;
		let x2 = this.prev_x + cos(angle) * distance;
		let y2 = this.prev_y + sin(angle) * distance;
		line(this.prev_x, this.prev_y, x2, y2);
	}
}


function generate_particles() {
	for (let i = 0; i < windowWidth / DENSITY; i++) {
		for (let j = 0; j < windowHeight / DENSITY; j++) {
			particles.push(new Particle(i * DENSITY, j * DENSITY))
		}
	}
}


function setup() {
	createCanvas(windowWidth, windowHeight);

	generate_particles();
	background(0,0,0);
}

function draw() {
	//background(255,255,255);
	//OFFSET++;

	for (let particle of particles) {
		particle.move();
		particle.draw();
	}
}
