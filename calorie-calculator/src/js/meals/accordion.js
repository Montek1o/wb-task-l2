export default function accordion() {
  const mealHeaders = document.querySelectorAll('.meal__header');

  mealHeaders.forEach(mealHeader => {
    mealHeader.addEventListener('click', () => {
      const content = mealHeader.nextElementSibling;
      const arrow = mealHeader.querySelector('.meal__arrow');

      if (content.style.maxHeight == '0px') {
        content.style.maxHeight = (content.scrollHeight + 32) + 'px';
        content.style.paddingBottom = '32px';
        arrow.classList.remove('meal__arrow-close');
      } else {
        content.style.maxHeight = 0;
        content.style.paddingBottom = '0px';
        arrow.classList.add('meal__arrow-close');
      }
    })
  })
} 