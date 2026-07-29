const selectedDestinations =
    JSON.parse(localStorage.getItem("selectedDestinations")) || [];

const selectedPartners =
    JSON.parse(localStorage.getItem("selectedPartners")) || [];

const budgetUSD = 420;
const budgetLKR = 128100;

document.getElementById("journeyDate").textContent =
    new Date().toLocaleDateString();

document.getElementById("journeyBudget").textContent =
    `USD ${budgetUSD} (LKR ${budgetLKR.toLocaleString()})`;

document.getElementById("destinationCount").textContent =
    selectedDestinations.length;

document.getElementById("partnerCount").textContent =
    selectedPartners.length;

const destinationList =
    document.getElementById("destinationList");

selectedDestinations.forEach(destination => {

    const item = document.createElement("div");

    item.className = "destination-item";

    item.innerHTML = `
        <h3>📍 ${destination}</h3>
    `;

    destinationList.appendChild(item);

});
    function getIcon(id){

    if(id.startsWith("hotel")) return "🏨";

    if(id.startsWith("agency")) return "🧳";

    if(id.startsWith("rent")) return "🚗";

    if(id.startsWith("guide")) return "🧑‍💼";

    return "⭐";

}
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

            const partner = group.find(item => item.id === id);

            if(partner){

                return partner;

            }

        }

    }

    return null;

}




const partnerList =
    document.getElementById("partnerList");

selectedPartners.forEach(id => {

    const partner = findPartner(id);

    if (!partner) return;

    const item = document.createElement("div");

    item.className = "partner-item";

    item.innerHTML = `
        <h3>${getIcon(id)} ${partner.name}</h3>
    `;

    partnerList.appendChild(item);

});


document.getElementById("downloadBtn")
.addEventListener("click", function () {

    window.print();

});

document.getElementById("finishBtn")
.addEventListener("click", function () {

    alert("Thank you for using VISIT LANKA!");

    window.location.href = "rating-review.html";

});