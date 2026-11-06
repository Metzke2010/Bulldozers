let workouts = 0;
let stappen = 0;
let totaalstappen = 0;
let totaalcalorien = 0;

let workoutMeldingGetoond = false;
let stappenMeldingGetoond = false;
let calorienMeldingGetoond = false;

let doelenData = JSON.parse(
    localStorage.getItem("doelenData")
) || {};

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

function updatePaginaWorkouts(meldingTonen = true) {
    let workoutDoel = Number(document.getElementById("workoutDoel").innerText);
    document.getElementById("workoutHuidig").innerText = workouts;
    let workoutPercentage = Math.min((workouts / workoutDoel) * 100, 100);
    document.getElementById("workoutBalk").style.width = workoutPercentage + "%";
    if (workoutPercentage >= 100 && workoutMeldingGetoond == false) {
        alert("Doel gehaald!");
        workoutMeldingGetoond = true;
        return;
    }
}

function updatePaginaStappen(meldingTonen = true) {
    let stappenDoel = Number(document.getElementById("stappenDoel").innerText);
    stappen = totaalstappen;
    document.getElementById("stappenHuidig").innerText = stappen;
    let stappenPercentage = Math.min((totaalstappen / stappenDoel) * 100, 100);
    document.getElementById("stappenBalk").style.width = stappenPercentage + "%";
    if (stappenPercentage >= 100 && stappenMeldingGetoond == false) {
        alert("Doel gehaald!");
        stappenMeldingGetoond = true;
        return;
    }
}

function updatePaginaCalorien(meldingTonen = true) {
    let calorienDoel = Number(document.getElementById("calorienDoel").innerText);
    calorien = totaalcalorien;
    document.getElementById("calorienHuidig").innerText = calorien;
    let calorienPercentage = Math.min((totaalcalorien / calorienDoel) * 100, 100);
    document.getElementById("calorienBalk").style.width = calorienPercentage + "%";
    if (calorienPercentage >= 100 && calorienMeldingGetoond == false) {
        alert("Doel gehaald!");
        calorienMeldingGetoond = true;
        return;
    }
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
function resetDoelen() {
    workouts = 0;
    totaalstappen =0;
    totaalcalorien = 0;

    document.getElementById("workoutDoel").innerText = 4;
    document.getElementById("stappenDoel").innerText = 4;
    document.getElementById("calorienDoel").innerText = 4;

    updatePaginaWorkouts(false);
    updatePaginaStappen(false);
    updatePaginaCalorien(false);

    workoutMeldingGetoond = false;
    stappenMeldingGetoond = false;
    calorienMeldingGetoond = false;

    gegevensOpslaan();
}