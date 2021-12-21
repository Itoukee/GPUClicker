

class Game {
    constructor(minions, session) {
        this.minions = minions;
        this.gold = 0;
        this.cpt = 0;
        this.combo = 0;
        this.money = 0;
        this.gps = 0;
        this.session = session;
        this.maxPower = 200;
        this.powerDraw = 0;
        this.powerPrice = 0.05;
    }


    displayGold() {

        let newh2 = document.getElementById("myH2");
        let newspan = document.getElementById("gpsView");
        let newDollar = document.getElementById("dollars");
        let newNav = document.getElementById("power")
        let SecondNav = document.getElementById("powerDraw")
        let ThirdNav = document.getElementById("powerUp");

        let inter = setInterval(() => {
            newDollar.innerHTML = " = " + this.money.toFixed(2) + " $";
            newh2.innerHTML = "<b>" + this.gold.toFixed(5) + " Etherum</b>";
            newspan.innerHTML = `${this.gps.toFixed(5)}/s`;
            newNav.innerHTML = "Power: " + this.maxPower + "W";
            SecondNav.innerHTML = "Power Draw: " + this.powerDraw + "W";
            ThirdNav.innerHTML = "Power Upgrade Price : " + this.powerPrice.toFixed(3);
        }, 100)

    }

    checkMinion(minion) {
        if (minion.owned >= 25 && minion.owned < 50) {
            return minion.gps * (2 ** 1);
        }
        else if (minion.owned >= 50 && minion.owned < 100) {
            return minion.gps * (2 ** 2);
        }
        else if (minion.owned >= 100 && minion.owned < 250) {
            return minion.gps * (2 ** 3);
        }
        else if (minion.owned >= 250 && minion.owned < 1000) {
            return minion.gps * (2 ** 4);
        }
        else if (minion.owned >= 1000) {
            return minion.gps * (2 ** 5);
        }
        else {
            return minion.gps
        }

    }

    getGps() {
        this.gps = 0;
        let new_gps = 0
        this.minions.forEach(function (element) {
            let combo_gps = this.checkMinion(element);
            new_gps += element.owned * combo_gps;

        }.bind(this));
        this.gps = new_gps;
    }


    displayGPS() {
        let inter = setInterval(() => {
            this.getGps();
            this.gold += this.gps;
            this.money = this.gold * 4348;
        }, 1000)
    }
    addGold(x) {
        this.gold += x * (2 ** this.combo);
        this.money = this.gold * 4348;
        this.displayShop()

    }
    buyMinion(id) {
        let minion = this.minions[id - 1];

        this.gold -= minion["cost"];
        minion["owned"] += 1;
        this.cpt++;

        this.newPrice = minion["cost"] * 1.15;
        minion["cost"] = this.newPrice.toFixed(5);

        if (this.cpt >= 50) {
            this.cpt = 0;
            this.combo++;


        }
        this.displayShop();

    }
    upgradePsu() {
        this.gold -= this.powerPrice;
        this.maxPower += 100;
        this.powerPrice *= 1.15;
        this.displayShop();

    }

    displayPowerDraw() {
        let inter = setInterval(() => {
            let powerUser = 0;
            this.minions.forEach(function (element) {
                powerUser += element.consommation * element.owned;
            });
            this.powerDraw = powerUser;
        }, 100);

    }

    displayShop() {
        let parent = document.getElementById("shop");
        parent.innerHTML = "";
        let psuDiv = document.createElement("div")
        psuDiv.setAttribute("id", "psu");
        let psuBtn = document.createElement("button");
        psuBtn.innerHTML = "Upgrade Power !";
        psuBtn.id = "gpuBtn";
        if (this.gold >= this.powerPrice) {
            psuBtn.addEventListener('click', () => {
                this.upgradePsu();
            });
        }
        else {
            psuBtn.disabled = true;
            psuDiv.style.opacity = "50%";

        }

        psuDiv.appendChild(psuBtn);

        parent.appendChild(psuDiv);
        this.minions.forEach(function (element) {
            let newDiv = document.createElement("div");
            newDiv.setAttribute("id", "gpu");
            let newP = document.createElement("p");
            newP.innerHTML = element["id"] + ")<b> " + element["name"] + "</b><br>";
            let newSpan = document.createElement("span");
            newSpan.innerHTML = "<fieldset>cost: " + element["cost"] + "<br> hash rate: " + element["gps"] + " eth<br>owned: " + element["owned"] + "<br>power draw:" + element.consommation + "W</fieldset>";
            let newBtn = document.createElement("button");
            newBtn.id = "gpuBtn";
            if (this.gold >= element.cost && this.maxPower >= this.powerDraw + element.consommation) {
                newBtn.addEventListener('click', () => {
                    this.buyMinion(element['id']);
                });


            }
            else {
                newBtn.disabled = true;
                newDiv.style.opacity = "50%";
            }



            newBtn.innerHTML = "Buy it !";

            newP.appendChild(newSpan);
            newDiv.appendChild(newP);
            newDiv.appendChild(newBtn);
            parent.appendChild(newDiv);

        }.bind(this));

    }
    displayButtons() {
        let btn = document.querySelector("#MiningBtn");

        btn.addEventListener('click', () => {
            this.addGold(0.00023);
        });
    }
    updateValues(minions, gold, cpt, gps, money, combo, powerDraw, maxPower, powerPrice) {

        this.minions = minions;
        this.gold = gold;
        this.cpt = cpt;
        this.gps = gps;
        this.money = money;
        this.combo = combo;
        this.powerDraw = powerDraw;
        this.maxPower = maxPower;
        this.powerPrice = powerPrice;

    }

}
export { Game };


