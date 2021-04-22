let canvas = new Canvas('canvas', 1920, 1080),
    ctx = canvas.ctx;

let scene = {type: 'default'};

let turn = 0,
turnturn = 0;

let bg = new Image(1920, 1080);
bg.src = 'https://static.independent.co.uk/s3fs-public/thumbnails/image/2019/09/11/09/ms-monopoly-hasbro-c0-51-900-575-s885x516.jpg';

function rollDice() {
    if (scene.type == 'default') {
        let a = Math.floor(Math.random() * 6) + 1,
        b = Math.floor(Math.random() * 6) + 1;
        scene = {type: 'dice',
        data: [a, b], timeout: 180};
        players[turn].cash += Math.round((players[turn].levl + 1)**1.2 * ((a + b) * 5));
        if (a != b) {
            turnturn++;
            if (turnturn >= players.length) turnturn = 0;
            while (players[turnturn].died === true) {
                turnturn++;
                if (turnturn >= players.length) turnturn = 0;
            }
        }
        return [a, b];
    }
}

function resetContext() {
    ctx.globalAlpha = 1;
    ctx.fillStyle = '#000000';
    ctx.strokeStyle = '#000000';
    ctx.resetTransform();
    ctx.font = '10px sans-serif';
}

let players = [];
for (let i = 0; i < 5; i++) {
    let jon = [
        'cat',
        'dog',
        'man',
        'hat',
        'jon'
    ];
    players.push({
        cash: 200,
        name: jon[i],
        pstn: 0,
        levl: 0,
        died: false
    });
}

let engine = new Engine(function() {
    ctx.drawImage(bg, 0, 0, 1920, 1080);
    ctx.globalAlpha = 0.8;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, 1920, 1080);
    resetContext();
    switch (scene.type) {
        case 'dice':
            ctx.font = "200px Georgia";
            ctx.fillText(scene.data[0], 10, 200);
            ctx.fillText(scene.data[1], 200, 200);
            break;
        case 'win':
            for (let i = 0; i < players.length; i++) {
                if (!players[i].died) {
                    ctx.font = "220px Georgia";
                    ctx.fillStyle = '#000000';
                    ctx.fillText(players[i].name + ' was sussest!', 100, 600);
                }
            }
            break;
        case 'sus':
            ctx.font = "200px Georgia";
            ctx.fillStyle = '#ff0000';
            ctx.fillText(players[turn].name + ' was sus!', 20, 400);
            ctx.font = "100px Georgia";
            ctx.fillText('$' + Math.round(Math.round((players[turn].levl + 1)**1.2 * 300) / 4) + ' was taken from all others.', 20, 800);
            break;
        default:
            turn = turnturn;
            ctx.font = "200px Georgia";
            ctx.fillText('Lol!', 10, 200);
    }
    if (scene.type != 'win' && scene.type != 'sus') {
        ctx.fillStyle = '#00ffaa';
        ctx.fillRect(800, 200, 600, 150);
        ctx.fillRect(800, 400, 600, 150);
        ctx.fillRect(800, 600, 600, 150);
        ctx.fillRect(800, 800, 600, 150);
        ctx.font = "150px Georgia";
        ctx.fillStyle = '#000000';
        ctx.fillText('Be Sus', 800, 330);
        ctx.fillText('Upgrade', 800, 530);
        ctx.fillText('Bet', 800, 730);
        ctx.fillText('Roll', 800, 930);
        ctx.font = "100px Georgia";
        ctx.fillStyle = '#34ad2b';
        ctx.fillText('$' + Math.round((players[turn].levl + 1)**1.2 * 300), 1410, 310);
        ctx.fillText('$' + Math.round((players[turn].levl + 1)**1.2 * 500), 1410, 510);
        ctx.fillText('$' + Math.round((players[turn].levl + 1)**1.2 * 100), 1410, 710);
        ctx.font = "100px Arial";
        ctx.fillStyle = '#ff0000';
        ctx.fillText('Level ' + players[turn].levl + ' | Multiplier: ' + ((players[turn].levl + 1)**1.2).toFixed(2), 400, 140);
        ctx.font = "120px Georgia";
        for (let i = 0; i < players.length; i++) {
            if (i == turn) ctx.fillStyle = '#0000ff';
            else if (players[i].died) ctx.fillStyle = '#ff0000';
            else ctx.fillStyle = '#000000';
            ctx.fillText(players[i].name, 20, 360 + (160 * i));
            ctx.fillText('$' + players[i].cash, 300, 360 + (160 * i));
        }
    }
    if (scene.timeout) {
        scene.timeout--;
        if (scene.timeout <= 0) scene = {type: 'default'};
    }
    
}, 1000 / 60);
engine.start();

function besus() {
    let cost = Math.round((players[turn].levl + 1)**1.2 * 300);
    if (players[turn].cash >= cost) {
        players[turn].cash -= cost;
        scene = {type: 'sus', timeout: 180};
        for (let i = 0; i < players.length; i++) {
            if (i != turn) {
                players[i].cash -= Math.round(cost / 4);
                if (players[i].cash < 0) {
                    players[i].died = true;
                }
            }
        }
        let alive = 0;
        for (let i = 0; i < players.length; i++) {
            if (!players[i].died) alive++;
        }
        if (alive == 1) scene = {type: 'win'};
    }
}

function upgrade() {
    let cost = Math.round((players[turn].levl + 1)**1.2 * 500);
    if (players[turn].cash >= cost) {
        players[turn].levl++;
        players[turn].cash -= cost;
    }
}

function bet() {
    let cost = Math.round((players[turn].levl + 1)**1.2 * 100);
    if (players[turn].cash >= cost) {
        if (Math.random() >= 0.5) {
            players[turn].cash += cost;
        } else players[turn].cash -= cost;
    }
}

canvas.createButton('besus', besus, 800, 200, 600, 150);
canvas.createButton('upgrade', upgrade, 800, 400, 600, 150);
canvas.createButton('bet', bet, 800, 600, 600, 150);
canvas.createButton('roll', rollDice, 800, 800, 600, 150);
