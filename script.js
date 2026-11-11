
// GLOBALE VARIABELEN
let aantalWorkouts = 0;
let totaalMinuten = 0;
let totaalStappen = 0;
let totaalCalorieen = 0;

// Oefening data ophalen uit localStorage, of een leeg object aanmaken als er niets is
let oefeningData = JSON.parse(
    localStorage.getItem("oefeningData")
) || {};


// GEWICHT OPSLAAN & GESCHIEDENIS

// Huidig gewicht ophalen uit localStorage
let gewichtData = JSON.parse(
    localStorage.getItem("gewichtData")
) || "0";

// Volledige geschiedenis van gewichten ophalen voor de grafiek
let gewichtGeschiedenis = JSON.parse(
    localStorage.getItem("gewichtGeschiedenis")
) || [];

// Variabelen om de grafieken in op te slaan zodat we ze later kunnen overschrijven (updaten)
let huidigeGewichtGrafiek = null;
let huidigeGrafiek = null; 

// Stel direct het laatst bekende gewicht in op de overzichtspagina bij het laden
if (document.getElementById("gewichtTotaal")) {
    document.getElementById("gewichtTotaal").textContent = gewichtData;
}

// ALGEMENE TRACKERS (Calorieën, Stappen, Minuten)


// Calorieën toevoegen aan het totaal en veld leegmaken
function calorieenOpslaan() {
    let calorieen = document.getElementById("calorieen").value;
    totaalCalorieen = totaalCalorieen + Number(calorieen);
    if (document.getElementById("calorieenTotaal")) {
        document.getElementById("calorieenTotaal").textContent = totaalCalorieen;
    }
    document.getElementById("calorieen").value = "";
}

// Stappen toevoegen aan het totaal en veld leegmaken
function stappenOpslaan() {
    let stappen = document.getElementById("stappen").value;
    totaalStappen = totaalStappen + Number(stappen);
    if (document.getElementById("stappenTotaal")) {
        document.getElementById("stappenTotaal").textContent = totaalStappen;
    }
    document.getElementById("stappen").value = "";
}

// Minuten toevoegen aan het totaal en veld leegmaken
function minutenToevoegen() {
    let minuten = document.getElementById("minuten").value;
    totaalMinuten = totaalMinuten + Number(minuten);
    if (document.getElementById("minutenTotaal")) {
        document.getElementById("minutenTotaal").textContent = totaalMinuten;
    }
    document.getElementById("minuten").value = "";
}

// Teller voor het aantal gedane workouts ophogen met 1
function workoutTellerToevoegen() {
    aantalWorkouts = aantalWorkouts + 1;
    if (document.getElementById("workoutTeller")) {
        document.getElementById("workoutTeller").textContent = aantalWorkouts;
    }
}

// GEWICHT FUNCTIES

// Nieuw gewicht opslaan, toevoegen aan geschiedenis en grafiek updaten
function gewichtOpslaan() {
    let gewicht = Number(document.getElementById("gewicht").value);
    
    // Controleer of de invoer logisch is
    if (gewicht <= 0) {
        alert("Vul een geldig gewicht in.");
        return;
    }

    // Update het losse getal in localStorage en op het scherm
    gewichtData = gewicht;
    localStorage.setItem("gewichtData", JSON.stringify(gewichtData));
    if(document.getElementById("gewichtTotaal")) {
        document.getElementById("gewichtTotaal").textContent = gewichtData;
    }

    // Haal de datum van vandaag op (formaat: DD-MM-YYYY)
    let vandaag = new Date();
    let datum = 
        String(vandaag.getDate()).padStart(2, "0") + "-" + 
        String(vandaag.getMonth() + 1).padStart(2, "0") + "-" + 
        vandaag.getFullYear();

    // Voeg datum en gewicht toe aan de geschiedenis-array
    gewichtGeschiedenis.push({
        datum: datum,
        gewicht: gewicht
    });

    // Sla de bijgewerkte geschiedenis op in localStorage
    localStorage.setItem("gewichtGeschiedenis", JSON.stringify(gewichtGeschiedenis));
    
    // Maak het invoerveld weer leeg
    if(document.getElementById("gewicht")) {
        document.getElementById("gewicht").value = "";
    }

    // Werk de grafiek direct bij met de nieuwe gegevens
    toonGewichtGrafiek();
}


// OEFENINGEN OPSLAAN


// Bestaande workout uit een lijst opslaan inclusief kg en herhalingen
function workoutToevoegen() {
    let workout = document.getElementById("workout").value;
    let kg = Number(document.getElementById("workoutKg").value);
    let herhalingen = Number(document.getElementById("workoutHerhalingen").value);

    // Controles of velden correct zijn ingevuld
    if (workout == "") {
        alert("Kies eerst een workout.");
        return;
    }
    if (kg <= 0) {
        alert("Vul het aantal kilogram in.");
        return;
    }
    if (herhalingen <= 0) {
        alert("Vul het aantal herhalingen in.");
        return;
    }

    // Datum van vandaag genereren
    let vandaag = new Date();
    let datum =
        String(vandaag.getDate()).padStart(2, "0") + "-" +
        String(vandaag.getMonth() + 1).padStart(2, "0") + "-" +
        vandaag.getFullYear();

    // Als deze oefening nog niet bestaat in de data, maak een lege lijst aan
    if (!oefeningData[workout]) {
        oefeningData[workout] = [];
    }

    // Voeg de training toe aan de data van deze specifieke oefening
    oefeningData[workout].push({
        datum: datum,
        kg: kg,
        herhalingen: herhalingen
    });

    // Opslaan in localStorage
    localStorage.setItem("oefeningData", JSON.stringify(oefeningData));

    // Toevoegen aan het visuele lijstje op het scherm (indien aanwezig)
    let lijst = document.getElementById("workoutLijst");
    if (lijst) {
        let nieuwItem = document.createElement("li");
        nieuwItem.style.color = "white";
        nieuwItem.textContent = workout + " - " + kg + " kg x " + herhalingen + " herhalingen";
        lijst.appendChild(nieuwItem);
    }

    // Invoervelden leegmaken
    document.getElementById("workoutKg").value = "";
    document.getElementById("workoutHerhalingen").value = "";
}

// Zelfgetypte (eigen) workout opslaan, werkt hetzelfde als hierboven
function eigenWorkoutToevoegen() {
    let workout = document.getElementById("eigenWorkout").value;
    let kg = Number(document.getElementById("eigenWorkoutKg").value);
    let herhalingen = Number(document.getElementById("eigenWorkoutHerhalingen").value);

    if (workout == "") {
        alert("Vul eerst een workout in.");
        return;
    }
    if (kg <= 0) {
        alert("Vul het aantal kilogram in.");
        return;
    }
    if (herhalingen <= 0) {
        alert("Vul het aantal herhalingen in.");
        return;
    }

    let vandaag = new Date();
    let datum =
        String(vandaag.getDate()).padStart(2, "0") + "-" +
        String(vandaag.getMonth() + 1).padStart(2, "0") + "-" +
        vandaag.getFullYear();

    if (!oefeningData[workout]) {
        oefeningData[workout] = [];
    }

    oefeningData[workout].push({
        datum: datum,
        kg: kg,
        herhalingen: herhalingen
    });

    localStorage.setItem("oefeningData", JSON.stringify(oefeningData));

    // Toevoegen aan de zichtbare lijst
    let lijst = document.getElementById("workoutLijst");
    if (lijst) {
        let nieuwItem = document.createElement("li");
        nieuwItem.style.color = "white";
        nieuwItem.textContent = workout + " - " + kg + " kg x " + herhalingen + " herhalingen";
        lijst.appendChild(nieuwItem);
    }

    // Direct toevoegen aan het keuzemenu als hij daar nog niet in staat
    let workoutSelect = document.getElementById("workout");
    if (workoutSelect) {
        let bestaatAl = false;
        for (let i = 0; i < workoutSelect.options.length; i++) {
            if (workoutSelect.options[i].value === workout) {
                bestaatAl = true;
            }
        }
        if (!bestaatAl) {
            let optie = document.createElement("option");
            optie.value = workout;
            optie.textContent = workout;
            workoutSelect.appendChild(optie);
        }
    }

    // Invoervelden leegmaken
    document.getElementById("eigenWorkout").value = "";
    document.getElementById("eigenWorkoutKg").value = "";
    document.getElementById("eigenWorkoutHerhalingen").value = "";
}


// EVENT LISTENERS BIJ HET LADEN VAN DE PAGINA

document.addEventListener("DOMContentLoaded", function() {

    // 1. Start de gewichtsgrafiek (Overzicht pagina)
    toonGewichtGrafiek();

    // 2. Voeg opgeslagen oefeningen toe aan de dropdown voor de grafiek (Overzicht pagina)
    let grafiekSelect = document.getElementById("grafiekOefening");
    if (grafiekSelect) {
        let oefeningen = Object.keys(oefeningData);
        oefeningen.forEach(function(oefening) {
            let bestaatAl = false;
            for (let i = 0; i < grafiekSelect.options.length; i++) {
                if (grafiekSelect.options[i].value == oefening) {
                    bestaatAl = true;
                }
            }
            if (bestaatAl == false) {
                let optie = document.createElement("option");
                optie.value = oefening;
                optie.textContent = oefening;
                grafiekSelect.appendChild(optie);
            }
        });

        // Update grafiek en lijst bij het kiezen van een andere oefening
        grafiekSelect.addEventListener("change", function() {
            let oefening = grafiekSelect.value;
            if (oefening == "") return;
            toonOefeningGrafiek(oefening);
            toonOpgeslagenTrainingen(oefening);
        });
    }

    // 3. Voeg eigen oefeningen toe aan het keuzemenu (Workout toevoegen pagina)
    let workoutSelect = document.getElementById("workout");
    if (workoutSelect) {
        let alleOefeningen = Object.keys(oefeningData);
        alleOefeningen.forEach(function(oefeningNaam) {
            let bestaatAl = false;
            for (let i = 0; i < workoutSelect.options.length; i++) {
                if (workoutSelect.options[i].value === oefeningNaam) {
                    bestaatAl = true;
                }
            }
            if (!bestaatAl) {
                let optie = document.createElement("option");
                optie.value = oefeningNaam;
                optie.textContent = oefeningNaam;
                workoutSelect.appendChild(optie);
            }
        });
    }

    // 4. Zet de trainingen van vandaag direct in de zichtbare lijst (Workout toevoegen pagina)
    let workoutLijst = document.getElementById("workoutLijst");
    if (workoutLijst) {
        let vandaag = new Date();
        let datumVandaag = 
            String(vandaag.getDate()).padStart(2, "0") + "-" + 
            String(vandaag.getMonth() + 1).padStart(2, "0") + "-" + 
            vandaag.getFullYear();

        let alleOefeningen = Object.keys(oefeningData);
        
        alleOefeningen.forEach(function(oefeningNaam) {
            let trainingen = oefeningData[oefeningNaam];
            
            trainingen.forEach(function(training) {
                if (training.datum === datumVandaag) {
                    let nieuwItem = document.createElement("li");
                    nieuwItem.style.color = "white";
                    nieuwItem.textContent = oefeningNaam + " - " + training.kg + " kg x " + training.herhalingen + " herhalingen";
                    workoutLijst.appendChild(nieuwItem);
                }
            });
        });
    }
});


// GRAFIEKEN MAKEN


// Functie die de lijngrafiek tekent voor een specifieke krachtoefening
function toonOefeningGrafiek(oefening) {
    let canvas = document.getElementById("oefeningGrafiek");
    if (!canvas) return; // Stop als we niet op de pagina met de grafiek zijn

    let gegevens = oefeningData[oefening] || [];

    // Verwijder oude grafiek om overlappen of flikkeren te voorkomen
    if (huidigeGrafiek) {
        huidigeGrafiek.destroy();
    }

    // Als er geen data is, teken dan niets
    if (gegevens.length == 0) {
        return;
    }

    // Datums op de X-as
    let datums = gegevens.map(function(item) {
        return item.datum;
    });

    // Gewichten op de Y-as
    let gewichten = gegevens.map(function(item) {
        return item.kg;
    });

    // Chart.js grafiek opbouwen
    huidigeGrafiek = new Chart(canvas, {
        type: "line",
        data: {
            labels: datums,
            datasets: [{
                label: oefening + " - kg",
                data: gewichten,
                borderWidth: 3,
                pointRadius: 6,
                pointHoverRadius: 9,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { title: { display: true, text: "Kilogram" } },
                x: { title: { display: true, text: "Datum" } }
            },
            plugins: {
                tooltip: {
                    // Zorgt dat je bij hoveren ook het aantal herhalingen ziet
                    callbacks: {
                        label: function(context) {
                            let item = gegevens[context.dataIndex];
                            return [
                                "Gewicht: " + item.kg + " kg",
                                "Herhalingen: " + item.herhalingen
                            ];
                        }
                    }
                }
            }
        }
    });
}

// Functie die de lijngrafiek tekent voor je lichaamsgewicht
function toonGewichtGrafiek() {
    let canvas = document.getElementById("gewichtGrafiek");
    if (!canvas) return;

    if (huidigeGewichtGrafiek) {
        huidigeGewichtGrafiek.destroy();
    }

    if (gewichtGeschiedenis.length === 0) {
        return;
    }

    let datums = gewichtGeschiedenis.map(function(item) {
        return item.datum;
    });

    let gewichten = gewichtGeschiedenis.map(function(item) {
        return item.gewicht;
    });

    huidigeGewichtGrafiek = new Chart(canvas, {
        type: "line",
        data: {
            labels: datums,
            datasets: [{
                label: "Lichaamsgewicht (kg)",
                data: gewichten,
                borderWidth: 3,
                pointRadius: 5,
                pointHoverRadius: 8,
                tension: 0.3,
                borderColor: "#4CAF50",
                backgroundColor: "rgba(76, 175, 80, 0.2)"
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { title: { display: true, text: "Kilogram" } },
                x: { title: { display: true, text: "Datum" } }
            }
        }
    });
}



// OPGESLAGEN TRAININGEN TONEN (LIJST)


// Toont de geschiedenis van een geselecteerde oefening als een tekstlijst onder de grafiek
function toonOpgeslagenTrainingen(oefening) {
    let lijst = document.getElementById("oefeningTrainingen");
    if (!lijst) return;

    // Maak de lijst eerst leeg
    lijst.innerHTML = "";

    let gegevens = oefeningData[oefening] || [];

    // Maak voor elke training een nieuw <li> element aan en voeg het toe
    gegevens.forEach(function(item) {
        let li = document.createElement("li");
        li.textContent = item.datum + " - " + item.kg + " kg x " + item.herhalingen + " herhalingen";
        lijst.appendChild(li);
    });
} 
