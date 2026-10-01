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

function voegTrainingToeWorkouts() {
    workouts++;
    updatePaginaWorkouts();
}
function voegTrainingToeStappen() {
    stappen++;
    updatePaginaStappen();
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

function updatePaginaWorkouts() {
    let workoutDoel = Number(document.getElementById("workoutDoel").innerText);
    workouts = Math.min(workouts, workoutDoel);
    document.getElementById("workoutHuidig").innerText = workouts;
    let workoutPercentage = (workouts / workoutDoel) * 100;
    document.getElementById("workoutBalk").style.width = workoutPercentage + "%";
}

function updatePaginaStappen() {
    let stappenDoel = Number(document.getElementById("stappenDoel").innerText);
    stappen = Math.min(stappen, stappenDoel);
    document.getElementById("stappenHuidig").innerText = stappen;
    let stappenPercentage = (stappen / stappenDoel) * 100;
    document.getElementById("stappenBalk").style.width = stappenPercentage + "%";
}

function updatePaginaTotaal() {
    let totaal = workoutPercentage + stappenPercentage;
    document.getElementById("percentage").innerText = Math.round(totaal) + "%";
    document.getElementById("totalebalk").style.width = totaal + "%";
}