import { Vector } from "./vector.js";
import { Particle } from "./particle.js";

/**
 * emitter factory to create particle
 */
export class Emitter {
    /**
     * @param {Vector} point
     * @param {Vector} velocity
     * @param {number} spread
     */
    constructor(point, velocity, spread) {
        this.position = point;
        this.velocity = velocity;
        this.spread = spread || Math.PI / 32;
    }

    emit() {
        const angle = this.velocity.getAngle() + this.spread - (Math.random() / this.spread * 4);
        const magnitude = this.velocity.getMagnitude();
        const position = new Vector(this.position.x, this.position.y);
        const velocity = Vector.fromAngle(angle, magnitude);

        return new Particle(position, velocity);
    }
}