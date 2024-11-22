import Task from './task-create.js';
import './index.css';
import { loadEditModal } from './edit-task.component.js';

document.addEventListener("DOMContentLoaded", loadTasks);
document.querySelector(".btn-new").addEventListener('click', addTask);
document.addEventListener('taskUpdated', (event) => updateTask(event));

const statusToListMap = {
  todo: 'todo-list',
  inprogress: 'in-progress-list',
  done: 'done-list'
};

function loadTasks() {
  fetch('http://localhost:3000/tasks')
    .then(response => response.json())
    .then(data => {
      data.forEach(taskData => {
        const task = new Task(taskData);
        const taskElement = task.createTaskElement();
        taskElement.addEventListener('click', () => editTaskClick(taskData));

        const listId = statusToListMap[task.status];
        if (listId) {
          document.getElementById(listId).appendChild(taskElement);
        }
      });
    })
    .catch(error => console.error('Error:', error));
}

function editTaskClick(taskElement) {
  loadEditModal(taskElement)
}

function addTask(event) {
  event.preventDefault();
  const body = new TaskBody('task-name', 'task-desc', 'task-status');

  fetch('http://localhost:3000/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    addTaskToList(data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
}

function addTaskToList(taskData) {
  resetValues();
  const task = new Task(data);
  const taskElement = task.createTaskElement();
  taskElement.addEventListener('click', () => editTaskClick(data));

  const listId = statusToListMap[task.status];
  if (listId) {
    document.getElementById(listId).appendChild(taskElement);
  }
}

function resetValues() {
  document.getElementById('task-name').value = '';
  document.getElementById('task-desc').value = '';
  document.getElementById('task-status').value = '';
}

function TaskBody(titleId, descId, statusId) {
  this.title = document.getElementById(titleId).value;
  this.description = document.getElementById(descId).value;
  this.status = document.getElementById(statusId).value;
  this.createdAt = new Date().toISOString();
  this.updatedAt = "";
}

function updateTask(event) {
  const { updatedTask, originalTaskElement } = event.detail;
  const taskId = originalTaskElement.id;
  syncTaskWithBackend(taskId, updatedTask);
}

function syncTaskWithBackend(taskId, updatedTask) {
  const body = {
    title: updatedTask.title,
    description: updatedTask.description,
    status: updatedTask.status,
    updatedAt: new Date().toISOString(),
  };

  fetch(`http://localhost:3000/tasks/${taskId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    updateTaskInDOM(data, document.querySelector(`[data-task-id="${taskId}"]`));
  })
  .catch((error) => console.error('Error updating task:', error));
}

function updateTaskInDOM(updatedTask, taskElement) {
  taskElement.querySelector('h3').textContent = updatedTask.title;
  taskElement.querySelector('.task-desc').textContent = updatedTask.description;
  taskElement.querySelector('.task-status').textContent = updatedTask.status;
  taskElement.querySelector('.task-date').textContent = new Date(updatedTask.updatedAt).toLocaleDateString('en-GB');
}
