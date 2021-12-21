import { Game } from './game.js';
var minions = [
    { id: 1, name: "GT 710", cost: 0.01161, gps: 0.00023, owned: 0, consommation: 19 },
    { id: 2, name: "GTX 1050", cost: 0.03482, gps: 0.00046, owned: 0, consommation: 60 },
    { id: 3, name: "RX 580", cost: 0.06963, gps: 0.00155, owned: 0, consommation: 190 },
    { id: 4, name: "RTX 3060", cost: 0.1000, gps: 0.00355, owned: 0, consommation: 170 },

];

var actualSession = null;
let instance = new Game(minions);

function initSession() {

    let nameForm = new FormData(document.getElementById('nameForm'));
    let session = localStorage.setItem(nameForm.get('name'), JSON.stringify(instance));

    let parent = document.getElementById('nameDiv');
    parent.innerHTML = "";
    let newName = document.createElement('p');
    newName.innerHTML = nameForm.get('name');
    newName.id = "nameSession";
    parent.appendChild(newName);

}

function loadSession() {
    let loadForm = new FormData(document.getElementById('loadForm'));
    let name = loadForm.get("name");
    let userSession = JSON.parse(localStorage.getItem(name));
    let parent = document.getElementById('nameDiv');
    nameDiv.innerHTML = "";
    let newName = document.createElement('p');
    if (userSession == null) {
        newName.innerHTML = "User doesn't exist";
    }
    else {
        newName.innerHTML = name;
        var minions = userSession.minions;
        instance.updateValues(userSession.minions, userSession.gold, userSession.cpt, userSession.gps, userSession.money, userSession.combo, userSession.powerDraw, userSession.maxPower, userSession.powerPrice)

    }

    newName.id = "nameSession";
    parent.appendChild(newName);
    instance.displayShop();


}
function sessionButtons() {
    let saveBtn = document.getElementById("save");
    let loadBtn = document.getElementById("load");
    saveBtn.addEventListener('click', () => {

        initSession();
    })

    loadBtn.addEventListener('click', () => {

        loadSession();
    })
}


instance.displayGold();
instance.displayGPS();
instance.displayShop();
instance.displayButtons();
instance.displayPowerDraw();
sessionButtons();


