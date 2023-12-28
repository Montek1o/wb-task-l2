import updateTotalCalories from "../products/updateTotalCalories.js";
import { meal } from "./meal.js";

export default function loadMeals() {
  if (localStorage.getItem('meals')) {
    const mealsList =  document.querySelector('.meals__list');
    const mealsStorage = JSON.parse(localStorage.getItem('meals'));

    mealsStorage.forEach(elem => {
      mealsList.innerHTML = meal(elem.name, elem.products) + mealsList.innerHTML;
    });
    
    mealsList.querySelectorAll('.meals__item').forEach(mealItem => {
      const mealContent = mealItem.querySelector('.meal__content');
      
      mealContent.style.maxHeight = (mealContent.scrollHeight + 32) + 'px';
      updateTotalCalories(mealItem);
    })
  }
}