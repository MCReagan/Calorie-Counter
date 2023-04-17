// "$.ajax({" ======= JQuery preforming the http AJAX request
// method: "GET" ======= http used for the request 
// url: "https://api.api-ninjas.com/v1/recipe?query=" + query,) ======= API endpoint for the URL for users query 
// headers: { "X-Api-Key": "DFSgX/7pfugOaW/IOAGavw==KeyRO8WYPbJ5bGoZ" } =======object containing the SET OF HEADERS to send the request 
// contentType: "application/json", ======= is the data that is sent to the server
// success: function (result) ======= calling back for the successful response
// error: function ajaxError(jqXHR) ======= call back for the error response that takes the (jqXHR) object as a argument and logs errors to the console.


var query = "italian wedding soup"; 

function ingredientList(food){
    var foodIngredients = []
    // returns a list of ingredients in a recipe
$.ajax({
  method: "GET",
  url: "https://api.api-ninjas.com/v1/recipe?query=" + query,
  headers: { "X-Api-Key": "3TpEafSFnQPCwY3sTujznK9xeBtbG98f8IMZ7H44" },
  contentType: "application/json",
  success: function (result) {
    var foodIngredients = result[1].ingredients;
    console.log(foodIngredients);
  },
  error: function ajaxError(jqXHR) {
    console.error("Error: ", jqXHR.responseText);
  },
});




// function displayRecipes(recipes) ======= function to display the fetched recipes for UI with that it takes the selected array as the arguments (forEach())
// var resultsDiv = $("#results"); ======= JQuery entity for the "results div"
// resultsDiv.empty(); ======= clears the "results div"
// recipes.forEach(function (recipe) ======= instructs the recipe array for each recipe
// var recipeDiv = $("<div>").addClass(box); ======= creates the new div element for a box class
// var recipeTitle = $("<h3>").addClass("is-size-4").text(recipe.name); ======= makes the h3 element for the "is-size-4" class and make the text to the recipe name
// recipeDiv.append(recipeTitle); ======= appends the title for the recipeDiv
// resultsDiv.append(recipeDiv); ======= appends the recipeDiv  for the results div in the UI

function displayRecipes(recipes) {
  var resultsDiv = $("#results"); 
  resultsDiv.empty(); 
    recipes.forEach(function (recipe) {
        var recipeDiv = $("<div>").addClass(box);
        var recipeTitle = $("<h3>").addClass("is-size-4").text(recipe.name);
        recipeDiv.append(recipeTitle);
        resultsDiv.append(recipeDiv);
    });
}
// $("#search-btn").on("click", function () ======= the event Listener for the search button.
// var query = $("#search-input").val().trim(); ======= stores the value for the search input field
// fetchRecipes(query); ======= calls the "(fetchRecipes())" function via query as a argument

$("#search-btn").on("click", function () {
    var query = $("#search-input").val().trim();
    localStorage.setItem('recipe', query);
});


// () =======
// logs ingredients in variable foodIngredients