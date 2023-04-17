const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '3TpEafSFnQPCwY3sTujznK9xeBtbG98f8IMZ7H44',
		'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
	}
};

fetch('https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch?query=pasta', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));