console.log("Sanad System: Contact Page Connected");

fetch('http://localhost:3000/view-messages')
  .then(response => response.json())
  .then(data => {
      console.log("Volunteers Data:", data);
  })
  .catch(error => {
      console.error("Error fetching volunteers:", error);
  });
