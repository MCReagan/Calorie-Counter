// "$.ajax({" ======= JQuery preforming the http AJAX request
// method: "GET" ======= http used for the request
// url: "https://api.api-ninjas.com/v1/recipe?query=" + query,) ======= API endpoint for the URL for users query
// headers: { "X-Api-Key": "DFSgX/7pfugOaW/IOAGavw==KeyRO8WYPbJ5bGoZ" } =======object containing the SET OF HEADERS to send the request
// contentType: "application/json", ======= is the data that is sent to the server
// success: function (result) ======= calling back for the successful response
// error: function ajaxError(jqXHR) ======= call back for the error response that takes the (jqXHR) object as a argument and logs errors to the console.
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

// $("#home-button").on("click", function () {
//   window.location.href = "index.html";
// };)
// var recipes = [];
// var query = "italian wedding soup";


// function displayRecipes(recipes) ======= function to display the fetched recipes for UI with that it takes the selected array as the arguments (forEach())
// vara resultsDiv = $("#results"); ======= JQuery entity for the "results div"
// resultsDiv.empty(); ======= clears the "results div"
// recipes.forEach(function (recipe) ======= instructs the recipe array for each recipe
// var recipeDiv = $("<div>").addClass(box); ======= creates the new div element for a box class
// var recipeTitle = $("<h3>").addClass("is-size-4").text(recipe.name); ======= makes the h3 element for the "is-size-4" class and make the text to the recipe name
// recipeDiv.append(recipeTitle); ======= appends the title for the recipeDiv
// resultsDiv.append(recipeDiv); ======= appends the recipeDiv  for the results div in the UI

function displayRecipe() {
  // var recipe = localStorage.getItem("recipe");
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

// $("#search-btn").on("click", function () ======= the event Listener for the search button.
// var query = $("#search-input").val().trim(); ======= stores the value for the search input field
// fetchRecipes(query); ======= calls the "(fetchRecipes())" function via query as a argument


function generateRecipe(){
  // returns a random recipe's name, servings, ingredients and instructions
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "a0cc7ba7dcmshb8b57f3adb29db3p11639djsnd89090b0b1ea",
      "X-RapidAPI-Host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
    },
  };
    
  fetch('https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random', options)
    .then(function(response){
      return response.json()
    })

    .then(function(data){
      console.log(data)
      localStorage.setItem('randomRecipeIngredients', JSON.stringify(data['recipes'][0]['extendedIngredients']))
      localStorage.setItem('recipeInstructions', JSON.stringify(data['recipes'][0]['analyzedInstructions'][0]['steps']))
      localStorage.setItem('randomRecipeName', JSON.stringify(data['recipes'][0]['title']))
      localStorage.setItem('randomRecipeServings', JSON.stringify(data['recipes'][0]['servings']))
    })
    var recipeName = JSON.parse(localStorage.getItem('randomRecipeName'))
    var recipeServings = JSON.parse(localStorage.getItem('randomRecipeServings'))
    var recipeIngredientsJSON = JSON.parse(localStorage.getItem('randomRecipeIngredients'))
    var recipeInstructionsJSON = JSON.parse(localStorage.getItem('recipeInstructions'))
    var recipeInstructions = []
    var recipeIngredients = []
    for(var ing of recipeIngredientsJSON){
      // todo: change amount to a fraction
      recipeIngredients.push((ing['amount'] + ' ' + ing['unit'] + ' ' + ing['name']))
    }

    for (var ins of recipeInstructionsJSON){
      recipeInstructions.push(ins['step'])
    }
    return [recipeName, recipeServings, recipeIngredients, recipeInstructions]
}


$("#home-button").on("click", function () {
  window.location.href = "index.html";
});



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
