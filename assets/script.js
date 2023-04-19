
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
    // displayRecipe();
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

function searchRecipes(query) {
  console.log('Searching for recipes with "${query}"');
  localStorage.setIem("lastSearchQuery", query);

  $.ajax({
    method: "GET",
    url: "https://api.api-ninjas.com/v1/recipe?query=" + query,
    headers: { "X-Api-Key": "DFSgX/7pfugOaW/IOAGavw==KeyRO8WYPbJ5bGoZ" },
    contentType: "application/json",
    success: function (result) {
      displayRecipe(result);
      // var foodIngredients = result[1].ingredients;
      // console.log(foodIngredients);
      // console.log(result);
    },

    error: function ajaxError(jqXHR) {
      console.error("Error: ", jqXHR.responseText);
    },
  });
}



function displayRecipe() {
  var resultsDiv = $("#results");
  resultsDiv.empty();
  hideError();

  recipe.forEach(function (recipe) {
    var recipeDiv = $("<div>").addClass("box");
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
  // puts the ingredients of whatever recipe's id is passed in into local storage and then retrieves them 
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
  console.log(ingredientsList)
}


function getRecipeID(){
  // generates a random recipe
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

// Nutrition Table //
import "./styles.css";

export const renderTableRows = (rows) => {
 console.log(rows);
 return rows
   .map((row) => `<tr><td>${row[0]}</td><td>${row[1]}</td></tr>`)
   .join("");
};

const data = [
  ["Carbs", "17g"],
  ["Protein", "19g"],
  ["Fat", "5g"]
];

const html = renderTableRows(data);

const tbody = document.querySelector("#nutrition-table tbody");
tbody.insertAdjacentHTML("beforeend", html);


function nutritionInfo(recipeArray){
// makes an api call on each ingredient
// recipe array = return value of generateRecipe()
// calories, protein, carbs, fat, sugar
var lst = []
console.log(recipeArray[2])
for (var ing of recipeArray[2]){

var q = $.ajax({
    method: 'GET',
    url: 'https://api.api-ninjas.com/v1/nutrition?query=' + ing,
    headers: { 'X-Api-Key': '3TpEafSFnQPCwY3sTujznK9xeBtbG98f8IMZ7H44'},
    contentType: 'application/json',
    success: function(result) {
        // console.log(result);
        return result.responseJSON
    },
    error: function ajaxError(jqXHR) {
        console.error('Error: ', jqXHR.responseText);
    }
});
}
}

nutritionInfo(generateRecipe())