import { getFetch } from './modules/fetch.js';

const groupContEl = document.querySelector('.group_container');
const divFormEl = document.querySelector('.form-group');
const addGroupTitlePEl = document.querySelector('.addtitle');
const formEl = document.getElementById('group');
const token = localStorage.getItem('Token');
console.log('token ===', token);

// -------------------------------
divFormEl.addEventListener('click', addMeniu);
function addMeniu() {
  console.log('click');
  formEl.classList = 'see-form';
  addGroupTitlePEl.textContent = '';
  divFormEl.removeEventListener('click', addMeniu);
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

// -------------------------------extra
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
