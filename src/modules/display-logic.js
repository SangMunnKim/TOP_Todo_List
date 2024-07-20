import { taskList } from './task-logic.js';

const displayTasks = document.querySelector('.display-tasks');

function updateDisplay() {
    displayTasks.innerHTML = '';
    for (let i = 0; i < taskList.length; i++) {
        const taskBox = taskList[i].element;
        if (!taskList[i].object.isComplete) {
            displayTasks.appendChild(taskBox);
        };
    }
}



export { updateDisplay };