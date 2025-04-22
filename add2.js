document.addEventListener('DOMContentLoaded', () => {
    const addBookForm = document.getElementById('addBookForm');
    const addBookMessage = document.getElementById('addBookMessage');

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
        };

        try {
            // ارسال فایل JSON موقت به مخزن
 const response = await fetch('https://api.github.com/repos/amuleo/amuleo-books/contents/temp-book.json', {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        message: 'Add temporary book file',
        content: btoa(JSON.stringify(newBook)), // تبدیل داده‌ها به Base64
        branch: 'main' // شاخه مقصد
    })
});


            if (!response.ok) {
                throw new Error('Failed to upload temporary file');
            }

            // نمایش پیام موفقیت و پاک‌سازی فرم
            addBookMessage.style.display = 'block';
            addBookMessage.textContent = 'فایل موقت با موفقیت ذخیره شد!';
            addBookMessage.classList.add('success');
            addBookForm.reset();
            console.log('Temporary file uploaded successfully!');
        } catch (error) {
            // مدیریت خطا
            addBookMessage.style.display = 'block';
            addBookMessage.textContent = `خطا: ${error.message}`;
            addBookMessage.classList.add('error');
            console.error('Error uploading file:', error.message);
        }
    });
});
