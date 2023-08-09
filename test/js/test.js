document.addEventListener("DOMContentLoaded", function () {
    const grid = document.querySelector(".grid");
    const isotopeOptions = {
        itemSelector: ".element-item",
        layoutMode: "fitRows",
        getSortData: {
            name: ".name",
            symbol: ".symbol",
            number: ".number parseInt",
            category: "[data-category]",
            weight: function (itemElem) {
                const weight = itemElem.querySelector(".weight").textContent;
                return parseFloat(weight.replace(/[\(\)]/g, ""));
            },
        }
    };
    const isotopeInstance = new Isotope(grid, isotopeOptions);

    const filterButtons = document.querySelectorAll("#filters button");
    filterButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const filterValue = button.getAttribute("data-filter");
            isotopeInstance.arrange({ filter: filterValue });
        });
    });

    const buttonGroups = document.querySelectorAll(".button-group");
    buttonGroups.forEach(function (buttonGroup) {
        buttonGroup.addEventListener("click", function (event) {
            if (
                event.target &&
                event.target.nodeName === "BUTTON"
            ) {
                const buttons = buttonGroup.querySelectorAll("button");
                buttons.forEach(function (button) {
                    button.classList.remove("is-checked");
                });
                event.target.classList.add("is-checked");
            }
        });
    });
});
