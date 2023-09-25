const itemInput = document.getElementById('item-input');
const form = document.getElementById('item-form')

function onSubmit(e) {
    e.preventDefault();
 
    const item = document.getElementById('item-input').value;

    console.log(item)

    // Validation
    if(item === ''){
        alert('Please fill in the field')
        return;
    }
}


form.addEventListener('submit', onSubmit);


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




