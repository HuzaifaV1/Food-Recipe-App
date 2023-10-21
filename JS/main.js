let submit = document.querySelector("#search-btn");

submit.addEventListener("click", function () {
    let ingrediantName = document.getElementById("Ingredient-name").value; // Ingrediant Name
    let recipe = document.getElementById("recipe"); // Display recipe
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingrediantName}`)
        .then(response => response.json()) // Response converted to JSON file
        .then(data => {
            let html = ''; // Initialize an empty string to store the concatenated HTML
            data.meals.forEach(meal => {
                // Concatenate the HTML for each meal
                html += `
                <div class="meal-img">
                    <img src="${meal.strMealThumb}" alt="food" width="100px">
                </div>
                <div class="meal-name">
                    <h3>${meal.strMeal}</h3>
                </div>`;
            });
            // Set the innerHTML of the 'div' element with the concatenated HTML
            console.log(data)
            recipe.innerHTML = html;
        });
});