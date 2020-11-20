// Define UI variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

function loadEventListeners(){

    //DOM Load event
    document.addEventListener('DOMContentLoaded', getTasks);

    //Add task event
    form.addEventListener('submit', addTask);

    //Remove list item
    taskList.addEventListener('click', removeSingleTask);

    //Clear all tasks
    clearBtn.addEventListener('click', clearTasks);

    //Filter tasks
    filter.addEventListener('keyup', filterTasks);
}

//Get tasks from Local Storage
function getTasks()
{
    let tasks;
    if(localStorage.getItem('tasks') == null)
    {
        tasks = [];
    }
    else
    {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
            // Create an li element
        li = document.createElement('li');
        // Add a class
        li.className = 'collection-item'    /* because of materialize */

        //Add id
        li.id = 'new-item';

        //Append text node to li
        li.appendChild(document.createTextNode(task));

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
    });

    //console.log('Ready to get tasks');
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

    // Store task in Local Storage
    storeTaskInLocalStorage(taskInput.value);


    //Clear input
    taskInput.value = '';

    e.preventDefault();
}

function storeTaskInLocalStorage(task)
{
    let tasks;
    if(localStorage.getItem('tasks') == null)
    {
        tasks = [];
    }
    else
    {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}


function removeSingleTask(e)
{

    if(e.target.parentElement.classList.contains('delete-item'))
    {
        if(confirm('Are you sure'))
            e.target.parentElement.parentElement.remove();
    }

    //Remove from Local Storage
    removeTaskFromLocalStorage(e.target.parentElement.parentElement);
}

function removeTaskFromLocalStorage(taskItem)
{
    let tasks;
    if(localStorage.getItem('tasks') == null)
    {
        tasks = [];
    }
    else
    {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index){
        if(taskItem.textContent === task)
        {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearTasks(e)
{
    //If there is any first child
    while(taskList.firstChild)
    {
        taskList.removeChild(taskList.firstChild);
    }

    //Clear all tasks from Local Storage
    clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage()
{
    localStorage.clear();
}

function filterTasks(e)
{
    const text = e.target.value.toLowerCase();
    
    document.querySelectorAll('.collection-item').forEach(
        function(task){
            const item = task.firstChild.textContent.toLowerCase();
            if(item.indexOf(text) != -1)
            {
                task.style.display = 'block';
            }
            else
            {   
                task.style.display = 'none';
            }
        }
    );

}