let amounts = [
    {w:'a', p:true, n:'an'},
    {w:'two'},
    {w:'three'},
    {w:'four'},
    {w:'five'},
    {w:'many'},
    {w:'lots of'},
    {w:'a few'},
    {w:'tons of'},
    {w:'some'},
    {w:'half of a', p:true, n:'half of an'},
    {w:'pieces of'},
    {w:'a couple of'},
    {w:'a crap ton of'},
    {w:'little bits of'},
    {w:'the', p:true},
    {w:'the'}
];

let adjectives = [
    {w:'red'},
    {w:'orange', n:true},
    {w:'yellow'},
    {w:'green'},
    {w:'blue'},
    {w:'purple'},
    {w:'ugly', n:true},
    {w:'cool'},
    {w:'good-looking'},
    {w:'tiny'},
    {w:'large'},
    {w:'invisible', n:true},
    {w:'flying'},
    {w:'nerdy'},
    {w:'tall'},
    {w:'short'},
    {w:'nice'},
    {w:'microscopic'},
    {w:'weird'},
    {w:'dancing'},
    {w:'angry', n:true},
    {w:'rude'},
    {w:'dumb'},
    {w:'sad'},
    {w:'killer'},
    {w:'funny'},
    {w:'likeable'},
    {w:'determined'},
    {w:'rich'},
    {w:'poor'},
    {w:'thicc'},
    {w:'racist'},
    {w:'black'},
    {w:'gray'},
    {w:'white'},
    {w:'brown'},
];

let nouns = [
    ['man','men'],
    ['woman','women'],
    ['bassist','bassists'],
    ['dog','dogs'],
    ['burrito','burritos'],
    ['ham','hams'],
    ['teacher','teachers'],
    ['celebrity','celebrities'],
    ['Jeff','Jeffs'],
    ['notebook','notebooks'],
    ['athlete','atheletes'],
    ['criminal','criminals'],
    ['child','children'],
    ['cop','cops'],
    ['horse','horses'],
    ['Kyle','Kyles'],
    ['turd','turds'],
    ['chef','chefs'],
    ['neighbor of yours','neighbors of yours'],
    ['genie','genies'],
    ['person','people']
];

let verbs = [
    'eating',
    'punching',
    'kissing',
    'singing with',
    'shopping with',
    'stealing from',
    'fighting for',
    'judging',
    'staring at',
    'talking with',
    'holding',
    'arguing with',
    'yelling at',
    'shoplifting with',
    'taking a picture with',
    'taking pictures of',
    'playing chess with',
    'practicing yoga with',
    'being taught to read by',
    'being sent to jail by',
    'crying after looking at',
    'cooking',
    'and',
    'buying tickets to see',
    'playing in a band with',
    'escaping jail with',
    'lying to',
    'starring in a movie with',
    'looking in the mirror and seeing',
    'talking about'
];

function actionGen() {
    let product = '',
        amt = amounts[Math.floor(Math.random() * amounts.length)],
        adj = adjectives[Math.floor(Math.random() * adjectives.length)],
        nou = nouns[Math.floor(Math.random() * nouns.length)],
        vrb = verbs[Math.floor(Math.random() * verbs.length)];
    
    if (adj.n && amt.n) {
        product += amt.n.charAt(0).toUpperCase() + amt.n.slice(1) + ' ';
    } else product += amt.w.charAt(0).toUpperCase() + amt.w.slice(1) + ' ';
    product += adj.w + ' ';
    if (amt.p) {
        product += nou[0] + ' ';
    } else product += nou[1] + ' ';
    product += vrb + ' ';
    
    amt = amounts[Math.floor(Math.random() * amounts.length)];
    adj = adjectives[Math.floor(Math.random() * adjectives.length)];
    nou = nouns[Math.floor(Math.random() * nouns.length)];
    
    if (adj.n && amt.n) {
        product += amt.n + ' ';
    } else product += amt.w + ' ';
    product += adj.w + ' ';
    if (amt.p) {
        product += nou[0] + ' ';
    } else product += nou[1] + ' ';
    
    document.getElementById("output").innerHTML = product;
}
