const PIXEL_SIZE = 30;
const OCTAVE = 100;
// const NUM_PARTICLES = 10000;
const DENSITY = 50;
const RADIUS = 5;

const PARTICLE_MAG = 3;
const VECTOR_MAG = PARTICLE_MAG / 3;

const particles = [];
const drawn_particles = [];

var OFFSET = 0;


function get_colour(x, y) {
	let j = x / windowWidth;
	let k = y / windowHeight;

	let r = j * 255;
	let g = 200;
	let b = k * 255;

	return [r, g, b]; 
}


class Particle {
	constructor(x, y) {
		this.set_x(x);
		this.set_y(y);
		this.prev_x = this.x;
		this.prev_y = this.y;
		this.velocity = this.get_vector();//p5.Vector.random2D();
		this.velocity.setMag(PARTICLE_MAG);
		this.colour = get_colour(this.x, this.y);
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
		for (let particle of drawn_particles) {
			if (dist(particle.x, particle.y, this.x, this.y) <= RADIUS)
				return;
		}

		fill(...this.colour,255);
		//strokeWeight(RADIUS);
		circle(this.x, this.y, RADIUS);

		drawn_particles.push({x: this.x, y: this.y})
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
