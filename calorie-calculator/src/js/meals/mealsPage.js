import accordion from "./accordion.js";
import addMeal from "./addMeal.js";
import addProduct from "../products/addProduct.js";
import deleteMeal from "./deleteMeal.js";
import loadMeals from "./loadMeals.js";
import deleteProduct from "../products/deleteProduct.js";
import diagramUpdate from "../diagram/diagramUpdate.js";
import filterNames from "../products/filterNames.js";
import sortKcal from "../products/sortKcal.js";

export default function mealsPage() {
  loadMeals();
  addMeal();
  deleteMeal();
  accordion();
  addProduct();
  deleteProduct();
  diagramUpdate();
  filterNames();
  sortKcal();
}