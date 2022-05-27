import { getFetch } from './modules/fetch.js';

const groupContEl = document.querySelector('.group_container');

const token = localStorage.getItem('Token');
console.log('token ===', token);

function creatEl(tag, text, clas, dest) {
  const newEl = document.createElement(tag);
  newEl.textContent = text;
  newEl.className = clas;
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
      window.location.href = `bills.html?group_id=${obj.group_id}`;
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
