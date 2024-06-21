
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