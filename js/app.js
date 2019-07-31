;(function() {
  const url = () =>
    `https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&timestamp=${new Date().getTime()}`

  const body = document.querySelector('body')
  const tweet = document.getElementById('tweet-quote')
  const next = document.getElementById('new-quote')
  const prev = document.getElementById('prev-quote')
  const quoteText = document.getElementById('text')
  const quoteAuthor = document.getElementById('author')

  const quotes = []
  let currentQuote = null
  let prevState = false

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
    '#607d8b'
  ]

  next.addEventListener('click', () => getQuote('next'))
  prev.addEventListener('click', () => getQuote('prev'))

  const getQuote = direction => {
    if (direction === 'next') {
      if (currentQuote === null || currentQuote === quotes.length - 1) {
        axios
          .get(url())
          .then(res => {
            quotes.push({
              quote: res.data[0].content.slice(3, -5).trim(),
              author: res.data[0].title
            })
            currentQuote === null ? (currentQuote = 0) : currentQuote++
            render()
          })
          .catch(err => alert('Something went wrong', err))
      } else {
        currentQuote++
        render()
      }
    } else {
      if (prevState) {
        currentQuote--
        render()
      }
    }
  }

  const chkPrevState = () => {
    if (quotes.length > 1 && currentQuote !== 0) {
      prevState = true
      prev.classList.remove('quote-box__footer-icon--disabled')
    } else {
      prevState = false
      prev.classList.add('quote-box__footer-icon--disabled')
    }
  }

  const render = () => {
    quote = quotes[currentQuote].quote
    author = quotes[currentQuote].author

    chkPrevState()

    body.style.setProperty('--primary-color', colors[Math.floor(Math.random() * colors.length)])

    body.style.setProperty('--opacity', '0')

    setTimeout(() => {
      quoteText.innerHTML = quote
      quoteAuthor.innerHTML = author

      body.style.setProperty('--opacity', '1')
    }, 500)

    tweet.setAttribute('href', `https://twitter.com/intent/tweet?text="${quote.replace(/'/g, '%27')}"%0a- ${author}`)
  }

  getQuote('next')
})()
