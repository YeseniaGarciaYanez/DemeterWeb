//load side menu
async function loadSideMenu() {
    //load json file
    return await fetch('./json/menu.json').then((response) => {
        return response.json();
    })
    .catch((error) => {
        console.error(error);
    });
}
//show side menu
export function showSideMenu() {
    //parent div
    var sideMenu = document.getElementById('side-menu');
    sideMenu.innerHTML = '';

    loadSideMenu().then((response) => {
      console.log(response);
       if (response && response.options) {
        response.options.forEach((option) => {
            sideMenu.appendChild(drawOption(option));
        });
    }
        });
}

//draw menu option
function drawOption(option){
    console.log(option);
    //parent div
    var divOption = document.createElement('div');
    divOption.id = 'side-menu-option-' + option.id;
    divOption.className = 'side-menu-option';
    divOption.addEventListener('click', ()=>{loadComponent(option.component)});
//icon
    var divIcon = document.createElement('div');
    divIcon.className = 'side-menu-icon';
    divIcon.style.background = option.color;
    divOption.appendChild(divIcon);

    var icon = document.createElement('i');
    icon.className = 'fas fa-'+ option.icon;
    divIcon.appendChild(icon);
    //label
    var divLabel = document.createElement('div');
    divLabel.className = 'side-menu-label';
    divLabel.innerHTML = option.text;
    divOption.appendChild(divLabel);
    //return
    return divOption;
}

function loadComponent(component){
    console.log(component);
    var url = component + '/index.html';
    fetch(url)
    .then((response)=>{return response.text();})
    .then((html)=>{document.getElementById('content').innerHTML = html;})
    .catch((error)=> {console.error('Invalid html file');});
}