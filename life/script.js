//TODO:
//Frontend
//Optimizations

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
    cursorSize = 1,                             // Cursor Size
    gridColor = '#000000',                      // Grid Color
    grid = false,                               // Grid on/off bool
    gridThick = 2,                              // Grid thickness
    tempBits = {},                              // Stores alternate bits temporarily
    pos = {x:0,y:0},                            // Mouse position relative to canvas
    posKey = '0.0';                             // String form of pos
ctx.canvas.width  = 1920;                       // Working space width (not visual size)
ctx.canvas.height = 1080;                       // Working space height (not visual size)

let bits = {'20.20':true,
            '22.20':true,
            '22.19':true,
            '21.19':true,
            '21.18':true
           }; //holy crap why is this so fast for an otherwise unoptimized alg?
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
        if (!mAction) {
            if (cursorSize == 1) {
                delete bits[posKey];
            } else {
                for (let x = 0; x < cursorSize; x++) {
                    for (let y = 0; y < cursorSize; y++) {
                        delete bits[String(pos.x-((cursorSize-1)/2)+x).concat('.', pos.y-((cursorSize-1)/2)+y)];
                    }
                }
            }
        } else {
            if (cursorSize == 1) {
                bits[posKey] = true;
            } else {
                for (let x = 0; x < cursorSize; x++) {
                    for (let y = 0; y < cursorSize; y++) {
                        bits[String(pos.x-((cursorSize-1)/2)+x).concat('.', pos.y-((cursorSize-1)/2)+y)] = true;
                    }
                }
            }
        }
    }
});

window.addEventListener('mousedown', function onMouseDown(e) {
    mDown = true;
    if (pos.x >= 0 && pos.y >= 0 && pos.x <= Math.floor(ctx.canvas.width / size) && pos.y <= Math.floor(ctx.canvas.height / size)) {
        if (posKey in bits) {
            mAction = false;
            if (cursorSize == 1) {
                delete bits[posKey];
            } else {
                for (let x = 0; x < cursorSize; x++) {
                    for (let y = 0; y < cursorSize; y++) {
                        delete bits[String(pos.x-((cursorSize-1)/2)+x).concat('.', pos.y-((cursorSize-1)/2)+y)];
                    }
                }
            }
        } else {
            if (cursorSize == 1) {
                bits[posKey] = true;
            } else {
                for (let x = 0; x < cursorSize; x++) {
                    for (let y = 0; y < cursorSize; y++) {
                        bits[String(pos.x-((cursorSize-1)/2)+x).concat('.', pos.y-((cursorSize-1)/2)+y)] = true;
                    }
                }
            }
            mAction = true;
        }
    }
});

window.addEventListener('mouseup', function onMouseUp(e) {
    mDown = false;
});

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
center();

function fit() {
    let high = {},
        low = {},
        first = true;
    for (const [key, value] of Object.entries(bits)) {
        if (first) {
            high.x = parseInt(key.split('.')[0]);
            high.y = parseInt(key.split('.')[1]);
            low.x = parseInt(key.split('.')[0]);
            low.y = parseInt(key.split('.')[1]);
        } else {
            if (parseInt(key.split('.')[0]) > high.x) {
                high.x = parseInt(key.split('.')[0]);
            } else if (parseInt(key.split('.')[0]) < low.x) {
                low.x = parseInt(key.split('.')[0]);
            }
            if (parseInt(key.split('.')[1]) > high.y) {
                high.y = parseInt(key.split('.')[1]);
            } else if (parseInt(key.split('.')[1]) < low.y) {
                low.y = parseInt(key.split('.')[1]);
            }
        }
        first = false;
    }
    let scale = Math.floor((ctx.canvas.height / (high.y - low.y)) * 0.75);
    let oldsize = size;
    size = Math.floor((ctx.canvas.width / (high.x - low.x)) * 0.75);
    if (scale < size) {
        size = scale;
    }
    if (size < 1) {
        size = 1;
    } else if (isNaN(size) || size == Infinity) {
        size = oldsize;
    } else if (size > 100) {
        size = 100;
    }
    document.getElementById('scale').value = size;
    center();
}

function load(lif) {
    let lines = lif.split('\n');
    if (lines[0].includes('1.05')) {
        bits = {};
        let build = false,
            loc = [0,0],
            step = 0;
        for (let i = 1; i < lines.length; i++) {
            if (!build) {
                let tag = lines[i].substring(0, 2);
                if (tag == '#N') {
                    config = {toLive:[2,3],toBirth:[3]};
                    document.getElementById('rules').value = '23/3';
                } else if (tag == '#R') {
                    let live = lines[i].substring(3).split('/')[0].split(''),
                        birth = lines[i].substring(3).split('/')[1].split('');
                    config = {toLive:live.map(Number), toBirth:birth.map(Number)};
                    document.getElementById('rules').value = lines[i].substring(3);
                } else if (tag == '#P') {
                    loc = [parseInt(lines[i].substring(3).split(' ')[0]), parseInt(lines[i].substring(3).split(' ')[1])];
                    build = true;
                } else if (lines[i].substring(0,1) == '.' || lines[i].substring(0,1) == '*') {
                    build = true;
                    i--;
                }
            } else {
                if (lines[i].substring(0,2) == '#P') {
                    loc = [parseInt(lines[i].substring(3).split(' ')[0]), parseInt(lines[i].substring(3).split(' ')[1])];
                    step = 0;
                } else {
                    let cells = lines[i].split('');
                    for (let j = 0; j < cells.length; j++) {
                        if (cells[j] == '*') {
                            bits[String(loc[0] + j).concat('.', loc[1] + step)] = true;
                        }
                    }
                    step++;
                }
            }
        }
        fit();
    } else alert('Must be a Life 1.05 file!');
}

function convertToLife() {
    let activeBits = false;
    for (let prop in bits) {
        if (bits.hasOwnProperty(prop)) activeBits = true;
    }
    if (activeBits) {
        let output = ['#Life 1.05'];
        if (config.toLive.sort().length == 2 && config.toLive[0] == 2 && config.toLive[1] == 3 && config.toBirth.length == 1 && config.toBirth[0] == 3) {
            output.push('#N');
        } else output.push('#R '.concat(config.toLive.join(''), '/', config.toBirth.join('')));
        let lowx, lowy, highx, highy;
        for (const [key, value] of Object.entries(bits)) {
            if (parseInt(key.split('.')[0]) < lowx || !lowx) {
                lowx = parseInt(key.split('.')[0]);
            }
            if (parseInt(key.split('.')[1]) < lowy || !lowy) {
                lowy = parseInt(key.split('.')[1]);
            }
            if (parseInt(key.split('.')[0]) > highx || !highx) {
                highx = parseInt(key.split('.')[0]);
            }
            if (parseInt(key.split('.')[1]) > highy || !highy) {
                highy = parseInt(key.split('.')[1]);
            }
        }
        let modBits = {};
        for (const [key, value] of Object.entries(bits)) {
            let x = parseInt(key.split('.')[0]) - lowx,
                y = parseInt(key.split('.')[1]) - lowy;
            if (!modBits[String(y)]) modBits[String(y)] = '.'.repeat(highx - lowx + 1);
            modBits[String(y)] = modBits[String(y)].substring(0, x) + '*' + modBits[String(y)].substring(x + 1);
        }
        for (let i = 0; i < highy - lowy + 1; i++) {
            if (!modBits[String(i)]) modBits[String(i)] = 'x';
            let line = modBits[String(i)].replace(/\.+$/gm, '');
            if (line == 'x') line = '.';
            output.push(line);
        }
        return output.join('\n');
    } else return false;
}

function updateSaves() {
    let patterns = JSON.parse(localStorage.getItem('patterns')),
        options = '';
    if (patterns) {
        for (let i = 0; i < patterns.length; i++) {
            options += '<option value="' + patterns[i] + '">';
            options += patterns[i];
            options += '</option>';
        }
        document.getElementById('saves').innerHTML = options;
    }
}
updateSaves();

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
        case 'size':
            extra.value = Math.floor(extra.value);
            if (extra.value % 2 === 0) {
                extra.value--;
            }
            cursorSize = extra.value;
            break;
        case 'gridColor':
            gridColor = extra;
            break;
        case 'grid':
            grid = extra;
            break;
        case 'gridThick':
            gridThick = extra;
            break;
        case 'flipx':
            tempBits = {};
            for (const [key, value] of Object.entries(bits)) {
                tempBits[key.split('.')[0].concat('.',-parseInt(key.split('.')[1]))] = true;
            }
            bits = tempBits;
            center();
            break;
        case 'flipy':
            tempBits = {};
            for (const [key, value] of Object.entries(bits)) {
                tempBits[String(-parseInt(key.split('.')[0])).concat('.',key.split('.')[1])] = true;
            }
            bits = tempBits;
            center();
            break;
        case 'rotate':
            tempBits = {};
            for (const [key, value] of Object.entries(bits)) {
                tempBits[String(-parseInt(key.split('.')[1])).concat('.',key.split('.')[0])] = true;
            }
            bits = tempBits;
            center();
            break;
        case 'fit':
            fit();
            break;
        case 'upload':
            let reader = new FileReader();
            reader.onload = function() {
                load(reader.result);
            };
            reader.readAsText(extra);
            document.getElementById('upload').value = '';
            break;
        case 'download':
            let life = convertToLife();
            if (life) {
                let filename = prompt('Download as...') + '.life',
                    element = document.createElement('a');
                element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(life));
                element.setAttribute('download', filename);
                element.style.display = 'none';
                document.body.appendChild(element);
                element.click();
                document.body.removeChild(element);
            } else alert('Nothing to download!');
            break;
        case 'save':
            let lif = convertToLife();
            if (lif) {
                let name = prompt('Name for pattern to be saved:');
                if (name == 'patterns') {
                    alert('Sorry, the name \'patterns\' is reserved.');
                } else if (name.includes('\'')) {
                alert('Illegal character \'!');
                } else if (name.includes('"')) {
                    alert('Illegal character "!');
                } else if (name !== null && name !== '' && name) {
                    localStorage.setItem(name, lif);
                    let patterns = JSON.parse(localStorage.getItem('patterns'));
                    if (patterns) {
                        if (!patterns.includes(name)) {
                            patterns.push(name);
                            localStorage.setItem('patterns', JSON.stringify(patterns));
                        }
                    } else localStorage.setItem('patterns', JSON.stringify([name]));
                    updateSaves();
                }
            } else alert('Nothing to save!');
            break;
        case 'load':
            load(localStorage.getItem(document.getElementById('saves').value));
            break;
        case 'delete':
            let val = document.getElementById('saves').value;
            if (confirm('Are you sure you want to delete \'' + val + '\'?')) {
                let patterns = JSON.parse(localStorage.getItem('patterns'));
                if (patterns.includes(val)) {
                    patterns.splice(patterns.indexOf(val), 1);
                    localStorage.removeItem(val);
                    localStorage.setItem('patterns', JSON.stringify(patterns));
                    updateSaves();
                }
            }
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
    ctx.globalAlpha = 0.5;
    ctx.fillRect(pos.x*size-((cursorSize-1)/2)*size, pos.y*size-((cursorSize-1)/2)*size, size*cursorSize, size*cursorSize);
    if (cursorSize != 1) {
        ctx.fillRect(pos.x*size, pos.y*size, size, size);
    }
    if (grid) {
        ctx.strokeStyle = gridColor;
        ctx.lineWidth = gridThick;
        ctx.globalAlpha = 1;
        for (let i = 0; i < Math.ceil(ctx.canvas.width / size); i++) {
            ctx.beginPath();
            ctx.moveTo(i * size, 0);
            ctx.lineTo(i * size, ctx.canvas.height);
            ctx.stroke();
        }
        for (let i = 0; i < Math.ceil(ctx.canvas.height / size); i++) {
            ctx.beginPath();
            ctx.moveTo(0, i * size);
            ctx.lineTo(ctx.canvas.width, i * size);
            ctx.stroke();
        }
    }
}, (50 / 3));
