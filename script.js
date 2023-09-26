const itemInput = document.getElementById('item-input');
const itemForm = document.getElementById('item-form');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');




// Add items to the list
function onAddItemSubmit(e) {
    e.preventDefault();

    const newItem = itemInput.value;

    if(newItem === ''){
        alert("must type something into field")
        return  //this prevents anything else form happening
    }

    addItemToDom(newItem);

    // Have to run this here, the items will not load on page startup
    checkUI();

    // Clears the input
    itemInput.value = ''
}

function addItemToDom(item){
        // create list item
        const li = document.createElement('li')
        li.appendChild(document.createTextNode(item));
    
        // for creating the button with the correct classes to add to the list box
        const button = createButton('remove-item text-red btn-link');
        li.appendChild(button)
    
        //add li to the DOM
        itemList.appendChild(li)
}

function addItemToStorage(item) {
    let itemFromStorage;
    if(localStorage.getItem('items') === null){  //Checks to see if items are in storage
        itemFromStorage = [];
    } else {
        //the JSON.parse is to turn the string form localstorage.get into an array
        itemFromStorage = JSON.parse(localStorage.getItem('items'))
    }

    // Add new item to array
    itemFromStorage.push(item);

    // Convert to JSON string and set to local storage
    localStorage.setItem('items', JSON.stringify(itemFromStorage));

}

function createButton(classes){
    const button = document.createElement('button')
    button.className = classes;
    const icon = createIcon('fa-solid fa-xmark');
    button.appendChild(icon)
    return button;
}

function createIcon(classes){
    const icon = document.createElement('i')
    icon.className = classes;
    return icon
}


// Add functionality to delete button 
function removeItem(e){
    // We need it to remove the item, not the button, so we must do parentElement
    // We are doing the remove element on two parents, to get to the list item from the icon (i)
    if(e.target.parentElement.classList.contains('remove-item')){
        if(confirm('Are you sure you want to delete this task?')){
            e.target.parentElement.parentElement.remove();
            // This removes this if the list is empty
            checkUI();
        }
        
    }
}

//Add functionality to the clear all button
function clearAll(e) {
    const li = document.querySelectorAll('li')

    while(itemList.firstChild){
        itemList.removeChild(itemList.firstChild)
    }
    // This removes the filter and remove button
    checkUI();
}

//Filter Function
function filterItems(e) {
    const items = itemList.querySelectorAll('li');
    const text = e.target.value.toLowerCase();    //THis captures what is being typed into the filter input

    items.forEach(item => {
        // item.firstChile will be the textNode
        const itemName = item.firstChild.textContent.toLowerCase();
        if(itemName.indexOf(text) != -1){
            item.style.display = 'flex';    //The list is set to flex
        } else {
            item.style.display = "none"
        }
    })

}


// remove filter and clear button when no list items exist

function checkUI(){
    const items = itemList.querySelectorAll('li');
    if(items.length === 0){
        clearBtn.style.display = 'none';
        itemFilter.style.display = 'none';
    }else{
        clearBtn.style.display = 'block';
        itemFilter.style.display = 'block';
    }
}


itemForm.addEventListener('submit', onAddItemSubmit)
itemList.addEventListener('click', removeItem)
clearBtn.addEventListener('click', clearAll)
itemFilter.addEventListener('input', filterItems)

checkUI();  //This runs only when the page loads, but not after




// Adds styling when clicked on the input 
function onFocus() {
    itemInput.style.outlineStyle = 'solid';
    itemInput.style.outlineWidth = '1px';
    itemInput.style.outlineColor = 'blue';
}

// Takes the focus effects off when not clicked in the field
function onBlur() {
    itemInput.style.outlineStyle = 'none'
}


itemInput.addEventListener('focus', onFocus)
itemInput.addEventListener('blur', onBlur)
