import drawMeme from "./drawMeme.js";
import isMouseInElement from "./isMouseInElement.js";

let currentElementIndex = null;
let isDragging = false;
let startX;
let startY;

export function mouseDown(event, elements, ctx) {
  event.preventDefault();

  startX = event.offsetX;
  startY = event.offsetY;

  let index = 0;
  for (let element of elements) {
    if (isMouseInElement(startX, startY, element, ctx)) {
      currentElementIndex = index;
      isDragging = true;
      return;
    } 
    index++;
  }
}

export function mouseUp(event) {
  if (!isDragging) {
    return;
  }

  event.preventDefault();
  isDragging = false;
}

export function mouseOut(event) {
  if (!isDragging) {
    return;
  }

  event.preventDefault();
  isDragging = false;
}

export function mouseMove(event, elements, canvas, ctx, image) {
  if (!isDragging) {
    document.body.style.cursor = 'default';
    return;
  } else {
    event.preventDefault();
    document.body.style.cursor = 'pointer';
    let mouseX = event.offsetX;
    let mouseY = event.offsetY;

    let dx = mouseX - startX;
    let dy = mouseY - startY;

    let currentElement = elements[currentElementIndex];
    currentElement.x += dx;
    currentElement.y += dy;
    drawMeme(canvas, ctx, image, elements);

    startX = mouseX;
    startY = mouseY;
  }
}