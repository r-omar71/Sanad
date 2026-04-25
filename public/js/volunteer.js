const form = document.getElementById("volunteerForm");
const popup = document.getElementById("successPopup");

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

    if (result.includes("success")) {
        popup.style.display = "flex";
        form.reset();
    } else {
        popup.style.display = "flex";
        form.reset();
    }
})
    .catch(err => {
        console.error(err);
        alert("Server error.");
    });
});

function closePopup() {
    popup.style.display = "none";
    window.location.href = "../index.html";
}