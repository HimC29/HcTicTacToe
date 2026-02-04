const radio1 = document.getElementById("radio1");
const radio0 = document.getElementById("radio0")
const gamemode = document.getElementsByName("gamemode");
const sliderContainer = document.querySelector(".slider-container");
const startGameBtn = document.getElementById("startGame");

function diffSlider() {
    // Always reset slider area first so navigation/back doesn't leave stale content
    sliderContainer.innerHTML = "";

    if (radio1.checked) {
        const label = document.createElement("h2");
        label.className = "slider-label";
        label.textContent = "Difficulty";
        sliderContainer.appendChild(label);

        const slider = document.createElement('input');
        slider.setAttribute('type', 'range');
        slider.setAttribute('min', '0');
        slider.setAttribute('max', '2');
        slider.setAttribute('step', '1');
        slider.classList.add('slider');
        slider.id = 'difficulty';
        sliderContainer.appendChild(slider);

        // If user previously chose a difficulty, restore it
        const savedSliderValue = localStorage.getItem("slider");
        if (savedSliderValue !== null) {
            slider.value = savedSliderValue;
        } else {
            slider.value = "1"; // default: Medium
        }

        function updateDiff() {
            let currentValue = slider.value;
            if (currentValue == "0") currentValue = "Easy";
            else if (currentValue == "1") currentValue = "Medium";
            else if (currentValue == "2") currentValue = "Hard";
            label.textContent = `Difficulty: ${currentValue}`;

            // Persist current slider position for next time
            localStorage.setItem("slider", slider.value);
        }
        updateDiff();
        slider.addEventListener("input", updateDiff);
    }
}

diffSlider();
gamemode.forEach(e => {
    e.addEventListener("change", () => diffSlider());
});

// Ensure correct UI when returning via browser back/forward (bfcache)
window.addEventListener("pageshow", () => {
    diffSlider();
});

document.addEventListener("DOMContentLoaded", () => {
    const radio = localStorage.getItem("radio");
    const difficulty = localStorage.getItem("difficulty");
    if(radio === "1") {
        radio1.checked = true;
        radio0.checked = false;
    }
    else {
        radio0.checked = true;
        radio1.checked = false;
    }
    if(difficulty) {
        // Ensure the slider exists before trying to set its value, since it is only added in diffSlider() for mode "Play with Robot"
        const slider = document.getElementById("difficulty");
        if (slider) {
            slider.value = difficulty;
        }
    }
});

startGameBtn.addEventListener("click", () => {
    for(let i = 0; i < gamemode.length; i++){
        if(gamemode[i].checked){
            localStorage.setItem("gamemode", gamemode[i].value);
            localStorage.setItem("radio", radio1.checked ? "1" : "0");
            if(gamemode[i].value === "1") {
                localStorage.setItem("difficulty", document.getElementById("difficulty").value)
                localStorage.setItem("slider", document.getElementById("difficulty").value);
            }
            window.location.href = "../game/";
        }
    }
});
