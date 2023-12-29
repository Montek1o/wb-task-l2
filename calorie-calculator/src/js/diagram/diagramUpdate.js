export default function diagramUpdate() {
  const limit = JSON.parse(localStorage.getItem('profile-data'))[5];
  const limitBlock = document.querySelector('.diagram__limit');
  const fact = document.querySelectorAll('.total__number');
  const factBlock = document.querySelector('.diagram__fact');
  let factNumber = 0;

  fact.forEach(elem => {
    factNumber += +elem.textContent;
  });

  limitBlock.textContent = limit;
  factBlock.textContent = factNumber;

  const diagramInfo = document.querySelector('.diagram__info');
  const diagramProgressBlock = document.querySelector('.diagram__progress');
  const diagramProgress = (factNumber * 100) / limit;

  if (factNumber < limit) {
    if (diagramProgress < 4 && diagramProgress != 0) {
      diagramProgressBlock.style.width = `4%`;
    } else {
      diagramProgressBlock.style.width = `${diagramProgress}%`;
    }
    diagramInfo.style.color = 'rgba(0, 31, 138, 1)';
    diagramProgressBlock.style.background = 'rgba(253, 253, 253, 1)';
  } else {
    diagramProgressBlock.style.width = `calc(100% - 6px)`;
    diagramInfo.style.color = 'rgba(253, 253, 253, 1)';
    diagramProgressBlock.style.background = 'rgb(255, 0, 0)';
  }
}