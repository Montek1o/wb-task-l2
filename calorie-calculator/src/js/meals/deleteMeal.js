import diagramUpdate from "../diagram/diagramUpdate.js";

export default function deleteMeal() {
  const deleteButtons = document.querySelectorAll('.meal__delete');

  for (let i = 0; i < deleteButtons.length; i++) {
    deleteButtons[i].addEventListener('click', (e) => {
      e.stopPropagation();
      const meal = e.target.closest('.meals__item');
      const mealsStorage = JSON.parse(localStorage.getItem('meals'));
      const indexMealRemove = mealsStorage.length - i - 1;

      meal.style.opacity = 0;
      setTimeout(() => {
        meal.remove();
        diagramUpdate();
      }, 300);

      mealsStorage.splice(indexMealRemove, 1);
      localStorage.setItem('meals', JSON.stringify(mealsStorage));
    })
  }
}