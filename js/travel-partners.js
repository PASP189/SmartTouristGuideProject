// ======================================
// VISIT LANKA - TRAVEL PARTNERS
// ======================================

const selectedDestinations =
    JSON.parse(localStorage.getItem("selectedDestinations")) || [];

let selectedPartners =
    JSON.parse(localStorage.getItem("selectedPartners")) || [];

const destinationContainer =
    document.getElementById("selectedDestinations");

const hotelContainer =
    document.getElementById("hotelContainer");

const agencyContainer =
    document.getElementById("agencyContainer");

const rentalContainer =
    document.getElementById("rentalContainer");

const guideContainer =
    document.getElementById("guideContainer");

const experienceContainer =
    document.getElementById("experienceContainer");

const hotelCount =
    document.getElementById("hotelCount");

const agencyCount =
    document.getElementById("agencyCount");

const rentalCount =
    document.getElementById("rentalCount");

const guideCount =
    document.getElementById("guideCount");

const experienceCount =
    document.getElementById("experienceCount");

// ======================================
// TRAVEL PARTNER DATABASE
// ======================================

const partnerDatabase = {

    Mirissa: {

        hotels: [

            {
                id: "hotel1",
                name: "Ocean Breeze Resort",
                image: "../images/Hotel1.jpg",
                rating: "4.9",
                usdPrice: 62,
                lkrPrice: 18500,
                unit: "Night",
                description: "Luxury beachfront hotel with ocean views.",
                features: [
                    "Pool",
                    "Breakfast",
                    "Free WiFi"
                ]
            },

            {
                id: "hotel2",
                name: "Sea Pearl Hotel",
                image: "../images/Hotel2.jpg",
                rating: "4.8",
                usdPrice: 53,
                lkrPrice: 16000,
                unit: "Night",
                description: "Comfortable stay near Mirissa Beach.",
                features: [
                    "Beach",
                    "Restaurant",
                    "Parking"
                ]
            }

        ],

        agencies: [

            {
                id: "agency1",
                name: "De Zoysa Travels",
                image: "../images/dezoysatravel.jpg",
                rating: "4.9",
                price: "Customized Tours",
                description: "Professional travel planning services.",
                features: [
                    "Airport Pickup",
                    "Packages",
                    "Support"
                ]
            }

        ],

        rentals: [

            {
                id: "rent1",
                name: "Coastal Car Rental",
                image: "../images/Rent1.jpg",
                rating: "4.7",
                price: "LKR 7,500 / Day",
                description: "Comfortable vehicles for coastal travel.",
                features: [
                    "SUV",
                    "Insurance",
                    "Unlimited KM"
                ]
            }

        ],

        guides: [

            {
                id: "guide1",
                name: "Nimal Perera",
                image: "../images/Guide1.jpg",
                rating: "5.0",
                price: "LKR 6,000 / Day",
                description: "Experienced local guide for Mirissa.",
                features: [
                    "English",
                    "Photography",
                    "History"
                ]
            }

        ],

        experiences: [

            {
                id: "whale1",
                name: "Whale Watching",
                image: "../images/Whalewatching.jpg",
                rating: "4.9",
                price: "LKR 9,000",
                description: "Morning whale watching adventure.",
                features: [
                    "Boat",
                    "Safety",
                    "Guide"
                ]
            },

            {
                id: "boat1",
                name: "Boat Ride",
                image: "../images/Boatride.jpg",
                rating: "4.8",
                price: "LKR 4,000",
                description: "Scenic boat ride along the coastline.",
                features: [
                    "Sunset",
                    "Photography",
                    "Relax"
                ]
            }

        ]

    },

        Ella: {

        hotels: [

            {
                id: "hotel3",
                name: "Ella Mountain Resort",
                image: "../images/Hotel3.jpg",
                rating: "4.8",
                usdPrice: 58,
                lkrPrice: 17500,
                unit: "Night",
                description: "Luxury mountain resort overlooking Ella Gap.",
                features: [
                    "Mountain View",
                    "Breakfast",
                    "Free WiFi"
                ]
            }

        ],

        agencies: [

            {
                id: "agency2",
                name: "Ceylon Travel",
                image: "../images/ceylontravel.jpg",
                rating: "4.9",
                price: "Customized Tours",
                description: "Professional hill-country tour planning.",
                features: [
                    "Packages",
                    "Guide",
                    "Transport"
                ]
            }

        ],

        rentals: [

            {
                id: "rent2",
                name: "Hill Country Rentals",
                image: "../images/Rent2.jpg",
                rating: "4.8",
                price: "LKR 8,000 / Day",
                description: "Comfortable vehicles for mountain roads.",
                features: [
                    "SUV",
                    "Insurance",
                    "GPS"
                ]
            }

        ],

        guides: [

            {
                id: "guide2",
                name: "Kasun Silva",
                image: "../images/Guide2.jpg",
                rating: "5.0",
                price: "LKR 6,500 / Day",
                description: "Expert hiking and sightseeing guide.",
                features: [
                    "English",
                    "Hiking",
                    "Photography"
                ]
            }

        ],

        experiences: [

            {
                id: "camp1",
                name: "Camping Adventure",
                image: "../images/Camping.jpg",
                rating: "4.8",
                price: "LKR 5,500",
                description: "Spend a peaceful night under the stars.",
                features: [
                    "Campfire",
                    "Meals",
                    "Guide"
                ]
            }

        ]

    },

        Sigiriya: {

        hotels: [

            {
                id: "hotel4",
                name: "Sigiriya Heritage Resort",
                image: "../images/Hotel4.jpg",
                rating: "4.9",
                usdPrice: 63,
                lkrPrice: 19000,
                unit: "Night",
                description: "Luxury stay near the Sigiriya Rock Fortress.",
                features: [
                    "Pool",
                    "Restaurant",
                    "Spa"
                ]
            }

        ],

        agencies: [

            {
                id: "agency3",
                name: "My SL Travel",
                image: "../images/mySLtravel.webp",
                rating: "4.8",
                price: "Tour Packages",
                description: "Cultural heritage tour specialists.",
                features: [
                    "Transport",
                    "Guide",
                    "Packages"
                ]
            }

        ],

        rentals: [

            {
                id: "rent3",
                name: "Sigiriya Vehicle Hire",
                image: "../images/Rent3.jpg",
                rating: "4.7",
                price: "LKR 7,800 / Day",
                description: "Reliable vehicles for exploring the Cultural Triangle.",
                features: [
                    "Car",
                    "Insurance",
                    "AC"
                ]
            }

        ],

        guides: [

            {
                id: "guide3",
                name: "Ruwan Jayasinghe",
                image: "../images/Guide3.jpg",
                rating: "4.9",
                price: "LKR 7,000 / Day",
                description: "Historical and archaeological tour guide.",
                features: [
                    "History",
                    "English",
                    "Photography"
                ]
            }

        ],

        experiences: [

            {
                id: "safari1",
                name: "Village Safari",
                image: "../images/Safari1.jpg",
                rating: "4.8",
                price: "LKR 8,000",
                description: "Traditional village and wildlife experience.",
                features: [
                    "Jeep",
                    "Lunch",
                    "Guide"
                ]
            }

        ]

    },

        "Nuwara Eliya": {

        hotels: [

            {
                id: "hotel5",
                name: "Tea Garden Hotel",
                image: "../images/Hotel5.jpg",
                rating: "4.8",
                usdPrice: 60,
                lkrPrice: 18000,
                unit: "Night",
                description: "Luxury accommodation surrounded by tea estates.",
                features: [
                    "Garden",
                    "Breakfast",
                    "Free WiFi"
                ]
            }

        ],

        agencies: [

            {
                id: "agency4",
                name: "UTC Travel",
                image: "../images/utc.ltravel.jpg",
                rating: "4.8",
                price: "Holiday Packages",
                description: "Highland travel specialists.",
                features: [
                    "Tours",
                    "Support",
                    "Hotels"
                ]
            }

        ],

        rentals: [

            {
                id: "rent4",
                name: "Highland Rentals",
                image: "../images/Rent4.jpg",
                rating: "4.7",
                price: "LKR 8,500 / Day",
                description: "Safe transport for hill-country journeys.",
                features: [
                    "SUV",
                    "GPS",
                    "Insurance"
                ]
            }

        ],

        guides: [

            {
                id: "guide4",
                name: "Dilshan Fernando",
                image: "../images/Guide4.jpg",
                rating: "4.9",
                price: "LKR 6,800 / Day",
                description: "Tea plantation and city sightseeing guide.",
                features: [
                    "English",
                    "Nature",
                    "History"
                ]
            }

        ],

        experiences: [

            {
                id: "camp2",
                name: "Mountain Camping",
                image: "../images/Camping2.jpg",
                rating: "4.9",
                price: "LKR 6,500",
                description: "Camp in the cool hills of Nuwara Eliya.",
                features: [
                    "Campfire",
                    "Meals",
                    "Guide"
                ]
            }

        ]

    },

        Anuradhapura: {

        hotels: [

            {
                id: "hotel6",
                name: "Sacred City Hotel",
                image: "../images/Hotel6.jpg",
                rating: "4.8",
                usdPrice: 52,
                lkrPrice: 15500,
                unit: "Night",
                description: "Comfortable luxury hotel close to the ancient sacred city.",
                features: [
                    "Breakfast",
                    "Swimming Pool",
                    "Free WiFi"
                ]
            }

        ],

        agencies: [

            {
                id: "agency5",
                name: "Ancient Lanka Tours",
                image: "../images/dezoysatravel.jpg",
                rating: "4.8",
                price: "Heritage Tour",
                description: "Professional cultural tour packages.",
                features: [
                    "Guide",
                    "Transport",
                    "Packages"
                ]
            }

        ],

        rentals: [

            {
                id: "rent5",
                name: "Heritage Car Rental",
                image: "../images/Rent1.jpg",
                rating: "4.7",
                price: "LKR 7,500 / Day",
                description: "Reliable rental vehicles for heritage sites.",
                features: [
                    "SUV",
                    "Insurance",
                    "GPS"
                ]
            }

        ],

        guides: [

            {
                id: "guide5",
                name: "Saman Kumara",
                image: "../images/Guide1.jpg",
                rating: "5.0",
                price: "LKR 6,000 / Day",
                description: "Expert guide for ancient kingdoms.",
                features: [
                    "History",
                    "English",
                    "Photography"
                ]
            }

        ],

        experiences: [

            {
                id: "history1",
                name: "Ancient City Tour",
                image: "../images/Camping3.jpg",
                rating: "4.9",
                price: "LKR 5,000",
                description: "Explore Sri Lanka's ancient civilization.",
                features: [
                    "Guide",
                    "Museum",
                    "Transport"
                ]
            }

        ]

    },

        Yala: {

        hotels: [

            {
                id: "hotel7",
                name: "Yala Safari Resort",
                image: "../images/Hotel7.jpg",
                rating: "4.9",
                usdPrice: 67,
                lkrPrice: 20000,
                unit: "Night",
                description: "Luxury safari resort near Yala National Park.",
                features: [
                    "Safari",
                    "Pool",
                    "Breakfast"
                ]
            }

        ],

        agencies: [

            {
                id: "agency6",
                name: "Wild Adventure Tours",
                image: "../images/mySLtravel.webp",
                rating: "4.9",
                price: "Safari Packages",
                description: "Professional wildlife safari operators.",
                features: [
                    "Jeep",
                    "Guide",
                    "Hotel"
                ]
            }

        ],

        rentals: [

            {
                id: "rent6",
                name: "Safari Jeep Rental",
                image: "../images/Rent2.jpg",
                rating: "4.8",
                price: "LKR 9,500 / Day",
                description: "Comfortable safari jeeps.",
                features: [
                    "4WD",
                    "Driver",
                    "Insurance"
                ]
            }

        ],

        guides: [

            {
                id: "guide6",
                name: "Tharindu Silva",
                image: "../images/Guide2.jpg",
                rating: "5.0",
                price: "LKR 7,500 / Day",
                description: "Professional wildlife guide.",
                features: [
                    "Wildlife",
                    "Photography",
                    "English"
                ]
            }

        ],

        experiences: [

            {
                id: "safari2",
                name: "Jeep Safari",
                image: "../images/Safari2.jpg",
                rating: "5.0",
                price: "LKR 12,000",
                description: "Experience elephants, leopards and wildlife.",
                features: [
                    "Jeep",
                    "Guide",
                    "Refreshments"
                ]
            },

            {
                id: "safari3",
                name: "Sunrise Safari",
                image: "../images/Safari3.jpg",
                rating: "4.9",
                price: "LKR 13,500",
                description: "Early morning safari adventure.",
                features: [
                    "Breakfast",
                    "Guide",
                    "Photography"
                ]
            }

        ]

    },

        "Arugam Bay": {

        hotels: [

            {
                id: "hotel8",
                name: "Arugam Paradise",
                image: "../images/Hotel8.jpg",
                rating: "4.8",
                usdPrice: 57,
                lkrPrice: 17000,
                unit: "Night",
                description: "Luxury beach hotel specially designed for surfers and beach lovers.",
                features: [
                    "Beach",
                    "Pool",
                    "Breakfast"
                ]
            }

        ],

        agencies: [

            {
                id: "agency7",
                name: "East Coast Travel",
                image: "../images/eastcoasttravel.jpg",
                rating: "4.8",
                price: "Surf Packages",
                description: "Adventure travel experts offering surfing and beach tours.",
                features: [
                    "Surf",
                    "Transport",
                    "Guide"
                ]
            }

        ],

        rentals: [

            {
                id: "rent7",
                name: "Surf Vehicle Rental",
                image: "../images/Rent3.jpg",
                rating: "4.7",
                price: "LKR 8,500 / Day",
                description: "Comfortable vehicles for exploring Arugam Bay.",
                features: [
                    "SUV",
                    "Insurance",
                    "GPS"
                ]
            }

        ],

        guides: [

            {
                id: "guide7",
                name: "Nuwan Fernando",
                image: "../images/Guide3.jpg",
                rating: "4.9",
                price: "LKR 6,800 / Day",
                description: "Experienced surfing instructor and local guide.",
                features: [
                    "Surfing",
                    "English",
                    "Photography"
                ]
            }

        ],

        experiences: [

            {
                id: "surf1",
                name: "Surfing Experience",
                image: "../images/Surfing.jpg",
                rating: "5.0",
                price: "LKR 8,000",
                description: "Surfing lessons for beginners and professionals.",
                features: [
                    "Board",
                    "Instructor",
                    "Equipment"
                ]
            },

            {
                id: "surf2",
                name: "Advanced Surf Camp",
                image: "../images/Surfing2.webp",
                rating: "4.9",
                price: "LKR 12,500",
                description: "Professional surf camp with experienced coaches.",
                features: [
                    "Coach",
                    "Equipment",
                    "Meals"
                ]
            },

            {
                id: "surf3",
                name: "Sunset Surf Session",
                image: "../images/Surfing3.jpg",
                rating: "4.8",
                price: "LKR 7,500",
                description: "Enjoy an unforgettable sunset surfing session.",
                features: [
                    "Instructor",
                    "Photography",
                    "Equipment"
                ]
            }

        ]

    }

};

// ======================================
// CREATE PARTNER CARD
// ======================================

function createPartnerCard(partner, category) {

    const card = document.createElement("div");

    card.className = "partner-card";

  let priceHTML = "";

if (partner.usdPrice) {

    priceHTML = `
        <div class="partner-price">
            <p>Starting From</p>
            <h4>$${partner.usdPrice} / ${partner.unit}</h4>
        </div>
    `;

} else if (partner.price) {

    let usdPrice = partner.price;

    usdPrice = usdPrice.replace("LKR", "$");
    usdPrice = usdPrice.replace("Rs.", "$");

    const numbers = usdPrice.match(/[0-9,]+/);

    if (numbers) {

        const value = parseInt(numbers[0].replace(/,/g, ""));

        const usd = Math.round(value / 305);

        usdPrice = usdPrice.replace(/[0-9,]+/, usd);

    }

    priceHTML = `
        <div class="partner-price">
            <p>Service</p>
            <h4>${usdPrice}</h4>
        </div>
    `;

} 

    card.innerHTML = `

        <div class="partner-badge">

            ⭐ VERIFIED PARTNER

        </div>

        <img src="${partner.image}" alt="${partner.name}">

        <div class="partner-content">

            <h3>${partner.name}</h3>

            <p class="partner-location">

                📍 ${category}

            </p>

            <div class="partner-rating">

                ⭐ ${partner.rating}

            </div>

            <p class="partner-description">

                ${partner.description}

            </p>

            <div class="partner-features">

                ${partner.features.map(feature =>
                    `<span>${feature}</span>`
                ).join("")}

            </div>

            ${priceHTML}

            <button
                class="add-plan-btn"
                onclick="togglePartner('${partner.id}')">

                Add To Plan

            </button>

        </div>

    `;

    return card;

}
// ======================================
// DISPLAY SELECTED DESTINATIONS
// ======================================

function displaySelectedDestinations() {

    destinationContainer.innerHTML = "";

    if (selectedDestinations.length === 0) {

        destinationContainer.innerHTML = `
            <p>No destinations selected.</p>
        `;

        return;
    }

    selectedDestinations.forEach(destination => {

        destinationContainer.innerHTML += `
            <div class="destination-tag">
                📍 ${destination}
            </div>
        `;

    });

}

// ======================================
// DISPLAY PARTNERS
// ======================================

function displayPartners() {

    hotelContainer.innerHTML = "";
    agencyContainer.innerHTML = "";
    rentalContainer.innerHTML = "";
    guideContainer.innerHTML = "";
    experienceContainer.innerHTML = "";

    selectedDestinations.forEach(destination => {

        const data = partnerDatabase[destination];

        if (!data) return;

        data.hotels.forEach(hotel => {
            hotelContainer.appendChild(
                createPartnerCard(hotel, destination)
            );
        });

        data.agencies.forEach(agency => {
            agencyContainer.appendChild(
                createPartnerCard(agency, destination)
            );
        });

        data.rentals.forEach(rental => {
            rentalContainer.appendChild(
                createPartnerCard(rental, destination)
            );
        });

        data.guides.forEach(guide => {
            guideContainer.appendChild(
                createPartnerCard(guide, destination)
            );
        });

        data.experiences.forEach(exp => {
            experienceContainer.appendChild(
                createPartnerCard(exp, destination)
            );
        });

    });

}

// ======================================
// TOGGLE PARTNER
// ======================================

function togglePartner(id) {

    const index = selectedPartners.indexOf(id);

    if (index === -1) {

        selectedPartners.push(id);

    } else {

        selectedPartners.splice(index, 1);

    }

    localStorage.setItem(
        "selectedPartners",
        JSON.stringify(selectedPartners)
    );

    updateButtons();

    updateSummary();

}

// ======================================
// UPDATE BUTTONS
// ======================================

function updateButtons() {

    document
        .querySelectorAll(".add-plan-btn")
        .forEach(button => {

            const id =
                button.getAttribute("onclick").match(/'([^']+)'/)[1];

            if (selectedPartners.includes(id)) {

                button.classList.add("selected");
                button.innerHTML = "✔ Added";

            } else {

                button.classList.remove("selected");
                button.innerHTML = "Add To Plan";

            }

        });

}

// ======================================
// UPDATE SUMMARY
// ======================================

function updateSummary() {

    let hotels = 0;
    let agencies = 0;
    let rentals = 0;
    let guides = 0;
    let experiences = 0;

    Object.values(partnerDatabase).forEach(destination => {

        destination.hotels.forEach(item => {
            if (selectedPartners.includes(item.id)) hotels++;
        });

        destination.agencies.forEach(item => {
            if (selectedPartners.includes(item.id)) agencies++;
        });

        destination.rentals.forEach(item => {
            if (selectedPartners.includes(item.id)) rentals++;
        });

        destination.guides.forEach(item => {
            if (selectedPartners.includes(item.id)) guides++;
        });

        destination.experiences.forEach(item => {
            if (selectedPartners.includes(item.id)) experiences++;
        });

    });

    hotelCount.textContent = hotels;
    agencyCount.textContent = agencies;
    rentalCount.textContent = rentals;
    guideCount.textContent = guides;
    experienceCount.textContent = experiences;

}

// ======================================
// CONTINUE BUTTON
// ======================================

document
    .getElementById("continuePlanner")
    .addEventListener("click", () => {

        localStorage.setItem(
            "selectedPartners",
            JSON.stringify(selectedPartners)
        );

        window.location.href = "journey-planner.html";

    });

// ======================================
// INITIALIZE
// ======================================

displaySelectedDestinations();
displayPartners();
updateButtons();
updateSummary();