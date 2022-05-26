import { clearErrorsArr, checkInput, errorsArr } from './modules/validations.js';

const baseUrl = 'http://localhost:3000/api';
const formEl = document.getElementById('register');
const errroEl = document.getElementById('err');
const passEl = formEl.elements.password;
const passReEl = formEl.elements.repeat_password;
const fullNameEl = formEl.elements.full_name;
const contentEl = document.querySelector('.content');
// ----------------------------------------------------------Valid select
const errorMsgElementsArr = document.querySelectorAll('.error-msg');
// ------------------------------------------------------
function clearErrors() {
  // errorsArr = [];
  clearErrorsArr();
  errorMsgElementsArr.forEach((htmlElement) => {
    htmlElement.textContent = '';
    htmlElement.previousElementSibling.classList.remove('invalid-input');
    contentEl.classList.remove('invalid-input-content');
    contentEl.classList.remove('good-input-content');
  });
}
// ---------------------------------------
function handleError(msg, bullian) {
  errroEl.textContent = '';
  if (typeof msg === 'string') {
    errroEl.textContent = msg;
  }
  if (!bullian === false) {
    contentEl.classList.add('good-input-content');
  } else {
    contentEl.classList.add('invalid-input-content');
  }
  if (Array.isArray(msg)) {
    msg.forEach((eObj) => {
      const elWithError = formEl.elements[eObj.field];
      elWithError.classList.add('invalid-input');
      elWithError.nextElementSibling.textContent = eObj.message;
      contentEl.classList.add('invalid-input-content');
    });
  }
}
// --------------------------------------
fullNameEl.addEventListener('input', (event) => {
  clearErrors();
  const el = event.currentTarget;
  checkInput(el.value, el.name, ['required', 'minLength-2', 'maxLength-15']);
  handleError(errorsArr);
});
passEl.addEventListener('input', (event) => {
  clearErrors();
  const el = event.currentTarget;
  checkInput(el.value, el.name, ['required', 'minLength-5', 'maxLength-10']);
  handleError(errorsArr);
});
passReEl.addEventListener('input', (event) => {
  clearErrors();
  const el = event.currentTarget;
  checkInput(el.value, el.name, ['required', 'minLength-5', 'maxLength-10']);
  handleError(errorsArr);
});
// ----------------------------------------------------
async function registerFetch(full_name, email, password) {
  const registerObj = { full_name, email, password };
  console.log(registerObj);
  const resp = await fetch(`${baseUrl}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(registerObj),
  });
  if (resp.status === 201) {
    // success
    handleError('registration successful', true);
  } else {
    // fail
    const res = await resp.json();
    console.log(res);
    handleError(res);
  }
}
// -----------------------------------------------
formEl.addEventListener('submit', async (event) => {
  event.preventDefault();

  const regObj = {
    full_name: formEl.elements.full_name.value.trim(),
    email: formEl.elements.email.value.trim(),
    password: formEl.elements.password.value.trim(),
    repPassword: formEl.elements.repeat_password.value.trim(),
  };
  if (formEl.elements.password.value.trim() !== formEl.elements.repeat_password.value.trim()) {
    handleError('Data incorrect: skirtingi slaptaz.', false);
    return;
  }
  clearErrors();
  checkInput(regObj.full_name, 'full_name', ['required', 'minLength-2', 'maxLength-15']);

  checkInput(regObj.email, 'email', ['required', 'minLength-4', 'email', 'include-@.']);
  checkInput(regObj.password, 'password', ['required', 'minLength-5', 'maxLength-10']);
  checkInput(regObj.repPassword, 'repeat_password', ['required', 'minLength-5', 'maxLength-10']);
  console.log('FE errorsArr ===', errorsArr);
  // --------------------------------------------------
  // jei yra klaidu FE tada nesiunciam uzklausos
  if (errorsArr.length) {
    handleError(errorsArr);
    return;
  }
  //----------------------------------------------
  registerFetch(regObj.full_name, regObj.email, regObj.password);
});
