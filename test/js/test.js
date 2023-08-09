document.addEventListener("DOMContentLoaded", function () {
    var grid = document.querySelector(".grid");
    var isotopeOptions = {
        itemSelector: ".element-item",
        layoutMode: "fitRows",
        getSortData: {
            name: ".name",
            symbol: ".symbol",
            number: ".number parseInt",
            category: "[data-category]",
            weight: function (itemElem) {
                var weight = itemElem.querySelector(".weight").textContent;
                return parseFloat(weight.replace(/[\(\)]/g, ""));
            },
        }
    };
    var isotopeInstance = new Isotope(grid, isotopeOptions);

    var filterButtons = document.querySelectorAll("#filters button");
    filterButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            var filterValue = button.getAttribute("data-filter");
            isotopeInstance.arrange({ filter: filterValue });
        });
    });

    var sortButtons = document.querySelectorAll("#sorts button");
    sortButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            var sortByValue = button.getAttribute("data-sort-by");
            isotopeInstance.arrange({ sortBy: sortByValue });
        });
    });

    var buttonGroups = document.querySelectorAll(".button-group");
    buttonGroups.forEach(function (buttonGroup) {
        buttonGroup.addEventListener("click", function (event) {
            if (
                event.target &&
                event.target.nodeName === "BUTTON"
            ) {
                var buttons = buttonGroup.querySelectorAll("button");
                buttons.forEach(function (button) {
                    button.classList.remove("is-checked");
                });
                event.target.classList.add("is-checked");
            }
        });
    });
});
