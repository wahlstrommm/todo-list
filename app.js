const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//load all eventlister

loadEventListeners();

function loadEventListeners() {
  //DOM loadevent
  document.addEventListener('DOMContentLoaded', getTasks);
  form.addEventListener('submit', addTask);
  //remove taskevent
  taskList.addEventListener('click', removeTask);
  //clear task
  clearBtn.addEventListener('click', clearTasks);
  //filter tasks
  filter.addEventListener('keyup', filterTasks);
}
//Get tasks from LS
function getTasks() {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function (task) {
    console.log(task);
    //create li
    const li = document.createElement('li');
    //add class
    li.className = 'collection-item';

    //create textnode + append
    li.appendChild(document.createTextNode(task));
    //create new link element
    const link = document.createElement('a');
    // add class
    link.className = 'delete-item secondary-content';
    //add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //append the link to li
    li.append(link);
    //append li to ul
    taskList.appendChild(li);
  });
}

//add task
function addTask(e) {
  if (taskInput.value === '') {
    alert('add task');
  }
  //create li
  const li = document.createElement('li');
  //add class
  li.className = 'collection-item';

  //create textnode + append
  li.appendChild(document.createTextNode(taskInput.value));
  //create new link element
  const link = document.createElement('a');
  // add class
  link.className = 'delete-item secondary-content';
  //add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  //append the link to li
  li.append(link);
  //append li to ul
  taskList.appendChild(li);

  //store in LS
  storeTaskInLocalStorage(taskInput.value);
  //clear input
  taskInput.value = '';
  e.preventDefault();
}

//Store in LocalStorage
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

//remove task
function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are you sure?')) {
      e.target.parentElement.parentElement.remove();
      //remove LS
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

//remove from LocalStorage
function removeTaskFromLocalStorage(taskItem) {
  console.log(taskItem);
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function (task, index) {
    if (taskItem.textContent === task) {
      task.splice(index, 1);
    }
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

//clear all tasks
function clearTasks() {
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  //clear from LS
  clearTasksFromLocalStorage();
}

//clear tasks from LS
function clearTasksFromLocalStorage() {
  localStorage.clear();
}

//filter tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();
  document.querySelectorAll('.collection-item').forEach(function (task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}
