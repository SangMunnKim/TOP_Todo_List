import { createTaskDialog } from './task-logic.js';
import { updateDisplay, setCurrentFilter} from './display-logic.js';


const container = document.querySelector('.container');
const header = document.querySelector('.header');
const sidebar = document.querySelector('.sidebar');
const main = document.querySelector('.main');
const footer = document.querySelector('.footer');
const addTaskBtn = document.querySelector('.add-task');
const allTasksBtn = document.querySelector('#all-tasks');
const todayTasksBtn = document.querySelector('#today');
const weekTasksBtn = document.querySelector('#this-Week');
const completedTasksBtn = document.querySelector('#completed-tasks');

addTaskBtn.addEventListener('click', (e) => {
    const taskDialog = createTaskDialog();
    main.appendChild(taskDialog);
    taskDialog.showModal();
});

allTasksBtn.addEventListener('click', () => {
    console.log('All tasks button clicked');
    setCurrentFilter('All');
    updateDisplay();
});

todayTasksBtn.addEventListener('click', () => {
    console.log('Today button clicked');
    setCurrentFilter('Today');
    updateDisplay();
});

weekTasksBtn.addEventListener('click', () => {
    console.log('This week button clicked');
    setCurrentFilter('This week');
    updateDisplay();
});

completedTasksBtn.addEventListener('click', () => {
    console.log('Completed button clicked');
    setCurrentFilter('Completed');
    updateDisplay();
});


export { addTaskBtn }; // Export the button for use in other modules