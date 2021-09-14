class Particle {

    constructor(x, y, radius, charge) {
        this.position = new Vector(x, y);
        this.acc = new Vector();
        this.vel = new Vector();
        this.radius = radius;
        this.charge = charge;
    }

    render(can) {
        let color = (this.charge > 0) ? 'red' : 'blue';
        color = (this.charge === 0) ? 'grey' : color;
        can.getContext().font = '18px serif';
        can.getContext().textAlign = 'center';
        can.dot(this.position.x, this.position.y, this.radius, color);
        can.setColor('black');
        can.getContext().fillText(this.charge, this.position.x, this.position.y + this.radius / 5);
    }

    applyForce(force) {
        this.acc.add(force);
    }

    setForce(force) {
        this.acc = force;
    }

    update(width, height) {
        if (this.position.x + this.radius > width) {
            this.position.x = width - this.radius
            this.vel.x *= -1;
        } else if (this.position.x - this.radius < 0) {
            this.position.x = this.radius;
            this.vel.x *= -1;
        }

        if (this.position.y + this.radius > height) {
            this.position.y = height - this.radius;
            this.vel.y *= -1
        } else if (this.position.y - this.radius < 0) {
            this.position.y = this.radius;
            this.vel.y *= -1
        }

        this.vel.add(this.acc);
        this.position.add(this.vel);
    }

}