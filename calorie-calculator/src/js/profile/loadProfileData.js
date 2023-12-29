export default function loadProfileData(age, height, weight, caloriesBlock) {
  if (localStorage.getItem('profile-data')) {
    const gender = document.querySelectorAll('input[name="gender"]');
    const activity = document.querySelectorAll('input[name="activity"]');
    const profileData = JSON.parse(localStorage.getItem('profile-data'));

    gender.forEach(elem => {
      if (profileData[0] == 'man' && elem.value == 'man') {
        elem.checked = true;
      } else if (profileData[0] == 'woman' && elem.value == 'woman') {
        elem.checked = true;
      }
    })

    activity.forEach(elem => {
      if (profileData[4] == '1.2' && elem.value == '1.2') {
        elem.checked = true;
      } else if (profileData[4] == '1.375' && elem.value == '1.375') {
        elem.checked = true;
      } else if (profileData[4] == '1.55' && elem.value == '1.55') {
        elem.checked = true;
      }
    })

    age.value = profileData[1];
    height.value = profileData[2];
    weight.value = profileData[3];
    caloriesBlock.textContent = profileData[5];
  }
}
