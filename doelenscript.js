let workouts = 0;
let stappen = 0;
let totaalstappen = 0;
let totaalcalorien = 0;

// Gegevens ophalen uit localStorage
let doelenData = JSON.parse(
    localStorage.getItem("doelenData")
) || {};

// Opgeslagen gegevens terugzetten
workouts = doelenData.workouts || 0;
totaalstappen = doelenData.totaalstappen || 0;
totaalcalorien = doelenData.totaalcalorien || 0;


function gegevensOpslaan() {
    let doelenData = {
        workouts: workouts,
        totaalstappen: totaalstappen,
        totaalcalorien: totaalcalorien,
        workoutDoel: document.getElementById("workoutDoel").innerText,
        stappenDoel: document.getElementById("stappenDoel").innerText,
        calorienDoel: document.getElementById("calorienDoel").innerText
    };
    localStorage.setItem(
        "doelenData",
        JSON.stringify(doelenData)
    );
}


function voegTrainingToeWorkouts() {
    workouts++;
    updatePaginaWorkouts();
    gegevensOpslaan();
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
    gegevensOpslaan();
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
    gegevensOpslaan();
}

function doelenOpslaanWorkouts() {
    let workoutDoel = Number(document.getElementById("nieuwWorkoutDoel").value);
    if (workoutDoel < 1) {
        alert("Vul een doel in dat groter is dan 0!");
        return;
    }
    document.getElementById("workoutDoel").innerText = workoutDoel;
    updatePaginaWorkouts();
    gegevensOpslaan();
}

function doelenOpslaanStappen() {
    let stappenDoel = Number(document.getElementById("nieuwStappenDoel").value);
    if (stappenDoel < 1) {
        alert("Vul een doel in dat groter is dan 0!");
        return;
    }
    document.getElementById("stappenDoel").innerText = stappenDoel;
    updatePaginaStappen();
    gegevensOpslaan();
}

function doelenOpslaanCalorien() {
    let calorienDoel = Number(document.getElementById("nieuwCalorienDoel").value);
    if (calorienDoel < 1) {
        alert("Vul een doel in dat groter is dan 0!");
        return;
    }
    document.getElementById("calorienDoel").innerText = calorienDoel;
    updatePaginaCalorien();
    gegevensOpslaan();
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



document.addEventListener("DOMContentLoaded", function() {

    let opgeslagenData = JSON.parse(
        localStorage.getItem("doelenData")
    ) || {};

    if (!document.getElementById("workoutDoel")) {
        return;
    }

    if (opgeslagenData.workoutDoel) {
        document.getElementById("workoutDoel").innerText =
            opgeslagenData.workoutDoel;
    }

    if (opgeslagenData.stappenDoel) {
        document.getElementById("stappenDoel").innerText =
            opgeslagenData.stappenDoel;
    }

    if (opgeslagenData.calorienDoel) {
        document.getElementById("calorienDoel").innerText =
            opgeslagenData.calorienDoel;
    }

    updatePaginaWorkouts();
    updatePaginaStappen();
    updatePaginaCalorien();

});