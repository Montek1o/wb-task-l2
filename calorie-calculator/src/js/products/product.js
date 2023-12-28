export const product = (name, weight, kcal) => `
  <div class="product">
    <div class="product__columns">
      <p>${name}</p>
      <p>${weight}</p>
      <p>${kcal}</p>
      <p class="product__total">${Math.round(kcal / 100 * weight)}</p>
    </div>
    <img class="product__delete" src="./src/assets/img/delete-meal.svg">
  </div>
`;