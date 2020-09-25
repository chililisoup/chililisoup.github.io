let canvas = document.getElementById("cool");
canvas.width = 500;
canvas.height = 500;
let ctx = canvas.getContext("2d");
let color = "#FF0000";
ctx.lineCap = "round";

let canvas2 = document.getElementById("uber");
canvas2.width = 500;
canvas2.height = 500;
let ctx2 = canvas2.getContext("2d");

let cache = 4096;
let circleA = 0.3;
let lineA = 0.3;

let circleStart = [
    {r:50,v:90,a:0,x:0,y:0},
    {r:30,v:-30,a:0,x:0,y:0}
];
let circles = [
    {r:50,v:90,a:0,x:0,y:0},
    {r:30,v:-30,a:0,x:0,y:0}
];

circles[0].x = 250;
circles[0].y = 250;

function reset() {
    circles = [];
    for (let i = 0; i < circleStart.length; i++) {
        circles.push({r:circleStart[i].r,v:circleStart[i].v,a:circleStart[i].a,x:circleStart[i].x,y:circleStart[i].y});
    }
    circles[0].x = 250;
    circles[0].y = 250;
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
}

function remove(n) {
    circleStart.splice(n, 1);
    createTable();
}

function addCircle() {
    circleStart.push({r:50,v:90,a:0,x:0,y:0});
    createTable();
}

function togCircles() {
    if (circleA == 0.3) {
        circleA = 0;
    } else {
        circleA = 0.3;
    }
}

function togLines() {
    if (lineA == 0.3) {
        lineA = 0;
    } else {
        lineA = 0.3;
    }
}

function loadPreset() {
    switch (document.getElementById("preset").value) {
        case "clover":
            circleStart = [
                {r:50,v:90,a:0,x:0,y:0},
                {r:30,v:-30,a:0,x:0,y:0}
            ];
            createTable();
            break;
        case "adobe":
            circleStart = [
                {r:90,v:-45,a:0,x:0,y:0},
                {r:70,v:90,a:0,x:0,y:0}
            ];
            createTable();
            break;
        case "star":
            circleStart = [
                {r:50,v:-60,a:0,x:0,y:0},
                {r:30,v:90,a:0,x:0,y:0}
            ];
            createTable();
            break;
        case "firework":
            circleStart = [
                {r:50,v:60,a:0,x:0,y:0},
                {r:50,v:-50,a:0,x:0,y:0},
                {r:20,v:2020,a:0,x:0,y:0}
            ];
            createTable();
            break;
        case "fish":
            circleStart = [
                {r:50,v:30,a:0,x:0,y:0},
                {r:35,v:60,a:0,x:0,y:0},
                {r:50,v:-30,a:0,x:0,y:0}
            ];
            createTable();
            break;
    }
}

function radius(n) {
    circleStart[n].r = document.getElementById("radius" + n).value;
}

function velocity(n) {
    circleStart[n].v = document.getElementById("velocity" + n).value;
}

function angle(n) {
    circleStart[n].a = document.getElementById("angle" + n).value;
}

function createTable() {
    let text = "";
    text += "<tr><th></th><th><p>Radius</p></th><th><p>Degs/Sec</p></th><th><p>Angle</p></th></tr>";
    for (let i = 0; i < circleStart.length; i++) {
        text += "<tr><th><button style='width:100%;' onmousedown='remove(" + i + ")'>X</button></th>";
        text += "<th><input step='0.01' placeholder='50.00' type='number' id='radius" + i + "' onchange='radius(" + i + ")' value='" + circleStart[i].r + "'></th>";
        text += "<th><input step='0.01' placeholder='90.00' type='number' id='velocity" + i + "' onchange='velocity(" + i + ")' value='" + circleStart[i].v + "'></th>";
        text += "<th><input step='0.01' placeholder='0.00' type='number' id='angle" + i + "' onchange='angle(" + i + ")' value='" + circleStart[i].a + "'></th></tr>";
    }
    document.getElementById("circleManager").innerHTML = text;
}
createTable();

let loop = setInterval(function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < circles.length; i++) {
        ctx.globalAlpha = circleA;
        ctx.strokeStyle = "#FFFFFF";
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.arc(circles[i].x, circles[i].y, circles[i].r, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.closePath();

        ctx.globalAlpha = lineA;
        ctx.strokeStyle = "#0000FF";
        ctx.lineWidth = 5;
        ctx.beginPath();
        let newx = circles[i].x + circles[i].r * Math.cos((Math.PI * circles[i].a) / 180);
        let newy = circles[i].y + circles[i].r * Math.sin((Math.PI * circles[i].a) / 180);
        ctx.moveTo(circles[i].x, circles[i].y);
        ctx.lineTo(newx, newy);
        ctx.stroke();
        ctx.closePath();

        if (i < circles.length - 1) {
            circles[i + 1].x = newx;
            circles[i + 1].y = newy;
        } else {
            ctx2.fillStyle = color;
            ctx2.beginPath();
            ctx2.arc(newx, newy, 1, 0, 2 * Math.PI);
            ctx2.fill();
            ctx2.closePath();
        }

        circles[i].a -= circles[i].v / 60;
    }
    color = changeHue(color, 1)
}, (50 / 3));













//Not mine, just a hue shifter thing
function changeHue(rgb, degree) {
    let hsl = rgbToHSL(rgb);
    hsl.h += degree;
    if (hsl.h > 360) {
        hsl.h -= 360;
    }
    else if (hsl.h < 0) {
        hsl.h += 360;
    }
    return hslToRGB(hsl);
}

// exepcts a string and returns an object
function rgbToHSL(rgb) {
    // strip the leading # if it's there
    rgb = rgb.replace(/^\s*#|\s*$/g, '');

    // convert 3 char codes --> 6, e.g. `E0F` --> `EE00FF`
    if(rgb.length == 3){
        rgb = rgb.replace(/(.)/g, '$1$1');
    }

    let r = parseInt(rgb.substr(0, 2), 16) / 255,
        g = parseInt(rgb.substr(2, 2), 16) / 255,
        b = parseInt(rgb.substr(4, 2), 16) / 255,
        cMax = Math.max(r, g, b),
        cMin = Math.min(r, g, b),
        delta = cMax - cMin,
        l = (cMax + cMin) / 2,
        h = 0,
        s = 0;

    if (delta == 0) {
        h = 0;
    }
    else if (cMax == r) {
        h = 60 * (((g - b) / delta) % 6);
    }
    else if (cMax == g) {
        h = 60 * (((b - r) / delta) + 2);
    }
    else {
        h = 60 * (((r - g) / delta) + 4);
    }

    if (delta == 0) {
        s = 0;
    }
    else {
        s = (delta/(1-Math.abs(2*l - 1)))
    }

    return {
        h: h,
        s: s,
        l: l
    }
}

// expects an object and returns a string
function hslToRGB(hsl) {
    let h = hsl.h,
        s = hsl.s,
        l = hsl.l,
        c = (1 - Math.abs(2*l - 1)) * s,
        x = c * ( 1 - Math.abs((h / 60 ) % 2 - 1 )),
        m = l - c/ 2,
        r, g, b;

    if (h < 60) {
        r = c;
        g = x;
        b = 0;
    }
    else if (h < 120) {
        r = x;
        g = c;
        b = 0;
    }
    else if (h < 180) {
        r = 0;
        g = c;
        b = x;
    }
    else if (h < 240) {
        r = 0;
        g = x;
        b = c;
    }
    else if (h < 300) {
        r = x;
        g = 0;
        b = c;
    }
    else {
        r = c;
        g = 0;
        b = x;
    }

    r = normalize_rgb_value(r, m);
    g = normalize_rgb_value(g, m);
    b = normalize_rgb_value(b, m);

    return rgbToHex(r,g,b);
}

function normalize_rgb_value(color, m) {
    color = Math.floor((color + m) * 255);
    if (color < 0) {
        color = 0;
    }
    return color;
}

function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}
