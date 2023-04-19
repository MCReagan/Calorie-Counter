
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
    localStorage.setItem("recipe", query);
    recipes.push(query);
    // displayRecipe();
    window.location.href = "results.html";
  } else {
    alert("Please enter a recipe");
  }
});

searchInput.on("keydown", function (event) {
  if (event - key === "Enter") {
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

$("#home-button").on("click", function () {
  window.location.href = "index.html";
});

function getIngredientsFromId(query) {
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

  var ingredientsList = [];
  var retrievedIngedients = JSON.parse(
    localStorage.getItem("ingredientsForCalorieApp")
  );

  for (ing of retrievedIngedients) {
    ingredientsList.push(ing["name"]);
  }

  console.log(ingredientsList);
}

// function getRecipeID(query){
//   var recipeId = ''
//   const options = {
//     method: 'GET',
//     headers: {
//       'X-RapidAPI-Key': 'a0cc7ba7dcmshb8b57f3adb29db3p11639djsnd89090b0b1ea',
//       'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
//     }
//   };

//   fetch('https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search?query=' + query, options)
//     .then(function(response){
//       return response.json()
//     })
//     .then(function(data){
//       console.log(data)
//       console.log(data.results[Math.floor(Math.random() * 10)].id)
//       getIngredientsFromId(String(data.results[Math.floor(Math.random() * 10)].id))
//     })
// }

function getRecipeID() {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "a0cc7ba7dcmshb8b57f3adb29db3p11639djsnd89090b0b1ea",
      "X-RapidAPI-Host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
    },
  };

  fetch(
    "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random?tags=vegetarian%2Cdessert&number=1",
    options
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      console.log(data["recipes"][0]["id"]);
      getIngredientsFromId(data["recipes"][0]["id"]);
    });
}

getRecipeID();

$("#home-button").on("click", function () {
  window.location.href = "index.html";
});
