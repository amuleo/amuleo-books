async function loadBooks() {
    const response = await fetch('books.json');
    const books = await response.json();
    const bookContainer = document.getElementById('bookContainer');

    books.forEach(book => {
        const card = document.createElement('div');
        card.className = 'card'; // استفاده از استایل کارد

        const name = document.createElement('p');
        name.textContent = `نام کتاب: ${book.name}`;
        
        const author = document.createElement('p');
        author.textContent = `نویسنده: ${book.author}`;
        
        const pages = document.createElement('p');
        pages.textContent = `تعداد صفحات: ${book.pages}`;
        
        const year = document.createElement('p');
        year.textContent = `سال مطالعه: ${book.year}`;
        
        card.appendChild(name);
        card.appendChild(author);
        card.appendChild(pages);
        card.appendChild(year);
        
        bookContainer.appendChild(card);
    });
}
document.addEventListener('DOMContentLoaded', loadBooks);
