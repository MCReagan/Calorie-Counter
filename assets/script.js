
function ingredientList(food){
    var foodIngredients = []
    // returns a list of ingredients in a recipe
$.ajax({
    method: 'GET',
    url: 'https://api.api-ninjas.com/v1/recipe?query=' + food,
    headers: { 'X-Api-Key': '3TpEafSFnQPCwY3sTujznK9xeBtbG98f8IMZ7H44'},
    contentType: 'application/json',
    success: function(result) {
        for (var food of result[1].ingredients.split('|')){
            foodIngredients.push(food)
        }
    },
    error: function ajaxError(jqXHR) {
        console.error('Error: ', jqXHR.responseText);
    }
    
});
return foodIngredients
}

console.log(ingredientList('italian wedding soup'))


