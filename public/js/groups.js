import { BASE_URL, getFetch } from './modules/fetch.js';
import { clearErrorsArr } from './modules/validations.js';

const groupContEl = document.querySelector('.group_container');
const divFormEl = document.querySelector('.form-group');
const divNewFormEl = document.querySelector('.form-group-new');
const addGroupTitlePEl = document.querySelector('.addtitle');
const addGroupTitleNewPEl = document.querySelector('.addtitle-new');
const formEl = document.getElementById('group');
const formNewEl = document.getElementById('group-new');
const token = localStorage.getItem('Token');
const selectValEl = document.querySelector('.group-select');
const errroEl = document.getElementById('err');
const errorMsgElementsArr = document.querySelectorAll('.error-msg');
const contentEl = document.querySelector('.form-group');

// ------------------------------- Select pasleptas

function addMeniu() {
  formEl.classList = 'see-form';
  addGroupTitlePEl.textContent = 'Select group';
  divFormEl.removeEventListener('click', addMeniu);
}
divFormEl.addEventListener('click', addMeniu);

// ------------------------------- Add Inputas pasleptas

function addNewMeniu() {
  contentEl.classList.remove('good-input-content');
  errroEl.textContent = '';
  formNewEl.classList = 'see-form';
  addGroupTitleNewPEl.textContent = 'Input new group name.';
  divNewFormEl.removeEventListener('click', addMeniu);
}
divNewFormEl.addEventListener('click', addNewMeniu);
// --------------------------------

function creatEl(tag, text, clas, dest, val) {
  const newEl = document.createElement(tag);
  newEl.textContent = text;
  newEl.className = clas;
  newEl.value = val;
  dest.append(newEl);
  return newEl;
}

function renderCards(arr, dest) {
  dest.innerHTML = '';
  arr.forEach((obj) => {
    const groupCardEl = creatEl('div', '', 'group-card', dest);
    creatEl('h3', `ID: ${obj.group_id}`, 'group-card-id', groupCardEl);
    creatEl('p', obj.name, 'group-card-title', groupCardEl);
    groupCardEl.addEventListener('click', () => {
      window.location.href = `bills.html?group_id=${obj.group_id}+${obj.name}`;
    });
  });
}

async function getGroups(userToken) {
  const groupsArr = await getFetch('accounts', userToken);
  if (!Array.isArray(groupsArr)) {
    alert('Jūs esate neprisijungęs arba baigesi Jūsų sesijos laikas. Prisijunkite iš naujo! ');
    window.location.href = 'login.html';
  }
  renderCards(groupsArr, groupContEl);
}

getGroups(token);

// -------------------------------------------------extra selecto kurimas
function renderSelect(arr, dest) {
  dest.innerHTML = '';
  arr.forEach((obj) => {
    creatEl('option', obj.name, '', dest, obj.id);
  });
}

const selectEl = document.querySelector('.group-select');

async function addSelectValues(userToken) {
  const allGroupsArr = await getFetch('groups', userToken);
  if (!Array.isArray(allGroupsArr)) {
    alert('Jūs esate neprisijungęs arba baigesi Jūsų sesijos laikas. Prisijunkite iš naujo! ');
    window.location.href = 'login.html';
  }
  renderSelect(allGroupsArr, selectEl);
}

addSelectValues(token);
// ---------------------------------------------------- end selecto padarymas

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

// ------------------------------------
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

// ----------------------------------
async function postFetch(group_id) {
  const groupObj = { group_id };
  const resp = await fetch(`${BASE_URL}/accounts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(groupObj),
  });
  const dataInJs = await resp.json();

  if (dataInJs === 'Account add') {
    errroEl.textContent = '';
    getGroups(token);
  } else if (dataInJs.error === 'invalid token') {
    clearErrors();
    handleError('Invalid token', false);
    alert('Jūs esate neprisijungęs arba baigesi Jūsų sesijos laikas. Prisijunkite iš naujo! ');
    window.location.href = 'login.html';
  } else {
    clearErrors();
    handleError('Account dnot add', false);
  }
}

// --------------------------------------

formEl.addEventListener('submit', (e) => {
  e.preventDefault();

  const groupObj = {
    group_id: selectValEl.value,
  };
  postFetch(groupObj.group_id);
});
// ----------------------------------------------------------EXTRA 2 prideda nauja grupe

async function postFetchregister(name) {
  const groupObj = { name };
  const resp = await fetch(`${BASE_URL}/groups`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(groupObj),
  });
  const dataInJs = await resp.json();
  if (dataInJs === 'Group add') {
    errroEl.textContent = '';
    addSelectValues(token);
  } else if (dataInJs.error === 'invalid token') {
    clearErrors();
    handleError('Invalid token', false);
    alert('Jūs esate neprisijungęs arba baigesi Jūsų sesijos laikas. Prisijunkite iš naujo! ');
    window.location.href = 'login.html';
  } else {
    clearErrors();
  }
}
// -------------------------------------------------------------

formNewEl.addEventListener('submit', (e) => {
  e.preventDefault();
  const addNewGroupObj = { name: formNewEl.elements.newGroup.value };
  formNewEl.classList.remove('see-form');
  postFetchregister(addNewGroupObj.name);
  formNewEl.elements.newGroup.value = '';
});
