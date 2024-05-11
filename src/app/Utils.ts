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

async function getMealById(mealId: number) {
  const mealUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
}

export { getMeals, getMealById}
