// ======================================================
// VISIT LANKA - JOURNEY PLANNER
// ======================================================

// -------------------------------
// Exchange Rate
// -------------------------------

const EXCHANGE_RATE = 305;

// -------------------------------
// Local Storage
// -------------------------------

const selectedDestinations =
JSON.parse(localStorage.getItem("selectedDestinations")) || [];

const selectedPartners =
JSON.parse(localStorage.getItem("selectedPartners")) || [];

const questionnaireData =
JSON.parse(localStorage.getItem("questionnaireData")) || {};


// -------------------------------
// Containers
// -------------------------------

const destinationContainer =
document.getElementById("destinationContainer");

const hotelContainer =
document.getElementById("hotelContainer");

const transportContainer =
document.getElementById("transportContainer");

const guideContainer =
document.getElementById("guideContainer");

const experienceContainer =
document.getElementById("experienceContainer");


// -------------------------------
// Budget Labels
// -------------------------------

const hotelBudget =
document.getElementById("hotelBudget");

const transportBudget =
document.getElementById("transportBudget");

const guideBudget =
document.getElementById("guideBudget");

const experienceBudget =
document.getElementById("experienceBudget");

const flightBudget =
document.getElementById("flightBudget");

const totalBudget =
document.getElementById("totalBudget");


// -------------------------------
// Buttons
// -------------------------------

const editJourney =
document.getElementById("editJourney");

const saveJourney =
document.getElementById("saveJourney");

const saveMessage =
document.getElementById("saveMessage");


// ======================================================
// FIND PARTNER BY ID
// ======================================================

function findPartner(id){

    for(const destination in partnerDatabase){

        const data = partnerDatabase[destination];

        const groups = [

            data.hotels,
            data.agencies,
            data.rentals,
            data.guides,
            data.experiences

        ];

        for(const group of groups){

            const partner =
            group.find(item => item.id === id);

            if(partner){

                return partner;

            }

        }

    }

    return null;

}


// ======================================================
// EXTRACT LKR PRICE
// ======================================================

function getPrice(priceText){

    if(!priceText) return 0;

    return Number(

        priceText

        .replace(/[^0-9]/g,"")

    );

}


// ======================================================
// CONVERT TO USD
// ======================================================

function convertToUSD(lkr){

    return Math.round(

        lkr / EXCHANGE_RATE

    );

}


// ======================================================
// FORMAT PRICE
// ======================================================

function priceHTML(lkr){

    const usd = convertToUSD(lkr);

    return `
        <div class="partner-price">
            $${usd}
        </div>

        <div class="partner-lkr">
            (LKR ${lkr.toLocaleString()})
        </div>
    `;
}


// ======================================================
// CREATE EMPTY CARD
// ======================================================

function emptyCard(title){

    return `

        <div class="empty-card">

            <i class="fa-regular fa-circle"></i>

            <h3>${title}</h3>

            <p>

                No selection made.

            </p>

        </div>

    `;

}


// ======================================================
// REMOVE PARTNER
// ======================================================

function removePartner(id){

    const index =

    selectedPartners.indexOf(id);

    if(index !== -1){

        selectedPartners.splice(index,1);

    }

    localStorage.setItem(

        "selectedPartners",

        JSON.stringify(selectedPartners)

    );

    location.reload();

}

// ======================================================
// DISPLAY SELECTED DESTINATIONS
// ======================================================

function displayDestinations(){

    destinationContainer.innerHTML = "";

    if(selectedDestinations.length === 0){

        destinationContainer.innerHTML =
        emptyCard("No Destination Selected");

        return;

    }

    selectedDestinations.forEach(destination=>{

        destinationContainer.innerHTML +=

        `<span class="destination-tag">

            📍 ${destination}

        </span>`;

    });

}


// ======================================================
// CREATE PARTNER CARD
// ======================================================

function createJourneyCard(partner){

    const lkr = getPrice(partner.price);

    return `

    <div class="planner-card">

        <img src="${partner.image}"

             alt="${partner.name}"

             class="partner-image">

        <div class="partner-rating">

            ⭐ ${partner.rating}

        </div>

        <h3 class="partner-title">

            ${partner.name}

        </h3>

        <p class="partner-subtitle">

            ${partner.description}

        </p>

        ${priceHTML(lkr)}

        <span class="included">

            ✔ Included

        </span>

        <button

            class="remove-btn"

            onclick="removePartner('${partner.id}')">

            Remove

        </button>

    </div>

    `;

}


// ======================================================
// DISPLAY HOTEL
// ======================================================

function displayHotel(){

    hotelContainer.innerHTML="";

    const hotelID =

    selectedPartners.find(id=>id.startsWith("hotel"));

    if(!hotelID){

        hotelContainer.innerHTML =

        emptyCard("Accommodation");

        return;

    }

    const hotel =

    findPartner(hotelID);

    hotelContainer.innerHTML =

    createJourneyCard(hotel);

}


// ======================================================
// DISPLAY TRANSPORT
// ======================================================

function displayTransport(){

    transportContainer.innerHTML="";

    const rentalID =

    selectedPartners.find(id=>id.startsWith("rent"));

    if(!rentalID){

        transportContainer.innerHTML =

        emptyCard("Transportation");

        return;

    }

    const rental =

    findPartner(rentalID);

    transportContainer.innerHTML =

    createJourneyCard(rental);

}


// ======================================================
// DISPLAY GUIDE
// ======================================================

function displayGuide(){

    guideContainer.innerHTML="";

    const guideID =

    selectedPartners.find(id=>id.startsWith("guide"));

    if(!guideID){

        guideContainer.innerHTML =

        emptyCard("Tour Guide");

        return;

    }

    const guide =

    findPartner(guideID);

    guideContainer.innerHTML =

    createJourneyCard(guide);

}


// ======================================================
// DISPLAY EXPERIENCES
// ======================================================

function displayExperiences(){

    experienceContainer.innerHTML="";

    const experiences =

    selectedPartners.filter(id=>{

        return !id.startsWith("hotel")

            && !id.startsWith("rent")

            && !id.startsWith("guide")

            && !id.startsWith("agency");

    });

    if(experiences.length===0){

        experienceContainer.innerHTML =

        emptyCard("Experiences");

        return;

    }

    experiences.forEach(id=>{

        const experience =

        findPartner(id);

        experienceContainer.innerHTML +=

        createJourneyCard(experience);

    });

}
// ======================================================
// BUDGET CALCULATOR
// ======================================================

function updateBudget(){

    let hotelTotal = 0;

    let transportTotal = 0;

    let guideTotal = 0;

    let experienceTotal = 0;

    const flightTotal = 128100; // LKR (Estimated)

    selectedPartners.forEach(id=>{

        const partner = findPartner(id);

        if(!partner) return;

        const price = getPrice(partner.price);

        if(id.startsWith("hotel")){

            hotelTotal += price;

        }

        else if(id.startsWith("rent")){

            transportTotal += price;

        }

        else if(id.startsWith("guide")){

            guideTotal += price;

        }

        else if(id.startsWith("agency")){

            // Optional - not included in budget
        }

        else{

            experienceTotal += price;

        }

    });

    const grandTotal =

        hotelTotal +
        transportTotal +
        guideTotal +
        experienceTotal +
        flightTotal;

    // -----------------------------
    // Accommodation
    // -----------------------------

            hotelBudget.innerHTML = `
        $${convertToUSD(hotelTotal)}
        <br>
        <small>
        (LKR ${hotelTotal.toLocaleString()})
        </small>
`;
    // -----------------------------
    // Transport
    // -----------------------------

    transportBudget.innerHTML =

    `

    USD ${convertToUSD(transportTotal)}

    <br>

    <small>

    (LKR ${transportTotal.toLocaleString()})

    </small>

    `;

    // -----------------------------
    // Guide
    // -----------------------------

    guideBudget.innerHTML =

    `

    USD ${convertToUSD(guideTotal)}

    <br>

    <small>

    (LKR ${guideTotal.toLocaleString()})

    </small>

    `;

    // -----------------------------
    // Experiences
    // -----------------------------

    experienceBudget.innerHTML =

    `

    USD ${convertToUSD(experienceTotal)}

    <br>

    <small>

    (LKR ${experienceTotal.toLocaleString()})

    </small>

    `;

    // -----------------------------
    // Flights
    // -----------------------------

    flightBudget.innerHTML =

    `

    USD ${convertToUSD(flightTotal)}

    <br>

    <small>

    (LKR ${flightTotal.toLocaleString()})

    </small>

    `;

    // -----------------------------
    // Grand Total
    // -----------------------------

    totalBudget.innerHTML =

    `

    USD ${convertToUSD(grandTotal)}

    <br>

    <small>

    (LKR${grandTotal.toLocaleString()})

    </small>

    `;

}


// ======================================================
// BUDGET WARNING
// ======================================================

function checkBudget(){

    if(!questionnaireData.budget) return;

    const budgetChoice =

    questionnaireData.budget.toLowerCase();

    let limit = 0;

    if(budgetChoice.includes("low")){

        limit = 200000;

    }

    else if(budgetChoice.includes("medium")){

        limit = 400000;

    }

    else{

        limit = 700000;

    }

    let total = 128100;

    selectedPartners.forEach(id=>{

        const partner = findPartner(id);

        if(partner){

            total += getPrice(partner.price);

        }

    });

    if(total > limit){

        const budgetCard =

        document.querySelector(".budget-card");

        budgetCard.innerHTML +=

        `

        <div class="budget-alert">

        ⚠ Your estimated budget is higher than
        the budget selected in the questionnaire.

        Consider removing some travel partners
        or choosing more affordable options.

        </div>

        `;

    }

}

// ======================================================
// BACK BUTTON
// ======================================================

const backButton =
document.getElementById("backButton");

if(backButton){

    backButton.addEventListener("click",()=>{

        window.location.href="travel-partners.html";

    });

}


// ======================================================
// EDIT JOURNEY
// ======================================================

if(editJourney){

    editJourney.addEventListener("click",()=>{

        window.location.href="travel-partners.html";

    });

}


// ======================================================
// SAVE JOURNEY
// ======================================================

if(saveJourney){

    saveJourney.addEventListener("click",()=>{

        const savedJourney={

            date:new Date().toLocaleDateString(),

            destinations:selectedDestinations,

            partners:selectedPartners,

            questionnaire:questionnaireData,

            totalBudget:totalBudget.innerText

        };

        localStorage.setItem(

            "savedJourney",

            JSON.stringify(savedJourney)

        );

        saveMessage.style.display="block";

        saveJourney.disabled=true;

        saveJourney.innerHTML=`

            ✔ Journey Saved

        `;

        setTimeout(()=>{

            window.location.href=

            "my-journeys.html";

        },2500);

    });

}


// ======================================================
// PAGE INITIALIZATION
// ======================================================

displayDestinations();

displayHotel();

displayTransport();

displayGuide();

displayExperiences();

updateBudget();

checkBudget();


// ======================================================
// CONSOLE MESSAGE
// ======================================================

console.log(

"VISIT LANKA Journey Planner Loaded Successfully"

);