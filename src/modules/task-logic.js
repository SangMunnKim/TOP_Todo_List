const tasksList = [];

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
    cancelBtn.addEventListener('click', () => handleCancelTask(taskDialog));

    return taskDialog;
}

function handleAddTask(taskValue, dialog) {
    const task = createTask(taskValue);
    tasksList.push(task);
    console.log(tasksList);
    dialog.close();
}

function handleCancelTask(dialog) {
    dialog.close();
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

export { createTaskDialog }; // Export the function for use in other modules
