const form = document.querySelector('.entry-form');
const ul = document.querySelector('.todo-items');
const allItems = document.querySelector('.all-items');
const activeItems = document.querySelector('.active-items');
const completedItems = document.querySelector('.completed-items');
const clearList = document.querySelector('.clear-items');
const modeButton = document.querySelector('.btn-dark-mode');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// check for page theme
const currentTheme = localStorage.getItem('theme');
if (currentTheme == 'dark') {
  document.body.classList.toggle('dark');
} else if (currentTheme == 'light') {
  document.body.classList.toggle('light');
}

// event listeners
form.addEventListener('submit', submitForm);
ul.addEventListener('click', checkordelete);
allItems.addEventListener('click', displayAll);
activeItems.addEventListener('click', displayActive);
completedItems.addEventListener('click', displayCompleted);
clearList.addEventListener('click', clearCompleted);
modeButton.addEventListener('click', switchMode);

// event handlers
function submitForm(e) {
  e.preventDefault();

  let userInput = document.querySelector('#todo-entry');
  const text = userInput.value.trim();
  if (text !== '') {
    addTodo(text);
    userInput.value = '';
    userInput.focus();
  }
  itemsLeft(e);
}

function checkordelete(e) {
  if (e.target.name == 'check-button') {
    checkTodo(e);
  }
  if (e.target.name == 'delete-button') {
    deleteTodo(e);
  }
  itemsLeft(e);
}

function displayAll(e) {
  let li = ul.querySelectorAll('.todo-list-tem');
  const todoli = Array.from(li);

  // check if the li is hidden. if yes, unhide, if no, do nothing
  for (const element of todoli) {
    if (element.classList.contains('hide')) {
      element.classList.toggle('hide');
    } else {
    }
  }
  itemsLeft(e);
}

function displayActive(e) {
  let li = ul.querySelectorAll('.todo-list-tem');
  const todoli = Array.from(li);

  itemsLeft(e);
}

function displayCompleted(e) {
  let li = ul.querySelectorAll('.todo-list-item');
  const todoli = Array.from(li);

  todoli.forEach((element) => {
    if (element.classList.contains('checked')) {
    } else {
      element.classList.toggle('hide');
    }
  });
  itemsLeft(e);
}

function clearCompleted(e) {
  //get all li with class checked
  let li = ul.querySelectorAll('.checked');
  //loop through and remove
  li.forEach((element) => {
    element.remove();
  });

  itemsLeft(e);
}

//function to show number of items left
function itemsLeft(e) {
  let li = ul.querySelectorAll('.todo-list-item');
  const todoli = Array.from(li);

  const items = todoli.length.toString();

  let itemsleft = document.querySelector('.items-left');

  itemsleft.innerHTML = `${items}`;
}

// dark and light mode switch
function switchMode(e) {
  let element = document.body;

  if (prefersDarkScheme.matches) {
    element.classList.toggle('light');
    var theme = element.classList.contains('light') ? 'light' : 'dark';
  } else {
    element.classList.toggle('dark');
    var theme = element.classList.contains('dark') ? 'dark' : 'light';
  }
  localStorage.setItem('theme', theme);
}

// helper functions
const addTodo = (text) => {
  let li = document.createElement('li');
  const todo = { text, id: Date.now() };

  li.innerHTML = `
    <button name = "check-button"><i class = "fas fa-circle fa 2x"></i></button>
    <span class = "todo-item" >${todo.text}</span>
    <button name = "delete-button"><i class = "fas fa-close fa-2x"></i></button>
  `;

  li.classList.add('todo-list-item');
  ul.appendChild(li);
};

const checkTodo = (e) => {
  let listItem = e.target.parentNode;
  if (listItem.style.textDecoration == 'line-through') {
    listItem.style.textDecoration = 'none';
    listItem.classList.remove('checked');
  } else {
    listItem.style.textDecoration = 'line-through';
    listItem.classList.add('checked');
  }
};

const deleteTodo = (e) => {
  let listItem = e.target.parentNode;
  listItem.remove();
};
