const itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
const colorArray = localStorage.getItem('colors') ? JSON.parse(localStorage.getItem('colors')) : [];
const item  = document.querySelector('.input-text')
const errContainer = document.getElementById("err-container");

console.log(colorArray);
console.log(itemsArray);

function display () {
    let html = '';
    for(let i = 0; i < itemsArray.length; i++){
            html += `
            <div class="items">
                <div class="inner-items">
                    <i class="fa-solid fa-check check"></i>
                    <div class="task">${itemsArray[i]}</div>
                </div>
                <i class="fa-solid fa-trash trash"></i>
            </div>
            `;
    }
    document.querySelector('.to-do-list').innerHTML = html;
    completed();
    deleteItem();

}

document.querySelector('.button').addEventListener('click', (e) => {
    e.preventDefault();
    if (!item.value) {
        error();
    } else {
        const capital = makeCapital(item.value);
        createItem(capital);
    }
})


function deleteItem() {
    const items = document.querySelectorAll('.trash');
    items.forEach((el, i) => {
        el.addEventListener('click', () => {
            itemsArray.splice(i, 1);
            colorArray.splice(i, 1);
            localStorage.setItem('items', JSON.stringify(itemsArray));
            localStorage.setItem('colors', JSON.stringify(colorArray));
            location.reload();
        })
    })
}

function createItem (item) {
    itemsArray.push(item);
    colorArray.push(false);
    localStorage.setItem('items', JSON.stringify(itemsArray));
    localStorage.setItem('colors', JSON.stringify(colorArray));
    item= "";
    location.reload();
}

function makeCapital(item) {
    return item.charAt(0).toUpperCase() + item.substring(1);
}

function error () {
    const error = document.createElement("div");
    error.innerHTML = `
        <div class="warning">
            <i class="fa-solid fa-check"></i>
            <i class="fas fa-exclamation-circle"></i>
            <span>Input cannot be empty!</span>
        </div>`;
    errContainer.appendChild(error);

    setTimeout( () => {
        error.remove();
    }, 2500);
}

function completed () {
    const items = document.querySelectorAll('.items');
    const completed = document.querySelectorAll('.check');
    completed.forEach( (el, i) => {
        el.addEventListener('click', () => {
            items[i].classList.toggle('green');
            if (colorArray[i] == false){
                colorArray[i] = true;
            } else {
                colorArray[i] = false;
            }
            localStorage.setItem('colors', JSON.stringify(colorArray));
        })
    })
    
}

function refreshColors () {
    const items = document.querySelectorAll('.items');
    const completed = document.querySelectorAll('.check');
    for(let i = 0; i < completed.length; i++){
        if(colorArray[i] === true) {
            items[i].classList.add('green');
        }
    }
}

item.focus();
display();
refreshColors();