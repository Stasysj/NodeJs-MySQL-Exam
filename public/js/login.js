import { clearErrorsArr, checkInput, errorsArr } from './modules/validations.js';

const formEl = document.getElementById('login');
const baseUrl = 'http://localhost:3000/api/login';

const errroEl = document.getElementById('err');
const emailEl = formEl.elements.email;
const passEl = formEl.elements.password;
const contentEl = document.querySelector('.content');
// ----------------------------------------------------------Valid select
const errorMsgElementsArr = document.querySelectorAll('.error-msg');

// ----------------------------------------------------

// ----------------------------------------------------
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
// ----------------------------------------------------------
function handleError(msg, bullian) {
  errroEl.textContent = '';
  if (typeof msg === 'string') {
    errroEl.textContent = msg;
    if (!bullian === false) {
      contentEl.classList.add('good-input-content');
    } else {
      contentEl.classList.add('invalid-input-content');
    }
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
// ---------------------------------------------------------------
emailEl.addEventListener('input', (event) => {
  clearErrors();
  const el = event.currentTarget;
  checkInput(el.value, el.name, ['required', 'minLength-4', 'email', 'include-@']);
  handleError(errorsArr);
});
passEl.addEventListener('input', (event) => {
  clearErrors();
  const el = event.currentTarget;
  checkInput(el.value, el.name, ['required', 'minLength-5', 'maxLength-10']);
  handleError(errorsArr);
});
// ------------------------------------------------------
async function loginFetch(email, password) {
  const loginObj = { email, password };
  const resp = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginObj),
  });
  const dataInJs = await resp.json();

  if (dataInJs.success === true) {
    errroEl.textContent = '';
    formEl.elements.email.value = '';
    formEl.elements.password.value = '';
    handleError('login success', true);

    const { token } = dataInJs;
    localStorage.setItem('Token', token);

    window.location.replace('groups.html');
  } else {
    clearErrors();
    handleError(dataInJs, false);
  }
}
// ------------------------------------------------------
formEl.addEventListener('submit', async (event) => {
  event.preventDefault();
  const loginObj = {
    email: formEl.elements.email.value.trim(),
    password: formEl.elements.password.value.trim(),
  };
  // ------------------------------------------------
  clearErrors();
  checkInput(loginObj.email, 'email', ['required', 'minLength-4', 'email', 'include-@.']);
  checkInput(loginObj.password, 'password', ['required', 'minLength-5', 'maxLength-10']);
  // --------------------------------------------------
  // jei yra klaidu FE tada nesiunciam uzklausos
  if (errorsArr.length) {
    handleError(errorsArr);
    return;
  }
  loginFetch(loginObj.email, loginObj.password);
  // --------------------------------------------
});
// ---------------------------------------------------
