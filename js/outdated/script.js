
var gold = 0;
var gps = 0;
var cpt = 0;
var combo = 0;
var money = 0;

var minions = [
    { id: 1, name: "GT 710", cost: 0.01161, gps: 0.00023, owned: 0 },
    { id: 2, name: "GTX 1050", cost: 0.03482, gps: 0.00046, owned: 0 },
    { id: 3, name: "RX 580", cost: 0.06963, gps: 0.00115, owned: 0 }
];

var rigs = [
    { id: 1, name: "GT 710", gps: 0.00046, owned: 0 },
    { id: 2, name: "GTX 1050", gps: 0.00092, owned: 0 },
    { id: 3, name: "RX 580", cost: 0.06963, gps: 0.00230, owned: 0 }
];

function displayGold() {

    var newh2 = document.getElementById("myH2");
    var newspan = document.getElementById("gpsView");
    var newDollar = document.getElementById("dollars");

    let inter = setInterval(() => {
        newDollar.innerHTML = " = " + money.toFixed(2) + " $";
        newh2.innerHTML = gold.toFixed(5);
        newspan.innerHTML = `${gps.toFixed(5)}/s`
    }, 100)

}

function getGps() {
    gps = 0;
    minions.forEach(function (element) {
        gps += element["owned"] * element["gps"];
    });
}

function displayGPS() {
    let inter = setInterval(() => {
        getGps();
        gold += gps;
        money = gold * 4348;
    }, 1000)
}

function addGold(x) {
    gold += x * (2 ** combo);
    money = gold * 4348;
    console.log(money);
}



function buyMinion(id) {

    if (minions[id - 1]["cost"] > gold) {
        alert("You don't have enough currency..")
    }
    else {
        gold -= minions[id - 1]["cost"];
        minions[id - 1]["owned"] += 1;
        cpt++;

        newPrice = minions[id - 1]["cost"] * 1.15;
        minions[id - 1]["cost"] = newPrice.toFixed(5);
        if (minions[id - 1]["owned"])
            if (cpt >= 10) {
                cpt = 0;
                combo++;


            }
        displayShop();

    }
}
function displayShop() {

    parent = document.getElementById("shop");
    parent.innerHTML = "";

    minions.forEach(function (element) {
        newDiv = document.createElement("div");
        newDiv.setAttribute("id", "gpu");
        newP = document.createElement("p");
        newP.innerHTML = element["id"] + ")<b> " + element["name"] + "</b><br>";
        newSpan = document.createElement("span");
        newSpan.innerHTML = "<fieldset>cost: " + element["cost"] + "<br> hash rate: " + element["gps"] + " eth<br>owned: " + element["owned"] + "</fieldset>";
        newBtn = document.createElement("button");
        newBtn.id = "gpuBtn";
        newBtn.onclick = function () {
            buyMinion(element['id']);
        }

        newBtn.innerHTML = "Buy it !";

        newP.appendChild(newSpan);
        newDiv.appendChild(newP);
        newDiv.appendChild(newBtn);
        parent.appendChild(newDiv);
    });

}
