
const addTaskBtn = documment.querySelector('button.add-task');

addTaskBtn.addEventListener('click', () => {

});

function createTaskDialog() {
    const taskDialog = document.createElement('div');
    taskDialog.classList.add('task-dialog');
    
    const taskInput = document.createElement('input');
    taskInput.type = 'text';
    taskInput.placeholder = 'Enter task';
    
    const addTaskBtn = document.createElement('button');
    addTaskBtn.textContent = 'Add task';

    const cancelBtn = document.createElement('button');
    addTaskBtn.textContent = 'Cancel';
    
    taskDialog.appendChild(taskInput);
    taskDialog.appendChild(addTaskBtn);
    taskDialog.appendChild(cancelBtn);

    return taskDialog;
}
