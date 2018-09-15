(function () {

    const url = 'http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1';

    const next = document.getElementById('new-quote');
    const prev = document.getElementById('prev-quote');

    const quotes = [];

    next.addEventListener('click', () => getQuote('next'))
    prev.addEventListener('click', () => getQuote('prev'))

    const getQuote = (direction) => {
        console.log(direction);
    }

})()