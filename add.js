document.addEventListener('DOMContentLoaded', () => {
    // انتخاب عناصر مرتبط
    const addBookForm = document.getElementById('addBookForm');
    const passwordInput = document.getElementById('passwordInput');
    const addBookMessage = document.getElementById('addBookMessage');

    // مدیریت ارسال فرم
    addBookForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        // اعتبارسنجی رمز عبور
        const password = passwordInput.value;
        if (password !== '12345') {
            addBookMessage.style.display = 'block';
            addBookMessage.textContent = 'رمز عبور اشتباه است!';
            addBookMessage.classList.add('error');
            console.error('رمز عبور اشتباه.');
            return;
        }

        // دریافت مقادیر فرم
        const bookName = document.getElementById('bookName').value;
        const bookAuthor = document.getElementById('bookAuthor').value;
        const bookPages = parseInt(document.getElementById('bookPages').value);
        const bookYear = parseInt(document.getElementById('bookYear').value);

        // ایجاد آبجکت کتاب جدید
        const newBook = {
            bookName,
            bookAuthor,
            bookPages,
            bookYear
        };

        try {
            // ارسال درخواست به GitHub API
            const response = await fetch('https://api.github.com/repos/amuleo/amuleo-books/actions/workflows/update-books.yml/dispatches', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer YOUR_PERSONAL_ACCESS_TOKEN`, // توکن را جایگزین کنید
                    'Accept': 'application/vnd.github.v3+json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ref: 'main', // شاخه هدف
                    inputs: newBook // ارسال ورودی‌ها به Workflow
                })
            });

            if (!response.ok) {
                throw new Error('Failed to trigger workflow');
            }

            // نمایش پیام موفقیت و پاک‌سازی فرم
            addBookMessage.style.display = 'block';
            addBookMessage.textContent = 'کتاب با موفقیت اضافه شد!';
            addBookMessage.classList.add('success');
            addBookForm.reset();
            console.log('Book added successfully!');
        } catch (error) {
            // مدیریت خطا
            addBookMessage.style.display = 'block';
            addBookMessage.textContent = error.message;
            addBookMessage.classList.add('error');
            console.error('Error:', error.message);
        }
    });
});
