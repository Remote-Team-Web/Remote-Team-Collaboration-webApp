
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
