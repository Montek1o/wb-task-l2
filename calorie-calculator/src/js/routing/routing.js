export default function routing() {
  const navButtons = document.querySelectorAll('.navigation__item');
  const profilePage = document.querySelector('.profile');
  const mealsPage = document.querySelector('.meals');

  navButtons.forEach(button => {
    button.classList.remove('navigation__item-active');

    button.addEventListener('click', (e) => {
      navButtons.forEach(button => button.classList.remove('navigation__item-active'));
      e.target.classList.add('navigation__item-active');
      if (e.target.textContent == 'Дневная норма калорий') {
        profilePage.style.display = 'flex';
        mealsPage.style.display = 'none';
      } else {
        profilePage.style.display = 'none';
        mealsPage.style.display = 'block';
      }
    })
  })

  // если есть сохраненные данные пользователя, открываем страницу приёмов пищи
  // если их нет, открываем страницу, где их необходимо заполнить
  if (localStorage.getItem('profile-data')) {
    profilePage.style.display = 'none';
    mealsPage.style.display = 'block';
    navButtons[1].classList.add('navigation__item-active');
  } else {
    profilePage.style.display = 'flex';
    mealsPage.style.display = 'none';
    navButtons[0].classList.add('navigation__item-active');
  }
}