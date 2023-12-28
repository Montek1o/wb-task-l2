import diagramUpdate from "../diagram/diagramUpdate.js";
import deleteProduct from "./deleteProduct.js";
import { product } from "./product.js";
import updateTotalCalories from "./updateTotalCalories.js";

export default function addProduct() {
  const addButtons = document.querySelectorAll('.add-product__button');

  for (let i = 0; i < addButtons.length; i++) {
    addButtons[i].addEventListener('click', (e) => {
      const meal = e.target.closest('.meals__item');
      const contentMeal = meal.querySelector('.meal__content');
      const productList = meal.querySelector('.products__list');
      const name = meal.querySelector('.add-product__name');
      const weight = meal.querySelector('.add-product__weight');
      const kcal = meal.querySelector('.add-product__kcal');
      const inputs = [name, weight, kcal];
      const mealsStorage = JSON.parse(localStorage.getItem('meals'));
      const currentMeal = mealsStorage[mealsStorage.length - i - 1];

      if (name.value != '' && weight.value != '' && kcal.value != '') {
        productList.innerHTML += product(name.value, weight.value, kcal.value);

        currentMeal.products.push({ 
          name: name.value,
          weight: +weight.value,
          kcal: +kcal.value,
        })

        name.value = '';
        weight.value = '';
        kcal.value = '';
        localStorage.setItem('meals', JSON.stringify(mealsStorage));
        updateTotalCalories(meal);
        deleteProduct();
        diagramUpdate();
        contentMeal.style.maxHeight = (contentMeal.scrollHeight + 32) + 'px';
      } else {
        inputs.forEach(input => {
          if (input.value == '') {
            input.style.animationName = 'inputError';

            setTimeout(() => {
              input.style.animationName = '';
            }, 900);
          }
        })
      }
    })
  }
}