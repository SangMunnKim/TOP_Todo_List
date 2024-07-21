import { add, format, getISODay } from "date-fns";
import { taskList } from './task-logic.js';

const displayTasks = document.querySelector('.display-tasks');
let currentProject = 'Default';
let currentFilter = 'All';

function getCurrentProject() {
    return currentProject;
}

function setCurrentProject(project) { 
    currentProject = project;
}

function getCurrentFilter() {
    return currentFilter;
}

function setCurrentFilter(filter) {
    currentFilter = filter;
}


function updateDisplay() {
    displayTasks.innerHTML = '';
    switch (currentFilter) {
        case 'All':
            displayAllTasks();
            console.log("displaying all tasks");
            break;
        case 'Today':
            displayTodayTasks();
            console.log("displaying today tasks");
            break;
        case 'This week':
            displayWeekTasks();
            console.log("displaying week tasks");
            break;
        case 'Completed':
            displayCompletedTasks();
            console.log("displaying completed tasks");
            break;
    }
    console.log(taskList); 
}

function displayAllTasks() {
    for (let i = taskList.length - 1; i >= 0; i--) {
        const taskBox = taskList[i].element;
        if (!taskList[i].object.getIsComplete()) {
            displayTasks.appendChild(taskBox);
        };
    }
};

function displayTodayTasks() {
    const today = format(new Date(), 'dd.MM.yyyy');
    for (let i = taskList.length - 1; i >= 0; i--) {
        const taskBox = taskList[i].element;
        const taskDate = taskList[i].object.getDate().split(' ')[0];
        if (taskDate ===  today && !taskList[i].object.getIsComplete()) {
            displayTasks.appendChild(taskBox);
        };
    }
}

function displayWeekTasks() {
    const week = format(new Date(), 'w');
    for (let i = taskList.length - 1; i >= 0; i--) {
        const taskBox = taskList[i].element;
        const taskDate = taskList[i].object.getDate().split(' ')[0]; // Get the date part
        const [day, month, year] = taskDate.split('.'); // Split the date into components
        const parsedDate = new Date(`${year}-${month}-${day}`); // Reformat to yyyy-MM-dd

        const taskWeek = format(parsedDate, 'w'); // Get the week number of the task
        if (taskWeek === week && !taskList[i].object.getIsComplete()) {
            displayTasks.appendChild(taskBox);
        }
    }
}

function displayCompletedTasks() {
    for (let i = taskList.length - 1; i >= 0; i--) {
        const taskBox = taskList[i].element;
        if (taskList[i].object.getIsComplete()) {
            displayTasks.appendChild(taskBox);
        };
    }
}


export { updateDisplay, getCurrentProject, setCurrentProject, getCurrentFilter, setCurrentFilter };