"use strict"; // Forces me to write better

/*
To-do (kind of in order):
 - Better waves:
    ∙ Spawning method
    ∙ More waves
 - Projectile rotation
 - Add tower upgrades
 - Cooler towers
 - Lots of balancing (Needs to be tweaked often, won't be done for a while/ever)
*/

// Define global variables
let canvas = document.getElementById("jj"); // HTML canvas object
let ctx = canvas.getContext("2d");          // Canvas context
ctx.canvas.width  = 1920;                   // Working space width (not visual size)
ctx.canvas.height = 1080;                   // Working space height (not visual size)
let place = null,                           // Position to place tower or null for nowhere
    built = false,                          // True if path has been built
    cash = 500,                             // Player money
    lives = 100,                            // Player lives
    oldLives,                               // Lives at start of round to compare to end
    wave = 0,                               // Current wave
    play = false,                           // Is a wave running? true/false
    waveEnd = false,                        // True for a frame to trigger end of wave events
    canStart = true,                        // True if player is allowed to trigger a new wave
    gameSpeed = 1,                          // Tower, projectile, & enemy speed
    mouseX,                                 // Mouse X position
    mouseY,                                 // Mouse Y position
    placing = null,                         // What tower is selected to be placed or null for none
    multiPlace = false,                     // Whether or not to place multiple towers
    i,                                      // Used in for loops
    j,                                      // Used in second level loops
    twr,                                    // Defines individual towers
    prj,                                    // Defines individual projectiles
    pth,                                    // Defines individual paths
    newPth = {},                            // Defines a path that may be built
    pop,                                    // Defines individual particles
    nme,                                    // Defines individual enemies
    dist,                                   // Defines a distance
    s,                                      // Defines a speed
    pos,                                    // Defines a position
    del = false,                            // Delete mode true/false
    sel = null;                             // Selected tower

let bull = new Image();
    bull.src = "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/237/tractor_1f69c.png";
let no = new Image();
    no.src = "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/237/no-entry-sign_1f6ab.png";

/* List of paths
c:  path color
x:  position X
y:  position Y
w:  width
h:  height
d:  path direction (0:R, 1:U, 2:L, 3:D, 4:END)
*/
let paths = [
    {c:"rgb(235,191,115)", x:0, y:100, w:100, h:50, d:0}
    ];


/* List of towers
x:  position X
y:  position Y
c:  frames until able to fire (cooldown)
t:  type
r:  rotation
u:  upgrades (maybe?)
h:  highlight (true/false)
*/
let twrs = [];

/* List of active projectiles
x:  position X
y:  position Y
t:  type
dx: speed X
dy: speed Y
d:  distance from source
k:  has killed
r:  rotation
*/
let proj = [];

/* Projectile & Tower statistics
s:  speed (60 = 1 second)
r:  range
t:  tower texture
p:  projectile texture
ps: projectile speed
c:  tower cost
d:  projectile damage
h:  hitbox radius
pw: projectile size
*/
let stat = [
    {s:110, r:100, t:new Image(50, 50), p:new Image(10, 10), ps:35, c:150, d:1, h:20, pw: 10},
    {s:60, r:200, t:new Image(50, 50), p:new Image(20, 20), ps:35, c:350, d:2, h:20, pw: 20},
    {s:40, r:250, t:new Image(50, 50), p:new Image(20, 20), ps:35, c:750, d:3, h:20, pw: 20}
    ];
stat[0].t.src = "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/237/pistol_1f52b.png";
stat[0].p.src = "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/237/large-orange-circle_1f7e0.png";
stat[1].t.src = "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/237/mechanic_1f9d1-200d-1f527.png";
stat[1].p.src = "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/237/nut-and-bolt_1f529.png";
stat[2].t.src = "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/237/monkey-face_1f435.png";
stat[2].p.src = "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/237/round-pushpin_1f4cd.png";

/* List of enemies
x:  position X
y:  position Y
d:  direction
p:  current path that enemy is on
t:  type
*/
let nmes = [];

/* List of enemy types
s:  speed
r:  reward for killing
t:  texture
*/
let typs = [
    {s:2, r:3, t:new Image(50, 50)},
    {s:3, r:5, t:new Image(50, 50)},
    {s:4, r:10, t:new Image(50, 50)},
    {s:6, r:15, t:new Image(50, 50)},
    {s:8, r:25, t:new Image(50, 50)}
    ];
typs[0].t.src = "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/237/smiling-face-with-horns_1f608.png";
typs[1].t.src = "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/237/orangutan_1f9a7.png";
typs[2].t.src = "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/237/thinking-face_1f914.png";
typs[3].t.src = "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/237/negative-squared-latin-capital-letter-b_1f171.png";
typs[4].t.src = "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/237/pile-of-poo_1f4a9.png";

/* List of pop particles (may include more particles later) 
x:  position X
y:  position Y
l:  life left (in frames)
*/
let pops = [];

let popPart = new Image(50, 50);
popPart.src = "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/237/anger-symbol_1f4a2.png";

// Array of enemies for each wave (See nmes array for enemy info)
let waves;
function defineWaves() {
    waves = [
        [
            {x:-50, y:100, d:0, p:0, t:0},
            {x:-150, y:100, d:0, p:0, t:0},
            {x:-250, y:100, d:0, p:0, t:0},
            {x:-350, y:100, d:0, p:0, t:0},
            {x:-450, y:100, d:0, p:0, t:0},
            {x:-500, y:100, d:0, p:0, t:0},
            {x:-550, y:100, d:0, p:0, t:0},
            {x:-600, y:100, d:0, p:0, t:0},
            {x:-650, y:100, d:0, p:0, t:0},
            {x:-700, y:100, d:0, p:0, t:0},
            {x:-750, y:100, d:0, p:0, t:0},
            {x:-800, y:100, d:0, p:0, t:0},
            {x:-850, y:100, d:0, p:0, t:0},
            {x:-900, y:100, d:0, p:0, t:0},
            {x:-950, y:100, d:0, p:0, t:0},
            {x:-1000, y:100, d:0, p:0, t:1},
            {x:-1050, y:100, d:0, p:0, t:1},
            {x:-1100, y:100, d:0, p:0, t:1},
            {x:-1150, y:100, d:0, p:0, t:1},
            {x:-1200, y:100, d:0, p:0, t:1}
        ],
        [
            {x:-50, y:100, d:0, p:0, t:0},
            {x:-150, y:100, d:0, p:0, t:0},
            {x:-250, y:100, d:0, p:0, t:0},
            {x:-350, y:100, d:0, p:0, t:0},
            {x:-450, y:100, d:0, p:0, t:0},
            {x:-500, y:100, d:0, p:0, t:1},
            {x:-550, y:100, d:0, p:0, t:1},
            {x:-600, y:100, d:0, p:0, t:1},
            {x:-650, y:100, d:0, p:0, t:1},
            {x:-700, y:100, d:0, p:0, t:1},
            {x:-750, y:100, d:0, p:0, t:1},
            {x:-800, y:100, d:0, p:0, t:1},
            {x:-850, y:100, d:0, p:0, t:1},
            {x:-900, y:100, d:0, p:0, t:1},
            {x:-950, y:100, d:0, p:0, t:1},
            {x:-1000, y:100, d:0, p:0, t:2},
            {x:-1050, y:100, d:0, p:0, t:2},
            {x:-1100, y:100, d:0, p:0, t:2},
            {x:-1150, y:100, d:0, p:0, t:2},
            {x:-1200, y:100, d:0, p:0, t:2}
        ],
        [
            {x:-50, y:100, d:0, p:0, t:1},
            {x:-150, y:100, d:0, p:0, t:1},
            {x:-250, y:100, d:0, p:0, t:1},
            {x:-350, y:100, d:0, p:0, t:1},
            {x:-450, y:100, d:0, p:0, t:1},
            {x:-500, y:100, d:0, p:0, t:2},
            {x:-550, y:100, d:0, p:0, t:2},
            {x:-600, y:100, d:0, p:0, t:2},
            {x:-650, y:100, d:0, p:0, t:2},
            {x:-700, y:100, d:0, p:0, t:2},
            {x:-750, y:100, d:0, p:0, t:2},
            {x:-800, y:100, d:0, p:0, t:2},
            {x:-850, y:100, d:0, p:0, t:2},
            {x:-900, y:100, d:0, p:0, t:2},
            {x:-950, y:100, d:0, p:0, t:2},
            {x:-1000, y:100, d:0, p:0, t:3},
            {x:-1050, y:100, d:0, p:0, t:3},
            {x:-1100, y:100, d:0, p:0, t:3},
            {x:-1150, y:100, d:0, p:0, t:3},
            {x:-1200, y:100, d:0, p:0, t:3}
        ],
        [
            {x:-50, y:100, d:0, p:0, t:2},
            {x:-150, y:100, d:0, p:0, t:2},
            {x:-250, y:100, d:0, p:0, t:2},
            {x:-350, y:100, d:0, p:0, t:2},
            {x:-450, y:100, d:0, p:0, t:2},
            {x:-500, y:100, d:0, p:0, t:3},
            {x:-550, y:100, d:0, p:0, t:3},
            {x:-600, y:100, d:0, p:0, t:3},
            {x:-650, y:100, d:0, p:0, t:3},
            {x:-700, y:100, d:0, p:0, t:3},
            {x:-750, y:100, d:0, p:0, t:3},
            {x:-800, y:100, d:0, p:0, t:3},
            {x:-850, y:100, d:0, p:0, t:3},
            {x:-900, y:100, d:0, p:0, t:3},
            {x:-950, y:100, d:0, p:0, t:3},
            {x:-1000, y:100, d:0, p:0, t:4},
            {x:-1050, y:100, d:0, p:0, t:4},
            {x:-1100, y:100, d:0, p:0, t:4},
            {x:-1150, y:100, d:0, p:0, t:4},
            {x:-1200, y:100, d:0, p:0, t:4}
        ],
        [
            {x:-50, y:100, d:0, p:0, t:3},
            {x:-150, y:100, d:0, p:0, t:3},
            {x:-250, y:100, d:0, p:0, t:3},
            {x:-350, y:100, d:0, p:0, t:3},
            {x:-450, y:100, d:0, p:0, t:3},
            {x:-500, y:100, d:0, p:0, t:4},
            {x:-550, y:100, d:0, p:0, t:4},
            {x:-600, y:100, d:0, p:0, t:4},
            {x:-650, y:100, d:0, p:0, t:4},
            {x:-700, y:100, d:0, p:0, t:4},
            {x:-750, y:100, d:0, p:0, t:4},
            {x:-800, y:100, d:0, p:0, t:4},
            {x:-850, y:100, d:0, p:0, t:4},
            {x:-900, y:100, d:0, p:0, t:4},
            {x:-950, y:100, d:0, p:0, t:4},
            {x:-1000, y:100, d:0, p:0, t:4},
            {x:-1050, y:100, d:0, p:0, t:4},
            {x:-1100, y:100, d:0, p:0, t:4},
            {x:-1150, y:100, d:0, p:0, t:4},
            {x:-1200, y:100, d:0, p:0, t:4}
        ],
        [
            {x:-50, y:100, d:0, p:0, t:4},
            {x:-150, y:100, d:0, p:0, t:4},
            {x:-250, y:100, d:0, p:0, t:4},
            {x:-350, y:100, d:0, p:0, t:4},
            {x:-450, y:100, d:0, p:0, t:4},
            {x:-500, y:100, d:0, p:0, t:4},
            {x:-550, y:100, d:0, p:0, t:4},
            {x:-600, y:100, d:0, p:0, t:4},
            {x:-650, y:100, d:0, p:0, t:4},
            {x:-700, y:100, d:0, p:0, t:4},
            {x:-750, y:100, d:0, p:0, t:4},
            {x:-800, y:100, d:0, p:0, t:4},
            {x:-850, y:100, d:0, p:0, t:4},
            {x:-900, y:100, d:0, p:0, t:4},
            {x:-950, y:100, d:0, p:0, t:4},
            {x:-1000, y:100, d:0, p:0, t:4},
            {x:-1050, y:100, d:0, p:0, t:4},
            {x:-1100, y:100, d:0, p:0, t:4},
            {x:-1150, y:100, d:0, p:0, t:4},
            {x:-1200, y:100, d:0, p:0, t:4}
        ]
    ];
}
defineWaves();

function getMousePos(canvas, evt) {
    let rect = canvas.getBoundingClientRect();
    return {
        x: (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
        y: (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
    };
}

window.addEventListener("mousemove", updateMouse);
function updateMouse(e) {
    pos = getMousePos(canvas, e);
    mouseY = pos.y;
    mouseX = pos.x;
    sel = null;
    
    if (placing === null) {
        for (i = 0; i < twrs.length; i++) {
            twrs[i].h = false;
        }
        let ldist = null,
            ldtwr = null;
        for (i = 0; i < twrs.length; i++) {
            twr = twrs[i];
            pos.x = twr.x + 25;
            pos.y = twr.y + 25;
            dist = Math.sqrt((Math.abs(mouseX - pos.x) * Math.abs(mouseX - pos.x)) + (Math.abs(mouseY - pos.y) * Math.abs(mouseY - pos.y)));
            if (dist <= 25) {
                if (ldist === null) {
                    ldist = dist;
                    ldtwr = twr;
                } else if (dist < ldist) {
                    ldist = dist;
                    ldtwr = twr;
                }
            }
        }
        if (ldtwr !== null) {
            ldtwr.h = true;
            sel = ldtwr;
        }
    }
}

window.addEventListener("mousedown", onClick);
function onClick(e) {
    if (built) {
        place = getMousePos(canvas, e);
        let choseT = false;
        
        let gridX = 1560,
            gridY = 20;
        for (i = 0; i < stat.length; i++) {
            if (place.x >= gridX && place.x <= gridX + 160 && place.y >= gridY && place.y <= gridY + 160) {
                placing = i;
                choseT = true;
            }
            if (gridX == 1560) {
                gridX = 1740;
            } else {
                gridY += 180;
                gridX = 1560;
            }
        }
        
        if (place.x < 0 || place.y < 0 || place.x > 1520 || place.y > 1080) {
            place = null;
            if (choseT === false) {
                placing = null;
            }
        } else if (place.x >= 50 && place.x <= 170 && place.y >= 950 && place.y <= 1070) {
            if (del === false) {
                del = true;
            } else {
                del = false;
            }
            place = null;
        } else if (place.x >= 1390 && place.x <= 1490 && place.y >= 930 && place.y <= 1030) {
            place = null;
            if (canStart) {
                play = true;
            } else {
                if (gameSpeed == 1) {
                    gameSpeed = 2;
                    for (i = 0; i < twrs.length; i++) {
                        twr = twrs[i];
                        twr.c = Math.floor(twr.c / 2);
                    }
                } else {
                    gameSpeed = 1;
                    for (i = 0; i < twrs.length; i++) {
                        twr = twrs[i];
                        twr.c = twr.c * 2;
                    }
                }
            }
        } else if (del === true) {
            if (sel !== null) {
                cash += Math.floor(stat[sel.t].c * 0.8);
                sel.t = -1;
                place = null;
            }
        }
    } else {
        place = getMousePos(canvas, e);
        if (place.x >= 1390 && place.x <= 1490 && place.y >= 930 && place.y <= 1030) {
            pth = paths[paths.length - 1];
            built = true;
            if (pth.d === 0) {
                paths.push({c:"rgb(255,0,0)", x:pth.x + pth.w, y:pth.y, w:50, h:50, d:4});
            } else if (pth.d === 1) {
                paths.push({c:"rgb(255,0,0)", x:pth.x, y:pth.y - 50, w:50, h:50, d:4});
            } else if (pth.d === 2) {
                paths.push({c:"rgb(255,0,0)", x:pth.x - 50, y:pth.y, w:50, h:50, d:4});
            } else if (pth.d === 3) {
                paths.push({c:"rgb(255,0,0)", x:pth.x, y:pth.y + 50, w:50, h:50, d:4});
            }
        } else if (newPth.l > 1) {
            paths.push({c:"rgb(235,191,115)", x:newPth.x, y:newPth.y, w:newPth.w, h:newPth.h, d:newPth.d});
        }
    }
}

//window.addEventListener("mouseup");

window.addEventListener("keydown", onKeyDown);
function onKeyDown(e) {
    if (event.key == "Shift") {
        multiPlace = true;
    }
}

window.addEventListener("keyup", onKeyUp);
function onKeyUp(e) {
    if (event.key == "Shift") {
        multiPlace = false;
    }
}

function spawnEnemy(w) {
    if (w <= waves.length) {
        nmes = waves[w - 1];
    } else {
        defineWaves();
        nmes = waves[waves.length - 1];
    }
}

function canPlace(x, y, r) {
    if (x < 0 || y < 0 || x > 1520 || y > 1080) {
        return false;
    }
    for (i = 0; i < twrs.length; i++) {
        dist = Math.sqrt(Math.pow(x - (twrs[i].x + 25), 2) + Math.pow(y - (twrs[i].y + 25), 2));
        if (dist < stat[twrs[i].t].h + r) {
            return false;
        }
    }
    for (i = 0; i < paths.length; i++) {
        let circle = {x:x, y:y, r:r};
        if (rectCircleColliding(circle, paths[i])) {
            return false;
        }
    }
    return true;
}

function rectCircleColliding(circle,rect){
    let distX = Math.abs(circle.x - rect.x-rect.w/2);
    let distY = Math.abs(circle.y - rect.y-rect.h/2);
    
    if (distX > (rect.w / 2 + circle.r) || distY > (rect.h / 2 + circle.r)) { return false; }
    
    if (distX <= (rect.w / 2) || distY <= (rect.h / 2)) { return true; } 
    
    pos.x = distX-rect.w/2;
    pos.y = distY-rect.h/2;
    return (pos.x * pos.x + pos.y * pos.y <= (circle.r * circle.r));
}


        //////////////////////////////////////////////////
       //                                              //
      //                                              //
     //                                              //
    //                 GAME ENGINE \/               //
   //                                              //
  //                                              //
 //                                              //
//////////////////////////////////////////////////


setInterval(function run() {
    if (place !== null) {
        if (placing !== null) {
            if (canPlace(place.x, place.y, stat[placing].h)) {
                if (cash >= stat[placing].c) {
                    cash -= stat[placing].c;
                    twrs.push({x:place.x-25, y:place.y-25, c:20, t:placing, r:0, u:0, h:false});
                    if (multiPlace === false) {
                        placing = null;
                    }
                }
            }
        }
        place = null;
    }
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = "rgb(0,150,75)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    for (i = 0; i < paths.length; i++) {
        pth = paths[i];
        ctx.fillStyle = pth.c;
        ctx.fillRect(pth.x, pth.y, pth.w, pth.h);
    }
    
    if (placing !== null) {
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, stat[placing].r, 0, 2 * Math.PI);
        ctx.fillStyle = "rgba(255,0,0,0.3)";
        if (canPlace(mouseX, mouseY, stat[placing].h)) {
            ctx.fillStyle = "rgba(0,0,0,0.3)";
        }
        ctx.fill();
        ctx.globalAlpha = 0.3;
        ctx.drawImage(stat[placing].t, mouseX - 25, mouseY - 25, 50, 50);
        ctx.globalAlpha = 1;
    }
    
    for (i = 0; i < twrs.length; i++) {
        twr = twrs[i];
        if (twr.t >= 0) {
            if (twr.h) {
                ctx.beginPath();
                ctx.arc(twr.x + 25, twr.y + 25, stat[twr.t].r, 0, 2 * Math.PI);
                ctx.fillStyle = "rgba(0,0,0,0.3)";
                if (del === true) {
                    ctx.fillStyle = "rgba(255,0,0,0.3)";
                }
                ctx.fill();
            }
        }
        if (twr.t == -1) {
            twrs.splice(i, 1);
        } else {
            s = stat[twr.t].s;
            ctx.translate(twr.x + 25, twr.y + 25);
            ctx.rotate(twr.r * Math.PI / 180);
            ctx.translate(-twr.x - 25, -twr.y - 25);
            ctx.drawImage(stat[twr.t].t, twr.x, twr.y, 50, 50);
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            if (twr.c !== 0) {
                twr.c -= 1;
            }
            
            let clst = null,
                clsd = null;
            
            if (twr.c === 0) {
                for (j = 0; j < nmes.length; j++) {
                    nme = nmes[j];
                    nme.h = false;
                    pos.x = Math.abs(nme.x - twr.x);
                    pos.y = Math.abs(nme.y - twr.y);
                    dist = Math.sqrt(Math.pow(pos.x, 2) + Math.pow(pos.y, 2));
                    if (clst === null) {
                        clst = nme;
                        clsd = dist;
                    } else {
                        if (dist < clsd) {
                            clst = nme;
                            clsd = dist;
                        }
                    }
                }
                if (clsd <= stat[twr.t].r && clst !== null && clsd !== null) {
                    let tx = clst.x - twr.x,
                        ty = clst.y - twr.y,
                        dstn = Math.sqrt(tx*tx+ty*ty),
                        velX = (tx/dstn)*stat[twr.t].ps,
                        velY = (ty/dstn)*stat[twr.t].ps;
                    
                    proj.push({t:twr.t, x:twr.x + 25, y:twr.y + 25, dx:velX, dy:velY, d:0, k:false});
                    
                    let angle = Math.atan(ty / tx) * 180 / Math.PI;
                    if (tx > 0) {
                        angle += 180;
                    }
                    twr.r = angle;
                    console.log(angle);
                    twr.c = stat[twr.t].s * (1 / gameSpeed);
                    
                } else {
                    clst = null;
                    clsd = null;
                }
            }
        }
    }
    
    for (i = 0; i < proj.length; i++) {
        prj = proj[i];
        ctx.drawImage(stat[prj.t].p, prj.x, prj.y, stat[prj.t].p.width, stat[prj.t].p.height);
        
        for (j = 0; j < nmes.length; j++) {
            nme = nmes[j];
            
            pos.x = prj.x + (stat[prj.t].pw / 2) - nme.x - 25;
            pos.y = prj.y + (stat[prj.t].pw / 2) - nme.y - 25;
            let distance = Math.sqrt(pos.x * pos.x + pos.y * pos.y);
            
            if (distance < 40 && nme.t >= 0 && prj.k === false) {
                prj.k = true;
                cash += typs[nme.t].r;
                pops.push({x:nme.x, y:nme.y, l:7});
                nme.t -= stat[prj.t].d;
                proj.splice(i, 1);
            }
        }
        
        prj.x += prj.dx * gameSpeed;
        prj.y += prj.dy * gameSpeed;
        prj.d += Math.sqrt(prj.dx * prj.dx + prj.dy * prj.dy) * gameSpeed;
        
        if (prj.d - 15 > stat[prj.t].r) {
            proj.splice(i, 1);
        }
    }
    
    for (i = 0; i < nmes.length; i++) {
        nme = nmes[i];
        if (nme.t >= 0) {
            s = typs[nme.t].s;
            ctx.drawImage(typs[nme.t].t, nme.x, nme.y, 50, 50);
        }
        if (nme.d === 0) {
            nme.x += s * gameSpeed;
            if (paths[nme.p + 1].x <= nme.x) {
                nme.p += 1;
                nme.x = paths[nme.p].x;
                nme.d = paths[nme.p].d;
            }
        } else if (nme.d === 1) {
            nme.y -= s * gameSpeed;
            if (paths[nme.p + 1].y >= nme.y) {
                nme.p += 1;
                nme.y = paths[nme.p].y;
                nme.d = paths[nme.p].d;
            }
        } else if (nme.d === 2) {
            nme.x -= s * gameSpeed;
            if (paths[nme.p + 1].x >= nme.x) {
                nme.p += 1;
                nme.x = paths[nme.p].x;
                nme.d = paths[nme.p].d;
            }
        } else if (nme.d === 3) {
            nme.y += s * gameSpeed;
            if (paths[nme.p + 1].y <= nme.y) {
                nme.p += 1;
                nme.y = paths[nme.p].y;
                nme.d = paths[nme.p].d;
            }
        } else {
            nmes.splice(i, 1);
            lives -= nme.t + 1;
        }
        
        if (nme.t < 0) {
            nmes.splice(i, 1);
        }
    } 
    
    for (i = 0; i < pops.length; i++) {
        pop = pops[i];
        ctx.globalAlpha = pop.l / 7;
        ctx.drawImage(popPart, pop.x, pop.y, 50, 50);
        ctx.globalAlpha = 1;
        pops[i].l -= 1;
        if (pops[i].l <= 0) {
            pops.splice(i, 1);
        }
    }

    
    ctx.fillStyle = "rgb(191,173,136)";
    ctx.fillRect(1540, 0, 380, 1080);
    
    if (built) {
        
        ctx.font = "bolder 64px Courier New";
        ctx.fillStyle = "rgba(0,0,0,0.5)";
        ctx.fillText("$" + cash, 10, 60);
        
        ctx.fillText("Wave " + wave, 10, 940);
        
        ctx.fillText("♥" + lives, 1340, 60);
        
        if (gameSpeed == 2) {
            ctx.fillStyle = "rgb(255,255,255)";
            ctx.fillRect(1380, 920, 120, 120); 
        }
        ctx.fillStyle = "rgb(0,0,0)";
        ctx.fillRect(1390, 930, 100, 100);
        ctx.font = "bolder 128px Courier New";
        ctx.fillStyle = "rgb(0,250,0)";
        ctx.fillText("‣", 1400, 1020);
        
        ctx.font = "bolder 64px Courier New";
        let gridX = 1560,
            gridY = 20;
        for (i = 0; i < stat.length; i++) {
            ctx.fillStyle = "rgba(0,0,0,0.3)";
            ctx.fillRect(gridX, gridY, 160, 160);
            
            ctx.fillStyle = "rgba(0,0,0,0.5)";
            ctx.drawImage(stat[i].t, gridX + 10, gridY + 10, 140, 140);
            ctx.fillText("$" + stat[i].c, gridX, gridY + 160);
            
            if (gridX == 1560) {
                gridX = 1740;
            } else {
                gridY += 180;
                gridX = 1560;
            }
        }
        
        ctx.drawImage(bull, 50, 950, 120, 120);
        if (del === true) {
            ctx.drawImage(no, 50, 950, 120, 120);
            ctx.fillStyle = "rgba(255,0,0,0.2)";
            ctx.fillRect(0, 0, 1920, 1080);
        }
    } else {
        pth = paths[paths.length - 1];
        
        ctx.fillStyle = "rgb(0,0,0)";
        ctx.fillRect(1390, 930, 100, 100);
        ctx.font = "bolder 128px Courier New";
        ctx.fillStyle = "rgb(0,250,0)";
        ctx.fillText("✓", 1400, 1020);
        
        ctx.fillStyle = "rgba(235,191,115,0.7)";
        let rndX = 50 * Math.round(mouseX / 50);
        let rndY = 50 * Math.round(mouseY / 50);
        if (pth.d === 0) {
            if (mouseY < pth.y + 25) {
                ctx.fillRect(pth.x + pth.w, rndY, 50, pth.y + 50 - rndY);
                newPth.x = pth.x + pth.w;
                newPth.y = rndY;
                newPth.w = 50;
                newPth.h = pth.y + 50 - rndY;
                newPth.d = 1;
                newPth.l = (pth.y + 50 - rndY) / 50;
            } else {
                ctx.fillRect(pth.x + pth.w, pth.y, 50, rndY - pth.y);
                newPth.x = pth.x + pth.w;
                newPth.y = pth.y;
                newPth.w = 50;
                newPth.h = rndY - pth.y;
                newPth.d = 3;
                newPth.l = (rndY - pth.y) / 50;
            }
        } else if (pth.d == 2) {
            if (mouseY < pth.y + 25) {
                ctx.fillRect(pth.x - 50, rndY, 50, pth.y + 50 - rndY);
                newPth.x = pth.x - 50;
                newPth.y = rndY;
                newPth.w = 50;
                newPth.h = pth.y + 50 - rndY;
                newPth.d = 1;
                newPth.l = (pth.y + 50 - rndY) / 50;
            } else {
                ctx.fillRect(pth.x - 50, pth.y, 50, rndY - pth.y);
                newPth.x = pth.x - 50;
                newPth.y = pth.y;
                newPth.w = 50;
                newPth.h = rndY - pth.y;
                newPth.d = 3;
                newPth.l = (rndY - pth.y) / 50;
            }
        } else if (pth.d == 1) {
            if (mouseX < pth.x + 25) {
                ctx.fillRect(rndX, pth.y - 50, pth.x + 50 - rndX, 50);
                newPth.x = rndX;
                newPth.y = pth.y - 50;
                newPth.w = pth.x + 50 - rndX;
                newPth.h = 50;
                newPth.d = 2;
                newPth.l = (pth.x + 50 - rndX) / 50;
            } else {
                ctx.fillRect(pth.x, pth.y - 50, rndX - pth.x, 50);
                newPth.x = pth.x;
                newPth.y = pth.y - 50;
                newPth.w = rndX - pth.x;
                newPth.h = 50;
                newPth.d = 0;
                newPth.l = (rndX - pth.x) / 50;
            }
        } else if (pth.d == 3) {
            if (mouseX < pth.x + 25) {
                ctx.fillRect(rndX, pth.y + pth.h, pth.x + 50 - rndX, 50);
                newPth.x = rndX;
                newPth.y = pth.y + pth.h;
                newPth.w = pth.x + 50 - rndX;
                newPth.h = 50;
                newPth.d = 2;
                newPth.l = (pth.x + 50 - rndX) / 50;
            } else {
                ctx.fillRect(pth.x, pth.y + pth.h, rndX - pth.x, 50);
                newPth.x = pth.x;
                newPth.y = pth.y + pth.h;
                newPth.w = rndX - pth.x;
                newPth.h = 50;
                newPth.d = 0;
                newPth.l = (rndX - pth.x) / 50;
            }
        }
    }

    if (nmes.length === 0) {
        canStart = true;
        if (waveEnd) {
            waveEnd = false;
            cash += 100;
            if (oldLives == lives) {
                cash += 100;
            }
        }
        if (play) {
            oldLives = lives;
            play = false;
            waveEnd = true;
            wave += 1;
            spawnEnemy(wave);
            canStart = false;
        }
    }

    if (lives <= 0) {
        place = null;
        cash = 500;
        lives = 100;
        wave = 0;
        play = false;
        waveEnd = false;
        canStart = true;
        twrs = [];
        nmes = [];
        defineWaves();
    }

}, (100 / 6));