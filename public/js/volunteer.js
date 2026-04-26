const form = document.getElementById("volunteerForm");
const popup = document.getElementById("successPopup");
const popupTitle = document.querySelector(".popup-content h2");
const popupMessage = document.querySelector(".popup-content p");

let isSuccess = false;

form.addEventListener("submit", function(e) {
    e.preventDefault();
    let missingFields = [];
    if (!form.firstName.value.trim()) missingFields.push("First Name is required");
    if (!form.lastName.value.trim()) missingFields.push("Last Name is required");
    if (!form.gender.value) missingFields.push("Gender is required");
    if (!form.dob.value) missingFields.push("Date of Birth is required");
    if (!form.email.value.trim()) missingFields.push("Email is required");
    const phoneValue = form.phone.value.trim();
    if (!phoneValue) {
        missingFields.push("Phone Number is required");
    } else {
        const phonePattern = /^05[0-9]{8}$/;
        if (!phonePattern.test(phoneValue)) {
            missingFields.push("Phone must start with 05 and be 10 digits");
        }
    }
    if (!form.skills.value.trim()) missingFields.push("Skills is required");
    const interests = document.querySelectorAll('input[name="interest"]:checked');
    if (interests.length === 0) {
        missingFields.push("Area of Interest is required");
    }
    const availability = document.querySelectorAll('input[name="availability"]:checked');
    if (availability.length === 0) {
        missingFields.push("Availability is required");
    }
    const languages = document.querySelectorAll('input[name="language"]:checked');
    if (languages.length === 0) {
        missingFields.push("Languages is required");
    }
    if (missingFields.length > 0) {
        popup.style.display = "flex";
        popupTitle.textContent = "Missing or Invalid Field";

        popupMessage.innerHTML = "<ul>" +
            missingFields.map(field => `<li>${field}</li>`).join("") +
            "</ul>";

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
            popupMessage.textContent = "Your volunteer registration has been submitted successfully.";
            form.reset();
        } else {
            popupTitle.textContent = "Error";
            popupMessage.textContent = result;
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