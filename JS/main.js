let submit = document.querySelector("#search-btn");
let MealDetails = document.querySelector("#MealDetails");
let categoryDropDown = document.querySelector("#Category");
let categoryDropdownValue = categoryDropDown.value;
let recipe = document.getElementById("recipe"); // randomButton
let randomButton = document.getElementById("randomButton");
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
let falses = [];
let html = '';
let meal;
let copyMealId = [];

randomButton.addEventListener('click', () => {
    fetch("https://www.themealdb.com/api/json/v1/1/random.php")
        .then(response => response.json())
        .then(data => {
            forRandomMeal(data.meals[0].idMeal);
        })
});

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

function recipes(id) {
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
                if (ingrediants != "" && ingrediants != null) {
                    document.querySelector("#data-ingredient").innerHTML += i + ". " + ingredientMeasure + " " + ingrediants + "<br>";

                }
            }

        });
}

submit.addEventListener("click", function () {
    // Display a loading message or spinner while data is loading
    recipe.innerHTML = `<style>
    .loader {
        border: 16px solid #f3f3f3;
        border-radius: 50%;
        border-top: 16px solid #3498db;
        width: 120px;
        height: 120px;
        -webkit-animation: spin 2s linear infinite; /* Safari */
        animation: spin 2s linear infinite;
      }@-webkit-keyframes spin {
        0% { -webkit-transform: rotate(0deg); }
        100% { -webkit-transform: rotate(360deg); }
      }
      
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    </style><h2 class="loader">Searching...</h2>`;
    ingrediantName = document.getElementById("ingredient-name").value;
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingrediantName}`)
        .then(response => response.json())
        .then(data => {
            html = '';
            cloneData = Object.assign({}, data.meals); // Cloning data.meals to cloneData

            let processMeal = function (mealIndex) {
                if (mealIndex < data.meals.length) {
                    if (categoryDropDown.value == "All") {
                        data.meals.forEach(meal => {
                            html += `<div class="meal-image">
                            <img src="${meal.strMealThumb}" alt="food" width="100px"> 
                            <a class="mealname" href="#">${meal.strMeal}</a>
                            </div>`;
                            recipe.innerHTML = html;
                            copyMealId.push(meal.idMeal);
                        });
                        eval_table = document.getElementsByClassName('mealname');
                        printRecipe(copyMealId);
                        copyMealId = [];
                    }
                    else {
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
                                } else {
                                    falses.push("false");
                                }
                                processMeal(mealIndex + 1);
                            });
                    }
                } else {
                    // All meals processed, update the HTML
                    eval_table = document.getElementsByClassName('mealname');
                    if (trues.length == 0) {
                        recipe.innerHTML = " ";
                        alert("There are no recipes based on your search");
                    }
                    recipe.innerHTML = html; // Update the HTML after processing all data
                    printRecipe(copyMealId);
                    copyMealId = [];
                }
            };

            // Start processing the first meal
            processMeal(0);
        });
});

function processQ(names, pics) {
    // Concatenate the HTML for each meal
    html += `
        <div class="meal-image">
            <img src="${pics}" alt="food" width="100px"> 
            <a class="mealname" href="#">${names}</a>
        </div>`;
}

function forRandomMeal(idMeal) {
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
            <p id="data">${recipes(idMeal)}</p>
            <div class="line"></div>
            <h2><a id="data-youtube" href="">Watch Video</a></h2>                         
        </div>            
</div>`;
    togglePopup(); // calling function togglePopup
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
                         <p id="data">${recipes(idemeal[i])}</p>
                         <div class="line"></div>
                         <h2><a id="data-youtube" href="">Watch Video</a></h2>                         
                     </div>            
             </div>`;
            togglePopup(); // calling function togglePopup
        })
    }
}

function printRecipe(idmeal) {
    loop(idmeal); // calling function loop
    // seeing if cloneData.meals has data or not
    if (cloneData.meals != undefined) {
        // console.log(cloneData.meals);
        console.log("No data")
    } else {
        console.log("data")
    }
}

function togglePopup() {
    document.getElementById('popup-1').classList.toggle('active');
}