import { add, format, getISODay } from "date-fns";
import { taskList } from './task-logic.js';
import { he } from "date-fns/locale";

const displayTasks = document.querySelector('.display-tasks');
const heading = document.querySelector('.main h1');
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
    heading.textContent = currentFilter;
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
    const sortedTasks = taskList.filter(task => !task.object.getIsComplete())
        .sort((a, b) => parseTaskDate(a.object.getDate()) - parseTaskDate(b.object.getDate()));

    sortedTasks.forEach(task => {
        const taskBox = task.element;
        displayTasks.appendChild(taskBox);
    });
}

function displayTodayTasks() {
    const today = format(new Date(), 'dd.MM.yyyy');
    const sortedTasks = taskList.filter(task => {
        const taskDate = task.object.getDate().split(' ')[0];
        return taskDate === today && !task.object.getIsComplete();
    }).sort((a, b) => parseTaskDate(a.object.getDate()) - parseTaskDate(b.object.getDate()));

    sortedTasks.forEach(task => {
        const taskBox = task.element;
        displayTasks.appendChild(taskBox);
    });
}

function displayWeekTasks() {
    const week = format(new Date(), 'w');
    const sortedTasks = taskList.filter(task => {
        const taskDate = task.object.getDate().split(' ')[0];
        const [day, month, year] = taskDate.split('.');
        const parsedDate = new Date(`${year}-${month}-${day}`);
        const taskWeek = format(parsedDate, 'w');
        return taskWeek === week && !task.object.getIsComplete();
    }).sort((a, b) => parseTaskDate(a.object.getDate()) - parseTaskDate(b.object.getDate()));

    sortedTasks.forEach(task => {
        const taskBox = task.element;
        displayTasks.appendChild(taskBox);
    });
}

function displayCompletedTasks() {
    const sortedTasks = taskList.filter(task => task.object.getIsComplete())
        .sort((a, b) => parseTaskDate(a.object.getDate()) - parseTaskDate(b.object.getDate()));

    sortedTasks.forEach(task => {
        const taskBox = task.element;
        displayTasks.appendChild(taskBox);
    });
}

function parseTaskDate(taskDate) {
    const [datePart, timePart] = taskDate.split(' ');
    const [day, month, year] = datePart.split('.');
    return new Date(`${year}-${month}-${day}T${timePart}`);
}

export { updateDisplay, getCurrentProject, setCurrentProject, getCurrentFilter, setCurrentFilter };