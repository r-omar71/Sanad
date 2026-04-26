const form = document.getElementById("volunteerForm");
const popup = document.getElementById("successPopup");
const popupTitle = document.querySelector(".popup-content h2");
const popupMessage = document.querySelector(".popup-content p");

let isSuccess = false;

form.addEventListener("submit", function(e) {
    e.preventDefault();

    const formData = new FormData(form);
    const data = new URLSearchParams(formData);

    fetch("http://localhost:3000/submit-volunteer", {
        method: "POST",
        body: data
    })
    .then(res => res.text())
    .then(result => {
        console.log("Server response:", result);
        popup.style.display = "flex";

        if (result.toLowerCase() === "success") {
            isSuccess = true;
            popupTitle.textContent = "Thank You!";
            popupMessage.textContent = "Your volunteer registration has been submitted successfully.";
            form.reset();
        } else {
            isSuccess = false;
            popupTitle.textContent = "Sorry, we found validation errors";

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
            missingFields.push("Phone must start with 05 and contain only numbers");
            }
        }
            if (!form.skills.value.trim()) missingFields.push("Skills is required");

            if (missingFields.length > 0) {
                popupMessage.innerHTML = "<ul>" +
                    missingFields.map(field => `<li>${field}</li>`).join("") +
                    "</ul>";
            } else {
                popupMessage.textContent = result;
            }
        }
    })
    .catch(err => {
        console.error(err);
        isSuccess = false;
        popup.style.display = "flex";
        popupTitle.textContent = "Server Error";
        popupMessage.textContent = "Something went wrong. Please try again.";
    });
});

function closePopup() {
    popup.style.display = "none";

    if (isSuccess) {
        window.location.href = "../index.html";
    }
}