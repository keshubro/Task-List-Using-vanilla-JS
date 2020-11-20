// Define UI variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

function loadEventListeners(){
    //Add task event
    form.addEventListener('submit', addTask);
}

function addTask(e){
    if(taskInput.value === ''){
        alert('Add a task');
    }

    // Create an li element
    li = document.createElement('li');
    // Add a class
    li.className = 'collection-item'    /* because of materialize */

    //Add id
    li.id = 'new-item';

    //Append text node to li
    li.appendChild(document.createTextNode(taskInput.value));

    //Create a new link element
    const link = document.createElement('a');
    //Add class
    link.className = 'delete-item secondary-content';

    //Create an i element
    const i = document.createElement('i');
    i.className = 'fa fa-remove';

    //Append i to link
    link.appendChild(i);

    //Append a to li
    li.appendChild(link);

    //Append li to ul
    taskList.appendChild(li);


    e.preventDefault();
}