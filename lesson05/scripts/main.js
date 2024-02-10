const inputField = document.getElementById('favchap');
const addButton = document.querySelector('button');
const chapterList = document.getElementById('list');

addButton.addEventListener('click', () => {
    const chapter = inputField.value.trim();

    if (chapter === ''){
        alert('Please enter a Book and Chapter.');
        inputField.focus();
        return;
    }


    const listItem = document.createElement('li');
    const deleteButton = document.createElement('button');


    listItem.textContent = chapter;
    deleteButton.textContent = '❌';


    listItem.appendChild(deleteButton);


    chapterList.appendChild(listItem);


    deleteButton.addEventListener('click', () => {
        listItem.remove();
    });


    inputField.value = '';
    inputField.focus();
});


