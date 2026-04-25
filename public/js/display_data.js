function showSection(id, element) {
    // show correct section
    document.querySelectorAll(".tab-content").forEach(el => {
        el.classList.remove("active");
    });
    document.getElementById(id).classList.add("active");

    // update active tab styling
    document.querySelectorAll(".tab-link").forEach(link => {
        link.classList.remove("active");
    });
    element.classList.add("active");

     if (id === "contact") {
        loadMessages();
    }
    if (id === "volunteer") {
        loadVolunteers();
    }
}

// default view
window.onload = function () {
    document.querySelector(".tab-link").classList.add("active");
    document.getElementById("contact").classList.add("active");

     const firstTab = document.querySelector(".tab-link");

    showSection("contact", firstTab);
};

async function loadMessages() {
    try {
        const response = await fetch('http://localhost:3000/view-messages');
        const data = await response.json();

        const container = document.getElementById("contact-container");
        container.innerHTML = "";

        data.forEach(msg => {
            const div = document.createElement("div");
            div.classList.add("message-card");

            div.innerHTML = `
            <div class="contact-container">
                <h3>${msg.first_name} ${msg.last_name}</h3>
                <p><strong class="sub">Email: </strong> ${msg.email}</p>
                <p><strong class="sub">Phone: </strong>${msg.phone}</p>
                <p><strong class="sub">Language: </strong>${msg.language}</p>
                <p><strong class="sub">Gender: </strong>${msg.gender}</p>
                <p class="message-text"><strong class="sub">Message: </strong>${msg.message}</p>
            </div>
            `;

            container.appendChild(div);
        });

    } catch (error) {
        console.error("Error loading messages:", error);
    }
}

async function loadVolunteers() {
    try {
        const container = document.getElementById("volunteer-container");

        if (!container) return;

        const response = await fetch('http://localhost:3000/view-volunteers');
        const data = await response.json();

        container.innerHTML = "";

        data.forEach(v => {
            const div = document.createElement("div");
            div.classList.add("volunteer-card");

            div.innerHTML = `
                <h3>${v.first_name} ${v.last_name}</h3>
                <p><strong class="sub">Email:</strong> ${v.email}</p>
                <p><strong class="sub">Phone:</strong> ${v.phone}</p>
                <p><strong class="sub">Gender:</strong> ${v.gender}</p>
                <p><strong class="sub">DOB:</strong> ${new Date(v.dob).toLocaleDateString()}</p>
                <p><strong class="sub">Skills:</strong> ${v.skills}</p>
                <p><strong class="sub">Interests:</strong> ${v.interests}</p>
                <p><strong class="sub">Languages:</strong> ${v.languages}</p>
                <p><strong class="sub">Availability:</strong> ${v.availability}</p>
            `;

            container.appendChild(div);
        });

    } catch (error) {
        console.error("Error loading volunteers:", error);
    }
}