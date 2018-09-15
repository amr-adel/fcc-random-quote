(function () {

    const url = 'http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1';

    const next = document.getElementById('new-quote');
    const prev = document.getElementById('prev-quote');
    const quoteText = document.getElementById('text');
    const quoteAuthor = document.getElementById('author');

    const quotes = [];

    next.addEventListener('click', () => getQuote('next'))
    prev.addEventListener('click', () => getQuote('prev'))

    const getQuote = (direction) => {
        let quote = 'Graphic design is the design of highly disposable items… It all winds up in the garbage';
        let author = 'Karrie Jacobs';

        return updateDOM(quote, author)
    }

    const updateDOM = (quote, author) => {
        quoteText.innerText = quote;
        quoteAuthor.innerText = author;
    }

    getQuote('next');

})()