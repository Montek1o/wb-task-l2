export default function updateTotalCalories(meal) {
  const totalCaloriesBlock = meal.querySelector('.total__number');
  const allNumbersCalories = meal.querySelectorAll('.product__total');
  let sum = 0;

  allNumbersCalories.forEach(elem => {
    sum += +elem.textContent;
  });

  totalCaloriesBlock.textContent = sum;
}