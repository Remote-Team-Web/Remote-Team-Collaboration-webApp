
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


var responsive_aside = document.querySelector(".responsive-aside")

function slide_on() {
    responsive_aside.style.transition = " all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)";
    responsive_aside.style.transform = "translateX(-15%)";
}

function slide_off() {
    responsive_aside.style.transition = " all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)";
   responsive_aside.style.transform = "translateX(-100%)";
}