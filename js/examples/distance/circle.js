function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    stepLength = 16;
    x = 0;
    y = 0;
    dx = 0;
    dy = -1;
    steps = 0;
    next = 1;
    phase = 0;

    count = 0;
    background(20, 80, 130);
}

function distance(p, center, radius) {
    return Math.sqrt(Math.pow(p.x - center.x, 2) + Math.pow(p.y - center.y, 2)) - radius; // or use p5.Vector.dist()
}

function draw() {
    const hw = width / 2;
    const hh = height / 2;

    const p = createVector(x * stepLength, y * stepLength);
    const dist = distance(p, createVector(0, 0), 128);
    const size = Math.max(0.25, 1 - (128 - Math.abs(dist)) / 128) * 4;
    push();
    translate(hw, hh);
    if (dist >= 0) {
        fill(0); noStroke();
    } else {
        fill(255); noStroke();
    }

    drawCircleMarker(p, size);
    pop();

    x += dx;
    y += dy;
    steps ++;

    if (steps >= next) {
        steps = 0;
        if (dx == 1) {
            dx = 0; dy = 1;
        } else if (dx == -1) {
            dx = 0; dy = -1;
        } else if (dy == 1) {
            dx = -1; dy = 0;
        } else if (dy == -1) {
            dx = 1; dy = 0;
        }
        if (phase == 1) {
            next ++;
        }
        phase = (phase + 1) % 2;

        if (next * stepLength >= height) {
            background(20, 80, 130);
            x = 0; y = 0; dx = 0; dy = -1; steps = 0; next = 1; phase = 0;
        }
    }
}

  /** drawCircleMarker **/
