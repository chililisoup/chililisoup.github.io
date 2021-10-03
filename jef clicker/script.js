function formatPrice(amt) {
    return amt.toLocaleString();
}

let score = {
    earned: 0,
    cash: 0,
    update: function(amt, set=false) {
        if (set) {
            this.cash = amt;
        } else this.cash += amt;
        if (amt > 0) this.earned += amt;
        document.getElementById("counter").innerHTML = "You have " + formatPrice(score.cash) + " jefs";
    }
};

let upgrades = {
    SClick: {
        lvl: 0,
        base: 250,
        rate: 7,
        max: 9,
        name: 'Super Click'
    },
    AClick: {
        lvl: 0,
        base: 10,
        rate: 4,
        max: 1000,
        name: 'Auto Click'
    },
    Trainer: {
        lvl: 0,
        base: 100,
        rate: 4,
        max: 20,
        name: 'Jef Trainer'
    },
    Polisher: {
        lvl: 0,
        base: 2500,
        rate: 4,
        max: 16,
        name: 'Jef Polisher'
    }
}
for (const upgrade in upgrades) {
    let button = document.createElement("button");
    button.innerHTML = '[' + upgrades[upgrade].lvl + '] ' + upgrades[upgrade].name + ' - $' + getPrice(upgrade);
    button.setAttribute('onclick','buy("' + upgrade + '")');
    button.id = upgrade;
    document.getElementById('buttons').appendChild(button);
}

function sendClick(amt=1) {
    score.update(amt ** (upgrades.SClick.lvl + 1));
}

function getPrice(product) {
    product = upgrades[product];
    return Math.round(product.base * ((product.lvl) ** product.rate + 1));
}

function buy(product) {
    console.log(getPrice(product));
    let price = getPrice(product);
    if (score.cash >= price && upgrades[product].lvl < upgrades[product].max) {
        score.update(-price);
        upgrades[product].lvl++;
        if (upgrades[product].lvl == upgrades[product].max) {
            document.getElementById(product).innerHTML = "[" + upgrades[product].lvl + "] " + upgrades[product].name + " - MAX";
        } else document.getElementById(product).innerHTML = "[" + upgrades[product].lvl + "] " + upgrades[product].name + " - $" + formatPrice(getPrice(product));
    }

}


function engine() {
    setTimeout(function () {
        if (upgrades.AClick.lvl) score.update(upgrades.AClick.lvl);
        if (upgrades.Trainer.lvl) score.update(upgrades.Trainer.lvl * 5);
        if (upgrades.Polisher.lvl) score.update(upgrades.Polisher.lvl * (score.earned * 0.05));
        engine();
        document.getElementById("speed").innerHTML = formatPrice(score.earned) + " jefs/s";
        score.earned = 0;
    }, 1000);
}
engine();