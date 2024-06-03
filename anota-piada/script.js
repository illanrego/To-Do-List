import LocalStorage from './LocalStorage.js';

const storage = new LocalStorage();

const piadas = storage.piadas;

const container = document.querySelector('.piadas');
const template = document.querySelector('#piada');

const createTaskForm = document.querySelector('.create-piada');
const createTaskField = document.querySelector('.create-piada__textarea');
const createTaskButton = document.querySelector('.create-piada__submit');

piadas.forEach((bit) => {
  onCreateTask({bit});
});

createTaskField.addEventListener('input', () => {
  createTaskButton.disabled = !createTaskField.value;
});

createTaskForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const value = createTaskField.value;

  if (value) {
    const bit = {
      value,
      checked: false
    };

    storage.create(bit);

    onCreateTask({bit});

    createTaskForm.reset();
  }
});

function onCreateTask({bit}) {
  const clone = template.content.cloneNode(true);

  const piada = clone.querySelector('.piada');
  const checkbox = clone.querySelector('.piada__checkbox');
  const title = clone.querySelector('.piada__text');
  const del = clone.querySelector('.piada__delete');

  title.innerHTML = bit.value;
  checkbox.checked = bit.checked;

  toggleTaskStatusClass({checked: bit.checked, piada});

  checkbox.addEventListener('input', () => {
    bit.checked = checkbox.checked;

    toggleTaskStatusClass({checked: bit.checked, piada});

    storage.update(bit);
  });

  title.addEventListener('input', () => {
    bit.value = title.innerHTML;

    storage.update(bit);
  });

  del.addEventListener('click', (e) => {
    storage.delete(bit);

    piada.remove();
  });

  container.appendChild(clone);
}

function toggleTaskStatusClass({checked, piada}) {
  piada.classList[checked ? 'add' : 'remove']('piada--done');
}
