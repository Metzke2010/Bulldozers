let aantalWorkouts = 0;
let totaalMinuten = 0;
let totaalStappen = 0;
let totaalCalorieen = 0;

function calorieenOpslaan() {
    let calorieen = document.getElementById("calorieen").value;
    totaalCalorieen = totaalCalorieen + Number(calorieen);
    document.getElementById("calorieenTotaal").textContent = totaalCalorieen;
    document.getElementById("calorieen").value = "";
}

function stappenOpslaan() {
    let stappen = document.getElementById("stappen").value;
    totaalStappen = totaalStappen + Number(stappen);
    document.getElementById("stappenTotaal").textContent = totaalStappen;
    document.getElementById("stappen").value = "";
}

function gewichtOpslaan() {
    let gewicht = document.getElementById("gewicht").value;
    document.getElementById("gewichtTotaal").textContent = gewicht;
}

function workoutTellerToevoegen() {
    aantalWorkouts = aantalWorkouts + 1;
    document.getElementById("workoutTeller").textContent = aantalWorkouts;
}

function minutenToevoegen() {
    let minuten = document.getElementById("minuten").value;
    totaalMinuten = totaalMinuten + Number(minuten);
    document.getElementById("minutenTotaal").textContent = totaalMinuten;
    document.getElementById("minuten").value = "";
}

function workoutToevoegen() {
    let workout = document.getElementById("workout").value;
    if (workout == "") {
        alert("Kies eerst een workout.");
        return;
    }
    let lijst = document.getElementById("workoutLijst");
    let nieuwItem = document.createElement("li");        
    nieuwItem.style.color = "white";
    nieuwItem.textContent = workout;
    lijst.appendChild(nieuwItem);
}

function eigenWorkoutToevoegen() {
    let workout = document.getElementById("eigenWorkout").value;
    if (workout == "") {
        alert("Vul eerst een workout in.");
        return;
    }
    let lijst = document.getElementById("workoutLijst");
    let nieuwItem = document.createElement("li");
    nieuwItem.classList.add("wit");
    nieuwItem.textContent = workout;
    lijst.appendChild(nieuwItem);
    document.getElementById("eigenWorkout").value = "";
}

let workouts = 0;
let stappen = 0;
let totaalstappen = 0;
let totaalcalorien = 0;

function voegTrainingToeWorkouts() {
    workouts++;
    updatePaginaWorkouts();
}
function voegTrainingToeStappen() {
    let stappenToevoegen = Number(document.getElementById("stappenToevoegen").value);
    if (stappenToevoegen < 1) {
        alert("Vul een doel in dat groter is dan 0!");
        return;
    }
    totaalstappen = totaalstappen + Number(stappenToevoegen);
    document.getElementById("stappenToevoegen").value = "";
    updatePaginaStappen();
}
function voegTrainingToeCalorien() {
    let calorienToevoegen = Number(document.getElementById("calorienToevoegen").value);
    if (calorienToevoegen < 1) {
        alert("Vul een doel in dat groter is dan 0!");
        return;
    }
    totaalcalorien = totaalcalorien + Number(calorienToevoegen);
    document.getElementById("calorienToevoegen").value = "";
    updatePaginaCalorien();
}

function doelenOpslaanWorkouts() {
    let workoutDoel = Number(document.getElementById("nieuwWorkoutDoel").value);
    if (workoutDoel < 1) {
        alert("Vul een doel in dat groter is dan 0!");
        return;
    }
    document.getElementById("workoutDoel").innerText = workoutDoel;
    updatePaginaWorkouts();
}

function doelenOpslaanStappen() {
    let stappenDoel = Number(document.getElementById("nieuwStappenDoel").value);
    if (stappenDoel < 1) {
        alert("Vul een doel in dat groter is dan 0!");
        return;
    }
    document.getElementById("stappenDoel").innerText = stappenDoel;
    updatePaginaStappen();
}

function doelenOpslaanCalorien() {
    let calorienDoel = Number(document.getElementById("nieuwCalorienDoel").value);
    if (calorienDoel < 1) {
        alert("Vul een doel in dat groter is dan 0!");
        return;
    }
    document.getElementById("calorienDoel").innerText = calorienDoel;
    updatePaginaCalorien();
}

function updatePaginaWorkouts() {
    let workoutDoel = Number(document.getElementById("workoutDoel").innerText);
    workouts = Math.min(workouts, workoutDoel);
    document.getElementById("workoutHuidig").innerText = workouts;
    let workoutPercentage = (workouts / workoutDoel) * 100;
    document.getElementById("workoutBalk").style.width = workoutPercentage + "%";
}

function updatePaginaStappen() {
    let stappenDoel = Number(document.getElementById("stappenDoel").innerText);
    stappen = Math.min(totaalstappen, stappenDoel);
    document.getElementById("stappenHuidig").innerText = stappen;
    let stappenPercentage = (totaalstappen / stappenDoel) * 100;
    document.getElementById("stappenBalk").style.width = stappenPercentage + "%";
}

function updatePaginaCalorien() {
    let calorienDoel = Number(document.getElementById("calorienDoel").innerText);
    calorien = Math.min(totaalcalorien, calorienDoel);
    document.getElementById("calorienHuidig").innerText = calorien;
    let calorienPercentage = (totaalcalorien / calorienDoel) * 100;
    document.getElementById("calorienBalk").style.width = calorienPercentage + "%";
}
// ==========================================
// OEFENINGEN OPSLAAN
// ==========================================

let oefeningData = JSON.parse(
    localStorage.getItem("oefeningData")
) || {};

let huidigeGrafiek = null;


// ==========================================
// OEFENING TOEVOEGEN
// ==========================================

function oefeningResultaatToevoegen() {

    let oefening = document.getElementById("grafiekOefening").value;
    let kg = Number(document.getElementById("grafiekKg").value);
    let herhalingen = Number(document.getElementById("grafiekHerhalingen").value);

    if (oefening == "") {
        alert("Kies eerst een oefening.");
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


    // Als de oefening nog niet bestaat
    if (!oefeningData[oefening]) {
        oefeningData[oefening] = [];
    }


    // Datum
    let vandaag = new Date();

    let datum =
        String(vandaag.getDate()).padStart(2, "0") +
        "-" +
        String(vandaag.getMonth() + 1).padStart(2, "0") +
        "-" +
        vandaag.getFullYear();


    // Gegevens toevoegen
    oefeningData[oefening].push({
        datum: datum,
        kg: kg,
        herhalingen: herhalingen
    });


    // OPSLAAN
    localStorage.setItem(
        "oefeningData",
        JSON.stringify(oefeningData)
    );


    // Invoervelden leegmaken
    document.getElementById("grafiekKg").value = "";
    document.getElementById("grafiekHerhalingen").value = "";


    // Grafiek en lijst vernieuwen
    toonOefeningGrafiek(oefening);
    toonOpgeslagenTrainingen(oefening);
}


// ==========================================
// OEFENING KIEZEN
// ==========================================

document.addEventListener("DOMContentLoaded", function() {

    let select = document.getElementById("grafiekOefening");

    if (!select) {
        return;
    }

    select.addEventListener("change", function() {

        let oefening = select.value;

        if (oefening == "") {
            return;
        }

        toonOefeningGrafiek(oefening);
        toonOpgeslagenTrainingen(oefening);

    });

});


// ==========================================
// GRAFIEK
// ==========================================

function toonOefeningGrafiek(oefening) {

    let canvas = document.getElementById("oefeningGrafiek");

    if (!canvas) {
        return;
    }


    let gegevens = oefeningData[oefening] || [];


    // Oude grafiek verwijderen
    if (huidigeGrafiek) {
        huidigeGrafiek.destroy();
    }


    // Geen gegevens
    if (gegevens.length == 0) {
        return;
    }


    let datums = gegevens.map(function(item) {
        return item.datum;
    });


    let gewichten = gegevens.map(function(item) {
        return item.kg;
    });


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

                y: {
                    title: {
                        display: true,
                        text: "Kilogram"
                    }
                },

                x: {
                    title: {
                        display: true,
                        text: "Datum"
                    }
                }

            },

            plugins: {

                tooltip: {

                    callbacks: {

                        label: function(context) {

                            let item =
                                gegevens[context.dataIndex];

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


// ==========================================
// OPGESLAGEN TRAININGEN TONEN
// ==========================================

function toonOpgeslagenTrainingen(oefening) {

    let lijst =
        document.getElementById("oefeningTrainingen");

    if (!lijst) {
        return;
    }


    lijst.innerHTML = "";


    let gegevens =
        oefeningData[oefening] || [];


    gegevens.forEach(function(item) {

        let li = document.createElement("li");

        li.textContent =
            item.datum +
            " - " +
            item.kg +
            " kg x " +
            item.herhalingen +
            " herhalingen";

        lijst.appendChild(li);

    });

}