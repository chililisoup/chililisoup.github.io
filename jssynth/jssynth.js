let context = new AudioContext();
let octave = 3,
    oscillator = 'sawtooth';

let kbIn = {
    a:'c',
    w:'c#',
    s:'d',
    e:'d#',
    d:'e',
    f:'f',
    t:'f#',
    g:'g',
    y:'g#',
    h:'a',
    u:'a#',
    j:'b',
    k:'+c',
    o:'+c#',
    l:'+d',
    p:'+d#',
    ';':'+e',
    '\'':'+f',
};

let pitches = [
    {
        'c':16.35,
        'c#':17.32,
        'd':18.35,
        'd#':19.45,
        'e':20.6,
        'f':21.83,
        'f#':23.12,
        'g':24.5,
        'g#':25.96,
        'a':27.50,
        'a#':29.14,
        'b':90.87
    },
    {
        'c':32.7,
        'c#':34.65,
        'd':36.71,
        'd#':38.89,
        'e':41.2,
        'f':43.65,
        'f#':46.25,
        'g':49,
        'g#':51.91,
        'a':55,
        'a#':58.27,
        'b':61.74
    },
    {
        'c':65.41,
        'c#':69.3,
        'd':73.42,
        'd#':77.78,
        'e':82.41,
        'f':87.31,
        'f#':92.5,
        'g':98,
        'g#':103.8,
        'a':110,
        'a#':116.5,
        'b':123.5
    },
    {
        'c':130.8,
        'c#':138.6,
        'd':146.8,
        'd#':155.6,
        'e':164.8,
        'f':174.6,
        'f#':185,
        'g':196,
        'g#':207.7,
        'a':220,
        'a#':233.1,
        'b':246.9
    },
    {
        'c':261.6,
        'c#':277.2,
        'd':293.7,
        'd#':311.1,
        'e':329.6,
        'f':349.2,
        'f#':370,
        'g':392,
        'g#':415.3,
        'a':440,
        'a#':466.2,
        'b':493.9
    },
    {
        'c':523.3,
        'c#':554.4,
        'd':587.3,
        'd#':622.3,
        'e':659.3,
        'f':698.5,
        'f#':740,
        'g':784,
        'g#':830.6,
        'a':880,
        'a#':932.3,
        'b':987.8
    },
    {
        'c':1047,
        'c#':1109,
        'd':1175,
        'd#':1245,
        'e':1319,
        'f':1379,
        'f#':1480,
        'g':1568,
        'g#':1661,
        'a':1760,
        'a#':1865,
        'b':1976
    },
    {
        'c':2093,
        'c#':2217,
        'd':2349,
        'd#':2489,
        'e':2637,
        'f':2749,
        'f#':2960,
        'g':3136,
        'g#':3322,
        'a':3520,
        'a#':3729,
        'b':3951
    },
    {
        'c':4186,
        'c#':4435,
        'd':4699,
        'd#':4978,
        'e':5274,
        'f':5588,
        'f#':5920,
        'g':6272,
        'g#':6645,
        'a':7040,
        'a#':7459,
        'b':7902
    }
];

let notes = {};

function startSound(pitch) {
    if (notes[pitch]) {
        endSound(pitch);
    }
    let o = context.createOscillator(),
        g = context.createGain();
    o.connect(g);
    o.type = oscillator;
    o.frequency.value = pitch;
    g.connect(context.destination);
    o.start(0);
    notes[pitch] = {o: o, g: g};
}

function endSound(pitch) {
    if (notes[pitch]) {
        notes[pitch].g.gain.exponentialRampToValueAtTime(
            0.00001, context.currentTime + 0.04
        );
        notes[pitch].o.stop(context.currentTime + 0.04);
        delete notes[pitch];
    }
}

function getPitch(note) {
    let locOct = octave;
    if (note.charAt(0) == '+') {
        locOct++;
        note = note.substring(1);
    }
    if (locOct >= 0 && locOct <= 8) {
        return pitches[locOct][note];
    } else return false;
}

window.addEventListener("keydown", function onKeyDown(e) {
    if (e.key.toLowerCase() in kbIn) {
        let pitch = getPitch(kbIn[e.key.toLowerCase()]);
        if (pitch) {
            startSound(pitch);
        }
    }
});

window.addEventListener("keyup", function onKeyDown(e) {
    if (e.key.toLowerCase() in kbIn) {
        let pitch = getPitch(kbIn[e.key.toLowerCase()]);
        if (pitch) {
            endSound(pitch);
        }
    } else if (e.key.toLowerCase() == 'x') {
        if (octave < 8) {
            octave++;
        }
    } else if (e.key.toLowerCase() == 'z') {
        if (octave > 0) {
            octave--;
        }
    }
});