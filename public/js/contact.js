const form = document.getElementById("contactForm");
const popup = document.getElementById("successPopup");
const popupTitle = document.querySelector(".popup-content h2");
const popupMessage = document.querySelector(".popup-content p");

let isSuccess = false;

form.addEventListener("submit", function(e) {
    e.preventDefault();

    let errors = [];

    if (!form.firstName.value.trim()) errors.push("First Name is required");
    if (!form.lastName.value.trim()) errors.push("Last Name is required");
    if (!form.gender.value) errors.push("Gender is required");
    if (!form.dob.value) errors.push("Date of Birth is required");
    if (!form.language.value) errors.push("Language is required");
    if (!form.email.value.trim()) errors.push("Email is required");
    const phoneValue = form.phone.value.trim();

if (!phoneValue) {
    errors.push("Phone Number is required");
} else {
    const phonePattern = /^05[0-9]{8}$/;
    if (!phonePattern.test(phoneValue)) {
        errors.push("Phone must start with 05 and contain only numbers");
    }
}
    if (!form.message.value.trim()) errors.push("Message is required");

    if (errors.length > 0) {
        isSuccess = false;
        popup.style.display = "flex";
        popupTitle.textContent = "Sorry, we found validation errors";
        popupMessage.innerHTML = "<ul>" +
            errors.map(error => `<li>${error}</li>`).join("") +
            "</ul>";
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
            popupMessage.textContent = "Your message has been sent successfully.";
            form.reset();
        } else {
            isSuccess = false;
            popupTitle.textContent = "Sorry, we found validation errors";
            const errors = result.split(" | ");
            popupMessage.innerHTML = "<ul>" +
                errors.map(error => `<li>${error}</li>`).join("") +
                "</ul>";
        }
    });
});

function closePopup() {
    popup.style.display = "none";

    if (isSuccess) {
        window.location.href = "../index.html";
    }
}