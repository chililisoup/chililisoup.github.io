//todo
//Random events biased to cash
//even more cards! Cant ever have enough cards

let canvas = new Canvas('canvas', 1920, 1080),
    ctx = canvas.ctx;

let scene = {type: 'default'};

let turn = 0,
turnturn = 0,
   round = 0,
   start = false;

let bg = new Image(1920, 1080);
bg.src = 'https://static.independent.co.uk/s3fs-public/thumbnails/image/2019/09/11/09/ms-monopoly-hasbro-c0-51-900-575-s885x516.jpg';

let amongsus = new Image();
amongsus.src = 'https://www.enjpg.com/img/2020/among-us-character-8-e1607548800944.png';

let chance = new Image();
chance.src = 'https://i.pinimg.com/600x315/ed/05/31/ed05313aeed1f9551837709f694f3a01.jpg';

let pennyman = new Image();
pennyman.src = 'https://i.pinimg.com/originals/f4/58/8a/f4588a3ecaa676e34622199a51636d40.png';

let arrow = new Image();
arrow.src = 'https://i.pinimg.com/originals/bb/81/0e/bb810ea3c1ce83c2b7168e62c21476c1.gif';

let question = new Image();
question.src = 'https://i.pinimg.com/originals/6c/5b/36/6c5b36cd1e28930e9321e7a715422990.png';

let diceRoll = new Audio('sounds/dice.flac');
let snareRoll = new Audio('sounds/roll.flac');
let levelUp = new Audio('sounds/upgrade.mp3');
let sus = new Audio('sounds/among.mp3');
let wow = new Audio('sounds/wow.wav');
let pling = new Audio('sounds/pling.wav');
let bgmusic = new Audio('sounds/germonrye.wav');
bgmusic.volume = 0.25;



let buttons3 = [
    {name:'Upgrade', func:upgrade, base:500, weight:7},
    {name:'Bomb', func:bomb, base:750},
    {name:'Snipe', func:snipe, base:500, weight:2}
];

let buttons2 = [
    {name:'Be Sus', func:besus, base:300, weight:2},
    {name:'Target', func:target, base:300}
];

let buttons1 = [
    {name:'Bet', func:bet, base:100, noLimit:true, weight: 4},
    {name:'Punch', func:punch, base:75}
];

let buttons0 = [
    {name:'Draw', func:draw, weight: 7},
    {name:'Gift', func:gift, weight: 2},
    {name:'Leech', func:leech}
];

let buttons = [];

function weightedPick(list) {
    let weightedList = [];
    for (let i = 0; i < list.length; i++) {
        let weight = list[i].weight || 1;
        for (let j = 0; j < weight; j++) weightedList.push(list[i]);
    }
    return weightedList[Math.floor(Math.random() * weightedList.length)];
}

function randomizeButtons() {
    buttons = [];
    buttons.push(weightedPick(buttons3));
    buttons.push(weightedPick(buttons2));
    buttons.push(weightedPick(buttons1));
    buttons.push(weightedPick(buttons0));
    buttons.push({name:'Roll', func:roll, noLimit:true});
}
randomizeButtons();

function nextTurn() {
    for (let i = 0; i < players.length; i++) {
        players[i].went = false;
        players[i].done = [];
    }
    turnturn++;
    let newRound = false;
    if (turnturn >= players.length) {
        turnturn = 0;
        newRound = true;
    }
    while (players[turnturn].died === true) {
        if (players.length == 1) {
            players[turnturn].died = false;
            players[turnturn].cash = 69420;
            wow.play();
            scene = {type:'card', data:'You absolute buffoon. You played yourself. Literally. And you lost. So now nobody wins. Dumb shit.', timeout:600};
        }
        turnturn++;
        if (turnturn >= players.length) {
            turnturn = 0;
            newRound = true;
        }
    }
    if (newRound) {
        round++;
        if (round % 4 === 0) {
            pling.play();
            for (let i = 0; i < players.length; i++) {
                if (players[i].roll < 3) players[i].roll++;
            }
        }
    }
    randomizeButtons();
}

function findButton(id) {
    for (let i = 0; i < buttons.length; i++) {
        if (buttons[i].name == id) return buttons[i];
    }
    return false;
}

function useButton(btn) {
    if (players[turn].done.indexOf(btn.id) == -1 || findButton(btn.id)?.noLimit) {
        findButton(btn.id)?.func();
        players[turn].done.push(btn.id);
        players[turn].went = true;
    }
}

function upgrade() {
    players[turn].cash -= players[turn].mult * 500;
    players[turn].levl++;
    players[turn].mult = Math.round(4*((players[turn].levl)**0.8)) / 4;
    levelUp.play();
    scene = {type:'upgrade', timeout:240};
}

function bomb() {
    const cost = Math.round(players[turn].mult * 750);
    sus.play();
    players[turn].cash -= cost;
    scene = {type:'sus', timeout: 180, data:[
        `${players[turn].name} bombed the city!`,
        `Everyone else lost $${Math.round(cost / 2)} :(`
    ]};
    for (let i = 0; i < players.length; i++) {
        if (i != turn && !players[i].died) {
            players[i].cash -= Math.round(cost / 2);
            if (players[i].cash < 0) {
                players[i].died = true;
            }
        }
    }
}

function snipe(btn) {
    const cost = Math.round(players[turn].mult * 500);
    if (!btn) {
        players[turn].cash -= cost;
        scene = {type:'select', data:snipe};
        return;
    }
    const id = btn.id.split('player')[1];
    players[id].cash -= cost;
    if (players[id].cash < 0) {
        players[id].died = true;
    }
    sus.play();
    scene = {type:'sus', timeout: 180, data:[
        `${players[turn].name} sniped ${players[id].name}!`,
        `$${cost} was taken from both!`
    ]};
}

function target(btn) {
    const cost = Math.round(players[turn].mult * 300);
    if (!btn) {
        players[turn].cash -= cost;
        scene = {type:'select', data:target};
        return;
    }
    const id = btn.id.split('player')[1];
    players[id].cash -= cost;
    if (players[id].cash < 0) {
        players[id].died = true;
    }
    sus.play();
    scene = {type:'sus', timeout: 180, data:[
        `${players[turn].name} targetted ${players[id].name}!`,
        `$${cost} was taken from both!`
    ]};
}

function punch(btn) {
    const cost = Math.round(players[turn].mult * 75);
    if (!btn) {
        players[turn].cash -= cost;
        scene = {type:'select', data:punch};
        return;
    }
    const id = btn.id.split('player')[1];
    players[id].cash -= cost;
    if (players[id].cash < 0) {
        players[id].died = true;
    }
    sus.play();
    scene = {type:'sus', timeout: 180, data:[
        `${players[turn].name} punched ${players[id].name}!`,
        `They both paid $${cost} in fees!`
    ]};
}

function gift(btn) {
    const cost = Math.round(players[turn].mult * 100);
    if (!btn) {
        players[turn].cash += cost;
        scene = {type:'select', data:gift};
        return;
    }
    const id = btn.id.split('player')[1];
    players[id].cash += cost;
    wow.play();
    scene = {type:'sus', timeout: 180, data:[
        `${players[turn].name} gifted ${players[id].name}!`,
        `They both received $${cost}!`
    ]};
}

function leech(btn) {
    const cost = Math.round(players[turn].mult * 50);
    if (!btn) {
        players[turn].cash += cost;
        scene = {type:'select', data:leech};
        return;
    }
    const id = btn.id.split('player')[1];
    players[id].cash -= cost;
    if (players[id].cash < 0) {
        players[id].died = true;
    }
    sus.play();
    scene = {type:'sus', timeout: 180, data:[
        `${players[turn].name} leeched from ${players[id].name}!`,
        `$${cost} was given to ${players[turn].name}!`
    ]};
}

function besus() {
    const cost = Math.round(players[turn].mult * 300);
    sus.play();
    players[turn].cash -= cost;
    scene = {type:'sus', timeout: 180, data:[
        `${players[turn].name} was sus!`,
        `$${Math.round(cost / 4)} was taken from all others.`
    ]};
    for (let i = 0; i < players.length; i++) {
        if (i != turn && !players[i].died) {
            players[i].cash -= Math.round(cost / 4);
            if (players[i].cash < 0) {
                players[i].died = true;
            }
        }
    }
}

function bet() {
    let cost = Math.round(players[turn].mult * 100);
    snareRoll.play();
    if (Math.random() >= 0.5) cost *= -1;
    players[turn].cash += cost;
    scene = {type:'bet', data:cost, timeout:180};
}

let cards = [
    {desc:'It your birthday or somethin. Collect $#O from everyone', others:10, you:0},
    {desc:'Bank error in your favor! Collect $#Y', others:0, you:250},
    {desc:'Bank error not in your favor! Lose $#Y', others:0, you:-250},
    {desc:'You are loser. Lose $#Y.', others:0, you:-100},
    {desc:'Wear pussy hat. Collect $#Y.', others:0, you:150},
    {desc:'Donate to your friends feminist organization! They embezzle the money. Lose $#T.', others:-40, you:0},
    {desc:'Get posted to cringe compilation. That makes you lose $#Y somehow', others:0, you:-200},
    {desc:'Eat a turd lol. That was a bet. everyone owes you $#O', others:25, you:0},
    {desc:'get dared to eat a turd. Spit it out. OH no you lose $#Y!!', others:0, you:-100},
    {desc:'ur rich uncle penny bags gives you a penny bag. it has pennies totalling $#Y', others:0, you:1},
    {desc:'post cringe to twitter. get cancelled off twitter.. this costs you $#Y!!', others:0, you:-50},
    {desc:'punch a bourgeoisie! he sues you a LOT! $#Y to be exact', others:0, you:-500},
    {desc:'Win lottery of $#Y!! But youre generous. Pay everyone $#O.', others:-50, you:500},
    {desc:'die', others:0, you:-9999},
    {desc:'offer tech support to old people. Take $#O from everyone', others:100, you:0},
    {desc:'steal $#Y from bank (bc they were rude about ur hat)', others:0, you:200},
    {desc:'start a business and become girlboss! This endeavor costs you $#Y', others:0, you:-250},
    {desc:'start a business and become girlboss! wow! you earn $#Y.', others:0, you:250},
    {desc:'wear boots (they are doc martens) (theyre expensive ($#Y) )', others:0, you:-200},
    {desc:'get caught by police for your various crimes. pay $#Y ticket', others:0, you:-150},
    {desc:'get paid $#Y more than men!', others:0, you:180},
    {desc:'start an onlyfans. collect $#Y', others:0, you:400},
    {desc:'get butt plug stuck in ass, go to ER, pay hospital bill of $#Y', others:0, you:-69},
    {desc:'buy a cute kitten! too bad theyre expensive. Pay $#Y', others:0, you:-250},
    {desc:'sell ur cat for $#Y', others:0, you:240},
    {desc:'land a modelling gig. earn $#Y.', others:0, you:300},
    {desc:'work at macdonal. earn $#Y.', others:0, you:100},
    {desc:'u r janet. Damnit janet! Lose $#Y.', others:0, you:-100},
    {desc:'So you were walking down the park street one day, and you saw a dumb guy. He was so dumb! You laughed and paid him $#Y for being so dumb', others:0, you:-50},
    {desc:'I ate an ass one time. Oops. Wrong card. Sorry for wasting your time. Here, take $#Y.', others:0, you:100},
    {desc:'Play the lick in front of Adam Neely. He loves it, and gives you $#Y.', others:0, you:75},
    {desc:'Go to the pickin palace with your friends. You all spend money!', others:50, you:-400},
    {desc:'Punch Judge. This one\'s free.', others:0, you:0},
    {desc:'be bisexual, twerk, eat hot chip, charge they phone, lie, spend $#Y', others:0, you:-200},
    {desc:'convince ur friends to buy into your MLM. They each pay $#O.', others:94, you:0},
    {desc:'wow iphone. win iphone worth $#Y.', others:0, you:125},
    {desc:'get bf. You get $#Y!', others:0, you:200},
    {desc:'Wow, you\'re dumb! Lose $#Y!', others:0, you:-97},
    {desc:'You cracked ur phone screen! Buy a new phone for $#Y', others:0, you:-220},
    {desc:'You feel sad for your friends. They\'re dying! In an effort to save them, you pay them each $#O.', others:-80, you:0},
    {desc:'You spend monopoly money at a store, saving you $#Y.', others:0, you:10},
    {desc:'Steal from walmart! Great savings indeed! You saved $#Y!', others:0, you:180},
    {desc:'Your dad died, and left you $#Y.', others:0, you:500},
    {desc:'Host a party! You\'ll spend $#Y on supplies.', others:0, you:-125},
    {desc:'Go on vacation! It better\'ve been good, because it cost you $#Y!', others:0, you:-300},
    {desc:'sell ur boobs for $#Y on ebay', others:0, you:340},
    {desc:'Put ur venmo in ur bio. People are giving you money! You earn $#T from this.', others:60, you:0},
    {desc:'Stream on twitch. Those simps donated $#T!', others:40, you:100},
    {desc:'Your friends are leaches! They stole $#T from you!', others:-30, you:0},
    {desc:'sell ur mom to a human trafficker for $#Y', others:0, you:112},
    {desc:'do some random kids homework for $#Y', others:0, you:25},
    {desc:'Get mugged! Lose $#Y.', others:0, you:-80},
    {desc:'go to halloween store, buy slutty cat costume for $#Y', others:0, you:-69},
    {desc:'Haha look at the funny man down there in the bottom right', others:0, you:0},
    {desc:'u r sus. to take heat off yourself, you give each of your friends $#O', others:-25, you:0},
    {desc:'You were speeding 48mph over in a school zone. Pay $#Y.', others:0, you:-350},
    {desc:'You are winner. Win $#Y.', others:0, you:100},
    {desc:'live', others:0, you:500},
    {desc:'ride in ambulance. Pay $#Y.', others:0, you:-250},
    {desc:'meet oaken. he bestows upon you $#Y', others:0, you:350},
    {desc:'eat at chilis. spend $#Y', others:0, you:-50},
    {desc:'lose $9999. ha u got trolled!! that was le epic. win $#Y', others:0, you:250},
    {desc:'ask ppl for money. every1 gives u $#O', others:20, you:0},
    {desc:'you get paid $#Y! wow! give each of ur friends $#O!', others:-20, you:200},
    {desc:'u were walkin in a circle when you found a piece of paper that was a $#Y bill', others:0, you:250},
    {desc:'its splurge time! spend $#Y!', others:0, you:-125},
    {desc:'ur playin some jazz, then you play a wrong note. thats p jazzy. Wow! crowds a cheerin\'. They pay you $#Y!', others:0, you:80},
    {desc:'ur a classical musican, then you play a wrong note. Boo you suck! Cry and lose $#Y.', others:0, you:-80},
    {desc:'you like to do laundry, so you launder $#Y.', others:0, you:300},
    {desc:'smoke a fat cig (if you must know, the cig was fancy and costed $#Y just for the one!)', others:0, you:-10},
    {desc:'pay some random ass $#Y to do your homework', others:0, you:-25},
    {desc:'you dumb bitch! You maxed out your credit card! That\'s gonna cost you $#Y!', others:0, you:-200},
    {desc:'You say: ok, ok, for reals now. You didnt really f my mom, did you? you did? well, then give me $#Y you dirty dumb', others:0, you:250},
    {desc:'gonna cry? piss and shit? maybe shit and cum? Thats what you get for losing $#Y', others:0, you:-150},
    {desc:'moto moto likes you. He bribes you with $#Y', others:0, you:250},
    {desc:'Damn daughter, whered ya find this $#Y?', others:0, you:300},
    {desc:'steal lunch money. Profit $#Y!!', others:0, you:20},
    {desc:'Stare at the sun! Ow! Why would you do that? Lose $#Y', others:0, you:-50},
    {desc:'Thank you for choosing draw card. Please accept this customary $#Y.', others:0, you:100},
    {desc:'1) play minecraft manhunt. 2) post it to youtube. 3) ?????? 4) profit $#Y', others:0, you:400},
    {desc:'open merch store. your merch is solid color w/ generic logo. Brilliant! You earn $#Y from this.', others:0, you:100}
];

let usedCards = [];

function draw() {
    wow.play();
    let cardNo = Math.floor(Math.random() * cards.length);
    let card = cards[cardNo],
        desc = card.desc,
        oAmt = Math.round(players[turn].mult * card.others),
        yAmt = Math.round(players[turn].mult * card.you);
    usedCards.push(cards[cardNo]);
    cards.splice(cardNo, 1);
    if (cards.length == 0) {
        cards = usedCards;
        usedCards = [];
    }
    desc = desc.replace(/#O/g, Math.abs(oAmt));
    desc = desc.replace(/#T/g, Math.abs(oAmt * (alive - 1) + Math.abs(yAmt)));
    desc = desc.replace(/#Y/g, Math.abs(yAmt));
    scene = {type:'card', data:desc, timeout:300};

    for (let i = 0; i < players.length; i++) {
        if (i != turn && !players[i].died) {
            players[i].cash -= oAmt;
            players[turn].cash += oAmt;
            if (players[i].cash < 0) {
                players[i].died = true;
            }
        }
    }
    players[turn].cash += yAmt;

    if (players[turn].cash < 0) {
        players[turn].died = true;
        nextTurn();
    }
}

function roll() {
    diceRoll.play();
    let a = Math.floor(Math.random() * 6) + 1,
    b = Math.floor(Math.random() * 6) + 1;
    let cash = Math.round(players[turn].mult * ((a + b) * 5));
    players[turn].cash += cash;
    if (!players[turn].went) players[turn].roll--;
    scene = {type: 'dice',
    data: [a, b, cash], timeout: 180};
    if (a != b) {
        nextTurn();
    }
    return [a, b];
}

function resetContext() {
    ctx.globalAlpha = 1;
    ctx.fillStyle = '#000000';
    ctx.strokeStyle = '#000000';
    ctx.resetTransform();
    ctx.font = '10px sans-serif';
}

let players = [];
let alive = 0;

function addPlayer() {
    let name = prompt('Enter a name:');
    if (!name) return;
    if (!start) {
        engine.start();
        start = true;
    }
    players.push({
        cash: 250,
        name: name,
        pstn: 0,
        levl: 1,
        mult: 1,
        roll: 3,
        went: false,
        done: [],
        died: false
    });
}



function createButton(x, y, name, func, params) {
    params.height = params.height || 130;
    params.width = params.width || 500;
    params.id = params.id || name;

    const heightRatio = Math.round((10/13)*params.height);
    const heightRatio2 = Math.round((23/26)*params.height);

    let buttonStyle = ctx.createLinearGradient(0, y, 0, y + params.height)
    buttonStyle.addColorStop(0, '#00ffaa');
    buttonStyle.addColorStop(1, '#009e69');

    ctx.fillStyle = buttonStyle;
    if (params.disabled) ctx.fillStyle = '#999999';
    ctx.fillRect(x, y, params.width, params.height);
    ctx.font = `${params.height}px Trebuchet MS`;
    ctx.fillStyle = '#000000';
    ctx.fillText(name, x, heightRatio2 + y);
    if (!params.disabled) canvas.createButton(params.id, func, x, y, params.width, params.height);

    if (params.bonus) {
        ctx.font = `bold ${heightRatio}px Courier New`;
        ctx.fillStyle = '#34ad2b';
        if (params.disabled || params.bonusDisabled) ctx.fillStyle = '#999999';
        ctx.fillText(params.bonus, heightRatio*0.1 + x + params.width, heightRatio + y);
    }
}

let engine = new Engine(function() {
    canvas.buttons = [];
    alive = players.length;
    for (let i = 0; i < players.length; i++) {
        if (players[i].died) alive--;
    }
    let player = players[turn];
    ctx.drawImage(bg, 0, 0, 1920, 1080);
    ctx.globalAlpha = 0.8;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, 1920, 1080);
    resetContext();
    switch (scene.type) {
        case 'dice':
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(590, 390, 320, 320);
            ctx.fillRect(990, 390, 320, 320);
            let diceStyle = ctx.createLinearGradient(0, 400, 0, 700)
            diceStyle.addColorStop(0, '#ffffff');
            diceStyle.addColorStop(1, '#dddddd');
            ctx.fillStyle = diceStyle;
            ctx.fillRect(600, 400, 300, 300);
            ctx.fillRect(1000, 400, 300, 300);
            ctx.font = "200px monospace";
            ctx.fillStyle = '#000000';
            ctx.fillText(scene.data[0], 700, 600);
            ctx.fillText(scene.data[1], 1100, 600);

            ctx.fillStyle = '#34ad2b';
            ctx.font = "bold 150px Courier New";
            ctx.fillText('+$' + scene.data[2], 720, 300);

            if (scene.data[0] == scene.data[1]) {
                ctx.fillStyle = '#0000ff';
                ctx.font = "150px Trebuchet MS";
                ctx.fillText('Doubles!', 680, 850);
            }

            break;
        case 'win':
            bgmusic.pause();
            for (let i = 0; i < players.length; i++) {
                if (!players[i].died) {
                    ctx.font = "220px cursive";
                    ctx.fillStyle = '#000000';
                    canvas.wrapText(players[i].name + ' was sussest!', 50, 600, 1820, 220);
                    ctx.font = "100px Trebuchet MS";
                    ctx.fillStyle = '#004444';
                    ctx.fillText(players[i].name, 40, 120);
                    ctx.font = "bold 100px Courier New";
                    ctx.fillText('$' + players[i].cash, 450, 120);
                }
            }
            ctx.drawImage(amongsus, 1400, 0);
            ctx.drawImage(pennyman, 1920 - 542, 1080 - 429);
            break;
        case 'upgrade':
            ctx.drawImage(arrow, 700, 300, 400, 400);
            ctx.font = "bold 200px Georgia";
            ctx.fillStyle = '#a4a616';
            ctx.fillText(player.levl - 1, 508, 608);
            ctx.fillText(player.levl, 1208, 608);
            ctx.fillStyle = '#e0e314';
            ctx.fillText(player.levl - 1, 500, 600);
            ctx.fillText(player.levl, 1200, 600);
            break;
        case 'select':
            let height = 0;
            for (let i = 0; i < players.length; i++) {
                if (i == turn || players[i].died) {
                    height--;
                } else createButton(50, 50 + (160*height), players[i].name, (btn) => scene.data?.(btn), {id:`player${i}`, width:750, bonus:`$${players[i].cash}`});
                height++
            }
            break;
        case 'sus':
            ctx.drawImage(amongsus, 1000, 300);
            ctx.font = "200px Georgia";
            ctx.fillStyle = '#ff0000';
            canvas.wrapText(scene.data[0], 20, 400, 1880, 200);
            ctx.font = "100px Georgia";
            canvas.wrapText(scene.data[1], 20, 800, 1880, 200);
            break;
        case 'bet':
            if (scene.timeout > 105) {
                ctx.drawImage(question, 700, 350);
            } else {
                ctx.font = "bold 200px Courier New";
                ctx.fillStyle = '#34ad2b';
                if (scene.data < 0) ctx.fillStyle = '#ff0000';
                ctx.fillText('$' + scene.data, 680, 600);
            }
            break;
        case 'card':
            ctx.drawImage(chance, 450, 200, 1050, 600);
            ctx.font = "80px Trebuchet MS";
            ctx.fillStyle = '#000000';
            canvas.wrapText(scene.data, 480, 350, 990, 80);
            ctx.drawImage(pennyman, 1920 - 542, 1080 - 429);
            break;
        default:
            bgmusic.play();
            if (alive == 1 && players.length != 1) {
                wow.play();
                levelUp.play();
                sus.play();
                scene = {type: 'win'}
            };
            turn = turnturn;
            ctx.font = "200px cursive";
            ctx.fillText('Lol!', 10, 200);
            for (let i = 0; i < buttons.length; i++) {
                let params = {};
                if (buttons[i].base) {
                    const cost = Math.round(player.mult * buttons[i].base);
                    params.bonus = `$${cost}`;
                    if (cost > player.cash) {
                        params.disabled = true;
                    }
                }
                if (player.done.indexOf(buttons[i].name) != -1 && !buttons[i].noLimit) {
                    params.disabled = true;
                } else if (buttons[i].name == 'Roll') {
                    if (!player.went && player.roll == 0) params.disabled = true;
                    if (player.went) ctx.fillStyle = params.bonusDisabled = true;
                    params.bonus = `${player.roll}(${4 - (round % 4)})`;
                }
                createButton(1000, 200 + (160*i), buttons[i].name, useButton, params);
            }
        
            ctx.font = "100px Arial";
            ctx.fillStyle = '#ff0000';
            ctx.fillText('Level ' + (player.levl) + ' | Multiplier: ' + (player.mult).toFixed(2), 400, 140);
            
            for (let i = 0; i < players.length; i++) {
                ctx.font = "110px Trebuchet MS";
                if (i == turn) ctx.fillStyle = '#0000ff';
                else if (players[i].died) ctx.fillStyle = '#ff0000';
                else ctx.fillStyle = '#000000';
                ctx.fillText(players[i].name, 20, 300 + (110 * i));
                if (players[i].cash >= 0) {
                    ctx.font = "bold 110px Courier New";
                    ctx.fillText('$' + players[i].cash, 500, 300 + (110 * i));
                }
            }
    }
    if (scene.timeout) {
        scene.timeout--;
        if (scene.timeout <= 0) scene = {type: 'default'};
    }
    
}, 1000 / 60);
