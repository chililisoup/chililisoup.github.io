function formatNumber(amt) {
    let suffix = '';
    if (amt >= 1E24) {
        amt = Math.round((amt / 1E24) * 100) / 100;
        suffix = 'S';
    } else if (amt >= 1E21) {
        amt = Math.round((amt / 1E21) * 100) / 100;
        suffix = 's';
    } else if (amt >= 1E18) {
        amt = Math.round((amt / 1E18) * 100) / 100;
        suffix = 'Q';
    } else if (amt >= 1E15) {
        amt = Math.round((amt / 1E15) * 100) / 100;
        suffix = 'q';
    } else if (amt >= 1E12) {
        amt = Math.round((amt / 1E12) * 100) / 100;
        suffix = 'T';
    } else if (amt >= 1E9) {
        amt = Math.round((amt / 1E9) * 100) / 100;
        suffix = 'B';
    } else if (amt >= 1E6) {
        amt = Math.round((amt / 1E6) * 100) / 100;
        suffix = 'M';
    } else if (amt >= 1E3) {
        amt = Math.round((amt / 1E3) * 100) / 100;
        suffix = 'K';
    }
    return amt.toLocaleString() + suffix;
}

let default_upgrades = JSON.stringify(upgrades);

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
        button.setAttribute('onmousedown','buy("' + upgrade + '")');
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

function calculateOfflineProduction() {
    let old_date = localStorage.getItem('date');
    if (old_date) {
        let new_date = new Date().getTime();
        let seconds = Math.floor((new_date - old_date) / 1000);
        if (seconds > upgrades.Minions.lvl * 3600) seconds = upgrades.Minions.lvl * 3600;
        if (seconds > 0 && upgrades.MinionCare.lvl > 0) {
            let rate = score.jef_price;
            let psec = 0;
            for (const upgrade in upgrades) {
                upg = upgrades[upgrade];
                if (upg.type == 1) {
                    psec += upg.lvl * upg.psec;
                    score.update(upg.lvl * upg.psec);
                }
                if (upg.type == 2) {
                    rate *= 1 + (upg.lvl * upg.perc);
                }
            }
            if (psec > score.sale_rate) psec = score.sale_rate;
            sold = psec * seconds;
            cash = Math.floor(rate * psec * seconds * upgrades.MinionCare.lvl * 0.1);
            score.update(cash, false);
            score.jefs_sold_total += sold;
            setTimeout(() => alert('While you were away, your minions sold ' + formatNumber(sold) + ' jefs for $' + formatNumber(cash)), 100);
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
        score.sale_rate = 50;
        for (const upgrade in upgrades_ld) {
            upgrades[upgrade].lvl = upgrades_ld[upgrade].lvl;
            if (upgrades[upgrade].type == 3) {
                score.sale_rate += upgrades[upgrade].sale * upgrades[upgrade].lvl;
            }
        }
    }
    if (score.jef_tokens == null) score.jef_tokens = 0;
    calculateOfflineProduction();
    loadUpgradeButtons();
}
load();

function download() {
    let filename = prompt('Download as...') + '.json',
        element = document.createElement('a');
    if (filename != 'null.json') {
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify([upgrades, score, new Date().getTime()])));
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
        localStorage.setItem('date', JSON.stringify(save[2]));
        load();
    };
    reader.readAsText(file);
    document.getElementById('upload').value = '';
}

function save() {
    localStorage.setItem('upgrades', JSON.stringify(upgrades));
    localStorage.setItem('score', JSON.stringify(score));
    localStorage.setItem('date', new Date().getTime());
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
    document.getElementById("off_hours").innerHTML = "Max " + upgrades.Minions.lvl + "hr(s) offline";
    document.getElementById("off_rate").innerHTML = upgrades.MinionCare.lvl * 10 + "% production offline";

    document.getElementById("total_cash").innerHTML = formatNumber(score.cash_earned_total) + " total cash earned";
    document.getElementById("total_jefs").innerHTML = formatNumber(score.jefs_sold_total) + " total jefs sold";
    document.getElementById("total_clicks").innerHTML = formatNumber(score.clicks) + " total clicks";

    score.jefs_sold = 0;
    score.cash_earned = 0;

    save();

    setTimeout(function() { engine(); }, 1000);
}
engine();
