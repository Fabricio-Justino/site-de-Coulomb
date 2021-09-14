class Box {

    constructor() {
        this.particles = [];
    }

    render(can) {
        can.backGround(0, 0, 0, 0.1);
        this.particles.forEach((e) => e.render(can));
    }

    add(p) {
        this.particles.push(p);
    }

    simulate(width, height, contactTransfer = true) {
        for (let i = 0; i < this.particles.length; i++) {
             if (this.particles[i].vel.mag() > 20) {
                 this.particles.splice(i, 1);
                 i--;
             } 
            if (this.particles.length > 1) {
                for (let j = 0; j < this.particles.length; j++) {
                    let p1 = this.particles[i];
                    let p2 = this.particles[j];
                    if (i === j) {
                        continue;
                    }
                    //Coulomb's law
                    //(K.Q.q) / d^2
                    // vector form 
                    let force = Vector.sub(p2.position, p1.position);
                    let distanceSq = force.magSq();
                    const K = 1;
                    let result = K * Math.abs(p1.charge * p2.charge) / distanceSq;

                    if (p1.charge > 0 && p2.charge > 0 || p1.charge < 0 && p2.charge < 0) {
                        result = -result;
                    }

                    if (Math.sqrt(distanceSq) - (p1.radius + p2.radius) <= 0) {
                        force.setMag(0.01);
                        if (contactTransfer) {
                            p1.charge = Number(((p1.charge + p2.charge) / 2).toFixed(2));
                            p2.charge = p1.charge;
                        }
                    } else {
                        force.setMag(result);
                    }

                    p1.setForce(force);
                    p2.setForce(Vector.reverse(force));


                    p1.update(width, height);
                    p2.update(width, height);
                }
            }
        }
    }
}