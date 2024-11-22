export default class Task {
  constructor({id, title, description, status, createdAt }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.status = status;
    this.createdAt = createdAt;
  }

  createTaskElement() {
    const taskElement = document.createElement('div');
    taskElement.className = 'task-item';
    taskElement.dataset.taskId = this.id;

    const taskTitle = document.createElement('h3');
    taskTitle.textContent = this.title;

    const taskDescription = document.createElement('p');
    taskDescription.textContent = this.description;
    taskDescription.className = 'task-desc';

    const taskStatus = document.createElement('p');
    taskStatus.textContent = this.status;
    taskStatus.className = 'task-status';

    const taskDate = document.createElement('p');
    taskDate.textContent = new Date(this.createdAt).toLocaleDateString('en-GB');
    taskDate.className = 'task-date';

    taskElement.appendChild(taskTitle);
    taskElement.appendChild(taskDescription);
    taskElement.appendChild(taskStatus);
    taskElement.appendChild(taskDate);

    return taskElement;
  }
}
