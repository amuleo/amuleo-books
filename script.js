document.addEventListener('DOMContentLoaded', () => {
    // انتخاب عناصر مرتبط با نمایش کتاب‌ها
    const bookContainer = document.getElementById('bookContainer');
    const summaryBox = document.createElement('div');

    // نمایش لیست کتاب‌ها
    async function loadBooks() {
        try {
            const response = await fetch('books.json');
            if (!response.ok) throw new Error('Failed to load JSON');

            const books = await response.json();

            // ساخت و افزودن باکس خلاصه
            summaryBox.className = 'summary-box';
            const totalBooks = books.length;
            const totalPages = books.reduce((sum, book) => sum + book.pages, 0);
            const summaryText = document.createElement('p');
            summaryText.textContent = `تعداد کتاب‌های خوانده شده: ${totalBooks} | تعداد کل صفحات مطالعه شده: ${totalPages}`;
            summaryBox.appendChild(summaryText);

            // اضافه کردن باکس خلاصه به صفحه
            const pageTitle = document.querySelector('h1');
            pageTitle.insertAdjacentElement('afterend', summaryBox);

            // نمایش کارت‌های کتاب
            books.forEach((book, index) => {
                const card = document.createElement('div');
                card.className = 'card';

                // محتوای کارت
                const backgroundText = document.createElement('div');
                backgroundText.className = 'card-background-text';
                backgroundText.textContent = index + 1;

                const content = document.createElement('div');
                content.className = 'card-content';

                const name = document.createElement('p');
                name.textContent = `نام کتاب: ${book.name}`;
                content.appendChild(name);

                const author = document.createElement('p');
                author.textContent = `نویسنده: ${book.author}`;
                content.appendChild(author);

                const pages = document.createElement('p');
                pages.textContent = `تعداد صفحات: ${book.pages}`;
                content.appendChild(pages);

                const year = document.createElement('p');
                year.textContent = `تاریخ مطالعه: ${book.year}`;
                content.appendChild(year);

                card.appendChild(backgroundText);
                card.appendChild(content);
                bookContainer.appendChild(card);
            });
        } catch (error) {
            console.error('Error loading books:', error.message);
        }
    }

    // اجرای تابع بارگذاری کتاب‌ها
    if (bookContainer) {
        loadBooks();
    }

    // انتخاب عناصر مرتبط با فرم ورود و اضافه کردن کتاب
    const loginButton = document.getElementById('loginButton');
    const passwordInput = document.getElementById('passwordInput');
    const addBookSection = document.getElementById('addBookSection');
    const addBookButton = document.getElementById('addBookButton');
    const bookName = document.getElementById('bookName');
    const bookAuthor = document.getElementById('bookAuthor');
    const bookPages = document.getElementById('bookPages');
    const bookYear = document.getElementById('bookYear');
    const addBookMessage = document.getElementById('addBookMessage');

    // مدیریت ورود
    if (loginButton) {
        loginButton.addEventListener('click', (event) => {
            event.preventDefault();

            const password = passwordInput.value;
            if (password === '12345') {
                addBookSection.style.display = 'block';
                console.log('رمز عبور درست است.');
            } else {
                alert('رمز عبور اشتباه است!');
                console.error('رمز عبور اشتباه.');
            }
        });
    }

    // مدیریت اضافه کردن کتاب
    if (addBookButton) {
        addBookButton.addEventListener('click', async (event) => {
            event.preventDefault();

            const newBook = {
                bookName: bookName.value,
                bookAuthor: bookAuthor.value,
                bookPages: bookPages.value,
                bookYear: bookYear.value,
            };

            try {
                const response = await fetch('https://api.github.com/repos/amuleo/amuleo-books/actions/workflows/update-books.yml/dispatches', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer YOUR_PERSONAL_ACCESS_TOKEN`,
                        'Accept': 'application/vnd.github.v3+json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        ref: 'main',
                        inputs: newBook,
                    }),
                });

                if (!response.ok) throw new Error('Failed to trigger workflow');

                addBookMessage.style.display = 'block';
                addBookMessage.textContent = 'کتاب با موفقیت اضافه شد!';
                bookName.value = '';
                bookAuthor.value = '';
                bookPages.value = '';
                bookYear.value = '';
                console.log('Book added successfully!');
            } catch (error) {
                addBookMessage.style.display = 'block';
                addBookMessage.textContent = error.message;
                console.error('Error adding book:', error.message);
            }
        });
    }
});
