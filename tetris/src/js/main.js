import Game from './game.js';
import View from './view.js';
import Controller from './controller.js';

const playfield = document.querySelector('.playfield');

const game = new Game();
const view = new View(playfield, 480, 640, 20, 10);
const controller = new Controller(game, view);

window.game = game;
window.view = view;
window.controller = controller;