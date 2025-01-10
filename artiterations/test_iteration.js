const PIXEL_SIZE = 30;
const OCTAVE = 15;
const NUM_PARTICLES = 1000;

const VECTOR_MAG = 1;
const PARTICLE_MAG = 5;

const pixels = [];
const particles = [];


class Pixel {
	HORIZONTAL = createVector(1,0);

	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.render_x = x * PIXEL_SIZE;
		this.render_y = y * PIXEL_SIZE;
		this.center_x = this.render_x + PIXEL_SIZE / 2;
		this.center_y = this.render_y + PIXEL_SIZE / 2;
		this.vector = createVector(
			noise(this.x / OCTAVE, this.y / OCTAVE) * 2 - 1,
			noise((this.x + 1000000) / OCTAVE, (this.y + 1000000) / OCTAVE) * 2 - 1
		);
		this.vector.setMag(VECTOR_MAG * 5);
	}

	get_colour() {
		return map(this.value, -1, 1, 0, 255);
	}

	get_angle() {
		return this.HORIZONTAL.angleBetween(this.vector);
	}

	draw() {
		//stroke(this.get_colour());
		//rect(this.render_x, this.render_y, PIXEL_SIZE, PIXEL_SIZE);
		fill(0,0,0);
		stroke(0,0,0);
		ellipse(this.center_x, this.center_y, 3, 3);

		line(
			this.center_x,
			this.center_y,
			this.center_x + this.vector.x,
			this.center_y + this.vector.y
		);
	}
}


class Particle {
	constructor(x, y) {
		this.set_x(x);
		this.set_y(y);
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
			noise(this.flow_x / OCTAVE, this.flow_y / OCTAVE) * 2 - 1,
			noise((this.flow_x + 1000000) / OCTAVE, (this.flow_y + 1000000) / OCTAVE) * 2 - 1
		);
		v.setMag(VECTOR_MAG);
		return v;
	}

	move() {
		let push_vector = this.get_vector();
		this.velocity.add(push_vector);
		this.velocity.setMag(PARTICLE_MAG);

		this.set_x(this.x + this.velocity.x);
		this.set_y(this.y + this.velocity.y);
	}

	draw() {
		fill(255,0,0);
		noStroke();
		ellipse(this.x, this.y, 10, 10);
	}
}


function generate_pixels() {
	for (let i = 0; i < windowWidth / PIXEL_SIZE; i++) {
		for (let j = 0; j < windowHeight / PIXEL_SIZE; j++) {
			pixels.push(new Pixel(i, j));
		}
	}
}

function generate_particles() {
	for (let i = 0; i < NUM_PARTICLES; i++) {
		particles.push(new Particle(random() * windowWidth, random() * windowHeight))
	}
}


function setup() {
	createCanvas(windowWidth, windowHeight);

	//generate_pixels();
	generate_particles();
}

function draw() {
	background(255,255,255);

	// for (let pixel of pixels) {
	// 	pixel.draw();
	// }

	for (let particle of particles) {
		particle.move();
		particle.draw();
	}
}
