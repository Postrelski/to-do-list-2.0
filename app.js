const itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
const item  = document.querySelector('.input-text')

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
    } else {
        createItem(item);
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
    itemsArray.push(item.value);
    localStorage.setItem('items', JSON.stringify(itemsArray));
    item.value= "";
    location.reload();
}


item.focus();
display();