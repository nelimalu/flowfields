const PIXEL_SIZE = 30;
const OCTAVE = 10;
const NUM_PARTICLES = 5000;

const PARTICLE_MAG = 6;
const VECTOR_MAG = PARTICLE_MAG / 10;

const particles = [];

var OFFSET = 0;


function get_colour(x, y) {
	let j = x / windowWidth;
	let k = y / windowHeight;

	let r = 150;
	let g = 255 - k * 255;
	let b = 150;

	return [r, g, b]; 
}


class Particle {
	constructor(x, y) {
		this.init(x, y);
	}

	init(x, y) {
		this.set_x(x);
		this.set_y(y);
		this.prev_x = this.x;
		this.prev_y = this.y;
		this.velocity = p5.Vector.random2D();
		this.velocity.setMag(PARTICLE_MAG);
		this.start = Date.now();
		this.start_delay = random() * 1000;
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
		if (Date.now() - this.start < this.start_delay)
			return;

		let push_vector = this.get_vector();
		this.velocity.add(push_vector);
		this.velocity.setMag(PARTICLE_MAG);

		this.prev_x = this.x;
		this.prev_y = this.y;

		this.set_x(this.x + this.velocity.x);
		this.set_y(this.y + this.velocity.y);
	}

	draw() {
		if (Date.now() - this.start < this.start_delay)
			return;

		if (Date.now() - this.start > 3000 + this.start_delay) {
			this.init(random() * windowWidth, random() * windowHeight);
		}

		// if (!this.visible)
		// 	return;

		stroke(...this.colour, 255);
		strokeWeight(2);
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
		particles.push(new Particle(random() * windowWidth, random() * windowHeight));
	}
}


function setup() {
	createCanvas(windowWidth, windowHeight);

	generate_particles();
	background(255,255,255);

	for (let i = 0; i < windowWidth; i++) {
		for (let j = 0; j < windowHeight; j++) {
			set(i, j, color(...get_colour(i, j)));
		}
	}

	updatePixels();
}

function draw() {
	//background(255,255,255);
	//OFFSET++;

	for (let particle of particles) {
		particle.move();
		particle.draw();
	}
}
