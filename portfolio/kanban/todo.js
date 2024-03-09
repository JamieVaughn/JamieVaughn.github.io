const form = document.querySelector('form');
const input = document.querySelector('input');
const todos = document.querySelector('#todo-lane');

form.addEventListener('submit', e => {
  e.preventDefault();
  const todoText = input.value;
  if (!todoText) return
  const todo = document.createElement('p');
  todo.classList.add('task');
  todo.setAttribute('draggable', true);
  todo.textContent = todoText;
  todos.appendChild(todo);
  input.value = '';
  todo.addEventListener('dragstart', () => {
    todo.classList.add('dragging');
    })
  todo.addEventListener('dragend', () => {
    todo.classList.remove('dragging');
  })
})
