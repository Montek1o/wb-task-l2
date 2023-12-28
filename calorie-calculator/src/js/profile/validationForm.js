export default function validationForm(form) {
  const inputs = form.querySelectorAll('input[type="text"]');
  let result = true;

  inputs.forEach(input => {
    if (input.value == '') {
      input.style.animationName = 'inputError';
      result = false;
    }
  })

  setTimeout(() => {
    inputs.forEach(input => {
      input.style.animationName = '';
    })
  }, 900);

  return result;
}