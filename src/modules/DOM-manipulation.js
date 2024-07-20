import { createTaskDialog } from './task-logic.js';

const container = document.querySelector('.container');
const header = document.querySelector('.header');
const sidebar = document.querySelector('.sidebar');
const main = document.querySelector('.main');
const footer = document.querySelector('.footer');
const addTaskBtn = document.querySelector('.add-task');

addTaskBtn.addEventListener('click', (e) => {
    const taskDialog = createTaskDialog();
    main.appendChild(taskDialog);
    taskDialog.showModal();
});

export { addTaskBtn }; // Export the button for use in other modules