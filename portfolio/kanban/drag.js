const draggables = document.querySelectorAll('.task');
const droppables = document.querySelectorAll('.lane');
const allowSortDrop = true

draggables.forEach(task => {
  task.addEventListener('dragstart', () => {
    task.classList.add('dragging');
    })
    task.addEventListener('dragend', () => {
      task.classList.remove('dragging');
    })
})

droppables.forEach(lane => {
  lane.addEventListener('dragover', e => {
    e.preventDefault();
    const afterElement = getDragAfterElement(lane, e.clientY);
    const draggable = document.querySelector('.dragging');
    allowSortDrop && afterElement
      ? lane.insertBefore(draggable, afterElement)
      : lane.appendChild(draggable)
  })
})

function getDragAfterElement(container, mouseY) {
  const draggableElements = [...container.querySelectorAll('.task:not(.dragging)')];
  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = mouseY - box.top - box.height / 2;
    return offset < 0 && offset > closest.offset 
      ? { offset: offset, element: child }
      : closest;
  }, { offset: Number.NEGATIVE_INFINITY }).element;
}
