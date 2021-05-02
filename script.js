let menu = document.getElementById('topMenu');

function showBar() {
    if (menu.className == 'topmenu') {
        menu.classList.add('show-bar');
    } else {
        menu.className = 'topmenu';
    }
}

document.querySelector('.icon').addEventListener('click', showBar);
