export default function game() {
  const crossWinBlock = document.querySelector('.count__cross-win');
  const circleWinBlock = document.querySelector('.count__circle-win');
  const blockTurn = document.querySelector('.turn');
  const select = document.querySelector('.select');
  const blocks = document.querySelectorAll('.playfield__block');
  const blockWinner = document.querySelector('.winner');
  const birdsContainer = document.querySelector('.birds__container');
  const buttonsCotainer = document.querySelector('.buttons__container');
  const newGameBtn = document.querySelector('.new-game-button');
  const oneMoreGameBtn = document.querySelector('.one-more-game-button');
  const playfield = document.querySelector('.playfield');

  const crossImg = (color) => `<svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 72 72" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M0.871848 0.884979C-0.295972 2.05948 -0.289748 3.95751 0.885746 5.12434L32.0014 36.0105L0.906877 66.8757C-0.268616 68.0425 -0.274839 69.9405 0.89298 71.115C2.0608 72.2895 3.96043 72.2957 5.13592 71.1289L36.2583 40.236L66.8641 70.6161C68.0396 71.783 69.9392 71.7767 71.1071 70.6022C72.2749 69.4277 72.2687 67.5297 71.0932 66.3629L40.5153 36.0105L71.1143 5.63712C72.2898 4.47029 72.296 2.57227 71.1282 1.39776C69.9604 0.223254 68.0607 0.217029 66.8853 1.38385L36.2583 31.7849L5.11479 0.871071C3.9393 -0.295754 2.03967 -0.289527 0.871848 0.884979Z" fill="${color}"/></svg>`;
  const circleImg = (color) => `<svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 72 72" fill="none"><circle cx="36" cy="36" r="33" stroke="${color}" stroke-width="6"/></svg>`;
  
  let step = '';
  let winner = '';
  let counter = 0;
  const winners = {
    cross: 0,
    circle: 0,
  };
  const winCombination = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
  ];
  
  function whoseTurn() {
    if (step == 'circle') {
      step = 'cross';
      select.classList.remove('select-circle');
    } else {
      step = 'circle';
      select.classList.add('select-circle');
    }
  }
  
  function circleWin() {
    let check = 0;
    
    for (let i = 0; i < winCombination.length; i++) {
      for (let j = 0; j < winCombination[i].length; j++) {
        if (blocks[winCombination[i][j]].classList.contains('circle')) {
          check++;
        } else {
          check = 0;
          break;
        }
      };
      
      if (check == 3) {
        for (let j = 0; j < winCombination[i].length; j++) {
          blocks[winCombination[i][j]].innerHTML = circleImg('#53DB00');
          blocks[winCombination[i][j]].classList.add('color-win');
        }
        winner = 'Победили Нолики!';
        winners.circle += 1;
        endGame(winner);
        return true;
      }
    }
  }

  function crossWin() {
    let check = 0;
    
    for (let i = 0; i < winCombination.length; i++) {
      for (let j = 0; j < winCombination[i].length; j++) {
        if (blocks[winCombination[i][j]].classList.contains('cross')) {
          check++;
        } else {
          check = 0;
          break;
        }
      };
      
      if (check == 3) {
        for (let j = 0; j < winCombination[i].length; j++) {
          blocks[winCombination[i][j]].innerHTML = crossImg('#53DB00');
          blocks[winCombination[i][j]].classList.add('color-win');
        }
        winner = 'Победили Крестики!';
        winners.cross += 1;
        endGame(winner);
        return true;
      }
    }
  }
  
  function drawnGame() {
    if (counter == 9) {
      winner = 'Ничья!';
      endGame(winner);
    }
  }
  
  function endGame(winner) {
    playfield.style.pointerEvents = 'none';
    blockTurn.style.display = 'none';
    birdsContainer.style.display = 'none';
    buttonsCotainer.style.display = 'flex';
    blockWinner.style.display = 'block';
    blockWinner.textContent = winner;
    
    if (winner == 'Ничья!') {
      document.body.style.backgroundImage = 'url("./src/assets/img/bg-drawn.png")';
    } else if (winner == 'Победили Крестики!') {
      document.body.style.backgroundImage = 'url("./src/assets/img/bg-win.png")';
      crossWinBlock.textContent = winners.cross;
    } else if (winner == 'Победили Нолики!') {
      document.body.style.backgroundImage = 'url("./src/assets/img/bg-win.png")';
      circleWinBlock.textContent = winners.circle;
    }
  }

  blocks.forEach((block) => {
    block.addEventListener('click', () => {
      if (!block.classList.contains('circle') && !block.classList.contains('cross')) {
        block.classList.add(step);
        if (step == 'cross') {
          block.innerHTML = crossImg('#FFB100');
        }
        if (step == 'circle') {
          block.innerHTML = circleImg('#EBFF00');
        }
        counter++;
        whoseTurn();
        if (!circleWin() && !crossWin()) {
          drawnGame();
        }
      }
    })
  })
  
  oneMoreGameBtn.addEventListener('click', () => {
    const windowWidth = window.innerWidth;

    playfield.style.pointerEvents = 'auto';
    blockTurn.style.display = 'block';
    buttonsCotainer.style.display = 'none';
    blockWinner.style.display = 'none';
    document.body.style.backgroundImage = 'none';
    blocks.forEach(block => {
      block.innerHTML = '';
      block.className = 'playfield__block';
    })
    counter = 0;

    if (windowWidth > 590) {
      birdsContainer.style.display = 'block';
    }
  })
  
  newGameBtn.addEventListener('click', () => {
    document.location.reload();
  })
  
  whoseTurn();
}
