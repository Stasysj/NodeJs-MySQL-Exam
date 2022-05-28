import { getFetch } from './modules/fetch.js';
import { checkInput, clearErrorsArr, errorsArr } from './modules/validations.js';

const BASE_URL = 'http://localhost:3000/api';

const formEl = document.getElementById('bills');
const errorMsgElementsArr = document.querySelectorAll('.error-msg');
const contentEl = document.querySelector('.bills-content');
const bodyEl = document.querySelector('tbody');
const errroEl = document.getElementById('err');
const token = localStorage.getItem('Token');
const billTitleEl = document.querySelector('.title');
const divFormEl = document.querySelector('.form');
const addBilTitlePEl = document.querySelector('.addmenu');
console.log('token ===', token);
if (window.location.href==='http://127.0.0.1:5500/public/bills.html'){
    alert('pasirinkite grupe');
    window.location.replace('groups.html')
}

const cardName = window.location.href.split('+')[1].split('%20').join(' ');
billTitleEl.textContent = cardName;
console.log('cardName', cardName);

contentEl.addEventListener('click', addMeniu);
function addMeniu() {
  console.log('click');
  divFormEl.classList.add('see-form');
  addBilTitlePEl.textContent = '';
  contentEl.removeEventListener('click', addMeniu);
}

//   contentEl.removeEventListener

function creatEl(tag, text, clas, dest) {
  const newEl = document.createElement(tag);
  newEl.textContent = text;
  newEl.className = clas;
  dest.append(newEl);
  return newEl;
}

function renderBill(arr, dest) {
  dest.innerHTML = '';
  arr.forEach((obj) => {
    const trEl = creatEl('tr', '', '', dest);
    creatEl('td', obj.id, '', trEl);
    creatEl('td', obj.description, '', trEl);
    creatEl('td', obj.amount, '', trEl);
  });
}

async function getBills(userToken) {
  const groupID = window.location.search.split('=');
  const billsArr = await getFetch(`bills/${groupID[1]}`, userToken);
//   console.log('groupsArr ===', billsArr);
  //   if (!Array.isArray(groupsArr)) {
  //     alert('Jūs esate neprisijungęs arba baigesi Jūsų sesijos laikas. Prisijunkite iš naujo! ');
  //     window.location.href = 'login.html';
  //   }

  renderBill(billsArr, bodyEl);
}

getBills(token);

// -------------------------------------------------POST
// ---------------------------------------------------------
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

// ------------------------------------------------------------
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
// -------------------------------------------------------
async function postFetch(group_id, amount, description) {
  const billObj = { group_id, amount, description };
//   console.log(billObj);
  const resp = await fetch(`${BASE_URL}/bills?group_id=${group_id}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(billObj),
  });
  const dataInJs = await resp.json();
//   console.log('dataInJs ===', dataInJs);

  if (dataInJs === 'Bill add') {
    errroEl.textContent = '';
    // console.log('Bill add');
    formEl.elements.amount.value = '';
    formEl.elements.description.value = '';
    getBills(token);
    handleError('Bill add', true);

    // const { token } = dataInJs;
    // localStorage.setItem('Token', token);

    // window.location.replace('groups.html');
  } else if (dataInJs.error === 'invalid token') {
    clearErrors();
    handleError('Invalid token', false);
    alert('Jūs esate neprisijungęs arba baigesi Jūsų sesijos laikas. Prisijunkite iš naujo! ');
    window.location.href = 'login.html';
  } else {
    clearErrors();
    handleError('Bill dnot add', false);
  }
}
// -----------------------------------------------------
formEl.addEventListener('submit', async (event) => {
  event.preventDefault();
  const groupID = window.location.search.split('=');
  const billObj = {
    amount: formEl.elements.amount.value.trim(),
    description: formEl.elements.description.value.trim(),
  };
  console.log('billObj ===', billObj);
  // ------------------------------------------------
  clearErrors();
  checkInput(billObj.amount, 'amount', ['required', 'positive']);
  checkInput(billObj.description, 'description', ['required', 'minLength-5', 'maxLength-48']);
  console.log('FE errorsArr ===', errorsArr);
  // --------------------------------------------------
  // jei yra klaidu FE tada nesiunciam uzklausos
  if (errorsArr.length) {
    handleError(errorsArr);
    return;
  }
  postFetch(groupID[1], billObj.amount, billObj.description);
  // --------------------------------------------
});
// ---
