import updateСalories from "./updateCalories.js";
import loadProfileData from "./loadProfileData.js";
import validationForm from "./validationForm.js";

export default function profilePage() { 
  const form = document.querySelector('.profile__form');
  const button = document.querySelector('.form__button');
  const caloriesBlock = document.querySelector('.sum-calories__count span');
  const age = document.querySelector('.age');
  const height = document.querySelector('.height');
  const weight = document.querySelector('.weight');

  loadProfileData(age, height, weight, caloriesBlock);
  
  button.addEventListener('click', () => {
    if (validationForm(form) == true) {
      updateСalories(age, height, weight, caloriesBlock);
    }
  });
} 