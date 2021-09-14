let canvasPatternWidth = document.querySelector('.laws > .container').clientWidth;
let canvasPatternHeight = Math.round(document.querySelector('.laws > .container').clientWidth * (50 / 100));

let canvas = [];

let cAtr = createCanvas(canvasPatternWidth, canvasPatternHeight, 'atract');
let cRep = createCanvas(canvasPatternWidth, canvasPatternHeight, 'repulsion');
let cCon = createCanvas(canvasPatternWidth, canvasPatternHeight, 'conservation');

canvas.push(cAtr);
canvas.push(cRep);
canvas.push(cCon);

canvas.forEach((e) => e.clearScreen('balck'));

let animate1, animate2, animate3;

let boxs = [new Box(), new Box(), new Box()];

window.addEventListener('resize', () => {
    canvasPatternWidth = document.querySelector('.laws > .container').clientWidth;
    canvasPatternHeight = Math.round(document.querySelector('.laws > .container').clientWidth * (50 / 100));

    canvas.forEach((e) => {
        e.getCanvas().width = canvasPatternWidth;
        e.getCanvas().height = canvasPatternHeight;
        e.clearScreen('black');
    })
});

canvas[0].getCanvas().addEventListener('click', () => {
    createState(1);
    if (animate1) {
        cancelAnimationFrame(animate1);
    }
    updateBoxOne();
});

canvas[1].getCanvas().addEventListener('click', () => {
    createState(2);
    if (animate2) {
        cancelAnimationFrame(animate2);
    }
    updateBoxTwo();
});

canvas[2].getCanvas().addEventListener('click', (e) => {
    createState(3, mouse(e).x, mouse(e).y);
    if (animate3) {
        cancelAnimationFrame(animate3);
    }
    updateBoxThree();
});

function updateBoxOne() {
    boxs[0].render(canvas[0]);
    boxs[0].simulate(canvasPatternWidth, canvasPatternHeight, false);
    animate1 = requestAnimationFrame(updateBoxOne);
}

function updateBoxTwo() {
    boxs[1].render(canvas[1]);
    boxs[1].simulate(canvasPatternWidth, canvasPatternHeight, false);
    animate2 = requestAnimationFrame(updateBoxTwo);
}

function updateBoxThree() {
    boxs[2].render(canvas[2]);
    boxs[2].simulate(canvasPatternWidth, canvasPatternHeight, true);
    animate3 = requestAnimationFrame(updateBoxThree);
}

function createState(num, x= 0, y = 0) {
    let centerX = canvasPatternWidth / 2;
    let centerY = canvasPatternHeight / 2;
    switch (num) {
        case 1:
            boxs[0] = new Box();
            box = boxs[0];
            let canvasAtract = canvas[0].getCanvas();
            box.add(new Particle(random(27, centerX), random(27, centerY), 25, random(20, 40)));
            box.add(new Particle(random(centerX, canvasAtract.width - 27), random(centerY, canvasAtract.height - 27), 25, -random(10, 30)));
            break;
        case 2:
            boxs[1] = new Box();
            box = boxs[1];
            box.add(new Particle(random(centerX - 200, centerX), random(centerY - 30, centerY + 30), 25, random(20, 40)));
            box.add(new Particle(random(centerX + 50, centerX + 60), random(centerY, centerY + 30), 25, random(10, 30)));
            break;
        case 3:
           // boxs[2] = new Box();
            box = boxs[2];
            let v1 = (random(2) === 1) ? 1 : -1;
           // let v2 = (random(2) === 1) ? 1 : -1;
            box.add(new Particle(x, y, 25, v1 * random(100)));
            //box.add(new Particle(random(30, centerX * 2 - 30), random(30, centerY * 2 - 30), 25, v2 * random(100, 200)));
            break;
    }
}

function _click() {
    boxs[2] = new Box();
}