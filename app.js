(function () {

    const url = 'http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1';

    const next = document.getElementById('new-quote');
    const prev = document.getElementById('prev-quote');
    const quoteText = document.getElementById('text');
    const quoteAuthor = document.getElementById('author');

    const quotes = [];
    let currentQuote = null;
    let prevState = false;

    next.addEventListener('click', () => getQuote('next'))
    prev.addEventListener('click', () => getQuote('prev'))

    const getQuote = (direction) => {
        let quote, author;

        if (direction === 'next') {
            if (currentQuote === null || currentQuote === (quotes.length -1)) {
                fetch(url, {cache: "no-store"})
                .then(response => response.json())
                .then(data => {
                    quote = data[0].content.slice(3, -5);
                    author = data[0].title;

                    quotes.push({quote, author});
                    console.table(quotes);
                    currentQuote === null ? currentQuote = 0 : currentQuote++;
                    chkPrevState();
                    
                    updateDOM(quote, author);
                })
                .catch(err => alert('Something went wrong', err))
            } else {
                currentQuote++;

                quote = quotes[currentQuote].quote;
                author = quotes[currentQuote].author;
                chkPrevState();

                updateDOM(quote, author);
            }
        } else {
            if (prevState) {
                currentQuote--;

                quote = quotes[currentQuote].quote;
                author = quotes[currentQuote].author;
                chkPrevState();

                updateDOM(quote, author);
            }
        }
    }

    const chkPrevState = () => {
        if (quotes.length > 1 && currentQuote !== 0) {
            prevState = true;
            prev.classList.remove('quote-box__footer-icon--disabled');
        } else {
            prevState = false;
            prev.classList.add('quote-box__footer-icon--disabled');
        }
    }

    const updateDOM = (quote, author) => {
        quoteText.innerHTML = quote;
        quoteAuthor.innerHTML = author;
    }

    getQuote('next');

})()