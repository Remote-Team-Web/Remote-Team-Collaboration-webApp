
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
  this.appendChild(draggableTask);

}



const emojis = ['😀', '😁', '😂', '🤣', '😃', '😄', '😅', '😆', '😉', '😊', '😋', '😎', '😍', '😘', '😗', '😙', '😚', '☺️', '🙂', '🤗', '🤔', '😐', '😑', '😶', '🙄', '😏', '😣', '😥', '😮', '🤐', '😯', '😪', '😫', '😴', '😌', '🤓', '😛', '😜', '😝', '🤤', '😒', '😓', '😔', '😕', '🙃', '🤑', '😲', '☹️', '🙁', '😖', '😞', '😟', '😤', '😢', '😭', '😦', '😧', '😨', '😩', '😬', '😰', '😱', '😳', '😵', '😡', '😠', '😇', '🤠', '🤡', '🤥', '🤓', '🤒', '🤕', '🤑', '🤢', '🤧', '😷', '🤮', '🤫', '🤭', '🧐'];

const emojiButton = document.getElementById('emojiButton');
const emojiPicker = document.getElementById('emojiPicker');
const emojiInput = document.getElementById('emojiInput');

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

