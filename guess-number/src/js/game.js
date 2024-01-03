import getRandomNumber from "./getRandomNumber.js";

export default function game() {
  const input = document.querySelector('.form__input');
  const result = document.querySelector('.result__text span');
  const tryBlock = document.querySelector('.try__text span');
  const hint = document.querySelector('.hint__text span');
  const submitButton = document.querySelector('.form__button');
  const restartButton = document.querySelector('.buttons__restart');
  const updateSettingsButton = document.querySelector('.settings__button__update');
  const minRange = document.querySelector('.settings__input__min');
  const maxRange = document.querySelector('.settings__input__max');
  const minSpan = document.querySelector('.min');
  const maxSpan = document.querySelector('.max');
  const notification = document.querySelector('.notification');
  const notificationText = document.querySelector('.notification p');

  let range = {
    min: 1,
    max: 100,
  };
  let randomNumber = getRandomNumber(range.min, range.max);
  let attempts = 0;
  
  function submit() {
    console.log(randomNumber);
    let userNumber = input.value;

    if (userNumber > randomNumber) {
      hint.textContent = 'Загаданное число меньше';
      attempts++;
      parityNotification();
    } else if (userNumber < randomNumber) {
      hint.textContent = 'Загаданное число больше';
      attempts++;
      parityNotification();
    } else if (userNumber == randomNumber) {
      hint.textContent = '';
      submitButton.style.color = 'rgb(84, 84, 84)';
      submitButton.style.border = '3px solid rgb(84, 84, 84)';
      tryBlock.style.color = 'green';
      result.style.color = 'green';
      result.textContent = `Вы отгадали, это число ${randomNumber}`;
      submitButton.setAttribute('disabled', true);
      input.setAttribute('disabled', true);
      attempts++;
    }

    tryBlock.textContent = attempts;
  }

  function restart() {
    hint.textContent = 'Сначала попробуйте отгадать';
    submitButton.style.color = 'white';
    submitButton.style.border = '3px solid white';
    tryBlock.style.color = 'orange';
    result.style.color = 'orange';
    result.textContent = 'Пока неизвестен';
    submitButton.removeAttribute('disabled');
    input.removeAttribute('disabled');
    attempts = 0;
    tryBlock.textContent = attempts;
    input.value = '';
    randomNumber = getRandomNumber(range.min, range.max);
  }

  function updateSettings() {
    range.min = +minRange.value;
    range.max = +maxRange.value;
    randomNumber = getRandomNumber(range.min, range.max);
    minSpan.textContent = minRange.value;
    maxSpan.textContent = maxRange.value;
  }

  function openNotification(text, color) {
    notification.style.backgroundColor = color;
    notificationText.textContent = text;
    notification.classList.add('notification-active');
    setTimeout(() => {
      notification.classList.remove('notification-active');
    }, 2000);
  }

  function parityNotification() {
    let parity;
    if (randomNumber % 2 == 0) {
      parity = true;
    } else {
      parity = false;
    }
    if (attempts % 3 == 0) {
      if (parity == true) {
        openNotification('Загаднное число чётное', 'rgb(185, 120, 0)');
      } else {
        openNotification('Загаднное число нечётное', 'rgb(185, 120, 0)');
      }
    }
  } 

  submitButton.addEventListener('click', (e) => {
    e.preventDefault();
    if (input.value == '') {
      openNotification('Введите число', 'rgb(149, 35, 35)');
    } else if (input.value < range.min || input.value > range.max) {
      openNotification('Введите число из диапазона чисел', 'rgb(149, 35, 35)');
    } else {
      submit();
    } 
  });
  restartButton.addEventListener('click', restart);
  updateSettingsButton.addEventListener('click', () => {
    if (minRange.value == '' || maxRange.value == '') {
      openNotification('Введите значения', 'rgb(149, 35, 35)');
      return;
    }
    if (+minRange.value < +maxRange.value) {
      updateSettings();
      restart();
      openNotification('Диапазон обновлён', 'rgb(47, 149, 35)');
    } else {
      openNotification('Диапазон чисел должен быть от меньшего к большему', 'rgb(149, 35, 35)');
    }
  });
}