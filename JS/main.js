let submit = document.querySelector("#search-btn");

function recipe(id) {
    fetch(`www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`) // using api
        .then(response => response.json()) // Response converted to JSON file
        .then(data => {
            console.log(data.strInstructions);
        })
}


submit.addEventListener("click", function () {
    console.log("Before")
    let ingrediantName = document.getElementById("Ingredient-name").value; // Ingrediant Name
    let mealname = document.getElementById("recipe"); // Display recipe
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingrediantName}`) // using api
        .then(response => response.json()) // Response converted to JSON file
        .then(data => {
            let html = ''; // Initialize an empty string to store the concatenated HTML
            data.meals.forEach(meal => {
                // Concatenate the HTML for each meal
                html += `
                    <img src="${meal.strMealThumb}" alt="food" width="100px">
                    <h3>${meal.strMeal}</h3>`;
            });
            recipe(52772);
            // Set the innerHTML of the 'div' element with the concatenated HTML
            console.log(data)
            mealname.innerHTML = html;
        });
});