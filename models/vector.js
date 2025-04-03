/**
 * vector that illustrate position
 */
export class Vector {
    constructor(x, y) {
        this.x = x || 0;
        this.y = y || 0;
    }

    add(vector) {
        this.x += vector.x;
        this.y += vector.y;
    }

    private norm(x: number, y: number) {
        return x * x + y * y;
    }

    getMagnitude() {
        return Math.sqrt(this.norm(this.x, this.y));
    }

    getAngle() {
        return Math.atan2(this.y, this.x);
    }

    static fromAngle(angle, magnitude) {
        return new Vector(magnitude * Math.cos(angle), magnitude * Math.sin(angle));
    }
}
