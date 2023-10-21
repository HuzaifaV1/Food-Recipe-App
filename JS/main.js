let submit = document.querySelector("#search-btn");
let MealDetails = document.querySelector("#MealDetails");
let mealname;
let mealnumber = -1;
let eval_table;
let cloneData;
let mealRecipe;
let mealName;
let mealCategory;
let yLink;

function recipe(id) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`) // using api
        .then(response => response.json()) // Response converted to JSON file
        // Getting data from api
        .then(data => {
            mealRecipe = data.meals[0].strInstructions;// Printing recipe Instruction
            mealName = data.meals[0].strMeal;// Getting meal Name
            mealCategory = data.meals[0].strCategory; // Getting category
            yLink = data.meals[0].strYoutube;// Getting youtube link
            let instruction = document.querySelector("#data");
            let mealHeading = document.querySelector("#data-heading");
            let Category = document.querySelector("#data-category");
            let youtubeLink = document.querySelector("#data-youtube");
            instruction.innerHTML = mealRecipe; // printing recipe instruction
            mealHeading.innerHTML = mealName; // printing mealname
            Category.innerHTML = mealCategory; // printing categorey
            youtubeLink.href = yLink; // printing youtubelink
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
                         <h1 id="data-heading"></h1>
                         <h3 id="data-category">hello</h3>
                         <h3>Instructions:</h3>
                         <p id="data">${recipe(cloneData[i].idMeal)}</p>
                         <h2><a id="data-youtube" href="">Watch Video</a></h2>                         
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