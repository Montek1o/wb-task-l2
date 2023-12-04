import Game from './game.js';

// создаём экземпляр класса game
const game = new Game();
// глобальному объекту window создаём свойство game и значением передаём нашу константу game
// для того, чтобы получить доступ к объекту game
window.game = game;

console.log(game);