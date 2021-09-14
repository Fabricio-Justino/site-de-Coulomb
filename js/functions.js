function degToRadians(deg) {
    return (deg * Math.PI) / 180;
}

function radiansToDeg(radians) {
    return (180 / Math.PI) * radians;
}

function sin(rad) {
    return Math.sin(rad);
}

function cos(rad) {
    return Math.cos(rad);
}

function tan(rad) {
    return Math.tan(rad);
}

function mouse(event) {
    return {
        x: event.offsetX,
        y: event.offsetY
    };
}

function createVector(x = 0, y = 0) {
    return new Vector(x, y);
}

function createCanvas(width, height, id = 'none') {
    return new Canvas(width, height, id);
}

function random(valMax, valMin = 0) {
    if (!valMax) {
        return Math.random();
    }
    return Math.floor((Math.random() * (valMax - valMin))) + valMin;
}

class Vector {

    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    add(vec) {
        this.x += vec.x;
        this.y += vec.y;
        return this;
    }

    sub(vec) {
        this.x -= vec.x;
        this.y -= vec.y;
        return this;
    }

    mult(num) {
        this.x *= num;
        this.y *= num;
        return this;
    }

    mag() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    magSq() {
        return this.mag() * this.mag();
    }

    normalize() {
        this.mult(1 / this.mag());
        if (this.mag() > 0) {}
        return this;
    }

    setMag(mag) {
        return this.normalize().mult(mag);
    }

    limit(li) {
        if (this.mag() > li) {
            this.setMag(li)
        }
    }

    heading() {
        return Math.atan2(this.y, this.x);
    }

    static add(v, v2) {
        let temp = new Vector()
        temp.x = v.x + v2.x;
        temp.y = v.y + v2.y;
        return temp;
    }

    static sub(v, v2) {
        let temp = new Vector()
        temp.x = v.x - v2.x;
        temp.y = v.y - v2.y;
        return temp;
    }

    static mult(vec, num) {
        let temp = new Vector()
        temp.x = vec.x * num;
        temp.y = vec.y * num;
        return temp;
    }

    static normalize(vec) {
        if (vec.mag() > 0) {
            vec.mult(1 / this.mag());
        }
        return vec;
    }

    static setMag(vec, mag) {
        return vec.normalize().mult(mag);
    }

    static reverse(vec) {
        let temp = new Vector();
        temp.x = -vec.x;
        temp.y = -vec.y;

        return temp;
    }
}

class Canvas {

    constructor(width = 600, height = 400, id = 'none', ctxType = '2d') {
        if (id !== 'none') {
            this.canvas = document.getElementById(id);
        } else {
            this.canvas = document.querySelector('canvas');
        }
        this.canvas.width = width;
        this.canvas.height = height;

        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.ctx = this.canvas.getContext(ctxType);
    }

    fillRect(x, y, width, height, color = 'white') {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, width, height);
    }

    rect(x, y, width, height, strokeColor = 'black') {
        this.ctx.strokeStyle = strokeColor;
        this.ctx.strokeRect(x, y, width, height);
    }

    strokedRect(x, y, width, height, color = 'white', strokeColor = 'black') {
        this.fillRect(x, y, width, height, color, this.ctx);
        this.rect(x, y, width, height, strokeColor, this.ctx);
    }

    dot(x, y, radius, color = 'white') {
        this.ctx.beginPath();
        this.ctx.fillStyle = color;
        this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.closePath();
    }

    circle(x, y, radius, color = 'white') {
        this.ctx.beginPath();
        this.ctx.strokeStyle = color;
        this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
        this.ctx.stroke();
        this.ctx.closePath();
    }

    strokedDot(x, y, radius, color = 'white', strokeColor = 'black') {
        this.dot(x, y, radius, color, this.ctx);
        this.circle(x, y, radius, strokeColor, this.ctx);
    }

    backGround(red = 255, blue = 255, green = 255, alpha = 1.0) {
        alpha = (alpha < 0 || alpha > 1) ? 1.0 : alpha;
        const color = `rgba(${red},${green},${blue},${alpha})`
        this.ctx.fillStyle = color;
        this.fillRect(0, 0, this.canvas.width, this.canvas.height, color);
    }

    clearScreen(bgColor = 'white') {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = bgColor;
        this.fillRect(0, 0, this.canvas.width, this.canvas.height, bgColor);
    }

    line(x0, y0, x1, y1) {
        this.ctx.beginPath();
        this.ctx.moveTo(x0, y0);
        this.ctx.lineTo(x1, y1);
        this.ctx.stroke();
        this.ctx.closePath();
    }

    strokeWeight(weight) {
        this.this.ctx.lineWidth = weight;
    }

    strokeColor(color) {
        this.ctx.strokeStyle = color;
    }

    setColor(color) {
        this.ctx.fillStyle = color;
    }

    getContext() {
        return this.ctx;
    }

    getCanvas() {
        return this.canvas;
    }

}