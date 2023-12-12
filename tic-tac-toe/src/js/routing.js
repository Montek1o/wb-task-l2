export default function routing() {
  const startScreen = document.querySelector('.start-screen');
  const gameScreen = document.querySelector('.game-screen');
  const startGameBtn = document.querySelector('.start-screen__button');
  
  startGameBtn.addEventListener('click', () => {
    startScreen.style.display = 'none';
    gameScreen.style.display = 'flex';
  })
}
