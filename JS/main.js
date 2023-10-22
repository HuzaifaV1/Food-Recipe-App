let submit = document.querySelector("#search-btn");
let MealDetails = document.querySelector("#MealDetails");
let categoryDropDown = document.querySelector("#Category");
let categoryDropdownValue = categoryDropDown.value;
let mealname;
let mealnumber = -1;
let eval_table;
let cloneData;
let mealRecipe;
let mealName;
let mealCategory;
let yLink;
let ingrediants;
let ingredientMeasure;
let displayIngredient;
let ingrediantName;
let categoryObject = [];
let trues = [];
let falses;
let html = '';
let meal;
let copyMealId = [];


function category() {
    fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
        .then(response => response.json())
        .then(data => {
            for (let i = 0; i <= 13; i++) {
                categoryObject.push({ id: i + 1, categoreyName: data.categories[i].strCategory });
            }
        })
}
category();

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
            displayIngredient = document.querySelector("#data-ingredient");
            instruction.innerHTML = mealRecipe; // printing recipe instruction
            mealHeading.innerHTML = mealName; // printing mealname
            Category.innerHTML = mealCategory; // printing categorey
            youtubeLink.href = yLink; // printing youtubelink
            console.log(displayIngredient.innerHTML);
            for (let i = 1; i <= 20; i++) {
                ingrediants = data.meals[0]['strIngredient' + i] // getting each ingrediant name
                ingredientMeasure = data.meals[0]['strMeasure' + i] // getting each ingrediants measurement
                if (ingrediants != "") {
                    document.querySelector("#data-ingredient").innerHTML += i + ". " + ingredientMeasure + " " + ingrediants + "<br>";
                }
            }
        })
}

submit.addEventListener("click", function () {
    ingrediantName = document.getElementById("ingredient-name").value;
    let recipe = document.getElementById("recipe");

    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingrediantName}`)
        .then(response => response.json())
        .then(data => {
            html = '';
            cloneData = Object.assign({}, data.meals); // Cloning data.meals to cloneData
            let processMeal = function (mealIndex) {
                if (mealIndex < data.meals.length) {
                    meal = data.meals[mealIndex];
                    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`)
                        .then(response => response.json())
                        .then(data => {
                            categoryDropDown = document.querySelector("#Category");
                            let mealCatStr = data.meals[0].strCategory;
                            if (mealCatStr == categoryDropDown.value) {
                                trues.push("true");
                                processQ(meal.strMeal, meal.strMealThumb);
                                copyMealId.push(meal.idMeal);
                                recipe.innerHTML = html;
                            } else {
                                recipe.innerHTML = html;
                            }
                            processMeal(mealIndex + 1); // Process the next meal
                        });

                } else {
                    // All meals processed, update the HTML
                    recipe.innerHTML = html;
                    eval_table = document.getElementsByClassName('mealname');
                    console.log(copyMealId);
                    loop(copyMealId);
                    copyMealId = [];
                }
            };

            // Start processing the first meal
            processMeal(0);
        });
});

function processQ(names, pics) {
    html += `
        <div class="meal-image">
            <img src="${pics}" alt="food" width="100px"> 
            <a class="mealname" href="#">${names}</a>
        </div>`;
    // Concatenate the HTML for each meal
    // console.log(html);
}






function loop(idemeal) {
    // Looping through <a> tags and adding a click event
    for (let i = 0; i < eval_table.length; i++) {
        eval_table[i].addEventListener('click', function () {
            // Storing Html for popup in variabel html
            MealDetails.innerHTML = `<div class="popup" id="popup-1">
                 <div class="overlay"></div>
                     <div class="content">
                         <div class="close-btn" onclick="togglePopup()">&times;</div>
                         <h1 id="data-heading"></h1>
                         <button id="data-category">hello</button>
                         <div class="ingredient-container">
                         <h3 id="data-ingredient"></h3>
                         </div>
                         <h3>Instructions:</h3>
                         <p id="data">${recipe(idemeal[i])}</p>
                         <div class="line"></div>
                         <h2><a id="data-youtube" href="">Watch Video</a></h2>                         
                     </div>            
             </div>`;
            togglePopup(); // calling function togglePopup
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