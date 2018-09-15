(function () {

    const url = 'http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1';

    const next = document.getElementById('new-quote');
    const prev = document.getElementById('prev-quote');
    const quoteText = document.getElementById('text');
    const quoteAuthor = document.getElementById('author');

    const quotes = [];
    let quoteNo = 0;

    next.addEventListener('click', () => getQuote('next'))
    prev.addEventListener('click', () => getQuote('prev'))

    const getQuote = (direction) => {
        let quote, author;

        if (direction === 'next') {
            fetch(url, {cache: "no-store"})
            .then(response => response.json())
            .then(data => {
                quote = data[0].content.slice(3, -5);
                author = data[0].title;

                quotes.push({quote, author})
                quoteNo++;
                
                updateDOM(quote, author);
            })
            .catch(err => alert('Something went wrong', err))
        }
    }

    const updateDOM = (quote, author) => {
        quoteText.innerHTML = quote;
        quoteAuthor.innerHTML = author;
    }

    getQuote('next');

})()