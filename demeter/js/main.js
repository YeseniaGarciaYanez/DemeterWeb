//imports
import { showSideMenu } from '../js/sidemenu.js';

//events
window.addEventListener('load', init);

//variables
var sideMenuVisible = false;


//init
function init() {
    console.log('Initializing document...');
    showSideMenu();
    applySideMenuStyle(); // 🟢 Ajustar estilos del side-menu desde el inicio

    document.getElementById('icon-side-menu').addEventListener('click', () => {
        toggleSideMenu();
    });
}

// 🟢 Aplica estilos según el estado de sideMenuVisible
function applySideMenuStyle() {
    if (sideMenuVisible) {
        document.getElementById('side-menu').style.display = 'block';
        document.getElementById('content').style.width = 'calc(100% - 250px)';
    } else {
        document.getElementById('side-menu').style.display = 'none';
        document.getElementById('content').style.width = '100%';
    }
}

function toggleSideMenu() {
    sideMenuVisible = !sideMenuVisible;
    applySideMenuStyle(); 
}