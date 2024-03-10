const draggables = document.querySelectorAll('.task');
const droppables = document.querySelectorAll('.lane');
const allowSortDrop = true

draggables.forEach(task => {
  task.addEventListener('dragstart', e => {
    task.classList.add('dragging');
    // e.dataTransfer.setDragImage(document.querySelector('button'), '50%', '50%') // make the drag "ghost" appear like another element
  })
  task.addEventListener('dragend', () => {
    task.classList.remove('dragging');
  })
})

droppables.forEach(lane => {
  lane.addEventListener('dragover', e => {
    e.preventDefault();
    lane.classList.add('dragover');
    const afterElement = getDragAfterElement(lane, e.clientY);
    const draggable = document.querySelector('.dragging');
    allowSortDrop && afterElement
      ? lane.insertBefore(draggable, afterElement)
      : lane.appendChild(draggable)
  })
})
// droppables.forEach(lane => {
//   lane.addEventListener('dragenter', e => {
//   })
// })
droppables.forEach(lane => {
  lane.addEventListener('dragleave', e => {
    e.stopPropagation()
    lane.classList.remove('dragover');
  })
})
droppables.forEach(lane => {
  lane.addEventListener('dragend', e => {
    lane.classList.remove('dragover');
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
