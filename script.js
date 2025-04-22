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
    card.className = 'card'; // کارت اصلی

    // متن بزرگ در پس‌زمینه
    const backgroundText = document.createElement('div');
    backgroundText.className = 'card-background-text';
    backgroundText.textContent = index + 1; // شماره خودکار

    // محتوای اصلی کارت
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

    // افزودن محتوا به کارت
    content.appendChild(name);
    content.appendChild(author);
    content.appendChild(pages);
    content.appendChild(year);

    // ترکیب متن پس‌زمینه و محتوای اصلی
    card.appendChild(backgroundText); // اضافه کردن متن بزرگ
    card.appendChild(content); // اضافه کردن محتوای کارت
    bookContainer.appendChild(card); // اضافه کردن کارت به صفحه
        });
    } catch (error) {
        console.error(error.message);
    }
}

document.addEventListener('DOMContentLoaded', loadBooks);
