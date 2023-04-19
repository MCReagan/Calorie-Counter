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
  var query = $("#search-input").val().trim();

  if (query) {
    searchRecipes(query);
    // localStorage.setItem('recipe', query);
    // recipes.push(query);
    // // displayRecipe();
    // window.location.href = ("results.html");
  } else {
    displayError("this is a error message");
  }
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


function getIngredientsFromId(query){
  // returns the ingredients of whatever recipe's ID is passed in
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "a0cc7ba7dcmshb8b57f3adb29db3p11639djsnd89090b0b1ea",
      "X-RapidAPI-Host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
    },
  };

  fetch(
    "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/" +
      query +
      "/information",
    options
  )
    .then((response) => response.json())
    .then((response) =>
      localStorage.setItem(
        "ingredientsForCalorieApp",
        JSON.stringify(response.extendedIngredients)
      )
    )
    .catch((err) => console.error(err));

    var ingredientsList = []
    var retrievedIngedients = JSON.parse(localStorage.getItem('ingredientsForCalorieApp'))

  for (ing of retrievedIngedients){
    ingredientsList.push(ing['name'])
    
  }
  return ingredientsList
}


function getRecipeID(){
  // returns a random recipe's ID
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
      console.log(data['recipes'][0]['title'])
      localStorage.setItem('randomRecipeID', JSON.stringify(data['recipes'][0]['id']))
      console.log(data['recipes'][0]['id'])
    })
    return JSON.parse(localStorage.getItem('randomRecipeID'))

}

function ingredientsFromRandomRecipe(){
  var ingredients = getIngredientsFromId(getRecipeID())
  console.log(ingredients)
}
ingredientsFromRandomRecipe()

$("#home-button").on("click", function () {
  window.location.href = "index.html";
});

