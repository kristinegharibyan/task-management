import modalHtml from './edit-task.component.html';
import './edit-task.component.css';

export function loadEditModal(taskElement) {
  const modal = createModal();
  document.getElementById('edit-task-name').value = taskElement.title;
  document.getElementById('edit-task-desc').value = taskElement.description;
  document.getElementById('edit-task-status').value = taskElement.status;

  modal.style.display = 'block';
  setupCloseModal(modal);
  setUpSaveButton(modal, taskElement);
}

function createModal() {
    const modalContainer = document.createElement('div');
    modalContainer.innerHTML = modalHtml;
    document.body.appendChild(modalContainer);
  
    const modal = document.getElementById('edit-modal');
  
    if (!modal) {
      console.error('Modal not found!');
      return;
    } else {
      return modal;
    }
}

function setupCloseModal(modal) {
  const closeButton = modal.querySelector('.close');
  closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
  });
}

function setUpSaveButton(modal, taskElement) {
  const saveButton = document.getElementById('save-task');

  saveButton.addEventListener('click', () => {
    const updatedTask = {
      title: document.getElementById('edit-task-name').value,
      description: document.getElementById('edit-task-desc').value,
      status: document.getElementById('edit-task-status').value,
    };

    const taskUpdatedEvent = new CustomEvent('taskUpdated', {
      detail: {
        updatedTask,
        originalTaskElement: taskElement,
      },
    });

    document.dispatchEvent(taskUpdatedEvent);
    modal.style.display = 'none';
  });
}
