async function loadBooks() {
    try {
        const response = await fetch('books.json'); // بررسی مسیر
        if (!response.ok) {
            throw new Error('Failed to load JSON');
        }
        const books = await response.json(); // تبدیل به JSON
        const bookContainer = document.getElementById('bookContainer');

        books.forEach((book, index) => {
            const card = document.createElement('div');
            card.className = 'card';

            const numberBg = document.createElement('div');
            numberBg.className = 'card-number-bg';
            numberBg.textContent = index + 1; // شماره خودکار

            const content = document.createElement('div');
            content.className = 'card-content';

            const name = document.createElement('p');
            name.textContent = `نام کتاب: ${book.name}`;
            
            const author = document.createElement('p');
            author.textContent = `نویسنده: ${book.author}`;
            
            const pages = document.createElement('p');
            pages.textContent = `تعداد صفحات: ${book.pages}`;
            
            const year = document.createElement('p');
            year.textContent = `سال مطالعه: ${book.year}`;
            
            content.appendChild(name);
            content.appendChild(author);
            content.appendChild(pages);
            content.appendChild(year);
            
            card.appendChild(numberBg);
            card.appendChild(content);
            bookContainer.appendChild(card);
        });
    } catch (error) {
        console.error(error.message);
    }
}

document.addEventListener('DOMContentLoaded', loadBooks);
