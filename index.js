import {Particle} from "./models/particle.js";
import {Vector} from "./models/vector.js";
import {Emitter} from "./models/emitter.js";

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

document.body.appendChild(canvas);

/**
 * how many particles will be created
 * @type {number}
 */
const PARTICLE_COUNT = 200;
/**
 * size of particle
 * @type {number}
 */
const PARTICLE_SIZE = 5;
/**
 * speed of particle
 * @type {number}
 */
const PARTICLE_SPEED = 2;
/**
 * how many particles will be created at rate
 * @type {number}
 */
const EMISSION_RATE = 10;
/**
 * center of screen by x
 * @type {number}
 */
const MIDDLE_X = canvas.width / 2;
/**
 * center of screen by y
 * @type {number}
 */
const MIDDLE_Y = canvas.height / 2;

/**
 * @type {Particle[]}
 */
let PARTICLES = [];
/**
 * emitters that will generate particles
 * @type {Emitter[]}
 */
const EMITTERS = [
  new Emitter(
    new Vector(MIDDLE_X, MIDDLE_Y),
    Vector.fromAngle(0, PARTICLE_SPEED),
    Math.PI / 32
  ),
];

/**
 * function to create particles
 */
function addParticles() {
  if (PARTICLES.length > PARTICLE_COUNT) {
    return;
  }

  for (const emitter of EMITTERS) {
    for (let i = 0; i < EMISSION_RATE; i += 1) {
      PARTICLES.push(emitter.emit());
    }
  }
}

/**
 * function to move particles
 * @param boundsX
 * @param boundsY
 */
function plotParticles(boundsX, boundsY) {
  const currentParticles = [];

  for (const particle of PARTICLES) {
    const pos = particle.position;

    if (pos.x < 0 || pos.x > boundsX || pos.y < 0 || pos.y > boundsY) {
      continue;
    }

    particle.move();
    currentParticles.push(particle);
  }

  PARTICLES = currentParticles;
}

/**
 * function to draw particles
 */
function drawParticles() {
  for (const particle of PARTICLES) {
    const pos = particle.position;

    ctx.fillStyle = particle.color;
    ctx.fillRect(pos.x, pos.y, PARTICLE_SIZE, PARTICLE_SIZE);
  }
}

function loop() {
  clear();
  update();
  drawParticles();
  queue();
}

function clear() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function update() {
  addParticles();
  plotParticles(canvas.width, canvas.height);
}

function queue() {
  window.requestAnimationFrame(loop);
}

loop();
