
var darkmode = document.querySelector(".logo");
var root = document.querySelector(':root');
var mode = "light";
function toggle() {
  darkmode.classList.toggle("active");
   if(mode == "light"){
    root.style.transition = "1.5s";
    root.style.setProperty("--body_color--", '#1d1d1d');
    root.style.setProperty("--text_color--", 'rgb(212, 228, 241)');
    root.style.setProperty("--border_color--", 'rgba(212, 228, 241,0.1)');
    mode = "dark";
   }else{
     root.style.transition = "1.5s";
     root.style.setProperty("--body_color--", 'white');
     root.style.setProperty("--text_color--", '#2a3d47');
     root.style.setProperty("--border_color--", 'rgba(11,11,11,0.1)');
     mode = "light";
  }
}
