import { product } from "../products/product.js";

export const meal = (name, products) => { 
  const productsArr = [];
  if (products) {
    products.forEach(elem => {
      productsArr.push(product(elem.name, elem.weight, elem.kcal));
    })
  }
  
  return `
  <div class="meals__item" data-sort-name="false" data-sort-kcal="false">
    <div class="meal__header">
      <h3 class="meal__title">${name}<img class="meal__delete" src="./src/assets/img/delete-meal.svg"></h3>
      <img class="meal__arrow" src="./src/assets/img/arrow.svg" alt="arrow">
    </div>
    <div class="meal__content">
      <div class="meal__products">
        <div class="products__names">
          <p class="names__point names__filter-names"><span class="names__sort-icon"></span>Продукт</p>
          <p class="names__point">Вес, гр</p>
          <p class="names__point">кКал/100гр</p>
          <p class="names__point names__sort-kcal"><span class="names__sort-icon"></span>кКал</p>
        </div>
        <div class="products__list">
          ${products ? productsArr.join('') : ''}
        </div>
        <div class="products__total">
          <p>Итого</p>
          <p class="total__number"></p>
        </div>
      </div>
      <form class="meal__add-product">
        <div class="add-product__inputs">
          <input class="add-product__name input" type="text" placeholder="Введите название продукта">
          <input class="add-product__weight input" type="text" placeholder="Введите вес(гр)" onkeypress="return (event.charCode >= 48 && event.charCode <= 57 || event.charCode == 46)">
          <input class="add-product__kcal input" type="text" placeholder="Введите кКал/100гр" onkeypress="return (event.charCode >= 48 && event.charCode <= 57 || event.charCode == 46)">
        </div>
        <div class="add-product__button button">Добавить продукт</div>
      </form>
    </div>
  </div>
  `};