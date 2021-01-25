'use strict'; // Forces me to write better

let canvas = document.getElementById('canvas'), // HTML canvas object
    ctx = canvas.getContext('2d'),              // Canvas context
    speed = 200,                                // Simulation speed
    size = 20,                                  // Cell size
    run = true,                                 // Simulation on/off bool
    engine,                                     // Holds the game engine
    mDown,                                      // Mouse down bool
    mAction,                                    // Place / break bool
    randSize = 20,                              // Size for rand gen
    bgColor = '#ffffff',                        // Background color
    cellColor = '#00a0fa',                      // Cell color
    cursorColor = '#fa0000',                    // Cursor Color
    pos = {x:0,y:0},                            // Mouse position relative to canvas
    posKey = '0.0';                             // String form of pos
ctx.canvas.width  = 1920;                       // Working space width (not visual size)
ctx.canvas.height = 1080;                       // Working space height (not visual size)

let bits = {'20.20':true,
            '22.20':true,
            '22.19':true,
            '21.19':true,
            '21.18':true
           }; //holy crap why is this so fast
let config = {toLive:[2,3],toBirth:[3]};

function getMousePos(canvas, evt) {
    let rect = canvas.getBoundingClientRect();
    return {
        x: (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
        y: (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
    };
}

window.addEventListener('mousemove', function updateMouse(e) {
    pos = getMousePos(canvas, e);
    pos.x = Math.floor(pos.x / size);
    pos.y = Math.floor(pos.y / size);
    posKey = String(pos.x).concat('.', pos.y);
    if (mDown && pos.x >= 0 && pos.y >= 0 && pos.x <= Math.floor(ctx.canvas.width / size) && pos.y <= Math.floor(ctx.canvas.height / size)) {
        if (posKey in bits) {
            if (!mAction) {
                delete bits[posKey];
            }
        } else if (mAction) {
            bits[posKey] = true;
        }
    }
});

window.addEventListener('mousedown', function onMouseDown(e) {
    mDown = true;
    if (pos.x >= 0 && pos.y >= 0 && pos.x <= Math.floor(ctx.canvas.width / size) && pos.y <= Math.floor(ctx.canvas.height / size)) {
        if (posKey in bits) {
            mAction = false;
            delete bits[posKey];
        } else {
            bits[posKey] = true;
            mAction = true;
        }
    }
});

window.addEventListener('mouseup', function onMouseUp(e) {
    mDown = false;
});

function center() {
    let n = 0,
        tx = 0,
        ty = 0;
    for (const [key, value] of Object.entries(bits)) {
        n++;
        tx += parseInt(key.split('.')[0]);
        ty += parseInt(key.split('.')[1]);
    }
    let ax = Math.floor(tx / n),
        ay = Math.floor(ty / n);
    let newBits = [];
    for (const [key, value] of Object.entries(bits)) {
        newBits.push([parseInt(key.split('.')[0]) + Math.floor(0.5 * ctx.canvas.width / size) - ax, parseInt(key.split('.')[1]) + Math.floor(0.5 * ctx.canvas.height / size) - ay]);
    }
    bits = {};
    for (let i = 0; i < newBits.length; i++) {
        bits[String(newBits[i][0]).concat('.', newBits[i][1])] = true;
    }
}
center()

function startEngine() {
    engine = setInterval(function engine() {
    let die = [],
        potential = [];
    for (const [key, value] of Object.entries(bits)) {
        let neighbors = 0,
            keys = key.split('.');
        for (let x = 0; x < 3; x++) {
            for (let y = 0; y < 3; y++) {
                let check = String(parseInt(keys[0])-1+x).concat('.', parseInt(keys[1])-1+y),
                    checks = check.split('.');
                if (check in bits && (checks[0] != keys[0] || checks[1] != keys[1])) {
                    neighbors++;
                } else if (check in bits === false && (checks[0] != keys[0] || checks[1] != keys[1])) {
                    potential.push(check);
                }
            }
        }
        if (!config.toLive.includes(neighbors)) {
            die.push(key);
        }
    }
    let born = [];
    for (let i = 0; i < potential.length; i++) {
        let neighbors = 0,
            pot = potential[i].split('.');
        for (let x = 0; x < 3; x++) {
            for (let y = 0; y < 3; y++) {
                let check = String(parseInt(pot[0])-1+x).concat('.',parseInt(pot[1])-1+y);
                if (check in bits) {
                    neighbors++;
                }
            }
        }
        if (config.toBirth.includes(neighbors)) {
            born.push(potential[i]);
        }
    }
    for (let i = 0; i < born.length; i++) {
        if (born[i] in bits === false) {
            bits[born[i]] = true;
        }
    }
    for (let i = 0; i < die.length; i++) {
        delete bits[die[i]];
    }
}, speed);
}
startEngine();

function command(cmd, extra) {
    switch (cmd) {
        case 'clear':
            bits = {};
            break;
        case 'pause':
            if (extra.innerHTML == '||') {
                clearInterval(engine);
                extra.innerHTML = '▶';
            } else {
                startEngine();
                extra.innerHTML = '||';
            }
            break;
        case 'center':
            center();
            break;
        case 'scale':
            size = extra;
            center();
            break;
        case 'move':
            let newBits = [];
            for (const [key, value] of Object.entries(bits)) {
                newBits.push([parseInt(key.split('.')[0]) + extra.x, parseInt(key.split('.')[1]) + extra.y]);
            }
            bits = {};
            for (let i = 0; i < newBits.length; i++) {
                bits[String(newBits[i][0]).concat('.', newBits[i][1])] = true;
            }
            break;
        case 'speed':
            speed = extra;
            if (document.getElementById('pause').innerHTML == '||') {
                clearInterval(engine);
                startEngine();
            }
            break;
        case 'rand':
            bits = {};
            for (let x = 0; x < randSize; x++) {
                for (let y = 0; y < randSize; y++) {
                    if (Math.random() > 0.5) {
                        bits[String(x).concat('.', y)] = true;
                    }
                }
            }
            center();
            break;
        case 'rules':
            config = {toLive:[],toBirth:[]};
            if (extra.charAt(0) == '/') {
                let b = extra.substring(1).split('');
                for (let i = 0; i < b.length; i++) {
                    config.toBirth.push(parseInt(b[i]));
                }
            } else {
                let s = extra.split('/');
                let b = s[1].split('');
                s = s[0].split('');
                for (let i = 0; i < s.length; i++) {
                    config.toLive.push(parseInt(s[i]));
                }
                for (let i = 0; i < b.length; i++) {
                    config.toBirth.push(parseInt(b[i]));
                }
            }
            break;
        case 'bgColor':
            bgColor = extra;
            break;
        case 'cellColor':
            cellColor = extra;
            break;
        case 'cursorColor':
            cursorColor = extra;
            break;
    }
}

setInterval(function render() {
    ctx.globalAlpha = 1;
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = cellColor;
    for (const [key, value] of Object.entries(bits)) {
        let keys = key.split('.');
        ctx.fillRect(keys[0]*size, keys[1]*size, size, size);
    }
    ctx.fillStyle = cursorColor;
    ctx.globalAlpha = 0.4;
    ctx.fillRect(pos.x*size, pos.y*size, size, size);
}, (50 / 3));