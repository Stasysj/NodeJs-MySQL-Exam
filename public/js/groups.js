import { BASE_URL, getFetch } from './modules/fetch.js';
import { checkInput, clearErrorsArr, errorsArr } from './modules/validations.js';

const groupContEl = document.querySelector('.group_container');
const divFormEl = document.querySelector('.form-group');
const divNewFormEl = document.querySelector('.form-group-new');
const addGroupTitlePEl = document.querySelector('.addtitle');
const addGroupTitleNewPEl = document.querySelector('.addtitle-new');
const formEl = document.getElementById('group');
const formNewEl = document.getElementById('group-new');
const token = localStorage.getItem('Token');
const btnEl = document.querySelector('button');
const selectValEl = document.querySelector('.group-select');
const errroEl = document.getElementById('err');
const errorMsgElementsArr = document.querySelectorAll('.error-msg');
const contentEl = document.querySelector('.form-group');
console.log('token ===', token);

// ------------------------------- Select pasleptas
divFormEl.addEventListener('click', addMeniu);
function addMeniu() {
  console.log('click');
  formEl.classList = 'see-form';
  addGroupTitlePEl.textContent = 'Select group';
  divFormEl.removeEventListener('click', addMeniu);
}
// --------------------------------
// ------------------------------- Add Inputas pasleptas
divNewFormEl.addEventListener('click', addNewMeniu);
function addNewMeniu() {
  console.log('click');
  formNewEl.classList = 'see-form';
  addGroupTitleNewPEl.textContent = 'Input new group name.';
  divNewFormEl.removeEventListener('click', addMeniu);
}
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
      console.log('group id', obj.group_id);
      window.location.href = `bills.html?group_id=${obj.group_id}+${obj.name}`;
    });
    // dest.append();
  });
}

async function getGroups(userToken) {
  const groupsArr = await getFetch('accounts', userToken);
  console.log('groupsArr ===', groupsArr);
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

    // dest.append();
  });
}

const selectEl = document.querySelector('.group-select');

async function addSelectValues(userToken) {
  const allGroupsArr = await getFetch('groups', userToken);
  console.log(allGroupsArr);
  if (!Array.isArray(allGroupsArr)) {
    alert('Jūs esate neprisijungęs arba baigesi Jūsų sesijos laikas. Prisijunkite iš naujo! ');
    window.location.href = 'login.html';
  }
  renderSelect(allGroupsArr, selectEl);
}

addSelectValues(token);
// ---------------------------------------------------- end selecto padarymas
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

// ------------------------------------
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

// ----------------------------------
async function postFetch(group_id) {
  const groupObj = { group_id };
  console.log('assign grupe', groupObj);
  const resp = await fetch(`${BASE_URL}/accounts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(groupObj),
  });
  const dataInJs = await resp.json();
  console.log('dataInJs ===', dataInJs);

  if (dataInJs === 'Account add') {
    errroEl.textContent = '';
    // console.log('Bill add');
    // formEl.elements.amount.value = '';
    // formEl.elements.description.value = '';
    getGroups(token);
    handleError('Account add', true);

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
    handleError('Account dnot add', false);
  }
}

// --------------------------------------

formEl.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log(selectValEl.value);

  const groupObj = {
    group_id: selectValEl.value,
  };
  //   console.log('billObj ===', billObj);
  // ------------------------------------------------
  //   clearErrors();
  //   checkInput(billObj.amount, 'amount', ['required', 'positive']);
  //   checkInput(billObj.description, 'description', ['required', 'minLength-5', 'maxLength-48']);
  //   console.log('FE errorsArr ===', errorsArr);
  // --------------------------------------------------
  // jei yra klaidu FE tada nesiunciam uzklausos
  //   if (errorsArr.length) {
  //     handleError(errorsArr);
  //     return;
  //   }
  postFetch(groupObj.group_id);
});
// -------------------------------------------------------------
// --------------------------------------------------------------EXTRA 2 prideda nauja grupe 
async function postFetchregister(name) {
  const groupObj = { name };
  //   console.log(billObj);
  const resp = await fetch(`${BASE_URL}/groups`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(groupObj),
  });
  const dataInJs = await resp.json();
  console.log('dataInJs ===', dataInJs);

  if (dataInJs === 'Group add') {
    errroEl.textContent = '';
    // console.log('Bill add');
    // formEl.elements.amount.value = '';
    // formEl.elements.description.value = '';
    addSelectValues(token);
    // handleError('Group add', true);

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
    // handleError('Account dnot add', false);
  }
}

// -------------------------------------------------------------

formNewEl.addEventListener('submit', (e) => {
  e.preventDefault();
  const addNewGroupObj = { name: formNewEl.elements.newGroup.value };
  //   console.log(formNewEl.elements.newGroup.value);
  //   console.log('billObj ===', billObj);
  // ------------------------------------------------
  //   clearErrors();
  //   checkInput(addNewGroupObj.name, 'newGroup', ['required', 'minLength-5', 'maxLength-15']);
  //   console.log('FE errorsArr ===', errorsArr);
  // --------------------------------------------------
  //   jei yra klaidu FE tada nesiunciam uzklausos
  //   if (errorsArr.length) {
  //     handleError(errorsArr);
  //     return;
  //   }
  postFetchregister(addNewGroupObj.name);
});
