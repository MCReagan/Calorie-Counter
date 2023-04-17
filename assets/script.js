const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '3TpEafSFnQPCwY3sTujznK9xeBtbG98f8IMZ7H44',
		'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
	}
};

$("#search-btn").on("click", function () {
    var query = $("#search-input").val().trim();
    localStorage.setItem('recipe', query);
});


// () =======
// logs ingredients in variable foodIngredients
