import addProduct from "../products/addProduct.js";
import filterNames from "../products/filterNames.js";
import sortKcal from "../products/sortKcal.js";
import accordion from "./accordion.js";
import deleteMeal from "./deleteMeal.js";
import { meal } from "./meal.js";

export default function addMeal() {
  const popupBg = document.querySelector('.meals__popup');
  const popup = document.querySelector('.popup__container');
  const openPopupButton = document.querySelector('.meals__add-meal');
  const closePopupButton = document.querySelector('.popup__close');
  const mealsList = document.querySelector('.meals__list');
  const addMealButton = document.querySelector('.popup__add-button');

  function openPopup() {
    popupBg.classList.add('meals__popup-active');
    popup.classList.add('popup__container-active');
  }

  function closePopup() {
    popupBg.classList.remove('meals__popup-active');
    popup.classList.remove('popup__container-active');
  }

  openPopupButton.addEventListener('click', openPopup);
  closePopupButton.addEventListener('click', closePopup);
  document.addEventListener('click', (e) => { 
    if (e.target === popupBg) { 
      closePopup();
    }
  });
  
  addMealButton.addEventListener('click', function () {
    const name = document.querySelector('.popup__input');
    const mealsStorage = localStorage.getItem('meals') ? JSON.parse(localStorage.getItem('meals')) : [];

    if (name.value != '') {
      mealsList.innerHTML = meal(name.value) + mealsList.innerHTML;
      mealsStorage.push({ name: name.value, products: [] });
      localStorage.setItem('meals', JSON.stringify(mealsStorage));

      name.value = '';
      closePopup();
      accordion();
      deleteMeal();
      addProduct();
      filterNames();
      sortKcal();
    } else {
      name.style.animationName = 'inputError';

      setTimeout(() => {
        name.style.animationName = '';
      }, 900);
    }
  })
}