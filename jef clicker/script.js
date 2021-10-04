function formatNumber(amt) {
    return amt.toLocaleString();
}

let score = {
    jefs_sold: 0,
    jefs_sold_total: 0,
    cash_earned: 0,
    cash_earned_total: 0,
    clicks: 0,
    cash: 0,
    sale_rate: 50,
    sale_alert_cool: 0,
    jef: 'Standard Jef',
    jef_price: 1,
    update: function(amt, jef=true, set=false) {
        let overflow = false
        if (this.jefs_sold > this.sale_rate) {
            document.getElementById("sales_alert").style.display = "block";
            this.sale_alert_cool = 5;
            overflow = true;
        } else if (this.sale_alert_cool == 0) document.getElementById("sales_alert").style.display = "none";
        if (!overflow || !jef) {
            if (set) {
                this.cash = amt;
            } else this.cash += amt;
            if (amt > 0 ) {
                this.cash_earned += amt;
                this.cash_earned_total += amt;
                if (jef) {
                    this.jefs_sold += amt;
                    this.jefs_sold_total += amt;
                }
            }
        } 
        document.getElementById("counter").innerHTML = "$" + formatNumber(score.cash);
    }
};

let upgrades = {
    SClick: {
        lvl: 0,
        base: 500,
        rate: 6,
        max: 9,
        type: 0,
        name: 'Super Click'
    },
    JefKit: {
        lvl: 0,
        base: 10,
        rate: 2,
        max: 32,
        type: 1,
        psec: 1,
        name: 'Jef Kit'
    },
    JefTools: {
        lvl: 0,
        base: 100,
        rate: 2,
        max: 20,
        type: 1,
        psec: 5,
        name: 'Jef Power Tools'
    },
    AssemblyLine: {
        lvl: 0,
        base: 25000,
        rate: 2,
        max: 20,
        type: 1,
        psec: 25,
        name: 'Assembly Line'
    },
    Warehouse: {
        lvl: 0,
        base: 100000,
        rate: 2,
        max: 20,
        type: 1,
        psec: 80,
        name: 'Warehouse'
    },
    Factory: {
        lvl: 0,
        base: 1000000,
        rate: 2,
        max: 32,
        type: 1,
        psec: 500,
        name: 'Factory'
    },
    Polisher: {
        lvl: 0,
        base: 1000,
        rate: 1.2,
        max: 10,
        type: 2,
        perc: 0.15,
        name: 'Jef Polisher'
    },
    Food: {
        lvl: 0,
        base: 25000,
        rate: 1.2,
        max: 20,
        type: 2,
        perc: 0.15,
        name: 'Jef Food'
    },
    Trainer: {
        lvl: 0,
        base: 150000,
        rate: 1.2,
        max: 20,
        type: 2,
        perc: 0.15,
        name: 'Jef Trainer'
    },
    Haircut: {
        lvl: 0,
        base: 350000,
        rate: 1,
        max: 1,
        type: 2,
        perc: 1,
        name: 'Fancy Haircut'
    },
    School: {
        lvl: 0,
        base: 500000,
        rate: 1.2,
        max: 20,
        type: 2,
        perc: 0.15,
        name: 'Jef School'
    },
    PhoneAd: {
        lvl: 1,
        base: 500,
        rate: 1.2,
        max: 25,
        type: 3,
        name: 'Phone Ad',
        sale: 50
    },
    TVAd: {
        lvl: 0,
        base: 125000,
        rate: 1.2,
        max: 25,
        type: 3,
        name: 'TV Ad',
        sale: 500
    },
    Billboard: {
        lvl: 0,
        base: 500000,
        rate: 1.2,
        max: 25,
        type: 3,
        name: 'Billboard',
        sale: 2500
    },
    Jef: {
        lvl: 1,
        base: 0,
        rate: 1,
        max: 1,
        type: 4,
        name: 'Standard Jef',
        cost: 1
    },
    MetalJef: {
        lvl: 0,
        base: 500000,
        rate: 1,
        max: 1,
        type: 4,
        name: 'Metal Jef',
        cost: 10
    },
    GoldJef: {
        lvl: 0,
        base: 25000000,
        rate: 1,
        max: 1,
        type: 4,
        name: 'Golden Jef',
        cost: 35
    },
}

function loadUpgradeButtons() {
    for (const upgrade in upgrades) {
        let button = document.createElement("button");
        if (upgrades[upgrade].lvl == upgrades[upgrade].max) {
            button.innerHTML = "[" + upgrades[upgrade].lvl + "] " + upgrades[upgrade].name + " - MAX";
        } else button.innerHTML = "[" + upgrades[upgrade].lvl + "] " + upgrades[upgrade].name + " - $" + formatNumber(getPrice(upgrade));
        button.setAttribute('onclick','buy("' + upgrade + '")');
        button.id = upgrade;
        switch (upgrades[upgrade].type) {
            case 1:
                document.getElementById("produce_buttons").appendChild(button);
                break;
            case 2:
                document.getElementById("improve_buttons").appendChild(button);
                break;
            case 3:
                document.getElementById("sales_buttons").appendChild(button);
                break;
            case 4:
                document.getElementById("jef_buttons").appendChild(button);
                break;
            default:
                document.getElementById("special_buttons").appendChild(button);
                break;
        }
    }
}

function sendClick(amt=1) {
    score.update(amt * (2 ** upgrades.SClick.lvl));
    score.clicks++;
}

function getPrice(product) {
    product = upgrades[product];
    return Math.round(product.base * ((product.lvl) ** product.rate + 1));
}

function buy(product) {
    let price = getPrice(product);
    if (score.cash >= price && upgrades[product].lvl < upgrades[product].max
        && (upgrades[product].type != 4 || upgrades[product].cost > score.jef_price)) {
        score.update(-price);
        upgrades[product].lvl++;
        if (upgrades[product].lvl == upgrades[product].max) {
            document.getElementById(product).innerHTML = "[" + upgrades[product].lvl + "] " + upgrades[product].name + " - MAX";
        } else document.getElementById(product).innerHTML = "[" + upgrades[product].lvl + "] " + upgrades[product].name + " - $" + formatNumber(getPrice(product));
        if (upgrades[product].type == 3) {
            score.sale_rate += upgrades[product].sale;
        } else if (upgrades[product].type == 4) {
            score.jef = upgrades[product].name;
            score.jef_price = upgrades[product].cost;
        }
    }

}

function load() {
    let upgrades_ld = JSON.parse(localStorage.getItem('upgrades'));
    let score_ld = JSON.parse(localStorage.getItem('score'));
    if (upgrades_ld && score_ld) {
        for (const scr in score) {
            if (scr != 'update') score[scr] = score_ld[scr];
        }
        for (const upgrade in upgrades_ld) {
            upgrades[upgrade].lvl = upgrades_ld[upgrade].lvl;
        }
    }
    loadUpgradeButtons();
}
load();

function download() {
    let filename = prompt('Download as...') + '.json',
        element = document.createElement('a');
    if (filename != 'null.json') {
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent([JSON.stringify(upgrades), JSON.stringify(score)]));
        element.setAttribute('download', filename);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }
}

function save() {
    localStorage.setItem('upgrades', JSON.stringify(upgrades));
    localStorage.setItem('score', JSON.stringify(score));
}

function engine() {
    let rate = 1;
    for (const upgrade in upgrades) {
        upg = upgrades[upgrade];
        if (upg.type == 1 && upg.lvl) score.update(upg.lvl * upg.psec);
        if (upg.type == 2 && upg.lvl) {
            rate *= 1 + (upg.lvl * upg.perc);
        }
    }
    score.update(Math.round(score.jefs_sold * (rate - 1)), false);
    if (score.sale_alert_cool > 0) score.sale_alert_cool--;

    document.getElementById("jef_type").innerHTML = score.jef;
    document.getElementById("cash_psec").innerHTML = formatNumber(score.cash_earned) + " $/s";
    document.getElementById("jefs_psec").innerHTML = formatNumber(score.jefs_sold) + " jefs/s";
    document.getElementById("jefs_max").innerHTML = "Max " + formatNumber(score.sale_rate) + " jefs/s";
    document.getElementById("jefs_rate").innerHTML = "$" + formatNumber(rate) + "/jef";
    document.getElementById("total_cash").innerHTML = formatNumber(score.cash_earned_total) + " total cash earned";
    document.getElementById("total_jefs").innerHTML = formatNumber(score.jefs_sold_total) + " total jefs earned";
    document.getElementById("total_clicks").innerHTML = formatNumber(score.clicks) + " total clicks";
    score.jefs_sold = 0;
    score.cash_earned = 0;

    save();

    setTimeout(function() { engine(); }, 1000);
}
engine();
