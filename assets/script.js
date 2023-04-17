// ("$.ajax({") the JQuery preforming the http AJAX request
// (method: "GET") http used for the request 
// (url: "https://api.api-ninjas.com/v1/recipe?query=" + query,) API endpoint for the URL for users query 
// (headers: { "X-Api-Key": "DFSgX/7pfugOaW/IOAGavw==KeyRO8WYPbJ5bGoZ" }) object containing the SET OF HEADERS to send the request 
// (contentType: "application/json",) is the data that is sent to the server
// (success: function (result) calling back for the successful response
// (error: function ajaxError(jqXHR)) call back for the error response that takes the (jqXHR) object as a argument and logs errors to the console.
// (function displayRecipes(recipes)) function to display the fetched recipes for UI


var query = "italian wedding soup";
$.ajax({
  method: "GET",
  url: "https://api.api-ninjas.com/v1/recipe?query=" + query,
  headers: { "X-Api-Key": "DFSgX/7pfugOaW/IOAGavw==KeyRO8WYPbJ5bGoZ" },
  contentType: "application/json",
  success: function (result) {
    var foodIngredients = result[1].ingredients;
    console.log(foodIngredients);
    console.log(result);
  },
  error: function ajaxError(jqXHR) {
    console.error("Error: ", jqXHR.responseText);
  },
});

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
//  The event Listener for the search button. :)
$("#search-btn").on("click", function () {
  var query = $("#search-input").val().trim();
  fetchRecipes(query);
});

// logs ingredients in variable foodIngredients
