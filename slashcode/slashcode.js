let mode = true,
    codes = {
    'a':'.',
    'b':'..',
    'c':'...',
    'd':'....',
    'e':'-',
    'f':'-.',
    'g':'-..',
    'h':'-...',
    'i':'-....',
    'j':'/',
    'k':'/.',
    'l':'/..',
    'm':'/...',
    'n':'/....',
    'o':'/-',
    'p':'/-.',
    'q':'/-..',
    'r':'/-...',
    's':'/-....',
    't':'//',
    'u':'//.',
    'v':'//..',
    'w':'//...',
    'x':'//....',
    'y':'//-',
    'z':'//-.',
    ',':'‚',
    '-':'–',
    '.':'․',
    '/':'∕'
};

function encode(text) {
    text = text.toLowerCase();
    let words = text.split(' '),
        out = [];
    for (let i = 0; i < words.length; i++) {
        let chars = words[i].split(''),
            temp = [];
        for (let j = 0; j < chars.length; j++) {
            if (chars[j] in codes) {
                temp.push(codes[chars[j]]);
            } else {
                temp.push(chars[j]);
            }
        }
        out.push(temp.join(','));
    }
    return out.join('<br>').replace(/\n/g, '<br>');
}

function decode(text) {
    let lines = text.split('\n'),
        out = [];
    for (let i = 0; i < lines.length; i++) {
        let space = false;
        if (lines[i].charAt(lines[i].length-1) == ',') {
            space = true;
        }
        let chars = lines[i].split(',');
        let temp = '';
        for (let j = 0; j < chars.length; j++) {
            let char = Object.keys(codes).find(key => codes[key] === chars[j]);
            if (char) {
                temp += char;
            } else {
                temp += chars[j];
            }
        }
        if (space) {
            temp += '‚';
        }
        out.push(temp);
    }
    return out.join(' ').replace(/‚ /g, '<br>');
}

function code(text) {
    let out = document.getElementById('output');
    if (mode) {
        out.innerHTML = encode(text);
    } else {
        out.innerHTML = decode(text);
    }
}

function clearBoxes() {
    document.getElementById('input').value = '';
    document.getElementById('output').innerHTML = '';
}

function switchMode(val) {
    if (val == 'encode') {
        mode = true;
    } else {
        mode = false;
    }
}
