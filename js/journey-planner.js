// ======================================================
// VISIT LANKA - JOURNEY PLANNER
// Now connected to Spring Boot backend
// ======================================================

const API_BASE = "http://localhost:8080/api";

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

// Filled in by loadPartners() below - holds the real partner
// objects fetched from the backend, since selectedPartners in
// localStorage only holds their id strings.
let allPartners = [];

// Add near destinationContainer / hotelContainer, etc.
const agencyContainer =
document.getElementById("agencyContainer");
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
// FETCH PARTNERS FROM BACKEND
// ======================================================

async function loadPartners() {

    try {

        const response = await fetch(`${API_BASE}/partners`);

        if (!response.ok) {
            throw new Error("Server responded with " + response.status);
        }

        allPartners = await response.json();

    } catch (err) {

        console.error("Failed to load partners:", err);

        allPartners = [];

        [hotelContainer, transportContainer, guideContainer, experienceContainer]
            .forEach(c => {
                c.innerHTML =
                    "<p class='error-msg'>Could not load your travel plan. " +
                    "Make sure the backend server is running on localhost:8080.</p>";
            });

    }

    // Only render once we actually have the data
    displayDestinations();
    displayHotel();
    displayTransport();
    displayGuide();
    displayExperiences();
    updateBudget();
    checkBudget();
    displayAgency();   

}


// ======================================================
// FIND PARTNER BY ID
// Looks the id up in whatever the backend actually returned,
// instead of the old hardcoded partnerDatabase object.
// ======================================================

function findPartner(id){

    return allPartners.find(partner => String(partner.id) === String(id)) || null;

}


// ======================================================
// GET PRICE IN LKR
// Backend partners store price as usdPrice, lkrPrice, or a
// free-text price string - this normalizes all three to LKR
// so the existing budget math keeps working.
// ======================================================

function getPriceLKR(partner){

    if (!partner) return 0;

    if (partner.lkrPrice) {
        return Number(partner.lkrPrice);
    }

    if (partner.usdPrice) {
        return Math.round(Number(partner.usdPrice) * EXCHANGE_RATE);
    }

    return getPrice(partner.price);

}


// ======================================================
// EXTRACT LKR PRICE FROM A TEXT STRING
// (kept for partners that only have a free-text price like
// "LKR 8,000 / Day" or "Customized Tours")
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

    selectedPartners.indexOf(String(id));

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

    const lkr = getPriceLKR(partner);

    return `

    <div class="planner-card">

        <img src="${partner.image || '../images/home.jpg'}"

             alt="${partner.businessName}"

             class="partner-image"

             onerror="this.onerror=null;this.src='../images/home.jpg';">

        <div class="planner-card-content">

            <div class="partner-rating">

                ⭐ ${partner.rating || "N/A"}

            </div>

            <h3 class="partner-title">

                ${partner.businessName}

            </h3>

            <p class="partner-subtitle">

                ${partner.description || ""}

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

    </div>

    `;

}


// ======================================================
// DISPLAY HOTEL
// ======================================================

function displayHotel(){

    hotelContainer.innerHTML="";

    const hotelId =

    selectedPartners.find(id => {
        const partner = findPartner(id);
        return partner && (partner.category || "").toLowerCase() === "hotel";
    });

    if(!hotelId){

        hotelContainer.innerHTML =

        emptyCard("Accommodation");

        return;

    }

    const hotel =

    findPartner(hotelId);

    hotelContainer.innerHTML =

    createJourneyCard(hotel);

}


// ======================================================
// DISPLAY TRANSPORT
// ======================================================

function displayTransport(){

    transportContainer.innerHTML="";

    const rentalId =

    selectedPartners.find(id => {
        const partner = findPartner(id);
        return partner && (partner.category || "").toLowerCase() === "rental";
    });

    if(!rentalId){

        transportContainer.innerHTML =

        emptyCard("Transportation");

        return;

    }

    const rental =

    findPartner(rentalId);

    transportContainer.innerHTML =

    createJourneyCard(rental);

}


// ======================================================
// DISPLAY GUIDE
// ======================================================

function displayGuide(){

    guideContainer.innerHTML="";

    const guideId =

    selectedPartners.find(id => {
        const partner = findPartner(id);
        return partner && (partner.category || "").toLowerCase() === "guide";
    });

    if(!guideId){

        guideContainer.innerHTML =

        emptyCard("Tour Guide");

        return;

    }

    const guide =

    findPartner(guideId);

    guideContainer.innerHTML =

    createJourneyCard(guide);

}


// ======================================================
// DISPLAY EXPERIENCES
// ======================================================

function displayExperiences(){

    experienceContainer.innerHTML="";

    const experiences =

    selectedPartners.filter(id => {

        const partner = findPartner(id);

        if (!partner) return false;

        const category = (partner.category || "").toLowerCase();

        return category !== "hotel"
            && category !== "rental"
            && category !== "guide"
            && category !== "agency";

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
// DISPLAY AGENCY
// ======================================================

function displayAgency(){

    agencyContainer.innerHTML="";

    const agencyId =

    selectedPartners.find(id => {
        const partner = findPartner(id);
        return partner && (partner.category || "").toLowerCase() === "agency";
    });

    if(!agencyId){

        agencyContainer.innerHTML =

        emptyCard("Travel Agency");

        return;

    }

    const agency =

    findPartner(agencyId);

    agencyContainer.innerHTML =

    createJourneyCard(agency);

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

        const price = getPriceLKR(partner);

        const category = (partner.category || "").toLowerCase();

        if(category === "hotel"){

            hotelTotal += price;

        }

        else if(category === "rental"){

            transportTotal += price;

        }

        else if(category === "guide"){

            guideTotal += price;

        }

        else if(category === "agency"){

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

            total += getPriceLKR(partner);

        }

    });

    if(total > limit){

        const budgetCard =

        document.querySelector(".budget-card");

        if (budgetCard) {

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

loadPartners();


// ======================================================
// CONSOLE MESSAGE
// ======================================================

console.log(

"VISIT LANKA Journey Planner Loaded Successfully"

);
