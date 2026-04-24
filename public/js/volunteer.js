console.log("Sanad System: Volunteer Page Connected");

fetch('http://localhost:3000/view-volunteers')
  .then(response => response.json())
  .then(data => {
      console.log("Volunteers Data:", data);
  })
  .catch(error => {
      console.error("Error fetching volunteers:", error);
  });
