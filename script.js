books.forEach((book, index) => {
    const card = document.createElement('div');
    card.className = 'card';

    // عدد کم‌رنگ به عنوان بک‌گراند
    const numberBg = document.createElement('div');
    numberBg.className = 'card-number-bg';
    numberBg.textContent = index + 1; // شماره خودکار

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
    
    content.appendChild(name);
    content.appendChild(author);
    content.appendChild(pages);
    content.appendChild(year);
    
    card.appendChild(numberBg); // اضافه کردن شماره کم‌رنگ
    card.appendChild(content); // اضافه کردن محتوای اصلی
    bookContainer.appendChild(card);
});
