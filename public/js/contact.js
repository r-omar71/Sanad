const form = document.getElementById("contactForm");
const popup = document.getElementById("successPopup");
const popupTitle = document.querySelector(".popup-content h2");
const popupMessage = document.querySelector(".popup-content p");
const languageSelect = document.getElementById("language");
const star = document.querySelector(".select-star");

const phoneInput = document.getElementById("phone");
const emailInput = document.getElementById("email");
const phoneError = document.getElementById("phoneError");
const emailError = document.getElementById("emailError");
const messageInput = document.getElementById("message");
const messageError = document.getElementById("messageError");

messageInput.addEventListener("input", function () {
    if (messageInput.value.trim().length > 0 && messageInput.value.trim().length < 5) {
        messageError.textContent = "Message must be at least 5 characters";
    } else {
        messageError.textContent = "";
    }
});

let isSuccess = false;

phoneInput.addEventListener("blur", function () {
    const phonePattern = /^05[0-9]{8}$/;

    if (phoneInput.value.trim() !== "" && !phonePattern.test(phoneInput.value.trim())) {
        phoneError.textContent = "Phone must start with 05 and be 10 digits";
    } else {
        phoneError.textContent = "";
    }
});

emailInput.addEventListener("blur", function () {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailInput.value.trim() !== "" && !emailPattern.test(emailInput.value.trim())) {
        emailError.textContent = "Invalid email format";
    } else {
        emailError.textContent = "";
    }
});

languageSelect.addEventListener("change", function () {
    if (languageSelect.value !== "") {
        star.style.display = "none";
    }
});



form.addEventListener("submit", function(e) {
    e.preventDefault();

    let errors = [];

    if (!form.firstName.value.trim()) errors.push("First Name is missing");
    if (!form.lastName.value.trim()) errors.push("Last Name is missing");
    if (!form.gender.value) errors.push("Gender is missing");
    if (!form.dob.value) errors.push("Date of Birth is missing");
    if (!form.language.value) errors.push("Language is missing");

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

    if (!form.message.value.trim()) {
    errors.push("Message is missing");
} else if (form.message.value.trim().length < 5) {
    errors.push("Message must be at least 5 characters");
}

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
            phoneError.textContent = "";
            emailError.textContent = "";
            star.style.display = "inline";
        } else {
            isSuccess = false;

            popupTitle.textContent = "Unable to process your request";
            popupMessage.textContent = "Database connection error";
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