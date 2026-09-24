        let aantalWorkouts = 0;
        let totaalMinuten = 0;


        function calorieenOpslaan() {

            let calorieen = document.getElementById("calorieen").value;

            document.getElementById("calorieenTotaal").textContent = calorieen;
        }


        function stappenOpslaan() {

            let stappen = document.getElementById("stappen").value;

            document.getElementById("stappenTotaal").textContent = stappen;
        }


        function gewichtOpslaan() {

            let gewicht = document.getElementById("gewicht").value;

            document.getElementById("gewichtTotaal").textContent = gewicht;
        }


        function workoutToevoegen() {

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
        
