function formatNumber(amt) {
    let suffix = '';
    if (amt >= 1000000000000000000000000) {
        amt = Math.round((amt / 1000000000000000000000000) * 100) / 100;
        suffix = 'S';
    } else if (amt >= 1000000000000000000000) {
        amt = Math.round((amt / 1000000000000000000000) * 100) / 100;
        suffix = 's';
    } else if (amt >= 1000000000000000000) {
        amt = Math.round((amt / 1000000000000000000) * 100) / 100;
        suffix = 'Q';
    } else if (amt >= 1000000000000000) {
        amt = Math.round((amt / 1000000000000000) * 100) / 100;
        suffix = 'q';
    } else if (amt >= 1000000000000) {
        amt = Math.round((amt / 1000000000000) * 100) / 100;
        suffix = 'T';
    } else if (amt >= 1000000000) {
        amt = Math.round((amt / 1000000000) * 100) / 100;
        suffix = 'B';
    } else if (amt >= 1000000) {
        amt = Math.round((amt / 1000000) * 100) / 100;
        suffix = 'M';
    } else if (amt >= 1000) {
        amt = Math.round((amt / 1000) * 100) / 100;
        suffix = 'K';
    }
    return amt.toLocaleString() + suffix;
}

let score = {
    jefs_sold: 0,
    jefs_sold_total: 0,
    cash_earned: 0,
    cash_earned_total: 0,
    clicks: 0,
    cash: 0,
    jef_tokens: 0,
    sale_rate: 50,
    sale_alert_cool: 0,
    jef: 'Homeless Jef',
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
        loadUpgradeButtons();
    }
};
let default_score = JSON.stringify(score);

let upgrades = {
    SClick: {
        lvl: 0,
        base: 500,
        rate: 7.5,
        max: 32,
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
    JefCloner: {
        lvl: 0,
        base: 5000000000,
        rate: 2,
        max: 20,
        type: 1,
        psec: 1500,
        name: 'Jef Cloner'
    },
    ReallyFastGuy: {
        lvl: 0,
        base: 420000000000,
        rate: 2,
        max: 20,
        type: 1,
        psec: 3600,
        name: 'Really Fast Guy'
    },
    ExtradimensionalSourcing: {
        lvl: 0,
        base: 69000000000000,
        rate: 2,
        max: 20,
        type: 1,
        psec: 9500,
        name: 'Extradimensional Sourcing'
    },
    JefsFromPoo: {
        lvl: 0,
        base: 38953000000000000,
        rate: 2,
        max: 20,
        type: 1,
        psec: 29000,
        name: 'Jefs From Poo'
    },
    JefRain: {
        lvl: 0,
        base: 1793953000000000000,
        rate: 2,
        max: 20,
        type: 1,
        psec: 117000,
        name: 'Jef Rain'
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
    Clothes: {
        lvl: 0,
        base: 5000000000,
        rate: 1.2,
        max: 20,
        type: 2,
        perc: 0.15,
        name: 'Jef Clothes'
    },
    Perfume: {
        lvl: 0,
        base: 170000000000,
        rate: 1.2,
        max: 20,
        type: 2,
        perc: 0.15,
        name: 'Jef Perfume'
    },
    Friendly: {
        lvl: 0,
        base: 45000000000000,
        rate: 4,
        max: 3,
        type: 2,
        perc: 1,
        name: 'Jef Friendly'
    },
    AntiDumbs: {
        lvl: 0,
        base: 7800000000000000,
        rate: 4,
        max: 20,
        type: 2,
        perc: 0.2,
        name: 'Jef Anti-Dumbs'
    },
    LuxuryPack: {
        lvl: 0,
        base: 590000000000000000,
        rate: 4,
        max: 3,
        type: 2,
        perc: 1,
        name: 'Jef Luxury Pack'
    },
    ExtraBrainCells: {
        lvl: 0,
        base: 2700000000000000000,
        rate: 4,
        max: 3,
        type: 2,
        perc: 1,
        name: 'Jef Extra Brain Cells'
    },
    PhoneAd: {
        lvl: 1,
        base: 500,
        rate: 1.2,
        max: 50,
        type: 3,
        name: 'Phone Ad',
        sale: 50
    },
    TVAd: {
        lvl: 0,
        base: 125000,
        rate: 1.2,
        max: 50,
        type: 3,
        name: 'TV Ad',
        sale: 500
    },
    Billboard: {
        lvl: 0,
        base: 50000000,
        rate: 1.2,
        max: 50,
        type: 3,
        name: 'Billboard',
        sale: 2500
    },
    SalesAdvisor: {
        lvl: 0,
        base: 690000000,
        rate: 1.2,
        max: 50,
        type: 3,
        name: 'Sales Advisor',
        sale: 50000
    },
    DreamAd: {
        lvl: 0,
        base: 10000000000,
        rate: 1.2,
        max: 50,
        type: 3,
        name: 'Dream Ad',
        sale: 800000
    },
    VaccineChip: {
        lvl: 0,
        base: 3799000000000,
        rate: 1.2,
        max: 50,
        type: 3,
        name: 'Vaccine Chip',
        sale: 1680000
    },
    BrainController: {
        lvl: 0,
        base: 84924900000000,
        rate: 1.2,
        max: 50,
        type: 3,
        name: 'Brain Controller',
        sale: 42000000
    },
    TikTokTrend: {
        lvl: 0,
        base: 6492244900000000,
        rate: 1.2,
        max: 50,
        type: 3,
        name: 'Tik Tok Trend',
        sale: 500000000
    },
    HomelessJef: {
        lvl: 1,
        base: 0,
        rate: 1,
        max: 1,
        type: 4,
        name: 'Homeless Jef',
        cost: 1
    },
    StandardJef: {
        lvl: 0,
        base: 500000,
        rate: 1,
        max: 1,
        type: 4,
        name: 'Standard Jef',
        cost: 10
    },
    EducatedJef: {
        lvl: 0,
        base: 10000000000,
        rate: 1,
        max: 1,
        type: 4,
        name: 'Educated Jef',
        cost: 35
    },
    BeautifulJef: {
        lvl: 0,
        base: 500000000000000,
        rate: 1,
        max: 1,
        type: 4,
        name: 'Beautiful Jef',
        cost: 80
    },
    FlyingJef: {
        lvl: 0,
        base: 4200000000000000000,
        rate: 1,
        max: 1,
        type: 4,
        name: 'Flying Jef',
        cost: 250
    },
    CEOJef: {
        lvl: 0,
        base: 6951200000000000000000,
        rate: 1,
        max: 1,
        type: 4,
        name: 'CEO Jef',
        cost: 1000
    },
    Swindling: {
        lvl: 0,
        base: 100,
        rate: 2,
        max: 16,
        type: 5,
        name: 'Swindling'
    }
}
let default_upgrades = JSON.stringify(upgrades);

function loadUpgradeButtons() {
    document.getElementById("produce_buttons").innerHTML = "<h2>Production</h2>";
    document.getElementById("improve_buttons").innerHTML = "<h2>Improvement</h2>";
    document.getElementById("sales_buttons").innerHTML = "<h2>Sales</h2>";
    document.getElementById("jef_buttons").innerHTML = "<h2>Jefs</h2>";
    document.getElementById("special_buttons").innerHTML = "<h2>Special</h2>";
    document.getElementById("token_buttons").innerHTML = "<h2>Jef Token Store</h2>";
    for (const upgrade in upgrades) {
        let button = document.createElement("button");
        if (upgrades[upgrade].lvl == upgrades[upgrade].max) 
            button.innerHTML = "[" + upgrades[upgrade].lvl + "] " + upgrades[upgrade].name + " - MAX";
        else {
            button.innerHTML = "[" + upgrades[upgrade].lvl + "] " + upgrades[upgrade].name + " - $" + formatNumber(getPrice(upgrade));
            if (score.cash >= getPrice(upgrade)) button.setAttribute('class','available');
        }
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
            case 5:
                let string = button.innerHTML;
                button.innerHTML = string.replace(/\$/g, "") + "&#10026;";
                if (score.jef_tokens < getPrice(upgrade)) button.setAttribute('class','');
                document.getElementById("token_buttons").appendChild(button);
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
    if (score.clicks % 200 == 0) score.jef_tokens++;
}

function getPrice(product) {
    product = upgrades[product];
    if (product.type != 5 && product.type != 4)
        return Math.round((1 - (0.05 * upgrades.Swindling.lvl)) * product.base * ((product.lvl) ** product.rate + 1));
    else
        return Math.round(product.base * ((product.lvl) ** product.rate + 1));
}

function buy(product) {
    let price = getPrice(product);
    if (score.cash >= price && upgrades[product].lvl < upgrades[product].max
        && (upgrades[product].type != 4 || upgrades[product].cost > score.jef_price)
        && upgrades[product].type != 5) {
        score.update(-price);
        score.jef_tokens++;
        upgrades[product].lvl++;
        if (upgrades[product].lvl == upgrades[product].max) {
            document.getElementById(product).innerHTML = "[" + upgrades[product].lvl + "] " + upgrades[product].name + " - MAX";
        } else document.getElementById(product).innerHTML = "[" + upgrades[product].lvl + "] " + upgrades[product].name + " - $" + formatNumber(getPrice(product));
        if (upgrades[product].type == 3) {
            score.sale_rate += upgrades[product].sale;
        } else if (upgrades[product].type == 4) {
            let default_upgrades_copy = JSON.parse(default_upgrades);
            for (const upgrade in default_upgrades_copy) {
                if (default_upgrades_copy[upgrade].type != 4 && default_upgrades_copy[upgrade].type != 5) upgrades[upgrade].lvl = default_upgrades_copy[upgrade].lvl;
            }
            score.sale_rate = 50;
            score.sale_alert_cool = 0;
            score.cash = 0;
            score.cash_earned = 0;
            score.jefs_sold = 0;
            score.jef = upgrades[product].name;
            score.jef_price = upgrades[product].cost;
            loadUpgradeButtons();
        }
    } else if (upgrades[product].type == 5 && score.jef_tokens >= price && upgrades[product].lvl < upgrades[product].max) {
        score.jef_tokens -= price;
        upgrades[product].lvl++;
        loadUpgradeButtons();
    }

}

function load() {
    let upgrades_ld = JSON.parse(localStorage.getItem('upgrades'));
    let score_ld = JSON.parse(localStorage.getItem('score'));
    if (upgrades_ld && score_ld) {
        for (const scr in score) {
            if (scr != 'update') score[scr] = score_ld[scr];
        }
        score.sale_rate = 50;
        for (const upgrade in upgrades_ld) {
            upgrades[upgrade].lvl = upgrades_ld[upgrade].lvl;
            if (upgrades[upgrade].type == 3) {
                score.sale_rate += upgrades[upgrade].sale * upgrades[upgrade].lvl;
            }
        }
    }
    if (score.jef_tokens == null) score.jef_tokens = 0;
    loadUpgradeButtons();
}
load();

function download() {
    let filename = prompt('Download as...') + '.json',
        element = document.createElement('a');
    if (filename != 'null.json') {
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify([upgrades, score])));
        element.setAttribute('download', filename);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }
}

function upload(file) {
    let reader = new FileReader();
    reader.onload = function() {
        let save = JSON.parse(reader.result);
        localStorage.setItem('upgrades', JSON.stringify(save[0]));
        localStorage.setItem('score', JSON.stringify(save[1]));
        load();
    };
    reader.readAsText(file);
    document.getElementById('upload').value = '';
}

function save() {
    localStorage.setItem('upgrades', JSON.stringify(upgrades));
    localStorage.setItem('score', JSON.stringify(score));
}

function reset() {
    if (confirm('This will delete ALL your progress. Remember to make a backup if neeeded. Continue?')) {
        localStorage.setItem('upgrades', default_upgrades);
        localStorage.setItem('score', default_score);
        load();
    }
}

function engine() {
    let rate = score.jef_price;
    for (const upgrade in upgrades) {
        upg = upgrades[upgrade];
        if (upg.type == 1 && upg.lvl) score.update(upg.lvl * upg.psec);
        if (upg.type == 2 && upg.lvl) {
            rate *= 1 + (upg.lvl * upg.perc);
        }
    }
    score.update(Math.round(score.jefs_sold * (rate - 1)), false);
    if (score.sale_alert_cool > 0) score.sale_alert_cool--;

    if (score.jef_tokens == 1) document.getElementById("counter_tokens").innerHTML = formatNumber(score.jef_tokens) + " Jef Token";
    else document.getElementById("counter_tokens").innerHTML = formatNumber(score.jef_tokens) + " Jef Tokens";
    

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