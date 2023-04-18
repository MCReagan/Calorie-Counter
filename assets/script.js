
function getIngredientsFromId(query){
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'a0cc7ba7dcmshb8b57f3adb29db3p11639djsnd89090b0b1ea',
      'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
    }
  };
  
  fetch('https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/' + query + '/information', options)
    .then(response => response.json())
    .then(response => console.log(response.extendedIngredients))
    .catch(err => console.error(err));
}

$("#home-button").on('click', function () {
  window.location.href = ("index.html");
});

function getRecipeID(query){
  var recipeId = ''
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'a0cc7ba7dcmshb8b57f3adb29db3p11639djsnd89090b0b1ea',
      'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
    }
  };
    
  fetch('https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search?query=' + query, options)
    .then(function(response){
      return response.json()
    })
    .then(function(data){
      console.log(data)
      console.log(data.results[Math.floor(Math.random() * 10)].id)
      getIngredientsFromId(String(data.results[Math.floor(Math.random() * 10)].id))
    })
}


getRecipeID('tiramisu')
