let submit = document.querySelector("#search-btn");
let MealDetails = document.querySelector("#MealDetails");
let mealname;
let mealnumber = -1;
let eval_table;
let cloneData;
let mealRecipe;

function recipe(id) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`) // using api
        .then(response => response.json()) // Response converted to JSON file
        // Getting data from api
        .then(data => {
            mealRecipe = data.meals[0].strInstructions;// Printing recipe Instruction
            let instruction = document.querySelector("#data");
            instruction.innerHTML = mealRecipe;
        })
}

submit.addEventListener("click", function () {
    let ingrediantName = document.getElementById("ingredient-name").value; // Ingrediant Name
    let recipe = document.getElementById("recipe"); // Display recipe
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingrediantName}`) // using api
        .then(response => response.json()) // Response converted to JSON file
        .then(data => {
            let html = ''; // Initialize an empty string to store the concatenated HTML
            cloneData = Object.assign({}, data.meals); // Cloning data.meals to cloneData
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
            eval_table = document.getElementsByClassName('mealname');

            printRecipe();
        });
});

function loop() {
    // Looping through <a> tags and adding a click event
    for (let i = 0; i < eval_table.length; i++) {
        eval_table[i].addEventListener('click', function () {
            // Storing Html for popup in variabel html
            MealDetails.innerHTML = `<div class="popup" id="popup-1">
                 <div class="overlay"></div>
                     <div class="content">
                         <div class="close-btn" onclick="togglePopup()">&times;</div>
                         <h1 id="data-heading">Recipe</h1>
                         <p id="data">${recipe(cloneData[i].idMeal)}</p>
                     </div>            
             </div>`;
            togglePopup();
        })
    }
}

function printRecipe() {
    loop(); // calling function loop
    // seeing if cloneData.meals has data or not
    if (cloneData.meals != undefined) {
        console.log(cloneData.meals);
    }
}

function togglePopup() {
    document.getElementById('popup-1').classList.toggle('active');
    console.log("Function called")
}