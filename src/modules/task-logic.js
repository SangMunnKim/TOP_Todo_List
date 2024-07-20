function createTask(description, dueDate, priority) {
    return {
        description: description,
        dueDate: dueDate,
        priority: priority,
        isComplete: false,
        getInfo: function() {
            return `Description: ${this.description}, Due Date: ${this.dueDate}, Priority: ${this.priority}, Complete: ${this.isComplete}`;
        }
    };
};
