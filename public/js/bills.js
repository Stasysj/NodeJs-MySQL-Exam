import { getFetch } from './modules/fetch.js';

const bodyEl = document.querySelector('tbody');

const token = localStorage.getItem('Token');
console.log('token ===', token);

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
  const groupsArr = await getFetch(`bills/${groupID[1]}`, userToken);
  console.log('groupsArr ===', groupsArr);
  //   if (!Array.isArray(groupsArr)) {
  //     alert('Jūs esate neprisijungęs arba baigesi Jūsų sesijos laikas. Prisijunkite iš naujo! ');
  //     window.location.href = 'login.html';
  //   }

  renderBill(groupsArr, bodyEl);
}

getBills(token);

// const groupID = window.location.search.split('=');
// console.log('groupID',groupID[1]);
