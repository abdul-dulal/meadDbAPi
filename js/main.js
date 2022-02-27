const searchFood = () => {
  const searchField = document.getElementById("input-field");
  const searchText = searchField.value;
  searchField.value = "";
  if (searchText == "") {
    console.log("hello");
  } else {
    document.getElementById("spiner").style.display = "block";
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.meals == null) {
          console.log("hello");
          document.getElementById("spiner").style.display = "none";
        } else {
          displayesarchResult(data.meals);
        }
      });
  }
};
const displayesarchResult = (meals) => {
  // console.log(meals);
  const searchResult = document.getElementById("searchResult");

  searchResult.innerHTML = "";
  meals.forEach((meal) => {
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
    <div onclick="(loadMealDeatils(${meal.idMeal}) )" class="card">
    <img src="${meal.strMealThumb}" class="card-img-top" alt="..." />
    <div class="card-body">
      <h5 class="card-title">${meal.strMeal}</h5>
      <p class="card-text">
        ${meal.strInstructions.slice(0, 250)}
      </p>
    </div>
  </div>

    `;
    searchResult.appendChild(div);
  });
  document.getElementById("spiner").style.display = "none";
};

const loadMealDeatils = (mealId) => {
  console.log(mealId);
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayMealDeatils(data.meals[0]));
};

const displayMealDeatils = (meal) => {
  console.log(meal);
  const meadDeatils = document.getElementById("meal-deatils");
  meadDeatils.textContent = "";
  const div = document.createElement("div");
  div.classList.add("card");
  div.innerHTML = `
  <img src="${
    meal.strMealThumb
  }" width:'200px', height:'200px' class="card-img-top" alt="..." />
  <div class="card-body">
    <h5 class="card-title">${meal.strMeal}</h5>
    <p class="card-text">
    ${meal.strInstructions.slice(0, 250)}
    </p>
    <a href="${meal.strYoutube}" class="btn btn-primary">Go somewhere</a>
  </div>
  `;
  meadDeatils.appendChild(div);
};
