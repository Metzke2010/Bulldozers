//variabelen voor het bijhouden van workouts, stappen en calorien
let workouts = 0;
let stappen = 0;
let totaalstappen = 0;
let totaalcalorien = 0;

//variabelen die voorkomen dat de melding met doel gehaald meerdere keren tevoorschijn komt
let workoutMeldingGetoond = false;
let stappenMeldingGetoond = false;
let calorienMeldingGetoond = false;

//opgeslagen dingen uit localstorage halen
let doelenData = JSON.parse(
    localStorage.getItem("doelenData")
) || {};

//eerdere opgeslagen aantallen terugzetten
workouts = doelenData.workouts || 0;
totaalstappen = doelenData.totaalstappen || 0;
totaalcalorien = doelenData.totaalcalorien || 0;

//alle gegevens verzamelen en opslaan in localstorage, zodat ze bewaard blijven
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

//workout toevoegen aan totaal
function voegTrainingToeWorkouts() {
    workouts++;
    updatePaginaWorkouts();
    gegevensOpslaan();
}

//ingevulde stappen aantal toevoegen aan totaal
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

//ingevulde aantal calorien toevoegen aan totaal
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

//nieuw workoutdoel opslaan en voortgang bijwerken
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

//nieuw stappendoel opslaan en voortgang bijwerken
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

//nieuw caloriendoel opslaan en voortgang bijwerken
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

//de huidige workouts, percentage en voortgangsbalk bijwerken
function updatePaginaWorkouts() {
    let workoutDoel = Number(document.getElementById("workoutDoel").innerText);
    document.getElementById("workoutHuidig").innerText = workouts;
    let workoutPercentage = Math.min((workouts / workoutDoel) * 100, 100); //percentage berekenen met max 100% voor de voortgangsbalk
    document.getElementById("workoutBalk").style.width = workoutPercentage + "%";
    if (workoutPercentage >= 100 && workoutMeldingGetoond == false) {
        alert("Workoutdoel gehaald!");
        workoutMeldingGetoond = true;
        return;
    }
}

//de huidige stappen, percentage en voortgamgsbalk bijwerken
function updatePaginaStappen() {
    let stappenDoel = Number(document.getElementById("stappenDoel").innerText);
    stappen = totaalstappen;
    document.getElementById("stappenHuidig").innerText = stappen;
    let stappenPercentage = Math.min((totaalstappen / stappenDoel) * 100, 100); //percentage berekenen met max 100% voor de voortgangsbalk
    document.getElementById("stappenBalk").style.width = stappenPercentage + "%";
    if (stappenPercentage >= 100 && stappenMeldingGetoond == false) {
        alert("Stappendoel gehaald!");
        stappenMeldingGetoond = true;
        return;
    }
}

//de huidige calorien, percentage en voortgangsbalk bijwerken
function updatePaginaCalorien() {
    let calorienDoel = Number(document.getElementById("calorienDoel").innerText);
    calorien = totaalcalorien;
    document.getElementById("calorienHuidig").innerText = calorien;
    let calorienPercentage = Math.min((totaalcalorien / calorienDoel) * 100, 100); //percentage berekenen met max 100% voor de voortgangsbalk
    document.getElementById("calorienBalk").style.width = calorienPercentage + "%";
    if (calorienPercentage >= 100 && calorienMeldingGetoond == false) {
        alert("Caloriendoel gehaald!");
        calorienMeldingGetoond = true;
        return;
    }
}

//wachten totdat html helemaal is geladen voordat de gegevens worden teruggezet
document.addEventListener("DOMContentLoaded", function() {
    let opgeslagenData = JSON.parse(
        localStorage.getItem("doelenData")
    ) || {};
    if (!document.getElementById("workoutDoel")) {
        return; //controleren of het bestaat
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

//bijgehouden aantallen en ingestelde doelen terugzetten naar de beginwaarden
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