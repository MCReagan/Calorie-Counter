// In this code, we are using jQuery to handle events and interact with the DOM. 
// The code initializes by waiting for the DOM to be ready and then retrieving the last search query from the local storage. 
// If a stored query exists, it sets the search input value to the stored query.
// The code then caches various DOM elements for later use and attaches event listeners to the search button, search input, and home button. 
// When the search button is clicked, it calls the nutritionInfo function with the generated recipe. 
// When the user presses the "Enter" key in the search input, it checks whether the input is empty or not. 
// If the input is not empty, the searchRecipes function is called with the query, otherwise, an error message is displayed. 
// Lastly, when the home button is clicked, the user is redirected to the index.html page.

// ================== //
// ================== //

$(document).ready(function () {
  var storedQuery = localStorage.getItem("lastSearchQuery");
  if (storedQuery) {
    searchInput.val(storedQuery);
  }
});
var searchBtn = $("#search-btn");
var searchInput = $("#search-input");
var homeBtn = $("#home-button");
var errorMessage = $("#error-message");

$("#search-btn").on("click", function () {
  nutritionInfo(generateRecipe());
});

searchInput.on("keydown", function (event) {
  if (event.key === "Enter") {
    var query = searchInput.val().trim();
    if (query) {
      searchRecipes(query);
    } else {
      displayError("this is a error message");
    }
  }
});

homeBtn.on("click", function () {
  window.location.href = "index.html";
});

// ================== //
// ================== //

// The displayRecipe() function is responsible for displaying the recipes on the web page. 
// It first clears the content of the results div and hides any previously displayed error messages. 
// Then, it iterates through the recipe array and creates a new div for each recipe, along with an h3 element containing the recipe name. 
// These elements are then appended to the results div.
// The displayError() function is used to display an error message on the web page. 
// It takes a message parameter and sets the error message text to the provided message, then makes the error message visible.
// The hideError() function simply hides the error message from the web page. 
// This is used when we want to clear any existing error messages before displaying new content or messages.

// ================== //
// ================== //

function displayRecipe() {
  var resultsDiv = $("#results");
  resultsDiv.empty();
  hideError();

  recipe.forEach(function (recipe) {
    var recipeDiv = $("<div>").addClass(box);
    var recipeTitle = $("<h3>").addClass("is-size-4").text(recipe.name);
    recipeDiv.append(recipeTitle);
    resultsDiv.append(recipeDiv);
  });
}

function displayError(message) {
  errorMessage.text(message);
  errorMessage.show();
}

function hideError() {
  errorMessage.hide();
}

// ================== //
// ================== //

// The generateRecipe() function fetches a random recipe from the Spoonacular API and stores the ingredients, instructions, recipe name, and servings in localStorage. 
// It then retrieves this data from localStorage and processes it into arrays of ingredients and instructions. 
// Finally, the function returns an array containing the recipe name, servings, ingredients, and instructions.
// The click event handler for the home button is used to navigate back to the home page (index.html) when the button is clicked.

// ================== //
// ================== //


function generateRecipe() {
  // returns a random recipe's name, servings, ingredients and instructions
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "a0cc7ba7dcmshb8b57f3adb29db3p11639djsnd89090b0b1ea",
      "X-RapidAPI-Host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
    },
  };

  fetch(
    "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random",
    options
  )
    .then(function (response) {
      return response.json();
    })

    .then(function (data) {
      console.log(data);
      localStorage.setItem(
        "randomRecipeIngredients",
        JSON.stringify(data["recipes"][0]["extendedIngredients"])
      );
      localStorage.setItem(
        "recipeInstructions",
        JSON.stringify(data["recipes"][0]["analyzedInstructions"][0]["steps"])
      );
      localStorage.setItem(
        "randomRecipeName",
        JSON.stringify(data["recipes"][0]["title"])
      );
      localStorage.setItem(
        "randomRecipeServings",
        JSON.stringify(data["recipes"][0]["servings"])
      );
    });
  var recipeName = JSON.parse(localStorage.getItem("randomRecipeName"));
  var recipeServings = JSON.parse(localStorage.getItem("randomRecipeServings"));
  var recipeIngredientsJSON = JSON.parse(
    localStorage.getItem("randomRecipeIngredients")
  );
  var recipeInstructionsJSON = JSON.parse(
    localStorage.getItem("recipeInstructions")
  );
  var recipeInstructions = [];
  var recipeIngredients = [];
  for (var ing of recipeIngredientsJSON) {
    // todo: change amount to a fraction
    recipeIngredients.push(
      ing["amount"] + " " + ing["unit"] + " " + ing["name"]
    );
  }

    for (var ins of recipeInstructionsJSON){
      recipeInstructions.push(ins['step'])
    }
    return [recipeName, recipeServings, recipeIngredients, recipeInstructions]
}

$("#home-button").on("click", function () {
  window.location.href = "index.html";
});

// ================== //
// ================== //

//The nutritionInfo() function calculates the nutritional values (calories, protein, carbs, fat, and sugar) for a recipe by making API calls for each ingredient. 
// It then calculates the nutritional values per serving and updates the HTML elements with the recipe information and nutritional values.

// ================== //
// ================== //

async function nutritionInfo(recipeArray){
  // todo: remove empty lists in recipeArray[2] and break up entries that are separated into two lists
// makes an api call on each ingredient
// recipe array = return value of generateRecipe()
// calories, protein, carbs, fat, sugar

console.log(recipeArray[2])
// var calories = 0
// var protein = 0
// var carbs = 0
// var fat = 0
// var sugar = 0
await Promise.all(

  recipeArray[2].map(ing=>
// for (var ing of recipeArray[2]){

$.ajax({
    method: 'GET',
    url: 'https://api.api-ninjas.com/v1/nutrition?query=' + ing,
    headers: { 'X-Api-Key': '3JFEuP7s7AC2Ev4Ag585fQ==VSTrujmaKumnqJ35'},
    contentType: 'application/json',
    success: function(result) {
    },
    error: function ajaxError(jqXHR) {
        console.error('Error: ', jqXHR.responseText);
    }
})
)).then(results => {
var calories = 0
var protein = 0
var carbs = 0
var fat = 0
var sugar = 0
  for (var x of results){
    calories += x[0]['calories']
    protein += x[0]['protein_g']
    carbs += x[0]['carbohydrates_total_g']
    fat += x[0]['fat_total_g']
    sugar += x[0]['sugar_g']
  }
  // todo display functions here
  
  var a = [Math.round(calories/recipeArray[1]), Math.round(protein/recipeArray[1]), Math.round(carbs/recipeArray[1]), Math.round(fat/recipeArray[1]), Math.round(sugar/recipeArray[1])]
  var caloriesDisplay = a[0]
  if (caloriesDisplay > 5000 || caloriesDisplay == undefined){
    nutritionInfo(generateRecipe())
  }
  var proteinDisplay = a[1]
  var carbsDisplay = a[2]
  var fatDisplay = a[3]
  var sugarDisplay = a[4]
  var recipeNameDisplay = recipeArray[0]
  var recipeServingsDisplay = recipeArray[1]
  var recipeInstructionsDisplay = recipeArray[3]
  var recipeIngredientsDisplay = recipeArray[2].toString();
  document.getElementById('calories').innerHTML = caloriesDisplay;
  document.getElementById('fat').innerHTML = fatDisplay + " g";
  document.getElementById('carbs').innerHTML = carbsDisplay + " g";
  document.getElementById('sugar').innerHTML = sugarDisplay + " g";
  document.getElementById('protein').innerHTML = proteinDisplay + " g";
  document.getElementById('instructions').innerHTML = "Instructions: " + recipeInstructionsDisplay;
  document.getElementById('name').innerHTML = recipeNameDisplay;
  document.getElementById('serving').innerHTML = recipeServingsDisplay;
  document.getElementById('ingredients').innerHTML = recipeIngredientsDisplay;
})
}

$('#search-btn').on('click', function(){nutritionInfo(generateRecipe())})
