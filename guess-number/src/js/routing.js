export default function routing() {
  const play = document.querySelector('.play');
  const info = document.querySelector('.info');
  const settings = document.querySelector('.settings');
  const settingsButton = document.querySelector('.buttons__settings');
  const backButton = document.querySelector('.settings__button__back');
  const restartButton = document.querySelector('.buttons__restart');

  let settingsOpen = false;

  function mainPage() {
    play.style.display = 'block';
    info.style.display = 'flex';
    settings.style.display = 'none';
    settingsOpen = false;
  }

  function settingsPage() {
    play.style.display = 'none';
    info.style.display = 'none';
    settings.style.display = 'block';
    settingsOpen = true;
  }

  settingsButton.addEventListener('click', () => {
    if (settingsOpen) {
      mainPage();
    } else {
      settingsPage();
    }
  })
  backButton.addEventListener('click', mainPage);
  restartButton.addEventListener('click', mainPage);
}