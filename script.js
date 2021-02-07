 const searchBtn = document.getElementById("search");
const mealList = document.getElementById("meal-list");

searchBtn.addEventListener("click", getSearchedMeal);

function getSearchedMeal() {
    let searchInputTxt = document.getElementById("search-button").value;
    fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInputTxt}`
    )
      .then((res) => res.json())
      .then((data) => {
       
        let htmlOfSearchedMeal = "";
        if (data.meals) {
            document.getElementById("text").innerText = "Search Result:"
            data.meals.forEach((meal) => {
            htmlOfSearchedMeal += `
                    <div onclick="getMealIngredients(${meal.idMeal})" class = meal-area>
                      <div class = "individual-meal" data-id = "${meal.strMeal}">
                          <div>
                              <img class = "individual-meal-image" src = "${meal.strMealThumb}" alt = "food">
                          </div>
                          <div class = "meal-name">
                              <h3>${meal.strMeal}</h3>
                            
                          </div>
                      </div>
                    </div>
                  `;
          });
        } 
        else {
            htmlOfSearchedMeal = `
            <h4 style="text-align: center"> Sorry, We have no food like this name! <h4>
            `
        }
  
        mealList.innerHTML = htmlOfSearchedMeal;
      });
  }
  

const getMealIngredients = mealId =>{
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${ mealId }`)
    .then(response => response.json())
        .then(data => {
           
            document.getElementById("meal-ingredient").innerHTML = `
            <div class="ingredient-area center">
                <img class="ingredient-meal-image" src="${ data.meals[0].strMealThumb }">
                <div class="center">
                    <h1>${ data.meals[0].strMeal }</h1>
                    <h3>Ingredients:<h3>
                    <ul >
                        <li> ${ data.meals[0].strIngredient1 }</li>
                        <li> ${ data.meals[0].strIngredient2 }</li>
                        <li> ${ data.meals[0].strIngredient3 }</li>
                        <li> ${ data.meals[0].strIngredient4 }</li>
                        <li> ${ data.meals[0].strIngredient5 }</li>
                        <li> ${ data.meals[0].strIngredient6 }</li>
                    </ul>
                </div>

            </div>

            `;
           
        })
} 