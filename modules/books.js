/* eslint-disable max-classes-per-file */
/* eslint-disable lines-between-class-members */
/* eslint-disable no-plusplus */
import * as storage from './dataStorage.js';

const booksContainer = document.getElementById('booksContainer');
const inputTitle = document.getElementById('title');
const inputAuthor = document.getElementById('author');
const addButton = document.getElementById('addBtn');
const showBookNav = document.querySelector('#booksList');
const form = document.querySelector('.addform');
const contact = document.querySelector('.contact');
const showformNav = document.querySelector('#newBook');
const showcontactNav = document.querySelector('#Contact');
const mainTitle = document.querySelector('.main-title');
const currentTime = document.querySelector('#currentTime');

setInterval(() => {
  const date = new Date();
  currentTime.textContent = date;
}, 500);

class BooksManager {
  #arrBooks = [];
  #booksContainer;
  #storage;
  #storageAvailable;

  constructor(booksContainer, storage) {
    this.#booksContainer = booksContainer;
    this.#storage = storage;
    this.#storageAvailable = this.#storage.storageAvailable();
  }

  get books() {
    return this.#arrBooks;
  }

  set books(arr) {
    this.#arrBooks = [...arr];
  }

  #getFromLocalStorage = () => {
    if (this.#storageAvailable) this.books = storage.getBooks();
  }

  #setToLocalStorage = () => {
    if (this.#storageAvailable) storage.setBooks(this.books);
  }

  displayBooks = () => {
    this.#getFromLocalStorage();

    this.#booksContainer.innerHTML = '';
    for (let i = 0; i < this.#arrBooks.length; i++) {
      const { title, author } = this.#arrBooks[i];
      const bookBody = document.createElement('div');
      const titlePhar = document.createElement('p');
      const removeButton = document.createElement('button');

      titlePhar.textContent = `"${title} by ${author}  " `;
      removeButton.id = `remove${i}`;
      removeButton.textContent = 'remove';
      removeButton.classList.add('remove');
      bookBody.classList.add('bookdiv');
      bookBody.append(titlePhar, removeButton);
      this.#booksContainer.append(bookBody);
    }
  }

  addBook = (title, author) => {
    const book = {};
    book.title = title;
    book.author = author;
    this.#arrBooks.push(book);
    this.#setToLocalStorage();
    this.displayBooks();
  }

  removeBook = (index) => {
    this.#arrBooks = this.#arrBooks.filter((_, position) => position !== index);
    this.#setToLocalStorage();
    this.displayBooks();
  }
}

const booksManager = new BooksManager(booksContainer, storage);

addButton.addEventListener('click', () => {
  if (inputTitle.validity.valid && inputAuthor.validity.valid) {
    booksManager.addBook(inputTitle.value, inputAuthor.value);
    inputTitle.value = '';
    inputAuthor.value = '';
  }
});

booksContainer.addEventListener('click', (event) => {
  const regex = /(?<=remove)\d+/;
  const { id } = event.target;
  if (regex.test(id)) {
    const index = parseInt(id.match(regex)[0], 10);
    booksManager.removeBook(index);
  }
});

export default function showBooks() {
  booksManager.displayBooks();
}

showBookNav.addEventListener('click', () => {
  form.style.display = 'none';
  booksContainer.style.display = 'block';
  contact.style.display = 'none';
  mainTitle.style.display = 'block';
});

showformNav.addEventListener('click', () => {
  form.style.display = 'block';
  booksContainer.style.display = 'none';
  contact.style.display = 'none';
  mainTitle.style.display = 'none';
});

showcontactNav.addEventListener('click', () => {
  form.style.display = 'none';
  booksContainer.style.display = 'none';
  contact.style.display = 'flex';
  mainTitle.style.display = 'none';
});