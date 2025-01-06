import pygame
from perlin_noise import PerlinNoise
import math
from random import randint

WIDTH = 500
HEIGHT = 500
win = pygame.display.set_mode((WIDTH, HEIGHT))
clock = pygame.time.Clock()

PIXELS_WIDTH = 25
PIXEL_WIDTH = WIDTH // PIXELS_WIDTH

noise = PerlinNoise(octaves=5, seed=15)


def squish(value, in_min, in_max, out_min, out_max):
	in_range = in_max - in_min
	percentage = (value - in_min) / in_range
	return (out_max - out_min) * percentage + out_min


class Pixel:
	ARROW_LENGTH = PIXEL_WIDTH // 3

	def __init__(self, x, y, value):
		self.x = x
		self.y = y
		self.real_x = x * PIXEL_WIDTH
		self.real_y = y * PIXEL_WIDTH
		self.value = value
		self.angle = squish(value, -1, 1, 0, math.pi * 2)

	def get_angle(self):
		return self.angle

	def draw_arrow(self):
		center_x = self.real_x + PIXEL_WIDTH // 2
		center_y = self.real_y + PIXEL_WIDTH // 2

		head_x = center_x + math.cos(self.angle) * (self.ARROW_LENGTH)
		head_y = center_y + math.sin(self.angle) * (self.ARROW_LENGTH)

		tail_x = center_x + math.cos(self.angle + math.pi) * (self.ARROW_LENGTH)
		tail_y = center_y + math.sin(self.angle + math.pi) * (self.ARROW_LENGTH)

		pygame.draw.line(win, (255,0,0), (tail_x, tail_y), (head_x, head_y))


	def draw(self):
		pygame.draw.rect(win, [squish(self.value, -1, 1, 0, 255)] * 3, (self.real_x, self.real_y, PIXEL_WIDTH, PIXEL_WIDTH))
		self.draw_arrow()

		self.x += 1
		# self.y += 1
		self.value = noise([self.x / PIXELS_WIDTH, self.y / PIXELS_WIDTH])
		self.angle = squish(self.value, -1, 1, 0, math.pi * 2)



class Particle:
	def __init__(self, x, y):
		self.x = x
		self.y = y
		self.velocity = 1

	def get_fake_x(self):
		return int(self.x // PIXEL_WIDTH)

	def get_fake_y(self):
		return int(self.y // PIXEL_WIDTH)

	def move(self, noise_map):
		angle = noise_map[self.get_fake_y()][self.get_fake_x()].get_angle()
		self.x += math.cos(angle) * self.velocity
		self.y += math.sin(angle) * self.velocity

		if self.y >= HEIGHT:
			self.y = 0
		if self.y < 0:
			self.y = HEIGHT - 1
		if self.x >= WIDTH:
			self.x = 0
		if self.x < 0:
			self.x = WIDTH - 1

		# if self.y >= HEIGHT or self.y < 0 or self.x >= WIDTH or self.x < 0:
		# 	self.x = randint(0, WIDTH - 1)
		# 	self.y = randint(0, HEIGHT - 1)

	def draw(self):
		pygame.draw.circle(win, (0,0,255), (self.x, self.y), 1)


def update(noise_map, particles):
	# win.fill((240,240,240))

	# for y, row in enumerate(noise_map):
	# 	for x, pixel in enumerate(row):
	# 		pixel.draw()

	for particle in particles:
		particle.move(noise_map)
		particle.draw()

	pygame.display.flip()


def f(coord):
	try:
		return coord[0] * coord[1]
	except:
		return 10000000


def main():
	noise_map = [[Pixel(i, j, noise([i/PIXELS_WIDTH, j/PIXELS_WIDTH])) for j in range(PIXELS_WIDTH)] for i in range(PIXELS_WIDTH)]

	particles = [Particle(randint(0, WIDTH - 1), randint(0, HEIGHT - 1)) for i in range(1000)]

	run = True
	while run:
		clock.tick(10)
		for event in pygame.event.get():
			if event.type == pygame.QUIT:
				run = False

		update(noise_map, particles)


main()
pygame.quit()

