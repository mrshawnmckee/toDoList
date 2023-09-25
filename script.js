const itemInput = document.getElementById('item-input');
const itemForm = document.getElementById('item-form');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear')



// Add items to the list
function addItem(e) {
    e.preventDefault();

    const newItem = itemInput.value;

    if(newItem === ''){
        alert("must type something into field")
        return  //this prevents anything else form happening
    }

    // create list item
    const li = document.createElement('li')
    li.appendChild(document.createTextNode(newItem));

    // for creating the button with the correct classes to add to the list box
    const button = createButton('remove-item text-red btn-link');
    li.appendChild(button)

    itemList.appendChild(li)

    // Clears the input
    itemInput.value = ''
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
        e.target.parentElement.parentElement.remove();
    }
}

//Add functionality to the clear all button
function clearAll(e) {
    const li = document.querySelectorAll('li')

    while(itemList.firstChild){
        itemList.removeChild(itemList.firstChild)
    }
}




itemForm.addEventListener('submit', addItem)
itemList.addEventListener('click', removeItem)
clearBtn.addEventListener('click', clearAll)






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
