let taskIdCounter = tasks.length + 1;

$(document).ready(function () {
  renderTasks();

  $('#addTask').on('click', handleAddTask);
  $('#taskList').on('click', '.view', toggleDetails);
  $('#taskList').on('click', '.edit', toggleEditFields);
  $('#taskList').on('click', '.save', handleSaveEdit);
  $('#taskList').on('click', '.delete', handleDeleteTask);
});

function sortTasksByTime() {
  tasks.sort((a, b) => {
    const dateA = new Date(`2025/01/01 ${a.time}`);
    const dateB = new Date(`2025/01/01 ${b.time}`);
    return dateA - dateB;
  });
}

function renderTasks() {
  sortTasksByTime();
  $('#taskList').empty();
  tasks.forEach(task => $('#taskList').append(createTaskElement(task)));
}

function createTaskElement(task) {
  return $(`
    <li class="task" data-id="${task.id}">
      <strong class="task-title">${task.title}</strong> — 
      <span class="task-time">${task.time}</span>
      <div class="actions">
        <button class="view">View</button>
        <button class="edit">Edit</button>
        <button class="save" style="display:none;">Save</button>
        <button class="delete">Delete</button>
      </div>
      <div class="details">${task.description}</div>

      <div class="edit-fields" style="display:none; margin-top: 10px;">
        <input type="text" class="edit-title" value="${task.title}">
        <input type="text" class="edit-time" value="${task.time}">
        <input type="text" class="edit-description" value="${task.description}">
      </div>
    </li>
  `);
}

function showStatus(message) {
  $('#status').text(message);
  setTimeout(() => $('#status').text(''), 2000);
}

function handleAddTask() {
  const title = $('#title').val().trim();
  const time = $('#time').val().trim();
  const description = $('#description').val().trim();

  if (!title || !time || !description) return;

  tasks.push({
    id: taskIdCounter++,
    title,
    time,
    description
  });

  renderTasks();
  clearInputs();
  showStatus("Task added!");
}

function toggleDetails() {
  $(this).closest('li').find('.details').slideToggle();
}

function toggleEditFields() {
  const $li = $(this).closest('li');
  $li.find('.edit-fields').slideToggle();
  $li.find('.save').show();
}

function handleSaveEdit() {
  const $li = $(this).closest('li');
  const id = parseInt($li.data('id'));
  const task = tasks.find(t => t.id === id);

  const newTitle = $li.find('.edit-title').val().trim();
  const newTime = $li.find('.edit-time').val().trim();
  const newDesc = $li.find('.edit-description').val().trim();

  if (!newTitle || !newTime || !newDesc) return;

  task.title = newTitle;
  task.time = newTime;
  task.description = newDesc;

  renderTasks();
  showStatus("Task updated.");
}

function handleDeleteTask() {
  const id = parseInt($(this).closest('li').data('id'));
  tasks = tasks.filter(task => task.id !== id);
  renderTasks();
  showStatus("Task deleted.");
}

function clearInputs() {
  $('#title, #time, #description').val('');
}
