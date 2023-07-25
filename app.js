const itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
const item  = document.querySelector('.input-text')
const errContainer = document.getElementById("err-container");

console.log(itemsArray);

function display () {
    let html = '';
    for(let i =0; i < itemsArray.length; i++){
        html += `
        <div class="items">
            <div class="task">${itemsArray[i]}</div>
            <i class="fa-solid fa-trash trash"></i>
        </div>
        `;
    }
    document.querySelector('.to-do-list').innerHTML = html;
    deleteItem();
}

document.querySelector('.button').addEventListener('click', (e) => {
    e.preventDefault();
    if (!item.value) {
        console.log('must fill space');
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
            localStorage.setItem('items', JSON.stringify(itemsArray));
            location.reload();
        })
    })
}

function createItem (item) {
    itemsArray.push(item);
    localStorage.setItem('items', JSON.stringify(itemsArray));
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
            <i class="fas fa-exclamation-circle"></i>
            <span>Input cannot be empty!</span>
        </div>`;
    errContainer.appendChild(error);

    setTimeout( () => {
        error.remove();
    }, 2500);

}


item.focus();
display();