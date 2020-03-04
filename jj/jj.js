var run = false;
var jump = false;
var canJump = false;
var plrImg = new Image(64, 64);
var speed = 10.8;
plrImg.src = "https://yt3.ggpht.com/a/AGF-l797HE3c9xjNUgeDa4YJFAU9BQx7NpCT0kTDLw=s288-c-k-c0xffffffff-no-rj-mo";
window.addEventListener('mousedown', function() {
    jump = true;
    if (run === false) {
        run = true;
        start();
    } else if (plr.speed === 0 && canJump) {
        plr.speed = plr.jmpPow;
        canJump = false;
    }
});
    
window.addEventListener('mouseup', function() {
    jump = false;
});

var canvas = document.getElementById("jj");
var ctx = canvas.getContext("2d");
ctx.canvas.width  = 2000;
ctx.canvas.height = 1000;

var plr;
var grnd;
var spikes;
var blocks;

function loadLevel1() {
plr = {color:"rgb(255,120,30)", posX:200, posY:400, speed:4, jmpPow:-24.5, rot:0, rot90:0, rotSpeed:7};
grnd = {color:"rgb(0,20,50)"};
spikes = [
    {color:"rgb(250,000,000)", posX:800, posY:64},
    {color:"rgb(252,127,003)", posX:864, posY:64},
    {color:"rgb(250,250,000)", posX:1184, posY:64},
    {color:"rgb(000,200,050)", posX:1248, posY:64},
    {color:"rgb(000,000,000)", posX:1600, posY:64},
    {color:"rgb(000,000,000)", posX:1664, posY:64},
    {color:"rgb(000,000,000)", posX:1728, posY:64}
    ];
blocks = [
    {color:"rgba(250,000,000)", posX:336, posY:64},
    {color:"rgb(252,127,003)", posX:336, posY:128},
    {color:"rgb(250,000,000)", posX:400, posY:64},
    {color:"rgb(252,127,003)", posX:400, posY:128},
    {color:"rgb(250,000,000)", posX:464, posY:64},
    {color:"rgb(252,127,003)", posX:464, posY:128},
    {color:"rgb(252,252,000)", posX:528, posY:192},
    {color:"rgb(252,252,000)", posX:592, posY:192},
    {color:"rgb(252,127,003)", posX:528, posY:128},
    {color:"rgb(050,050,050)", posX:2000, posY:64},
    {color:"rgb(050,050,050)", posX:2256, posY:64},
    {color:"rgb(050,050,050)", posX:2256, posY:128},
    {color:"rgb(050,050,050)", posX:2512, posY:64},
    {color:"rgb(050,050,050)", posX:2512, posY:128},
    {color:"rgb(050,050,050)", posX:2512, posY:192},
    ];
}

loadLevel1();

function start() {

function onDeath() {
    speed = 0;
    plr.posX = -128;
    setTimeout(function () {
        speed = 10.8;
        loadLevel1();
    }, 3000);
}

setInterval(function run() {
    document.getElementById("y").innerHTML = "Y: " + (canvas.height - plr.posY - 184);
    document.getElementById("s").innerHTML = "Speed: " + plr.speed;
    document.getElementById("j").innerHTML = "canJump: " + canJump;
    document.getElementById("r").innerHTML = "Rotation: " + plr.rot;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = grnd.color;
    ctx.lineWidth = 8;
    ctx.strokeStyle = "rgb(0,0,0)";
    ctx.fillRect(0, canvas.height - 120, canvas.width, 120);
    
    for (i = 0; i < spikes.length; i++) {
        spk = spikes[i];
        
        spk.posX -= speed;
        if (spk.posX <= -2048) {
            spk.posX = canvas.width;
        }
        
        ctx.fillStyle = spk.color;
        ctx.beginPath();
        ctx.moveTo(spk.posX, canvas.height - 56 - spk.posY);
        ctx.lineTo(64 + spk.posX, canvas.height - 56 - spk.posY);
        ctx.lineTo(32 + spk.posX, canvas.height - 120 - spk.posY);
        ctx.lineTo(spk.posX, canvas.height - 56 - spk.posY);
        ctx.fill();
        ctx.stroke();
        
        if (plr.posX < spk.posX + 16 + 32 && plr.posX + 64 > spk.posX + 16 && plr.posY < canvas.height - 120 - spk.posY + 26 + 40 && plr.posY + 64 > canvas.height - 120 - spk.posY + 26) {
            onDeath();
        }
        
        
    }
    
    plr.posY += plr.speed;
    if (plr.speed !== 0) {
        plr.rot += plr.rotSpeed;
    } else {
        if (plr.rot > 30 && plr.rot < 45) {
            plr.rotSpeed = -15;
            plr.rot += plr.rotSpeed;
        } else if (plr.rot >= 45 && plr.rot < 60) {
            plr.rotSpeed = 15;
            plr.rot += plr.rotSpeed;
        } else if (plr.rot <= 30 && plr.rot !== 0) {
            plr.rotSpeed = -10;
            plr.rot += plr.rotSpeed;
        } else if (plr.rot >= 60 && plr.rot !== 0) {
            plr.rotSpeed = 10;
            plr.rot += plr.rotSpeed;
        } else {
            plr.rotSpeed = 7;
            plr.rot = 0;
        }
    }
    if (plr.rot >= 90) {
        plr.rot = 0;
        plr.rotSpeed = 7;
        plr.rot90 += 1;
        if (plr.rot90 >= 4) {
            plr.rot90 = 0;
        }
    }
    if (plr.rot < 0) {
        plr.rot = 0;
        plr.rotSpeed = 7;
    }
    if (plr.posY + 64 != canvas.height - 120) {
        if (plr.posY + 64 > canvas.height - 120) {
            plr.speed = 0;
            canJump = true;
            plr.posY = canvas.height - 184;
            if (jump) {
                plr.speed = plr.jmpPow;
                canJump = false;
            }
        } else {
            plr.speed += 2;
        }
    }
    
    for (i = 0; i < blocks.length; i++) {
        blk = blocks[i];
        ctx.fillStyle = blk.color;
        ctx.beginPath();
        ctx.moveTo(blk.posX, canvas.height - 56 - blk.posY);
        ctx.lineTo(blk.posX + 64, canvas.height - 56 - blk.posY);
        ctx.lineTo(blk.posX + 64, canvas.height - 120 - blk.posY);
        ctx.lineTo(blk.posX, canvas.height - 120 - blk.posY);
        ctx.lineTo(blk.posX, canvas.height - 56 - blk.posY);
        ctx.fill();
        ctx.stroke();
        
        var rect1 = {x: 5, y: 5, width: 50, height: 50}
        var rect2 = {x: 20, y: 10, width: 10, height: 10}
        
        blk.posX -= speed;
        if (blk.posX <= -2048) {
            blk.posX = canvas.width;
        }
        if (plr.speed >= 0 && canvas.height - plr.posY - 184 <= blk.posY && canvas.height - plr.posY - 168 >= blk.posY && plr.posX >= blk.posX - 60 && plr.posX <= blk.posX + 56) {
            plr.posY = canvas.height - 184 - blk.posY;
            plr.speed = 0;
            canJump = true;
            if (jump) {
                plr.speed = plr.jmpPow;
                canJump = false;
            }
        } else if (plr.posX < blk.posX + 64 &&
            plr.posX + 64 > blk.posX &&
            plr.posY < canvas.height - 120 - blk.posY + 64 &&
            plr.posY + 64 > canvas.height - 120 - blk.posY) {
            onDeath();
        }
    }
    
    ctx.translate(plr.posX + 32, plr.posY + 32);
    ctx.rotate((plr.rot + (90 * plr.rot90)) * Math.PI / 180);
    /*
    ctx.fillStyle = plr.color;
    ctx.fillRect(-8, -8, 16, 16);
    */
    ctx.drawImage(plrImg, -32, -32, 64, 64);
    
    ctx.resetTransform();
    
}, 20);
}