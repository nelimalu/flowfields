const PIXEL_SIZE = 30;
const OCTAVE = 2;
const NUM_PARTICLES = 10000;

const PARTICLE_MAG = 3;
const VECTOR_MAG = PARTICLE_MAG / 10;

const particles = [];

var OFFSET = 0;


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

	draw() {
		stroke(255,255,255,8);
		strokeWeight(3);
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
	for (let i = 0; i < NUM_PARTICLES; i++) {
		particles.push(new Particle(random() * windowWidth, random() * windowHeight))
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
