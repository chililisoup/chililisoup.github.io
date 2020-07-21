var starts = [];

var monster = [];
var creature = [];
var ambient = [];
var water_creature = [];
var water_ambient = [];
var misc = [];

var sky_color = 7907327;
var fog_color = 12638463;
var water_color = 4159204;
var water_fog_color = 329011;


function createNew(type) {
    switch(type) {
        case "starts":
            starts.push("");
            redraw();
            break;

        case "monster":
            monster.push({"type":"","weight":"","minCount":"","maxCount":""});
            redraw();
            break;
        case "creature":
            creature.push({"type":"","weight":"","minCount":"","maxCount":""});
            redraw();
            break;
        case "ambient":
            ambient.push({"type":"","weight":"","minCount":"","maxCount":""});
            redraw();
            break;
        case "water_creature":
            water_creature.push({"type":"","weight":"","minCount":"","maxCount":""});
            redraw();
            break;
        case "water_ambient":
            water_ambient.push({"type":"","weight":"","minCount":"","maxCount":""});
            redraw();
            break;
        case "misc":
            misc.push({"type":"","weight":"","minCount":"","maxCount":""});
            redraw();
            break;
        
    }

    reloadDL();
}

function change(type, n) {
    switch(type) {
        case "starts":
            starts[n] = document.getElementById("starts" + n).value;
            break;

        case "monster":
            monster[n].type = document.getElementById("monster" + n + "TYPE").value;
            monster[n].weight = document.getElementById("monster" + n + "WEIGHT").value;
            monster[n].minCount = document.getElementById("monster" + n + "MIN").value;
            monster[n].maxCount = document.getElementById("monster" + n + "MAX").value;
            break;
        case "creature":
            creature[n].type = document.getElementById("creature" + n + "TYPE").value;
            creature[n].weight = document.getElementById("creature" + n + "WEIGHT").value;
            creature[n].minCount = document.getElementById("creature" + n + "MIN").value;
            creature[n].maxCount = document.getElementById("creature" + n + "MAX").value;
            break;
        case "ambient":
            ambient[n].type = document.getElementById("ambient" + n + "TYPE").value;
            ambient[n].weight = document.getElementById("ambient" + n + "WEIGHT").value;
            ambient[n].minCount = document.getElementById("ambient" + n + "MIN").value;
            ambient[n].maxCount = document.getElementById("ambient" + n + "MAX").value;
            break;
        case "water_creature":
            water_creature[n].type = document.getElementById("water_creature" + n + "TYPE").value;
            water_creature[n].weight = document.getElementById("water_creature" + n + "WEIGHT").value;
            water_creature[n].minCount = document.getElementById("water_creature" + n + "MIN").value;
            water_creature[n].maxCount = document.getElementById("water_creature" + n + "MAX").value;
            break;
        case "water_ambient":
            water_ambient[n].type = document.getElementById("water_ambient" + n + "TYPE").value;
            water_ambient[n].weight = document.getElementById("water_ambient" + n + "WEIGHT").value;
            water_ambient[n].minCount = document.getElementById("water_ambient" + n + "MIN").value;
            water_ambient[n].maxCount = document.getElementById("water_ambient" + n + "MAX").value;
            break;
        case "misc":
            misc[n].type = document.getElementById("misc" + n + "TYPE").value;
            misc[n].weight = document.getElementById("misc" + n + "WEIGHT").value;
            misc[n].minCount = document.getElementById("misc" + n + "MIN").value;
            misc[n].maxCount = document.getElementById("misc" + n + "MAX").value;
            break;
    }

    reloadDL();
}

function remove(type, n) {
    switch(type) {
        case "starts":
            starts.splice(n, 1);
            redraw();
            break;

        case "monster":
            monster.splice(n, 1);
            redraw();
            break;
        case "creature":
            creature.splice(n, 1);
            redraw();
            break;
        case "ambient":
            ambient.splice(n, 1);
            redraw();
            break;
        case "water_creature":
            water_creature.splice(n, 1);
            redraw();
            break;
        case "water_ambient":
            water_ambient.splice(n, 1);
            redraw();
            break;
        case "misc":
            misc.splice(n, 1);
            redraw();
            break;
    }

    reloadDL();
}

function redraw() {

    modifyColor("Sky", "dec" + sky_color);
    modifyColor("Fog", "dec" + fog_color);
    modifyColor("Water", "dec" + water_color);
    modifyColor("WaterFog", "dec" + water_fog_color);



    let txt = "<tr><th class=\"thbutton\"><button onmousedown=\"createNew('starts')\">+</button></th><th><h4>Structure ID</h4></th></tr>";
    for (i = 0; i < starts.length; i++) {
        txt += "<tr><th class=\"thbutton\"><button onmousedown=\"remove('starts', " + i + ")\">-</button></th>";
        txt += "<th><input value='" + starts[i] + "' type='text' placeholder='minecraft:village_plains' id='starts" + i + "' onchange=\"change('starts', " + i + ")\"></th></tr>";
    }
    document.getElementById("startsTable").innerHTML = txt;



    txt = "<tr><th class=\"thbutton\"><button onmousedown=\"createNew('monster')\">+</button></th><th style='width:52%;'><h4>Entity ID</h4></th><th><h4>Weight</h4></th><th><h4>Min Count</h4></th><th><h4>Max Count</h4></th></tr>";
    for (i = 0; i < monster.length; i++) {
        txt += "<tr><th class=\"thbutton\"><button onmousedown=\"remove('monster', " + i + ")\">-</button></th>";
        txt += "<th style='width:52%;'><input value='" + monster[i].type + "' type='text' placeholder='minecraft:zombie' id='monster" + i + "TYPE' onchange=\"change('monster', " + i + ")\"></th>";
        txt += "<th style='width:16%;'><input value='" + monster[i].weight + "' type='number' min='1' placeholder='100' id='monster" + i + "WEIGHT' onchange=\"change('monster', " + i + ")\"></th>";
        txt += "<th style='width:16%;'><input value='" + monster[i].minCount + "' type='number' min='1' placeholder='4' id='monster" + i + "MIN' onchange=\"change('monster', " + i + ")\"></th>";
        txt += "<th style='width:16%;'><input value='" + monster[i].maxCount + "' type='number' min='1' placeholder='4' id='monster" + i + "MAX' onchange=\"change('monster', " + i + ")\"></th></tr>";
    }
    document.getElementById("monsterTable").innerHTML = txt;

    txt = "<tr><th class=\"thbutton\"><button onmousedown=\"createNew('creature')\">+</button></th><th style='width:52%;'><h4>Entity ID</h4></th><th><h4>Weight</h4></th><th><h4>Min Count</h4></th><th><h4>Max Count</h4></th></tr>";
    for (i = 0; i < creature.length; i++) {
        txt += "<tr><th class=\"thbutton\"><button onmousedown=\"remove('creature', " + i + ")\">-</button></th>";
        txt += "<th style='width:52%;'><input value='" + creature[i].type + "' type='text' placeholder='minecraft:pig' id='creature" + i + "TYPE' onchange=\"change('creature', " + i + ")\"></th>";
        txt += "<th style='width:16%;'><input value='" + creature[i].weight + "' type='number' min='1' placeholder='10' id='creature" + i + "WEIGHT' onchange=\"change('creature', " + i + ")\"></th>";
        txt += "<th style='width:16%;'><input value='" + creature[i].minCount + "' type='number' min='1' placeholder='4' id='creature" + i + "MIN' onchange=\"change('creature', " + i + ")\"></th>";
        txt += "<th style='width:16%;'><input value='" + creature[i].maxCount + "' type='number' min='1' placeholder='4' id='creature" + i + "MAX' onchange=\"change('creature', " + i + ")\"></th></tr>";
    }
    document.getElementById("creatureTable").innerHTML = txt;

    txt = "<tr><th class=\"thbutton\"><button onmousedown=\"createNew('ambient')\">+</button></th><th style='width:52%;'><h4>Entity ID</h4></th><th><h4>Weight</h4></th><th><h4>Min Count</h4></th><th><h4>Max Count</h4></th></tr>";
    for (i = 0; i < ambient.length; i++) {
        txt += "<tr><th class=\"thbutton\"><button onmousedown=\"remove('ambient', " + i + ")\">-</button></th>";
        txt += "<th style='width:52%;'><input value='" + ambient[i].type + "' type='text' placeholder='minecraft:bat' id='ambient" + i + "TYPE' onchange=\"change('ambient', " + i + ")\"></th>";
        txt += "<th style='width:16%;'><input value='" + ambient[i].weight + "' type='number' min='1' placeholder='10' id='ambient" + i + "WEIGHT' onchange=\"change('ambient', " + i + ")\"></th>";
        txt += "<th style='width:16%;'><input value='" + ambient[i].minCount + "' type='number' min='1' placeholder='8' id='ambient" + i + "MIN' onchange=\"change('ambient', " + i + ")\"></th>";
        txt += "<th style='width:16%;'><input value='" + ambient[i].maxCount + "' type='number' min='1' placeholder='8' id='ambient" + i + "MAX' onchange=\"change('ambient', " + i + ")\"></th></tr>";
    }
    document.getElementById("ambientTable").innerHTML = txt;

    txt = "<tr><th class=\"thbutton\"><button onmousedown=\"createNew('water_creature')\">+</button></th><th style='width:52%;'><h4>Entity ID</h4></th><th><h4>Weight</h4></th><th><h4>Min Count</h4></th><th><h4>Max Count</h4></th></tr>";
    for (i = 0; i < water_creature.length; i++) {
        txt += "<tr><th class=\"thbutton\"><button onmousedown=\"remove('water_creature', " + i + ")\">-</button></th>";
        txt += "<th style='width:52%;'><input value='" + water_creature[i].type + "' type='text' placeholder='minecraft:squid' id='water_creature" + i + "TYPE' onchange=\"change('water_creature', " + i + ")\"></th>";
        txt += "<th style='width:16%;'><input value='" + water_creature[i].weight + "' type='number' min='1' placeholder='1' id='water_creature" + i + "WEIGHT' onchange=\"change('water_creature', " + i + ")\"></th>";
        txt += "<th style='width:16%;'><input value='" + water_creature[i].minCount + "' type='number' min='1' placeholder='1' id='water_creature" + i + "MIN' onchange=\"change('water_creature', " + i + ")\"></th>";
        txt += "<th style='width:16%;'><input value='" + water_creature[i].maxCount + "' type='number' min='1' placeholder='4' id='water_creature" + i + "MAX' onchange=\"change('water_creature', " + i + ")\"></th></tr>";
    }
    document.getElementById("water_creatureTable").innerHTML = txt;

    txt = "<tr><th class=\"thbutton\"><button onmousedown=\"createNew('water_ambient')\">+</button></th><th style='width:52%;'><h4>Entity ID</h4></th><th><h4>Weight</h4></th><th><h4>Min Count</h4></th><th><h4>Max Count</h4></th></tr>";
    for (i = 0; i < water_ambient.length; i++) {
        txt += "<tr><th class=\"thbutton\"><button onmousedown=\"remove('water_ambient', " + i + ")\">-</button></th>";
        txt += "<th style='width:52%;'><input value='" + water_ambient[i].type + "' type='text' placeholder='minecraft:cod' id='water_ambient" + i + "TYPE' onchange=\"change('water_ambient', " + i + ")\"></th>";
        txt += "<th style='width:16%;'><input value='" + water_ambient[i].weight + "' type='number' min='1' placeholder='10' id='water_ambient" + i + "WEIGHT' onchange=\"change('water_ambient', " + i + ")\"></th>";
        txt += "<th style='width:16%;'><input value='" + water_ambient[i].minCount + "' type='number' min='1' placeholder='3' id='water_ambient" + i + "MIN' onchange=\"change('water_ambient', " + i + ")\"></th>";
        txt += "<th style='width:16%;'><input value='" + water_ambient[i].maxCount + "' type='number' min='1' placeholder='6' id='water_ambient" + i + "MAX' onchange=\"change('water_ambient', " + i + ")\"></th></tr>";
    }
    document.getElementById("water_ambientTable").innerHTML = txt;

    txt = "<tr><th class=\"thbutton\"><button onmousedown=\"createNew('misc')\">+</button></th><th style='width:52%;'><h4>Entity ID</h4></th><th><h4>Weight</h4></th><th><h4>Min Count</h4></th><th><h4>Max Count</h4></th></tr>";
    for (i = 0; i < misc.length; i++) {
        txt += "<tr><th class=\"thbutton\"><button onmousedown=\"remove('misc', " + i + ")\">-</button></th>";
        txt += "<th style='width:52%;'><input value='" + misc[i].type + "' type='text' placeholder='minecraft:zombie' id='misc" + i + "TYPE' onchange=\"change('misc', " + i + ")\"></th>";
        txt += "<th style='width:16%;'><input value='" + misc[i].weight + "' type='number' min='1' placeholder='100' id='misc" + i + "WEIGHT' onchange=\"change('misc', " + i + ")\"></th>";
        txt += "<th style='width:16%;'><input value='" + misc[i].minCount + "' type='number' min='1' placeholder='4' id='misc" + i + "MIN' onchange=\"change('misc', " + i + ")\"></th>";
        txt += "<th style='width:16%;'><input value='" + misc[i].maxCount + "' type='number' min='1' placeholder='4' id='misc" + i + "MAX' onchange=\"change('misc', " + i + ")\"></th></tr>";
    }
    document.getElementById("miscTable").innerHTML = txt;

}

function reloadDL() {
    let obj = {
        "starts":starts,
        "spawners":{
            "monster":monster,
            "creature":creature,
            "ambient":ambient,
            "water_creature":water_creature,
            "water_ambient":water_ambient,
            "misc":misc
        },
        "sky_color":sky_color,
        "effects":{
            "fog_color": fog_color,
            "water_color": water_color,
            "water_fog_color": water_fog_color
        }
    };
    let data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(obj, null, "\t"));
    let a = document.getElementById("download");
    a.href = 'data:' + data;
    a.download = 'data.json';
}

function loadJSON() {
    let file = document.getElementById("upload").files[0];
    let reader = new FileReader();
    let obj;

    try {
        reader.readAsText(file);
    } catch(error) {
        console.log("User uploaded nothing. Rude.");
    }

    reader.onload = function() {
        try {
            obj = JSON.parse(reader.result);
        } catch(error) {
            alert(error.message)
        }

        if (typeof obj.starts !== "undefined") {
            starts = obj.starts;
        } else {
            alert("Missing the 'starts' array!")
        }



        if (typeof obj.spawners == "undefined") {
            alert("Missing the 'spawners' object!")
        } else {

            if (typeof obj.spawners.monster !== "undefined") {
                monster = obj.spawners.monster;
            } else {
                alert("Missing the 'monster' array!")
            }
    
            if (typeof obj.spawners.creature !== "undefined") {
                creature = obj.spawners.creature;
            } else {
                alert("Missing the 'creature' array!")
            }
    
            if (typeof obj.spawners.ambient !== "undefined") {
                ambient = obj.spawners.ambient;
            } else {
                alert("Missing the 'ambient' array!")
            }
    
            if (typeof obj.spawners.water_creature !== "undefined") {
                water_creature = obj.spawners.water_creature;
            } else {
                alert("Missing the 'water_creature' array!")
            }
    
            if (typeof obj.spawners.water_ambient !== "undefined") {
                water_ambient = obj.spawners.water_ambient;
            } else {
                alert("Missing the 'water_ambient' array!")
            }
    
            if (typeof obj.spawners.misc !== "undefined") {
                misc = obj.spawners.misc;
            } else {
                alert("Missing the 'misc' array!")
            }

        }



        if (typeof obj.sky_color !== "undefined") {
            sky_color = obj.sky_color;
        } else {
            alert("Missing the 'sky_color' decimal color!")
        }

        if (typeof obj.effects == "undefined") {
            alert("Missing the 'effects' object!")
        } else {

            if (typeof obj.effects.fog_color !== "undefined") {
                fog_color = obj.effects.fog_color;
            } else {
                alert("Missing the 'fog_color' decimal color!")
            }
    
            if (typeof obj.effects.water_color !== "undefined") {
                water_color = obj.effects.water_color;
            } else {
                alert("Missing the 'water_color' decimal color!\n(Yes, even nether biomes need them!)")
            }
    
            if (typeof obj.effects.water_fog_color !== "undefined") {
                water_fog_color = obj.effects.water_fog_color;
            } else {
                alert("Missing the 'water_fog_color' decimal color!\n(Yes, even nether biomes need them!)")
            }

        }

        redraw();

    }

    reader.onerror = function() {
        alert(reader.error);
    }
}

function toggleVis(id) {
    if (document.querySelector("#" + id + " > div.content:first-of-type").style.display !== "block") {
        document.querySelector("#" + id + " > header:first-of-type > button:first-of-type").innerHTML = "-";
        document.querySelector("#" + id + " > div.content:first-of-type").style.display = "block";
    } else {
        document.querySelector("#" + id + " > header:first-of-type > button:first-of-type").innerHTML = "+";
        document.querySelector("#" + id + " > div.content:first-of-type").style.display = "none";
    }
}

function modifyColor(color, value) {
    try {
        if (value.charAt(0) == '#') {
            value = value.substr(1);
        } else if (value.substr(0,3) == "dec") {
            value = decToHex(value.substr(3));
        }
        document.getElementById("hexColor" + color).value = value;
        document.getElementById("color" + color).value = "#" + value;
        
        value = hexToDec(value)
        document.getElementById("decColor" + color).value = value;

        switch(color) {
            case "Sky":
                sky_color = value;
                break;
            case "Fog":
                fog_color = value;
                break;
            case "Water":
                water_color = value;
                break;
            case "WaterFog":
                water_fog_color = value;
                break;
        }

        reloadDL();

    } catch(error) {
        alert(error.message);
    }
}

function decToHex(n) {
    let hex = parseInt(n, 10);
    hex = hex.toString(16);
    while (hex.length < 6) {
        hex = "0" + hex;
    }
    if (hex.length > 6) {
        hex = "000000";
    }
    return hex;
}

function hexToDec(n) {
    return parseInt(n, 16);
}