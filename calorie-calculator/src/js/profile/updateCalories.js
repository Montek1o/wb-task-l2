import diagramUpdate from "../diagram/diagramUpdate.js";

export default function updateСalories(age, height, weight, caloriesBlock) {
  const gender = document.querySelector('input[name="gender"]:checked').value;
  const activity = document.querySelector('input[name="activity"]:checked').value;

  let calories;
  let profileData;

  if (gender == 'man') {
    calories = ((10 * weight.value) + (6.25 * height.value) - (5 * age.value) + 5) * activity;
  } else {
    calories = ((10 * weight.value) + (6.25 * height.value) - (5 * age.value) - 161) * activity;
  }

  profileData = [gender, age.value, height.value, weight.value, activity, Math.round(calories)];

  localStorage.setItem('profile-data', JSON.stringify(profileData));
  caloriesBlock.textContent = Math.round(calories);
  diagramUpdate();
}