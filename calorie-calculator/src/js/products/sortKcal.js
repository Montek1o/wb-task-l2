import { product } from "./product.js";

export default function sortKcal() {
  const filterButtons = document.querySelectorAll('.names__sort-kcal');

  for (let i = 0; i < filterButtons.length; i++) {
    filterButtons[i].addEventListener('click', (e) => {
      const meal = e.target.closest('.meals__item');
      const productsList = meal.querySelector('.products__list');
      const filterIcon = meal.querySelector('.names__sort-kcal .names__sort-icon');
      const nameProduct = meal.querySelector('.names__filter-names');
      const filterIconName = meal.querySelector('.names__filter-names .names__sort-icon');
      const mealsStorage = JSON.parse(localStorage.getItem('meals'))[filterButtons.length - i - 1].products;

      if (meal.getAttribute('data-sort-kcal') == 'true') {
        productsList.innerHTML = '';
        mealsStorage.forEach(elem => {
          productsList.innerHTML += product(elem.name, elem.weight, elem.kcal);
        })
        filterButtons[i].style.color = 'rgba(253, 253, 253, 0.65)';
        filterIcon.classList.remove('names__sort-icon-active');
        meal.setAttribute('data-sort-kcal', false);
      } else if ((meal.getAttribute('data-sort-kcal') == 'false')) {
        const sortProducts = mealsStorage.sort((a, b) => {
          const kcalA = Math.round(a.kcal / 100 * a.weight);
          const kcalB = Math.round(b.kcal / 100 * b.weight);
          return kcalA - kcalB;
        });
  
        productsList.innerHTML = '';
        sortProducts.forEach(elem => {
          productsList.innerHTML += product(elem.name, elem.weight, elem.kcal);
        })
        filterButtons[i].style.color = 'rgba(0, 31, 138, 1)';
        filterIcon.classList.add('names__sort-icon-active');
        meal.setAttribute('data-sort-kcal', true);
        nameProduct.style.color = 'rgba(253, 253, 253, 0.65)';
        filterIconName.classList.remove('names__sort-icon-active');
        meal.setAttribute('data-sort-name', false);
      }
    })
  }
}