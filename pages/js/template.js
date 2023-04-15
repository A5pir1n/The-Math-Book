function setStyleSheet(url){
    var stylesheet = document.getElementById("stylesheet");
    var img = document.getElementById("image");
    stylesheet.setAttribute('href', url);
    if (url == '../css/template.css') {
        img.src = 'menu.png';
    } else if (url == '../css/template_dark.css') {
        img.src = 'menu_dark.png';
    } else {
        img.src = 'menu_pink.png';
    }
}
function autoset() {
    var hour = (new Date).getHours();
    var img = document.getElementById("image");
    if (hour > 21 || hour < 8) {
        setStyleSheet('../css/template_dark.css');
        img.src = 'menu_dark.png';
    }
}

function menu() {
    var div = document.getElementById("menu");
    var content = document.getElementById("content1");
    if (div.style.visibility == 'hidden') {
        div.style.visibility = 'visible';
        div.style.display = 'block';
        content.style.width = '74.1vw';
    } else {
        div.style.visibility = 'hidden';
        div.style.display = 'none';
        content.style.width = '100vw';
    }
}