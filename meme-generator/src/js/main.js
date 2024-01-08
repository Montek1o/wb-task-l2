import addElement from "./addElement.js";
import drawMeme from "./drawMeme.js";
import { mouseDown, mouseMove, mouseOut, mouseUp } from "./mouseEvents.js";
import saveMeme from "./saveMeme.js";

const addElementButton = document.querySelector('.buttons__add-element');
const saveMemeButton = document.querySelector('.save-meme__button');

const settingsBgSection = document.querySelector('.settings__background');

const imageFileInput = document.querySelector('.file__input');
const textInput = document.querySelector('.text__input');
const fontSizeInput = document.querySelector('.font-size__input');
const strokeWidthInput = document.querySelector('.stroke-width__input');
const fontColorInput = document.querySelector('.font-color__input');
const strokeColorInput = document.querySelector('.stroke-color__input');

const canvas = document.querySelector('.meme__canvas');
const ctx = canvas.getContext('2d');

let image;
let elements = [];

imageFileInput.addEventListener('change', () => {
  const imageDataUrl = URL.createObjectURL(imageFileInput.files[0]);

  image = new Image();
  image.src = imageDataUrl;

  image.addEventListener('load', () => {
    drawMeme(canvas, ctx, image, elements, ctx);
  }, { once: true });
});

addElementButton.addEventListener('click', () => {
  if (imageFileInput.value) {
    addElement(textInput.value, fontSizeInput.value, strokeWidthInput.value, fontColorInput.value, strokeColorInput.value, elements);
    drawMeme(canvas, ctx, image, elements);
  } else {
    settingsBgSection.style.animationName = 'error';
    setTimeout(() => {
      settingsBgSection.style.animationName = null;
    }, 500);
  }
});
saveMemeButton.addEventListener('click', () => {
  if (imageFileInput.value) {
    saveMeme(canvas, saveMemeButton);
  } else {
    settingsBgSection.style.animationName = 'error';
    setTimeout(() => {
      settingsBgSection.style.animationName = null;
    }, 500);
  }
});

canvas.addEventListener('mousedown', (event) => {
  mouseDown(event, elements, ctx);
});
canvas.addEventListener('mouseup', (event) => {
  mouseUp(event);
});
canvas.addEventListener('mouseout', (event) => {
  mouseOut(event);
});
canvas.addEventListener('mousemove', (event) => {
  mouseMove(event, elements, canvas, ctx, image);
});
