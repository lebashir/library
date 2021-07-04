let myLibrary = [];

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
    updateState() {
        if (this.read === true) {
            this.read = false
        } else {
            this.read = true
        }
    }

}


function addBookToLibrary(book) {
    if (!myLibrary.includes(book)) {
        myLibrary.push(book); 
    }
}



const addBook = document.querySelector('#add-book-form');

addBook.addEventListener('submit', (e)=> {
    e.preventDefault();
    let title = document.querySelector('#form-title').value
    let author = document.querySelector('#form-author').value
    let pages = document.querySelector('#form-pages').value
    let read = document.querySelector('#form-read').checked
    let bookToAdd = new Book(title, author, pages, read);
    addBookToLibrary(bookToAdd);
    addBook.reset();
    updateGrid();     
})

function updateGrid() {
    let tableBody = document.querySelector('.library-table');
    tableBody.innerHTML = '';

   for (let book of myLibrary) {

    let newRow = document.createElement('tr');
    newRow.setAttribute('data', myLibrary.indexOf(book));

    let newTitle = document.createElement('td')
    let newAuthor = document.createElement('td')
    let newPages = document.createElement('td')
    let newRead = document.createElement('td')
    let newDelete = document.createElement('td');
    let deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.classList.add('btn', 'btn-danger', 'delete')
    deleteButton.setAttribute('value', myLibrary.indexOf(book));
    deleteButton.addEventListener('click', () => {
        myLibrary.splice(deleteButton.value, deleteButton.value+1)
        updateGrid()
    })

    let newUpdate = document.createElement('td')
    let updateButton = document.createElement('button');
    updateButton.innerText = 'Update Status';
    updateButton.classList.add('btn', 'btn-success', 'update')
    updateButton.setAttribute('value', myLibrary.indexOf(book));
    updateButton.addEventListener('click', () => {
        myLibrary[updateButton.value].updateState();
        updateGrid()
    })

    newTitle.innerText = book.title;
    newAuthor.innerText = book.author;
    newPages.innerText = book.pages;
    book.read == true ? newRead.innerText = 'Read' : newRead.innerText = 'Not Read';
    newDelete.appendChild(deleteButton)
    newUpdate.appendChild(updateButton);

    newRow.appendChild(newTitle);
    newRow.appendChild(newAuthor)
    newRow.appendChild(newPages)
    newRow.appendChild(newRead)
    newRow.appendChild(newDelete)
    newRow.appendChild(newUpdate)

    tableBody.appendChild(newRow)
   } 
}
