import diagramUpdate from "../diagram/diagramUpdate.js";
import updateTotalCalories from "./updateTotalCalories.js";

export default function deleteProduct() {
  const meals = document.querySelectorAll('.meals__item');
  
  for (let i = 0; i < meals.length; i++) {
    meals[i].addEventListener('click', () => {
      const deleteButtons = meals[i].querySelectorAll('.product__delete');
      const mealsStorage = JSON.parse(localStorage.getItem('meals'));
      const indexMeal = mealsStorage.length - i - 1;

      for (let j = 0; j < deleteButtons.length; j++) {
        deleteButtons[j].addEventListener('click', (e) => {
          const product = e.target.closest('.product');

          product.remove();
          updateTotalCalories(meals[i]);
          diagramUpdate();
          mealsStorage[indexMeal].products.splice(j, 1);
          localStorage.setItem('meals', JSON.stringify(mealsStorage));
        })
      }
    }, true)
  }
}