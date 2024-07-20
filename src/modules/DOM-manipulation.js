import { createTaskDialog, taskList } from './task-logic.js';

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

function updateDisplay() {
    for (let i = 0; i < taskList.length; i++) {
        const task = document.createElement('div');
        task.classList.add('task');
        const taskText = taskList[i].task;
        task.textContent = taskText;
        main.appendChild(task);
    }
}

export { addTaskBtn, updateDisplay }; // Export the button for use in other modules