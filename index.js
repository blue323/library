const newBookBtn = document.querySelector(".newBookBtn")
let overlay = document.getElementById("overlay")
const submitBtn = document.querySelector(".submit")
let closeBtn = document.querySelector(".close")
let title = document.getElementById("title")
let author = document.getElementById("author")
let pages = document.getElementById("pages")
let read = document.querySelector(".checkboxx")
let booksDiv = document.querySelector(".books")
let titleLabel = document.querySelector(".title")
let authorLabel = document.querySelector(".author")
let pagesLabel = document.querySelector(".pages")

let myLibrary = []

if(!localStorage.getItem('library')) {
    console.log("no storage")
  } else {
    console.log(JSON.parse(localStorage.getItem('library')))
    myLibrary = JSON.parse(localStorage.getItem('library'))

    renderBooks()
  }

function Book(title, author, pages, read) {
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.read = read,
    this.toggleRead = function() {
        this.read = !this.read;
    }
}

function addBookToLibrary() {
    let newBook = new Book(title.value, author.value, pages.value, read.checked)
    myLibrary.push(newBook)

    renderBooks()

}

newBookBtn.addEventListener("click", () => {
    overlay.style.display = "block"
})

submitBtn.addEventListener("click", (e) => {
    e.preventDefault()

    if(title.value.length === 0) {
        titleLabel.innerHTML = `Title: <span>* a title is required</span>`
    }

    if(author.value.length === 0) {
        authorLabel.innerHTML = `Author: <span>* an author is required</span>`
    }

    if(pages.value.length <= 0) {
        pagesLabel.innerHTML = `Pages: <span>* number of pages is required</span>`
    }
   
   if(title.value.length !== 0 && author.value.length !== 0 && pages.value.length !== 0) {
    addBookToLibrary()

    overlay.style.display = "none"
    title.value = ""
    author.value = ""
    pages.value = ""
    read.checked = false
    titleLabel.innerHTML = `Title:`
    authorLabel.innerHTML = `Author:`
    pagesLabel.innerHTML = `Pages:`
   }
})

closeBtn.addEventListener("click", () => {
    overlay.style.display = "none"
})

function renderBooks() {
    booksDiv.textContent = ""
 
    myLibrary.map(book => {
        let div = document.createElement("div")
        div.classList.add("book")
        div.setAttribute("id", myLibrary.indexOf(book))

        let div2 = document.createElement("div")
        div2.classList.add("remove")
        div2.textContent = "X"
        div2.addEventListener("click", (e) => {
            e.target.parentElement.style.display = "none"
            myLibrary.splice(myLibrary.indexOf(book), 1)
            localStorage.setItem('library', JSON.stringify(myLibrary))
        })
        div.appendChild(div2)

        let h3 = document.createElement("h3")
        h3.textContent = `Title: ${book.title}`
        div.appendChild(h3)

        let ul = document.createElement("ul")
        ul.classList.add("list")

        let li1 = document.createElement("li")
        li1.textContent = `Author: ${book.author}`
        ul.appendChild(li1)

        let li2 = document.createElement("li")
        li2.textContent = `Pages: ${book.pages}`
        ul.appendChild(li2)

        let li3 = document.createElement("li")

        let button = document.createElement("button")
        button.classList.add("toggle")
        button.textContent = `${book.read ? "Readed" : "Not readed"}`
        button.addEventListener("click", () => {
            //book.toggleRead()
            book.read = !book.read;
            button.textContent = `${book.read ? "Readed" : "Not readed"}`
            localStorage.setItem('library', JSON.stringify(myLibrary))
            //console.log(JSON.parse(localStorage.getItem('library')))
        })
        li3.appendChild(button)
        ul.appendChild(li3)
        div.appendChild(ul)

        booksDiv.appendChild(div)

        //localstorage
        localStorage.setItem('library', JSON.stringify(myLibrary))
        console.log(JSON.parse(localStorage.getItem('library')))
    })
}

