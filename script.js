async function loadBooks() {
    try {
        const response = await fetch('books.json'); // بررسی مسیر
        if (!response.ok) {
            throw new Error('Failed to load JSON');
        }
        const books = await response.json(); // تبدیل به JSON
        const bookContainer = document.getElementById('bookContainer');

        // ساخت و افزودن باکس خلاصه
const summaryBox = document.createElement('div');
summaryBox.className = 'summary-box';

// محاسبه تعداد کتاب‌ها و تعداد کل صفحات
const totalBooks = books.length;
const totalPages = books.reduce((sum, book) => sum + book.pages, 0); // جمع کل صفحات

// افزودن متن به باکس خلاصه
const summaryText = document.createElement('p');
summaryText.textContent = `تعداد کتاب‌های خوانده شده: ${totalBooks} | تعداد کل صفحات مطالعه شده: ${totalPages}`;
summaryBox.appendChild(summaryText);

// اضافه کردن خلاصه به بالای صفحه
const pageTitle = document.querySelector('h1'); // انتخاب h1
pageTitle.insertAdjacentElement('afterend', summaryBox);

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

            // اضافه کردن متن و خطوط افقی
            const name = document.createElement('p');
            name.textContent = `نام کتاب: ${book.name}`;
            content.appendChild(name);

            const hr1 = document.createElement('hr'); // خط افقی
            content.appendChild(hr1);

            const author = document.createElement('p');
            author.textContent = `نویسنده: ${book.author}`;
            content.appendChild(author);

            const hr2 = document.createElement('hr'); // خط افقی
            content.appendChild(hr2);

            const pages = document.createElement('p');
            pages.textContent = `تعداد صفحات: ${book.pages}`;
            content.appendChild(pages);

            const hr3 = document.createElement('hr'); // خط افقی
            content.appendChild(hr3);

            const year = document.createElement('p');
            year.textContent = `تاریخ مطالعه: ${book.year}`;
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

// ---------------------------
// اسکریپت مربوط به فایل جدید
// ---------------------------
document.addEventListener('DOMContentLoaded', () => {
    // انتخاب المان‌های ورود رمز عبور
    const loginContainer = document.getElementById('loginContainer');
    const addBookContainer = document.getElementById('addBookContainer');
    const loginButton = document.getElementById('loginButton');
    const passwordInput = document.getElementById('passwordInput');
    const loginError = document.getElementById('loginError');

    // انتخاب المان‌های اضافه کردن کتاب
    const addBookButton = document.getElementById('addBookButton');
    const bookName = document.getElementById('bookName');
    const bookAuthor = document.getElementById('bookAuthor');
    const bookPages = document.getElementById('bookPages');
    const bookYear = document.getElementById('bookYear');
    const addBookMessage = document.getElementById('addBookMessage');

    // رمز عبور ثابت
    const predefinedPassword = "12345";

    // مدیریت ورود رمز عبور
    loginButton.addEventListener('click', () => {
        const enteredPassword = passwordInput.value;
        if (enteredPassword === predefinedPassword) {
            loginContainer.style.display = "none"; // مخفی کردن فرم ورود
            addBookContainer.style.display = "block"; // نمایش فرم اضافه کردن کتاب
        } else {
            loginError.style.display = "block"; // نمایش خطا
        }
    });

    // مدیریت اضافه کردن کتاب
addBookButton.addEventListener('click', async () => {
    const newBook = {
        bookName: bookName.value,
        bookAuthor: bookAuthor.value,
        bookPages: bookPages.value,
        bookYear: bookYear.value
    };

    try {
        // ارسال درخواست به GitHub API
        const response = await fetch('https://api.github.com/repos/amuleo/amuleo-books/actions/workflows/update-books.yml/dispatches', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer YOUR_PERSONAL_ACCESS_TOKEN`, // جایگزین با توکن خود
                'Accept': 'application/vnd.github.v3+json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ref: 'main', // شاخه هدف
                inputs: newBook // ارسال اطلاعات کتاب به Workflow
            })
        });

        if (!response.ok) {
            throw new Error('Failed to trigger workflow');
        }

        // نمایش پیام موفقیت
        addBookMessage.style.display = "block";
        bookName.value = "";
        bookAuthor.value = "";
        bookPages.value = "";
        bookYear.value = "";
        console.log("Workflow triggered successfully!");
    } catch (error) {
        console.error("Error:", error.message);
    }
});
