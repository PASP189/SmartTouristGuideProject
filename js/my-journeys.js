const journeyList = document.getElementById("journeyList");

const selectedDestinations =
    JSON.parse(localStorage.getItem("selectedDestinations")) || [];

const selectedPartners =
    JSON.parse(localStorage.getItem("selectedPartners")) || [];

const journey = {

    id: "JL-2026-001",

    status: "Planned",

    date: new Date().toLocaleDateString(),

    destinations: selectedDestinations,

    partnerCount: selectedPartners.length,

    budgetUSD: 420,

    budgetLKR: 128100

};

displayJourney();

function displayJourney(){

    journeyList.innerHTML="";

    const card=document.createElement("div");

    card.className="journey-card";

    card.innerHTML=`

        <div class="card-header">

            <h3>${journey.id}</h3>

            <span class="status">

                ${journey.status}

            </span>

        </div>

        <div class="card-body">

            <p>

                <strong>Created :</strong>

                ${journey.date}

            </p>

            <p>

                <strong>Destinations :</strong>

            </p>

            <div class="destination-list">

                ${journey.destinations.map(destination=>`

                    <div class="destination-item">

                        📍 ${destination}

                    </div>

                `).join("")}

            </div>

            <p>

                <strong>Travel Partners :</strong>

                ${journey.partnerCount}

            </p>

            <div class="budget">

                USD ${journey.budgetUSD}

            </div>

            <small>

                (LKR ${journey.budgetLKR.toLocaleString()})

            </small>

            <button
                class="view-btn"
                onclick="viewJourney()">

                View Journey Details

            </button>

        </div>

    `;

    journeyList.appendChild(card);

}

function viewJourney(){

    window.location.href="journey-details.html";

}