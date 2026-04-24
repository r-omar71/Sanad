console.log("Sanad System: Volunteer Page Connected");

fetch('http://localhost:3000/view-volunteers')
  .then(response => response.json())
  .then(data => {
      console.log("Volunteers Data:", data);
  })
  .catch(error => {
      console.error("Error fetching volunteers:", error);
  });

  /*
const form = document.getElementById('volunteerForm');

if (form) {
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const dob = document.getElementById('dob').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const skills = document.getElementById('skills').value;

        const gender = document.querySelector('input[name="gender"]:checked') ? document.querySelector('input[name="gender"]:checked').value : "Not selected";

        const getCheckedValues = (name) => {
            const checked = document.querySelectorAll(`input[name="${name}"]:checked`);
            return Array.from(checked).map(el => el.value).join(", ");
        };

        const interests = getCheckedValues("interest");
        const availability = getCheckedValues("availability");
        const languages = getCheckedValues("language");

        console.log("--- Sanad Form Submission Data ---");
        console.log("Name: " + firstName + " " + lastName);
        console.log("Gender: " + gender);
        console.log("Date of Birth: " + dob);
        console.log("Email: " + email);
        console.log("Phone: " + phone);
        console.log("Interests: " + interests);
        console.log("Skills: " + skills);
        console.log("Availability: " + availability);
        console.log("Languages: " + languages);
        console.log("----------------------------------");
    });
}
    */