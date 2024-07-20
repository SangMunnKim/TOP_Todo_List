import { ta } from "date-fns/locale";
import { updateDisplay } from "./display-logic.js";

const taskList = [];

function createTaskDialog() {
    const taskDialog = document.createElement('dialog');
    taskDialog.classList.add('task-dialog');
    
    const taskInput = document.createElement('input');
    taskInput.type = 'text';
    taskInput.placeholder = 'Enter task';
    
    const addBtn = document.createElement('button');
    addBtn.textContent = 'Add task';

    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = 'Cancel';
    
    taskDialog.appendChild(taskInput);
    taskDialog.appendChild(addBtn);
    taskDialog.appendChild(cancelBtn);


    addBtn.addEventListener('click', () => handleAddTask(taskInput.value, taskDialog));
    taskInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleAddTask(taskInput.value, taskDialog);
        }
    });
    cancelBtn.addEventListener('click', () => handleCancelTask(taskDialog));

    return taskDialog;
}

function handleAddTask(taskValue, dialog) {
    if (taskValue.trim() === "") return; // Prevent adding empty tasks
    const task = {};
    const taskObject = createTask(taskValue);
    const taskBoxElement = taskBox(taskObject);

    task['ID'] = generateUniqueId();
    task['object'] = taskObject;
    task['element'] = taskBoxElement;

    taskList.push(task);

    console.log(taskList);

    dialog.close();
    dialog.remove();
    updateDisplay();
}

function handleCancelTask(dialog) {
    dialog.close();
    dialog.remove();   
}

function createTask(task) {
    return {
        task: task,
        isComplete: false,

        getTask : function() {
            return this.task;
        },

        getIsComplete: function() {
            return this.isComplete;
        },
    };
};

function taskBox(task) {
    const taskBox = document.createElement('div');
    const container = document.createElement('div');
    const completeBtn = document.createElement('button');
    const deleteBtn = document.createElement('button');
    
    taskBox.classList.add('task-box');
    container.classList.add('task-mini-container');
    completeBtn.classList.add('complete-btn');
    deleteBtn.classList.add('delete-btn');

    completeBtn.textContent = 'Complete';
    deleteBtn.textContent = 'Delete';  

    taskBox.textContent = task.getTask();
    
    container.appendChild(completeBtn);
    container.appendChild(deleteBtn);
    taskBox.appendChild(container);

    

    return taskBox;
}

function generateUniqueId() {
    const timestamp = Date.now(); // Get the current timestamp
    const randomNum = Math.floor(Math.random() * 1000000); // Generate a random number
    return `task-${timestamp}-${randomNum}`; // Combine them to form a unique ID
}

export { createTaskDialog, taskList }; // Export the function for use in other modules
