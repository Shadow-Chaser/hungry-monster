 
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
                    <div onclick="getMealDetails()" class = meal-area>
                      <div class = "individual-meal" data-id = "${meal.strMeal}">
                          <div>
                              <img class = "individual-meal-image" src = "${meal.strMealThumb}" alt = "food">
                          </div>
                          <div class = "meal-name">
                              <h3>${meal.strMeal}</h3>
                              <button onclick="getMealDetails(${meal.idMeal})" class = "btn btn-success">Get Recipe</button>
                          </div>
                      </div>
                    </div>
                  `;
          });
        //   mealList.classList.remove("notFound");
        } else {
            htmlOfSearchedMeal = "Sorry, we have no food like this";
        //   mealList.classList.add("notFound");
        }
  
        mealList.innerHTML = htmlOfSearchedMeal;
      });
  }
  
//   function getMealDetails(){
//     let searchInputTxt = document.getElementById("search-button").value;
//     fetch(
//       `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInputTxt}`
//     )
//     .then(response => response.json())
//     .then(data => 
       
//         console.log(data.meals[0].strIngredient1));
//     // console.log(data);

//   }


const getMealDetails = mealId =>{
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${ mealId }`)
    .then(response => response.json())
        .then(data => {
           
            document.getElementById("meal-ingredient").innerHTML = `
            <img class="individual-meal-image" src="${ data.meals[0].strMealThumb }">
            <h1>${ data.meals[0].strMeal }</h1>
            <h3>Ingredients<h3>
            
            <h3> ${ data.meals[0].strIngredient1 }</h3>
            <h3> ${ data.meals[0].strIngredient2 }</h3>
            <h3> ${ data.meals[0].strIngredient3 }</h3>
            <h3> ${ data.meals[0].strIngredient4 }</h3>
            <h3> ${ data.meals[0].strIngredient5 }</h3>
            <h3> ${ data.meals[0].strIngredient6 }</h3>
            `;
           
        })
} 