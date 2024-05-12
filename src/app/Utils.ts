import axios from "axios";

export type Meal = {
  idMeal: number
  strMeal: string
  strInstructions: string
  strMealThumb: string
}

async function getMeals(mealName: String) {
  const mealUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`
  const meals: Meal[] = [];
try {
    const response = await axios.get(mealUrl);
    response.data.meals.forEach((element: Meal) => {
      meals.push(element);
    });
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
    console.log('Saved meals received successfully', response.data);
    response.data.forEach((element: Meal) => {
      savedMeals.push(element.idMeal);
    });
    return savedMeals;
  } catch (error) {
    console.error('Failed to get saved meals', error);
    return [];
  }
}

const addMealToSaved = async (id: number) => {
  const taskUrl = `http://localhost:3004/saved/`;
  await axios.post(taskUrl, {
    idMeal: id
  })
    .then((response) => {
      console.log("Meal added successfully", response.data);
    })
    .catch((error) => {
      console.error("Failed to add meal to DataBase", error);
    });
}

async function getSavedMeals() {
  const savedMealId: number[] = await getSavedMealId();
  let meals: Meal[] = [];
  for (let i = 0; i < savedMealId.length; i++) {
    const meal = await getMealById(savedMealId[i]);
    meals.push(meal);
  }
  console.log('Saved meals', meals);
  return meals;
}

export { getMeals, getMealById, getSavedMeals, addMealToSaved }
