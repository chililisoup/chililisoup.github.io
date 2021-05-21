//https://tetris.wiki/Super_Rotation_System
//board 10x20 (10x40 usable) (Bottom row row 1 (not 0 mkay))
let pieces = [
    [
        0,0,0,0,
        1,1,1,1,
        0,0,0,0,
        0,0,0,0,
    ],
    [
        0,1,1,
        1,1,0,
        0,0,0,
    ],
    [
        1,1,0,
        0,1,1,
        0,0,0,
    ],
    [
        0,0,1,
        1,1,1,
        0,0,0,
    ],
    [
        1,0,0,
        1,1,1,
        0,0,0,
    ],
    [
        0,1,0,
        1,1,1,
        0,0,0,
    ],
    [
        1,1,
        1,1,
    ]
];

let board = {};
let play = {};
let held = null;
let next = Math.floor(Math.random() * pieces.length);

function rotate(arr) { //this goes counterclockwise! Make go clockwise
    let n = Math.sqrt(arr.length);
    let out = new Array(arr.length);
    for (let i = 0; i < arr.length; i++) {
        out[i%n*n+n-Math.floor(i/n)-1] = arr[i];
    }
    return out;
}

function get2dCoords(i, length, pos) {
    pos = pos || {x:0, y:0};
    let x = pos.x+(i%Math.sqrt(length));
    let y = pos.y+(Math.floor(i/Math.sqrt(length)));
    return {x:x, y:y};
}

function getBoardCoords(string) {
    return {x:string.split('.')[0],
            y:string.split('.')[1]};
}

function clearLines() { //doesnt work
    for (let i = 1; i < 40; i++) {
        let full = true;
        for (let j = 0; j < 10; j++) {
            if (!board[`${i}.${j}`]) full = false;
        }
        if (full) {
            for (let j = 0; j < 10; j++) {
                delete board[`${i}.${j}`];
            }
            for (let j = i + 1; j < 40; j++) {
                for (let k = 0; k < 10; k++) {
                    if (board[`${j}.${k}`]) {
                        board[`${j - 1}.${k}`] = board[`${j}.${k}`];
                        delete board[`${j}.${k}`];
                    }
                }
            }
            i--;
        }
    }
}

function spawnPiece(id) {
    play.piece = pieces[id];
    play.type = id;
    play.x = 5 - Math.floor(Math.sqrt(pieces[id].length) / 2);
    play.y = 18 + Math.sqrt(pieces[id].length);
}
spawnPiece(1);

function placePiece() {
    play.piece.forEach((on, i) => {
        if (on) {
            let pos = get2dCoords(i, play.piece.length, play);
            board[`${pos.x}.${pos.y}`] = play.type;
        }
    });
    clearLines();
    spawnPiece(Math.floor(Math.random() * pieces.length));
}

function canPlace() {
    for (let i = 0; i < play.piece.length; i++) {
        if (play.piece[i]) {
            let pos = get2dCoords(i, play.piece.length, play);
            if (pos.y == 1) return true;
            if (board[`${pos.x}.${pos.y - 1}`]) return true;
        }
    };
    return false;
}

function kbHandler(k) {
    switch (k) {
        case 'arrowup':
            play.piece = rotate(play.piece);
            break;
        case 'arrowleft':
            play.x--;
            break;
        case 'arrowright':
            play.x++;
            break;
        case 'arrowdown':
            play.y--;
            break;
        case ' ':
            while (!canPlace()) play.y--;
    }
    if (canPlace()) placePiece();
}
let kb = new KeyboardIn(kbHandler);

let engine = new Engine(() => {
    if (!canPlace() && !kb.keys.arrowdown) {
        play.y--;
    }
    if (canPlace()) placePiece();
}, 1000);
engine.start();

let canvas = new Canvas('tetris', 800, 1600);
let render = new Engine(() => {
    canvas.ctx.fillStyle = '#9999bb';
    canvas.ctx.fillRect(0, 0, 800, 1600);
    canvas.ctx.fillStyle = '#ffb3c6';
    play.piece.forEach((on, i) => {
        if (on) {
            let pos = get2dCoords(i, play.piece.length, play);
            canvas.ctx.fillRect(80*pos.x, 1600-(80*pos.y), 80, 80);
        }
    });
    canvas.ctx.fillStyle = '#eeeeff';
    for (const [key, value] of Object.entries(board)) {
        let pos = getBoardCoords(key);
        canvas.ctx.fillRect(80*pos.x, 1600-(80*pos.y), 80, 80);
    }
}, 1000 / 60);
render.start();