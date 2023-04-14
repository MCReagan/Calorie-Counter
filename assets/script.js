var query = 'italian wedding soup'
$.ajax({
    method: 'GET',
    url: 'https://api.api-ninjas.com/v1/recipe?query=' + query,
    headers: { 'X-Api-Key': 'DFSgX/7pfugOaW/IOAGavw==KeyRO8WYPbJ5bGoZ'},
    contentType: 'application/json',
    success: function(result) {
        var foodIngredients = result[1].ingredients
        console.log(foodIngredients);
        console.log(result)
    },
    error: function ajaxError(jqXHR) {
        console.error('Error: ', jqXHR.responseText);
    }
});

// logs ingredients in variable foodIngredients