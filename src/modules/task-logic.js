import { addDays, format, startOfWeek, endOfWeek } from "date-fns";
import { updateDisplay, getCurrentProject } from "./display-logic.js";

const taskList = [];

function addTask(task) {
    taskList.push(task);
};

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

    addTask(task);

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
        project: getCurrentProject(),

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

        getProject : function() {
            return this.project;
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
    const projectBox = document.createElement('div');
    
    taskBox.classList.add('task-box');
    descriptionContainer.classList.add('descriptionContainer');
    btnContainer.classList.add('btnContainer');
    completeBtn.classList.add('complete-btn');
    deleteBtn.classList.add('delete-btn');
    descriptionBox.classList.add('descriptionBox');
    dateBox.classList.add('dateBox');
    projectBox.classList.add('projectBox');

    completeBtn.textContent = 'Complete';
    deleteBtn.textContent = 'Delete';  

    descriptionBox.textContent = task.getTask();
    dateBox.textContent = task.getDate();
    projectBox.textContent = `Project: ${task.getProject()}`;

    descriptionContainer.appendChild(descriptionBox);
    descriptionContainer.appendChild(dateBox);
    // descriptionContainer.appendChild(projectBox);

    if (!task.getIsComplete()) {
        btnContainer.appendChild(completeBtn);
    }
    btnContainer.appendChild(deleteBtn);

    taskBox.appendChild(descriptionContainer);
    taskBox.appendChild(btnContainer);
    taskBox.setAttribute('id', task.getID());

    completeBtn.addEventListener('click', () => handleCompleteTask(task.getID()));
    deleteBtn.addEventListener('click', () => handleDeleteTask(task.getID()));

    return taskBox;
}

function handleCompleteTask(taskID) {
    const taskIndex = taskList.findIndex(task => task.object.getID() === taskID);
    if (taskIndex !== -1) {
        taskList[taskIndex].object.setIsComplete();
        const taskElement = taskList[taskIndex].element;
        const completeButton = taskElement.querySelector('.complete-btn');
        if (completeButton) {
            completeButton.remove();
        }
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

// Function to create a task object
function createExampleTask(taskName, daysToAdd, isComplete = false) {
    const taskDate = format(addDays(new Date(), daysToAdd), 'dd.MM.yyyy HH:mm:ss');
    return {
        task: taskName,
        ID: generateUniqueId(),
        date: taskDate,
        isComplete: isComplete,
        project: getCurrentProject(),

        getTask: function () {
            return this.task;
        },

        getID: function () {
            return this.ID;
        },

        getDate: function () {
            return this.date;
        },

        getIsComplete: function () {
            return this.isComplete;
        },

        getProject: function () {
            return this.project;
        },

        setIsComplete: function () {
            this.isComplete = true;
        },
    };
}

// Function to create and add tasks to the taskList
function addTaskToList(taskName, daysToAdd, isComplete = false) {
    const taskObject = createExampleTask(taskName, daysToAdd, isComplete);
    const taskElement = taskBox(taskObject);
    const task = {
        object: taskObject,
        element: taskElement
    };
    taskList.push(task);
}

// Create example tasks
addTaskToList('Task for today', 0); // Today's date
addTaskToList('Task for tomorrow', 1); // Tomorrow's date
addTaskToList('Task for day after tomorrow', 2); // Day after tomorrow's date
addTaskToList('Task for three days from now', 3); // Three days from now
addTaskToList('Task completed today', 0, true); // Today's date, completed
addTaskToList('Task completed this week', 1, true); // Tomorrow's date, completed
addTaskToList('Task completed last week', -7, true); // Last week's date, completed
addTaskToList('Task for next week', 7); // Next week's date
addTaskToList('Task for last week', -7); // Last week's date

// Log the taskList to verify
console.log(taskList);


export { createTaskDialog, taskList }; // Export the function for use in other modules
