(function() {
  const url = () =>
    // new Date().getTime() to prevent cache and request a new quote
    `https://quotesondesign.com/wp-json/wp/v2/posts/?orderby=rand&per_page=1&timestamp=${new Date().getTime()}`;

  const body = document.querySelector('body');
  const tweet = document.getElementById('tweet-quote');
  const next = document.getElementById('new-quote');
  const prev = document.getElementById('prev-quote');
  const quoteText = document.getElementById('text');
  const quoteAuthor = document.getElementById('author');

  const quotes = [];
  let currentQuote = null;
  let prevState = false;

  const colors = [
    '#f44336',
    '#e91e63',
    '#9c27b0',
    '#673ab7',
    '#3f51b5',
    '#2196f3',
    '#03a9f4',
    '#00bcd4',
    '#009688',
    '#4caf50',
    '#8bc34a',
    '#ffc107',
    '#ff9800',
    '#ff5722 ',
    '#795548',
    '#607d8b',
  ];

  const chkPrevState = () => {
    if (quotes.length > 1 && currentQuote !== 0) {
      prevState = true;
      prev.classList.remove('quote-box__footer-icon--disabled');
    } else {
      prevState = false;
      prev.classList.add('quote-box__footer-icon--disabled');
    }
  };

  const render = () => {
    const { quote, author } = quotes[currentQuote];

    chkPrevState();

    body.style.setProperty('--color-primary', colors[Math.floor(Math.random() * colors.length)]);

    body.style.setProperty('--opacity', '0');

    setTimeout(() => {
      quoteText.innerHTML = quote;
      quoteAuthor.innerHTML = author;

      body.style.setProperty('--opacity', '1');
    }, 500);

    tweet.setAttribute('href', `https://twitter.com/intent/tweet?text="${quote.replace(/'/g, '%27')}"%0a- ${author}`);
  };

  const getQuote = direction => {
    if (direction === 'next') {
      if (currentQuote === null || currentQuote === quotes.length - 1) {
        // Axios imported through <script> in the HTML head
        // eslint-disable-next-line no-undef
        axios
          .get(url())
          .then(res => {
            quotes.push({
              quote: res.data[0].content.rendered.slice(3, -5).trim(),
              author: res.data[0].title.rendered,
            });
            currentQuote === null ? (currentQuote = 0) : (currentQuote += 1);
            render();
          })
          .catch(err => alert('Something went wrong', err));
      } else {
        currentQuote += 1;
        render();
      }
    } else if (prevState) {
      currentQuote -= 1;
      render();
    }
  };

  next.addEventListener('click', () => getQuote('next'));
  prev.addEventListener('click', () => getQuote('prev'));

  document.querySelector('.modal__container').addEventListener('click', event => {
    if (event.target.className === 'modal__container') {
      document.getElementById('info-toggle').click();
    }
  });

  getQuote('next');
})();
