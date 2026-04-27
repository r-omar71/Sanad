const form = document.getElementById("contactForm");
const popup = document.getElementById("successPopup");
const popupTitle = document.querySelector(".popup-content h2");
const popupMessage = document.querySelector(".popup-content p");
const languageSelect = document.getElementById("language");
const star = document.querySelector(".select-star");

languageSelect.addEventListener("change", function () {
    if (this.value !== "") {
        star.style.display = "none";
    }
});

let isSuccess = false;

form.addEventListener("submit", function(e) {
    e.preventDefault();

    let errors = [];

    if (!form.firstName.value.trim()) errors.push("First Name is missing");
    if (!form.lastName.value.trim()) errors.push("Last Name is missing");
    if (!form.gender.value) errors.push("Gender is missing");
    if (!form.dob.value) errors.push("Date of Birth is missing");
    if (!form.language.value) errors.push("Language is missing");
    if (!form.email.value.trim()) errors.push("Email is missing");

    const phoneValue = form.phone.value.trim();

    if (!phoneValue) {
        errors.push("Phone Number is missing");
    } else {
        const phonePattern = /^05[0-9]{8}$/;
        if (!phonePattern.test(phoneValue)) {
            errors.push("Phone must start with 05 and be 10 digits");
        }
    }

    if (!form.message.value.trim()) errors.push("Message is missing");

    // Validation errors
    if (errors.length > 0) {
        isSuccess = false;

        popup.style.display = "flex";
        popupTitle.textContent = "Sorry, we found validation errors";
        popupMessage.innerHTML = errors.join("<br>");
        popupMessage.style.color = "red";

        return;
    }

    const formData = new FormData(form);
    const data = new URLSearchParams(formData);

    fetch("http://localhost:3000/submit-contact", {
        method: "POST",
        body: data
    })
    .then(res => res.text())
    .then(result => {
        popup.style.display = "flex";

        if (result.toLowerCase() === "success") {
            isSuccess = true;

            popupTitle.textContent = "Thank You!";
            popupTitle.style.color = "#2b2b2b";

            popupMessage.textContent = "Your message has been sent successfully";
            popupMessage.style.color = "#28a745";

            form.reset();
            star.style.display = "inline";
        } else {
            isSuccess = false;

            popupTitle.textContent = "Unable to process your request";
            popupTitle.style.color = "red";

            popupMessage.textContent = "Please try again later.";
            popupMessage.style.color = "red";
        }
    })
    .catch(err => {
        isSuccess = false;

        popup.style.display = "flex";
        popupTitle.textContent = "Unable to process your request";
        popupMessage.textContent = "Database connection error";
        popupMessage.style.color = "red";
    });
});

function closePopup() {
    popup.style.display = "none";

    if (isSuccess) {
        window.location.href = "../index.html";
    }
}