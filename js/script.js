
const toggleButton = document.querySelector('.dark-light');
const colors = document.querySelectorAll('.color');

colors.forEach(color => {
  color.addEventListener('click', e => {
    colors.forEach(c => c.classList.remove('selected'));
    const theme = color.getAttribute('data-color');
    document.body.setAttribute('data-theme', theme);
    color.classList.add('selected');
  });
});

toggleButton.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});
function popupDisplay(id) {
  var element = document.getElementById(id);
  if (element) {
      element.style.display = "flex";
      element.style.transition = "0.3s";
  }
}

function popupDisplayNone(id) {
  var element = document.getElementById(id);
  if (element) {
      element.style.display = "none";
      element.style.transition = "0.3s";
  }
  window.location.reload();
}


const menubtn = document.getElementById('menubtn');
const menu = document.getElementById('menu');
const gearTurn = document.getElementById('gear-turn');
const menuTurnBtn = document.getElementById('menu-trun-btn');
menu.style.transform = 'translateX(200px)';
menuTurnBtn.style.transform = 'rotateZ(180deg)';

menubtn.addEventListener('click', () => {
  gearTurn.style.transform = gearTurn.style.transform === 'rotateZ(360deg)' ? 'rotateZ(0)' : 'rotateZ(360deg)';
  menuTurnBtn.style.transform = menuTurnBtn.style.transform === 'rotateZ(180deg)' ? 'rotateZ(0)' : 'rotateZ(180deg)';
  menu.style.transform = menu.style.transform === 'translateX(200px)' ? 'translateX(0)' : 'translateX(200px)';
});
      

document.addEventListener('click', (event) => {
  if (!menubtn.contains(event.target) && !menu.contains(event.target) && !gearTurn.contains(event.target)) {
      menu.style.transform = 'translateX(200px)';
      gearTurn.style.transform = 'rotateZ(0)';
      menuTurnBtn.style.transform = 'rotateZ(180deg)';
  }
});

function progress(start, end, speed, valueClass, circleClass, barColor) {
  let progressValue = document.querySelector(valueClass);
  let circularProgress = document.querySelector(circleClass);
  let progressStartValue = start;

  let progressInterval = setInterval(() => {
      progressStartValue++;
      progressValue.textContent = `${progressStartValue}%`;
      circularProgress.style.background = `conic-gradient(${barColor} ${progressStartValue * 3.6}deg, var(--button-color) 0deg)`;

      if (progressStartValue === end) {
          clearInterval(progressInterval);
      }
  }, speed);
}


const btns = document.querySelectorAll('.btn');
const dropMenus = document.querySelectorAll('.drop-menu');

btns.forEach(btn => {
    btn.addEventListener('click', () => {
        removeActive();
        btn.classList.add('active');
        document.querySelector(btn.dataset.target).classList.add('active');
    })
})

const removeActive = () => {
    btns.forEach(btn => btn.classList.remove('active'));
    dropMenus.forEach(dropmenu => dropmenu.classList.remove('active'));
}

window.onclick = (e) => {
    if (!e.target.matches('.btn')) {
        removeActive()
    }
}

const imageInput = document.getElementById('image-update');
const browseImageBtn= document.getElementById('browse-img-btn');

browseImageBtn.addEventListener('click', () => {
  imageInput.click();
});



function addDragAndDropHandlers(element) {
  const taskBacklog = document.getElementById('section-backlog');
  const taskInProgress = document.getElementById('section-in-progress');
  const taskCompleted = document.getElementById('section-completed');
  element.addEventListener("dragstart", function(e) {
      e.dataTransfer.setData("text/plain", e.target.id);
  });
  

  [taskBacklog, taskInProgress, taskCompleted].forEach(taskContainer => {
      taskContainer.addEventListener("dragover", function(e) {
          e.preventDefault();
      });
      taskContainer.addEventListener("drop", function(e) {
          e.preventDefault();
          const taskId = e.dataTransfer.getData("text/plain");
          const taskElement = document.getElementById(taskId);
          taskContainer.appendChild(taskElement);

          let newStatus;
          if (taskContainer === taskBacklog) {
              newStatus = "backlog";
          } else if (taskContainer === taskInProgress) {
              newStatus = "in_progress";
          } else if (taskContainer === taskCompleted) {
              newStatus = "completed";
          }
          updateTask(taskId, newStatus);
      });
  });
}

const tasks = document.querySelectorAll(".task-type");
const all_status = document.querySelectorAll(".task-list");
let draggableTask;

tasks.forEach((task) => {
  task.addEventListener("dragstart", dragStart);
  task.addEventListener("dragend", dragEnd);
});

function dragStart() {
  draggableTask = this;
  setTimeout(() => {
    this.style.display = "none";
  }, 50);
}

function dragEnd() {
  draggableTask = null;
  setTimeout(() => {
    this.style.display = "block";
  }, 50);
}

all_status.forEach((status) => {
  status.addEventListener("dragover", dragOver);
  status.addEventListener("dragenter", dragEnter);
  status.addEventListener("dragleave", dragLeave);
  status.addEventListener("drop", dragDrop);
});

function dragOver(e) {
  e.preventDefault();
}

function dragEnter() {
  this.style.border = "3px dashed rgba(176, 176, 176, 0.454)";
}

function dragLeave() {
  this.style.border = "2px dashed rgba(176, 176, 176, 0.454)";
}

function dragDrop() {
  this.style.border = "2px dashed rgba(176, 176, 176, 0.454)";
  // this.appendChild(draggableTask);
}

function updateTask(task_id, status) {
  const urlParams = new URLSearchParams(window.location.search);
  const projectId = urlParams.get('project_id');
  const xhrUpdate = new XMLHttpRequest();
  xhrUpdate.open('POST', './services/api.php', true);
  xhrUpdate.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

  xhrUpdate.onload = function() {
      if (xhrUpdate.status === 200) {
          const response = JSON.parse(xhrUpdate.responseText);
          if (response.success) {
             window.location.reload();
          } else {
              alert('Error: ' + response.error);
          }
      } else {
          alert('Request failed. Returned status of ' + xhrUpdate.status);
      }
  };

  const data = JSON.stringify({
      status: status,
      task_id: task_id,
      type: "update_task"
  });

  xhrUpdate.send(data);
}

const close_btns = document.querySelectorAll(".close");

close_btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.parentElement.style.display = "none";
  });
});


const emojis = ['😀', '😁', '😂', '🤣', '😃', '😄', '😅', '😆', '😉', '😊', '😋', '😎', '😍', '😘', '😗', '😙', '😚', '☺️', '🙂', '🤗', '🤔', '😐', '😑', '😶', '🙄', '😏', '😣', '😥', '😮', '🤐', '😯', '😪', '😫', '😴', '😌', '🤓', '😛', '😜', '😝', '🤤', '😒', '😓', '😔', '😕', '🙃', '🤑', '😲', '☹️', '🙁', '😖', '😞', '😟', '😤', '😢', '😭', '😦', '😧', '😨', '😩', '😬', '😰', '😱', '😳', '😵', '😡', '😠', '😇', '🤠', '🤡', '🤥', '🤓', '🤒', '🤕', '🤑', '🤢', '🤧', '😷', '🤮', '🤫', '🤭', '🧐'];

const emojiButton = document.getElementById('emojiButton');
const emojiPicker = document.getElementById('emojiPicker');
const emojiInput = document.getElementById('messageInput');

emojiButton.addEventListener('click', () => {
    emojiPicker.style.display = emojiPicker.style.display === 'none' ? 'block' : 'none';
});

emojis.forEach(emoji => {
    const span = document.createElement('span');
    span.textContent = emoji;
    span.addEventListener('click', () => {
        emojiInput.value += emoji;
        emojiPicker.style.display = 'none';
    });
    emojiPicker.appendChild(span);
});

document.addEventListener('click', (event) => {
    if (!emojiButton.contains(event.target) && !emojiPicker.contains(event.target)) {
        emojiPicker.style.display = 'none';
    }
});

const fileInput = document.getElementById('fileInput');
const browseButton = document.getElementById('browseButton');

browseButton.addEventListener('click', () => {
    fileInput.click();
});



