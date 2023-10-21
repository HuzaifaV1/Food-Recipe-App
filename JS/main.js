let submit = document.querySelector("#search-btn");
let mealname;
let mealnumber = -1;
let eval_table;
let arrayOfMeals;
let permaData;


function recipe(id) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`) // using api
        .then(response => response.json()) // Response converted to JSON file
        // Getting data from api
        .then(data => {
            console.log(data.meals[0].strInstructions);// Printing recipe Instruction
        })
}


submit.addEventListener("click", function () {
    let ingrediantName = document.getElementById("Ingredient-name").value; // Ingrediant Name
    let recipe = document.getElementById("recipe"); // Display recipe
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingrediantName}`) // using api
        .then(response => response.json()) // Response converted to JSON file
        .then(data => {
            let html = ''; // Initialize an empty string to store the concatenated HTML
            data.meals.forEach(meal => {
                mealnumber++;
                // Concatenate the HTML for each meal
                html += `
                <div class="meal-image">
                    <img src="${meal.strMealThumb}" alt="food" width="100px">
                    <a class="mealname" id="${mealnumber}" href="#">${meal.strMeal}</a>
                    </div>`;
                mealname = document.getElementsByClassName("mealname");
            });
            // Set the innerHTML of the 'div' element with the concatenated HTML
            recipe.innerHTML = html;
            e();

            arrayOfMeals = Array.prototype.slice.call(eval_table); // turning mealname into array
            dataArray(data.meals); // turning data.meals to an array
            printRecipe(); // Printing instructions
        });
});

function loop() {
    for (let i = 0; i < arrayOfMeals.length; i++) {
        // seeing if any button is clicked
        arrayOfMeals[i].addEventListener('click', function () {
            recipe(permaData[i].idMeal); // 
        })
    }
}

// turning mealname into an array
function e() {
    eval_table = document.getElementsByClassName('mealname');
    console.log(eval_table, eval_table.length);
};


function dataArray(data) {
    permaData = Array.prototype.slice.call(data); // turning data into array and into Perma data
}

function printRecipe() {
    console.log(loop()); // calling function loop
}