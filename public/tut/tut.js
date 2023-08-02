// function toggleElementVisibility() {
//     const toggleElement = document.getElementById("bottom");
//     if (toggleElement.style.display === "none" || toggleElement.style.display === "") {
//         toggleElement.style.display = "block";
//     } else {
//         toggleElement.style.display = "none";
//     }
// }

// const myDiv = document.getElementById("click");
// myDiv.onclick = toggleElementVisibility;


function toggleElementVisibility() {
    const toggleElement = document.getElementById("bottom");
    toggleElement.classList.toggle("show");
}

const myDiv = document.getElementById("click");
myDiv.onclick = toggleElementVisibility;

