import { updateDisplay } from "./DOM-manipulation";
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
    const task = createTask(taskValue);
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

export { createTaskDialog, taskList }; // Export the function for use in other modules
