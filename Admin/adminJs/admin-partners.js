// ===============================
// VISIT LANKA ADMIN - MANAGE PARTNERS
// Now connected to Spring Boot backend
// ===============================
//
// NOTE: registrationNo and the uploaded license file are not stored on the
// backend yet (no matching fields/file storage exist), so they only live
// in this form visually and are not saved. Everything else on this form
// (name, business name, category, district, email, phone, address,
// description, status) IS saved to the database.

const API_BASE = "http://localhost:8080/api";



document.addEventListener("DOMContentLoaded", () => {

    const modal = document.getElementById("partnerModal");
    const addBtn = document.getElementById("addPartner");
    const closeBtn = document.querySelector(".close");
    const form = document.getElementById("partnerForm");
    const searchInput = document.getElementById("searchPartner");
    const partnerCount = document.getElementById("partnerCount");
    const table = document.querySelector(".partner-table tbody");

    let editingId = null;

    loadPartners();

    if (addBtn) {
        addBtn.addEventListener("click", () => {
            editingId = null;
            form.reset();
            modal.style.display = "flex";
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            modal.style.display = "none";
        });
    }


    // ===============================
// QUICK ACTIONS
// ===============================

const quickAddPartner = document.getElementById("quickAddPartner");
const quickVerifyPartners = document.getElementById("quickVerifyPartners");
const quickSendEmail = document.getElementById("quickSendEmail");
const quickExportData = document.getElementById("quickExportData");

if (quickAddPartner) {
    quickAddPartner.addEventListener("click", () => {
        editingId = null;
        form.reset();
        modal.style.display = "flex";
    });
}

if (quickVerifyPartners) {
    quickVerifyPartners.addEventListener("click", () => {
        const pendingRow = document.querySelector(".partner-table .pending");
        if (pendingRow) {
            pendingRow.closest("tr").scrollIntoView({ behavior: "smooth", block: "center" });
        } else {
            alert("No pending partners right now.");
        }
    });
}

if (quickSendEmail) {
    quickSendEmail.addEventListener("click", () => {
        alert("Email notifications aren't set up yet. This is a placeholder for a future feature.");
    });
}

if (quickExportData) {
    quickExportData.addEventListener("click", exportPartnersToCSV);
}
    const exportBtn = document.getElementById("exportPartners");
    const printBtn = document.getElementById("printPartners");

    if (exportBtn) {
        exportBtn.addEventListener("click", exportPartnersToCSV);
    }

    if (printBtn) {
        printBtn.addEventListener("click", () => {
            window.print();
        });
    }

    function exportPartnersToCSV() {
        const rows = document.querySelectorAll(".partner-table tbody tr");

        if (rows.length === 0) {
            alert("No partners to export.");
            return;
        }

        const header = ["Partner", "Business", "Category", "District", "Contact", "Status"];
        const csvRows = [header.join(",")];

        rows.forEach(row => {
            const cells = row.querySelectorAll("td");
            const partner = cells[0] ? cells[0].innerText : "";
            const business = cells[1] ? cells[1].innerText : "";
            const category = cells[2] ? cells[2].innerText : "";
            const district = cells[3] ? cells[3].innerText : "";
            const contact = cells[4] ? cells[4].innerText : "";
            const status = cells[5] ? cells[5].innerText.trim() : "";

            const escape = (val) => `"${String(val).replace(/"/g, '""')}"`;

            csvRows.push([partner, business, category, district, contact, status].map(escape).join(","));
        });

        const csvContent = csvRows.join("\n");
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `visit-lanka-partners-${new Date().toISOString().slice(0, 10)}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    window.addEventListener("click", (e) => {
        if (e.target === modal) modal.style.display = "none";
    });


    async function loadPartners() {

        table.innerHTML = "<tr><td colspan='7'>Loading partners...</td></tr>";

        try {

            const response = await fetch(`${API_BASE}/partners`);
            if (!response.ok) throw new Error("Server responded with " + response.status);

            const partners = await response.json();
            renderTable(partners);

        } catch (err) {

            console.error("Failed to load partners:", err);
            table.innerHTML =
                "<tr><td colspan='7'>Could not load partners. " +
                "Make sure the backend server is running on localhost:8080.</td></tr>";

        }

    }


    function renderTable(partners) {

        table.innerHTML = "";

        partners.forEach(partner => {

            const row = document.createElement("tr");
            row.dataset.id = partner.id;

            row.innerHTML = `
    <td>${partner.name || "—"}</td>
    <td>${partner.businessName || ""}</td>
    <td>${partner.category || "—"}</td>
    <td>${partner.price ? partner.price + " / " + (partner.unit || "").replace("per_", "") : "—"}</td>
    <td>${partner.district || "—"}</td>
    <td>${partner.phone || partner.email || "—"}</td>
    <td>
        <span class="${partner.verified ? "verified" : "pending"}">
            ${partner.verified ? "Verified" : "Pending"}
        </span>
    </td>
    <td>
        <button class="verify"><i class="fa-solid fa-check"></i></button>
        <button class="edit"><i class="fa-solid fa-pen"></i></button>
        <button class="delete"><i class="fa-solid fa-trash"></i></button>
    </td>
`;

            table.appendChild(row);

        });

        updateCount();
        attachRowEvents();

    }


    if (form) {

        form.addEventListener("submit", async (e) => {

            e.preventDefault();
const districtValue = document.getElementById("district").value;
const priceValue = document.getElementById("price").value;

const payload = {
    name: document.getElementById("partnerName").value,
    businessName: document.getElementById("businessName").value,
    category: document.getElementById("partnerCategory").value,
    district: districtValue,
    price: priceValue,                         // model expects String
    lkrPrice: parseFloat(priceValue) || 0,      // this is what travel-partners.js actually displays
    unit: document.getElementById("priceUnit").value,   // was "priceUnit" — backend field is "unit"
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    address: document.getElementById("address").value,
    description: document.getElementById("description").value,
    verified: document.getElementById("status").value === "Verified", // was comparing to "active"
    coveredDestinations: districtValue ? [districtValue] : [],        // was always []
    features: []
};

            try {

                let response;

                if (editingId) {
                    response = await fetch(`${API_BASE}/partners/${editingId}`, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(payload)
                    });
                } else {
                    response = await fetch(`${API_BASE}/partners`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(payload)
                    });
                }

                if (!response.ok) throw new Error("Server responded with " + response.status);

                alert(editingId
                    ? "Partner updated successfully."
                    : "Partner added successfully.");

                form.reset();
                modal.style.display = "none";
                editingId = null;

                loadPartners();

            } catch (err) {
                console.error("Failed to save partner:", err);
                alert("Could not save partner. Is the backend running?");
            }

        });

    }


    function attachRowEvents() {

        document.querySelectorAll(".partner-table .verify").forEach(button => {

            button.onclick = async function () {

                const row = this.closest("tr");
                const id = row.dataset.id;

                try {

                    const getResp = await fetch(`${API_BASE}/partners/${id}`);
                    const partner = await getResp.json();
                    partner.verified = true;

                    const response = await fetch(`${API_BASE}/partners/${id}`, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(partner)
                    });

                    if (!response.ok) throw new Error("Server responded with " + response.status);

                    loadPartners();

                } catch (err) {
                    alert("Could not verify partner.");
                }

            };

        });

        document.querySelectorAll(".partner-table .edit").forEach(button => {

            button.onclick = async function () {

                const row = this.closest("tr");
                const id = row.dataset.id;

                try {

                    const response = await fetch(`${API_BASE}/partners/${id}`);
                    if (!response.ok) throw new Error("Not found");

                    const partner = await response.json();

                    editingId = partner.id;
                    document.getElementById("partnerName").value = partner.name || "";
                    document.getElementById("businessName").value = partner.businessName || "";
                    document.getElementById("partnerCategory").value = partner.category || "";
                    document.getElementById("district").value = partner.district || "";
                    document.getElementById("email").value = partner.email || "";
                    document.getElementById("phone").value = partner.phone || "";
                    document.getElementById("address").value = partner.address || "";
                    document.getElementById("description").value = partner.description || "";
                  document.getElementById("status").value = partner.verified ? "Verified" : "Pending"
document.getElementById("price").value = partner.price || "";
document.getElementById("priceUnit").value = partner.unit || "per_day";

                    modal.style.display = "flex";

                } catch (err) {
                    alert("Could not load partner details for editing.");
                }

            };

        });

        document.querySelectorAll(".partner-table .delete").forEach(button => {

            button.onclick = async function () {

                const row = this.closest("tr");
                const id = row.dataset.id;
                const name = row.cells[0].innerText;

                if (!confirm("Delete " + name + " ?")) return;

                try {

                    const response = await fetch(`${API_BASE}/partners/${id}`, {
                        method: "DELETE"
                    });

                    if (!response.ok) throw new Error("Server responded with " + response.status);

                    row.remove();
                    updateCount();

                } catch (err) {
                    alert("Could not delete partner. Is the backend running?");
                }

            };

        });

    }


    if (searchInput) {

        searchInput.addEventListener("keyup", () => {

            const value = searchInput.value.toLowerCase();
            const rows = document.querySelectorAll(".partner-table tbody tr");

            rows.forEach(row => {
                row.style.display =
                    row.innerText.toLowerCase().includes(value) ? "" : "none";
            });

        });

    }


    function updateCount() {
        const total = document.querySelectorAll(".partner-table tbody tr").length;
        if (partnerCount) partnerCount.innerText = total;
    }

    console.log("VISIT LANKA Admin Partner Management Loaded");

});
