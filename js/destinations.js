const params = new URLSearchParams(window.location.search);

const isRecommended =
params.get("recommended") === "true";

const hero = document.querySelector(".hero");
const searchBox = document.querySelector(".search-box");
const recommendSection = document.querySelector(".recommend");
const filterTitle = document.querySelector(".filter h2");

if(isRecommended){

    hero.style.display="none";

    searchBox.style.display="none";

    recommendSection.style.display="none";

    filterTitle.innerHTML =
    "⭐ Recommended Destinations For You";

}

const questionnaireData = JSON.parse(
    localStorage.getItem("questionnaireData")
);
if(isRecommended){

    localStorage.removeItem("questionnaireData");

}

console.log(questionnaireData);

const tripButtons = document.querySelectorAll(".trip-btn");
const tripCount = document.getElementById("tripCount");
const selectedList = document.getElementById("selectedList");
const continueBtn = document.getElementById("continueBtn");

// Load saved destinations
let selectedDestinations =
    JSON.parse(localStorage.getItem("selectedDestinations")) || [];


// Save to localStorage


function saveTrip() {

    localStorage.setItem(
        "selectedDestinations",
        JSON.stringify(selectedDestinations)
    );

}


// Update My Trip Panel


function updateTripPanel() {

    tripCount.textContent =
        selectedDestinations.length +
        " Destination(s) Selected";

    selectedList.innerHTML = "";

    if (selectedDestinations.length === 0) {

        selectedList.innerHTML =
        "<p class='empty-trip'>No destinations selected yet.</p>";

        continueBtn.disabled = true;

    }

    else {

        selectedDestinations.forEach(place => {

            selectedList.innerHTML +=

            `
            <div class="selected-item">

                <i class="fa-solid fa-circle-check"></i>

                ${place}

            </div>
            `;

        });

        continueBtn.disabled = false;

    }

}


// Update Button Appearance


function refreshButtons() {

    tripButtons.forEach(button => {

        const place = button.dataset.place;

        if (selectedDestinations.includes(place)) {

            button.classList.add("added");

            button.innerHTML =

            `<i class="fa-solid fa-check"></i>
             Added`;

        }

        else {

            button.classList.remove("added");

            button.innerHTML =

            `<i class="fa-solid fa-plus"></i>
             Add to Trip`;

        }

    });

}


// Button Click Event


tripButtons.forEach(button => {

    button.addEventListener("click", () => {

        const place = button.dataset.place;

        if (selectedDestinations.includes(place)) {

            selectedDestinations =
                selectedDestinations.filter(item => item !== place);

        }

        else {

            selectedDestinations.push(place);

        }

        saveTrip();

        updateTripPanel();

        refreshButtons();

    });

});

// -------------------------------
// Continue Button
// -------------------------------
continueBtn.addEventListener("click", () => {

    localStorage.removeItem("selectedPartners");

    saveTrip();

    window.location.href = "travel-partners.html";

});

// -------------------------------
// Initialize Page
// -------------------------------

updateTripPanel();

refreshButtons();