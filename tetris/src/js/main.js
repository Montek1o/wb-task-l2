import Game from './game.js';
import View from './view.js';

const playfield = document.querySelector('.playfield');

const game = new Game();
const view = new View(playfield, 320, 640, 20, 10);

window.game = game;
window.view = view;

document.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'ArrowLeft': // стрелка влево
      game.movePieceLeft();
      view.render(game.getState());
      break;
    case 'ArrowUp': // стрелка вверх
      game.rotatePiece();
      view.render(game.getState());
      break;
    case 'ArrowRight': // стрелка вправо
      game.movePieceRight();
      view.render(game.getState());
      break;
    case 'ArrowDown': // стрелка вниз
      game.movePieceDown();
      view.render(game.getState());
      break;
  }
})

view.render(game.getState());