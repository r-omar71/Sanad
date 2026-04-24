function showSection(id, element) {
    // show correct section
    document.querySelectorAll(".tab-content").forEach(el => {
        el.classList.remove("active");
    });
    document.getElementById(id).classList.add("active");

    // update active tab styling
    document.querySelectorAll(".tab-link").forEach(link => {
        link.classList.remove("active");
    });
    element.classList.add("active");
}

// default view
window.onload = function () {
    document.querySelector(".tab-link").classList.add("active");
    document.getElementById("contact").classList.add("active");
};