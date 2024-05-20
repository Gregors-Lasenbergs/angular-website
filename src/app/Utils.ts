import axios from "axios";

export type Meal = {
  id: number
  idMeal: number
  strMeal: string
  strInstructions: string
  strMealThumb: string
}

async function getMeals(mealName?: String): Promise<Meal[]> {
  let mealUrl: string;
  if (typeof mealName === 'undefined') {
    mealUrl = `http://localhost:3004/your`
    console.log('mealName is undefined');
  }
  else{
    mealUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`
  }
  const meals: Meal[] = [];

try {
  console.log('mealUrl', mealUrl);
    const response = await axios.get(mealUrl);
    if (typeof mealName === 'undefined') {
      response.data.forEach((element: Meal) => {
        const newMeal: Meal = {
          id: element.id,
          idMeal: element.idMeal,
          strMeal: element.strMeal,
          strInstructions: element.strInstructions,
          strMealThumb: element.strMealThumb
        };
        console.log('newMealUndefined', newMeal);
        meals.push(newMeal);
      });
    }
    else {
      response.data.meals.forEach((element: Meal) => {
        const newMeal: Meal = {
          id: element.idMeal,
          idMeal: element.idMeal,
          strMeal: element.strMeal,
          strInstructions: element.strInstructions,
          strMealThumb: element.strMealThumb
        };
        console.log('newMealmeals', newMeal);
        meals.push(newMeal);
      });
    }
    console.log('Meals received successfully', response.data);
    return meals;
  } catch (error) {
    console.error('Failed to get meals1', error);
    return [];
  }
}

async function getMealById(mealId: number): Promise<Meal> {
  const mealUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
  const response = await axios.get(mealUrl);
  return response.data.meals[0];
}

async function getSavedMealId() {
  const savedMealUrl = `http://localhost:3004/saved`
  const savedMeals: number[] = [];
  try {
    const response = await axios.get(savedMealUrl);
    response.data.forEach((element: Meal) => {
      if (element.idMeal != null) {
        savedMeals.push(element.idMeal);
      }
    });
    return savedMeals;
  } catch (error) {
    console.error('Failed to get saved meals', error);
    return [];
  }
}

const editSavedMeal = (meal: Meal): any => {
  const savedMealUrl = `http://localhost:3004/saved`;
  axios.put(savedMealUrl + `/${meal.idMeal}`, meal)
    .then((response) => {
      console.log('Meal edited successfully', response.data);
    })
    .catch((error) => {
      console.error('Failed to edit meal', error);
    });
}

const addMealToSaved = (mealId: number):any => {
  const savedMealUrl = `http://localhost:3004/saved`;

  getSavedMealId().then((savedMealId) => {
    if (savedMealId.includes(mealId)) {
      window.alert('Meal already saved!');
      console.error('Meal already saved: ', mealId);
      return;
    }
    let newMeal: Meal = {
      id: mealId,
      idMeal: mealId,
      strMeal: "",
      strInstructions: "",
      strMealThumb: ""
    };
    axios.post(savedMealUrl, newMeal)
      .then((response) => {
        console.log('Meal saved successfully', response.data);
      })
      .catch((error) => {
        console.error('Failed to save meal', error);
      });
  });
}

const removeMealFromDb = (id: number, saved: boolean): any => {
  let savedMealUrl;
  if (saved) {
    savedMealUrl = 'http://localhost:3004/saved';
  }
  else {
    savedMealUrl = 'http://localhost:3004/your';
  }
  console.log(saved);
  console.log(id);
  axios.delete(savedMealUrl + `/${id}`)
    .then((response) => {
      console.log('Meal deleted successfully', response.data);
    })
    .catch((error) => {
      console.error('Failed to delete meal', error);
    });

}

async function getSavedMeals() {
  const savedMealId: number[] = await getSavedMealId();
  let meals: Meal[] = [];
  for (let i = 0; i < savedMealId.length; i++) {
    const meal = await getMealById(savedMealId[i]);
    const newMeal: Meal = {
      id: meal.idMeal,
      idMeal: meal.idMeal,
      strMeal: meal.strMeal,
      strInstructions: meal.strInstructions,
      strMealThumb: meal.strMealThumb
    };
    meals.push(newMeal);
  }
  console.log('Saved meals', meals);
  return meals;
}

function addYourMealToDb(meal: Meal):any {
  const savedMealUrl = `http://localhost:3004/your`;
  axios.post(savedMealUrl, {
    id: meal.idMeal,
    strMeal: meal.strMeal,
    strInstructions: meal.strInstructions,
    strMealThumb: meal.strMealThumb,
    idMeal: meal.idMeal
  })
    .then((response) => {
      console.log('Meal saved successfully', response.data);
    })
    .catch((error) => {
      console.error('Failed to save meal', error);
    });
}

export {getMeals, getMealById, getSavedMeals, addMealToSaved, addYourMealToDb, removeMealFromDb, editSavedMeal}
