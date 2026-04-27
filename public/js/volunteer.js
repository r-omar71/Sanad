const form = document.getElementById("volunteerForm");
const popup = document.getElementById("successPopup");
const popupTitle = document.querySelector(".popup-content h2");
const popupMessage = document.querySelector(".popup-content p");

let isSuccess = false;

form.addEventListener("submit", function(e) {
    e.preventDefault();
    let missingFields = [];
    if (!form.firstName.value.trim()) missingFields.push("First Name is missing");
    if (!form.lastName.value.trim()) missingFields.push("Last Name is missing");
    if (!form.gender.value) missingFields.push("Gender is missing");
    if (!form.dob.value) missingFields.push("Date of Birth is missing");
    if (!form.email.value.trim()) missingFields.push("Email is missing");
    const phoneValue = form.phone.value.trim();
    if (!phoneValue) {
        missingFields.push("Phone Number is missing");
    } else {
        const phonePattern = /^05[0-9]{8}$/;
        if (!phonePattern.test(phoneValue)) {
            missingFields.push("Phone must start with 05 and be 10 digits");
        }
    }
    if (!form.skills.value.trim()) missingFields.push("Skills is missing");
    const interests = document.querySelectorAll('input[name="interest"]:checked');
    if (interests.length === 0) {
        missingFields.push("Area of Interest is missing");
    }
    const availability = document.querySelectorAll('input[name="availability"]:checked');
    if (availability.length === 0) {
        missingFields.push("Availability is missing");
    }
    const languages = document.querySelectorAll('input[name="language"]:checked');
    if (languages.length === 0) {
        missingFields.push("Languages is missing");
    }
    if (missingFields.length > 0) {
        popup.style.display = "flex";
        popupTitle.textContent = "Sorry, we found some invalid input";
        popupMessage.innerHTML = missingFields.join("<br>");
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
            popupMessage.textContent = "Your volunteer registration has been submitted successfully";
            popupMessage.style.color = "#28a745";
            form.reset();
        } else {
            isSuccess = false;
            popupTitle.textContent = "Unable to process your request";
            popupMessage.textContent = "Database connection error";
            popupMessage.style.color = "red";
        }
    })
    .catch(err => {

        popup.style.display = "flex";
        popupTitle.textContent = "Server Error";
        popupMessage.textContent = "Something went wrong.";
    });
});

function closePopup() {
    popup.style.display = "none";

    if (isSuccess) {
        window.location.href = "../index.html";
    }
}