import { product } from "./product.js";

export default function filterNames() {
  const filterButtons = document.querySelectorAll('.names__filter-names');

  for (let i = 0; i < filterButtons.length; i++) {
    filterButtons[i].addEventListener('click', (e) => {
      const meal = e.target.closest('.meals__item');
      const productsList = meal.querySelector('.products__list');
      const filterIcon = meal.querySelector('.names__filter-names .names__sort-icon');
      const kcalProduct = meal.querySelector('.names__sort-kcal');
      const filterIconKcal = meal.querySelector('.names__sort-kcal .names__sort-icon');
      const mealsStorage = JSON.parse(localStorage.getItem('meals'))[filterButtons.length - i - 1].products;

      console.log(meal.getAttribute('data-sort-name'));

      if (meal.getAttribute('data-sort-name') == 'true') {
        productsList.innerHTML = '';
        mealsStorage.forEach(elem => {
          productsList.innerHTML += product(elem.name, elem.weight, elem.kcal);
        })
        filterButtons[i].style.color = 'rgba(253, 253, 253, 0.65)';
        filterIcon.classList.remove('names__sort-icon-active');
        meal.setAttribute('data-sort-name', false);
      } else if ((meal.getAttribute('data-sort-name') == 'false')) {
        const sortProducts = mealsStorage.sort((a, b) => {
          if (a.name.toLowerCase() < b.name.toLowerCase()) {
            return -1;
          }
          if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return 1;
          }
          return 0;
        });

        productsList.innerHTML = '';
        sortProducts.forEach(elem => {
          productsList.innerHTML += product(elem.name, elem.weight, elem.kcal);
        })
        filterButtons[i].style.color = 'rgba(0, 31, 138, 1)';
        filterIcon.classList.add('names__sort-icon-active');
        meal.setAttribute('data-sort-name', true);
        kcalProduct.style.color = 'rgba(253, 253, 253, 0.65)';
        filterIconKcal.classList.remove('names__sort-icon-active');
        meal.setAttribute('data-sort-kcal', false);
      }
    })
  }
}