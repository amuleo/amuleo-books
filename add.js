document.addEventListener('DOMContentLoaded', () => {
    // انتخاب عناصر مرتبط با ورود و اضافه کردن کتاب
    const loginButton = document.getElementById('loginButton');
    const loginPassword = document.getElementById('loginPassword');
    const loginError = document.getElementById('loginError');
    const addBookSection = document.getElementById('addBookSection');
    const addBookForm = document.getElementById('addBookForm');
    const addBookMessage = document.getElementById('addBookMessage');

    // مدیریت ورود
    loginButton.addEventListener('click', (event) => {
        event.preventDefault();

        const password = loginPassword.value; // دریافت مقدار رمز عبور
        if (password === '12345') { // رمز عبور صحیح
            document.getElementById('loginContainer').style.display = 'none'; // مخفی کردن فرم ورود
            addBookSection.style.display = 'block'; // نمایش بخش اضافه کردن کتاب
            console.log('رمز عبور صحیح وارد شد.');
        } else {
            loginError.style.display = 'block'; // نمایش پیام خطا
            loginError.textContent = 'رمز عبور اشتباه است!';
            console.error('رمز عبور اشتباه.');
        }
    });

    // مدیریت اضافه کردن کتاب
    addBookForm.addEventListener('submit', async (event) => {
        event.preventDefault();

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
        }
                const GH_TOKEN = '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';
        try {
            // ارسال درخواست به GitHub API
            const response = await fetch('https://api.github.com/repos/amuleo/amuleo-books/actions/workflows/update-books.yml/dispatches', {
                method: 'POST',
               headers: {
    'Authorization': `Bearer GH_TOKEN`, // اینجا GH_TOKEN رو وارد می‌کنید
    'Accept': 'application/vnd.github.v3+json',
    'Content-Type': 'application/json'
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
