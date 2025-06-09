const myLibrary = [];
dummyBook = addBook("Example Book", "Joe Bloggs", "52", "Read");

const addBookBtn = document.querySelector("#newBookBtn");
const newBookForm = document.querySelector("#newBookForm");
const closePopupBtn = document.querySelector("#closePopup");
const titleInput = document.querySelector("#titleInput");
const authorInput = document.querySelector("#authorInput");
const pageNoInput = document.querySelector("#pageNoInput");
const readBoolInput = document.querySelector("#readBool");
const form = document.querySelector("#newBookForm");
const cardsWrapper = document.querySelector("#cardsWrapper");
const readBtns = document.querySelectorAll(".readBtn");


addBookBtn.addEventListener("click", () => {
    newBookForm.setAttribute("style", "display: flex")
});

closePopupBtn.addEventListener("click", () => {
    form.reset();
    newBookForm.setAttribute("style", "display: none;");
});

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = titleInput.value;
    const author = authorInput.value;
    const pages = pageNoInput.value;
    const isRead = readBoolInput.value == "True" ? true : false; 
    addBook(title, author, pages, isRead);
    newBookForm.setAttribute("style", "display: none;");
    form.reset();
    showBooks();
});

function Book(title, author, pages, isRead, id) {
    if (!new.target) {
        throw Error("You must use the \"new\" operator to call the constructor.");
    }
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.id = id;
}

function addBook(title, author, pages, isRead) {
    const id = crypto.randomUUID();
    const newBook = new Book(title, author, pages, isRead, id);
    myLibrary.push(newBook);
}

function createCard(book) {
    const newDiv = document.createElement("div");
    newDiv.setAttribute("data-id", `${book.id}`);
    const newH3 = document.createElement("h3");
    newH3.textContent = `${book.title}`
    const newP1 = document.createElement("p");
    newP1.textContent = `Author: ${book.author}`
    const newP2 = document.createElement("p");
    newP2.textContent = `Pages: ${book.pages}`
    const toggleReadBtn = document.createElement("button");
    toggleReadBtn.textContent = book.isRead ? "Read ✅" : "Not Read ❌";
    book.isRead ? toggleReadBtn.classList.add("read") : toggleReadBtn.classList.add("notRead")
    const deleteCardBtn = document.createElement("button");
    deleteCardBtn.textContent = "Delete";
    deleteCardBtn.classList.add("deleteBtn");
    toggleReadBtn.addEventListener("click", function() {
        book.isRead = !book.isRead;
        showBooks();
    });
    deleteCardBtn.addEventListener("click", function() {
        const index = myLibrary.findIndex(_book => _book.id === book.id);
        if (index !== -1) {
            myLibrary.splice(index, 1); 
            showBooks(); 
        }
    });
    newDiv.classList.add("card");
    cardsWrapper.appendChild(newDiv);
    newDiv.appendChild(newH3);
    newDiv.appendChild(newP1);
    newDiv.appendChild(newP2);
    newDiv.appendChild(toggleReadBtn);
    newDiv.appendChild(deleteCardBtn);
    return newDiv;
}

function showBooks() {
    cardsWrapper.innerHTML = "";
    for (const book of myLibrary) {
        cardsWrapper.appendChild(createCard(book)); 
    }
}

showBooks();
