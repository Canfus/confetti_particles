import { Vector } from "./vector.js";

const colors = ["#4285f4", "#ea4335", "#fbbc05", "#34a853"];

export class Particle {
    /**
     * @param {Vector} point
     * @param {Vector} velocity
     * @param {Vector | undefined} acceleration
     * @param {string | undefined} color
     */
    constructor(point, velocity, acceleration, color) {
        this.position = point || new Vector(0, 0);
        this.velocity = velocity || new Vector(0, 0);
        this.acceleration = acceleration || new Vector(0, 0);
        this.color = color ?? colors[Math.floor(Math.random() * colors.length)];
    }

    /**
     * move particle
     */
    move() {
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
    }
}