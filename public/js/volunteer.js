const form = document.getElementById("volunteerForm");
const popup = document.getElementById("successPopup");
const popupTitle = document.querySelector(".popup-content h2");
const popupMessage = document.querySelector(".popup-content p");

const phoneInput = document.getElementById("phone");
const emailInput = document.getElementById("email");

const phoneError = document.getElementById("phoneError");
const emailError = document.getElementById("emailError");

let isSuccess = false;

emailInput.addEventListener("blur", function () {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailInput.value.trim() !== "" && !pattern.test(emailInput.value.trim())) {
        emailError.textContent = "Invalid email format";
    } else {
        emailError.textContent = "";
    }
});

phoneInput.addEventListener("blur", function () {
    const pattern = /^05[0-9]{8}$/;

    if (phoneInput.value.trim() !== "" && !pattern.test(phoneInput.value.trim())) {
        phoneError.textContent = "Phone must start with 05 and be 10 digits";
    } else {
        phoneError.textContent = "";
    }
});

form.addEventListener("submit", function(e) {
    e.preventDefault();

    let errors = [];

    if (!form.firstName.value.trim()) errors.push("First Name is missing");
    if (!form.lastName.value.trim()) errors.push("Last Name is missing");
    if (!form.gender.value) errors.push("Gender is missing");
    if (!form.dob.value) errors.push("Date of Birth is missing");

    const emailValue = emailInput.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailValue) {
        errors.push("Email is missing");
    } else if (!emailPattern.test(emailValue)) {
        errors.push("Invalid email format");
        emailError.textContent = "Invalid email format";
    }

    const phoneValue = phoneInput.value.trim();
    const phonePattern = /^05[0-9]{8}$/;

    if (!phoneValue) {
        errors.push("Phone Number is missing");
    } else if (!phonePattern.test(phoneValue)) {
        errors.push("Invalid phone number format");
        phoneError.textContent = "Phone must start with 05 and be 10 digits";
    }

    if (!form.skills.value.trim()) errors.push("Skills is missing");

    const interests = document.querySelectorAll('input[name="interest"]:checked');
    if (interests.length === 0) errors.push("Area of Interest is missing");

    const availability = document.querySelectorAll('input[name="availability"]:checked');
    if (availability.length === 0) errors.push("Availability is missing");

    const languages = document.querySelectorAll('input[name="language"]:checked');
    if (languages.length === 0) errors.push("Languages is missing");

    if (errors.length > 0) {
        isSuccess = false;

        popup.style.display = "flex";
        popupTitle.textContent = "Sorry, we found some invalid input";
        popupMessage.innerHTML = errors.join("<br>");
        popupMessage.style.color = "red";

        return;
    }

    const formData = new FormData(form);
    const data = new URLSearchParams(formData);

    fetch("http://localhost:3000/submit-volunteer", {
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

            popupMessage.textContent = "Your volunteer registration has been submitted successfully";
            popupMessage.style.color = "#28a745";

            form.reset();
            phoneError.textContent = "";
            emailError.textContent = "";
        } else {
            isSuccess = false;

            popupTitle.textContent = "Unable to process your request";
            popupMessage.textContent = "Database connection error";
            popupMessage.style.color = "red";
        }
    })
    .catch(() => {
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