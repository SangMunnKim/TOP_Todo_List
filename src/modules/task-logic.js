import { format, getISODay } from "date-fns";
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
        ID: generateUniqueId(),
        date: format(new Date(), 'dd.MM.yyyy HH:mm:ss'),
        isComplete: false,

        getTask : function() {
            return this.task;
        },

        getID: function() {
            return this.ID;
        },

        getDate: function() {
            return this.date;
        },

        getIsComplete: function() {
            return this.isComplete;
        },

        setIsComplete: function() { 
            this.isComplete = true;
        },
    };
};

function taskBox(task) {
    const taskBox = document.createElement('div');
    const descriptionContainer = document.createElement('div');
    const btnContainer = document.createElement('div');
    const completeBtn = document.createElement('button');
    const deleteBtn = document.createElement('button');
    const descriptionBox = document.createElement('div');
    const dateBox = document.createElement('div');
    
    taskBox.classList.add('task-box');
    descriptionContainer.classList.add('descriptionContainer');
    btnContainer.classList.add('btnContainer');
    completeBtn.classList.add('complete-btn');
    deleteBtn.classList.add('delete-btn');
    descriptionBox.classList.add('descriptionBox');
    dateBox.classList.add('dateBox');

    completeBtn.textContent = 'Complete';
    deleteBtn.textContent = 'Delete';  

    descriptionBox.textContent = task.getTask();
    dateBox.textContent = task.getDate();
    descriptionContainer.appendChild(descriptionBox);
    descriptionContainer.appendChild(dateBox);
    
    btnContainer.appendChild(completeBtn);
    btnContainer.appendChild(deleteBtn);
    taskBox.appendChild(descriptionContainer);
    taskBox.appendChild(btnContainer);

    completeBtn.addEventListener('click', () => handleCompleteTask(task.getID()));
    deleteBtn.addEventListener('click', () => handleDeleteTask(task.getID()));

    return taskBox;
}

function handleCompleteTask(taskID) {
    const taskIndex = taskList.findIndex(task => task.object.getID() === taskID);
    if (taskIndex !== -1) {
        taskList[taskIndex].object.setIsComplete();
        updateDisplay();
    }
}

function handleDeleteTask(taskID) {
    const taskIndex = taskList.findIndex(task => task.object.getID() === taskID);
    if (taskIndex !== -1) {
        taskList.splice(taskIndex, 1);
        updateDisplay();
    }
}

function generateUniqueId() {
    const timestamp = Date.now(); // Get the current timestamp
    const randomNum = Math.floor(Math.random() * 1000000); // Generate a random number
    return `task-${timestamp}-${randomNum}`; // Combine them to form a unique ID
}

export { createTaskDialog, taskList }; // Export the function for use in other modules
