const express = require('express')
const app = express()
const port = 3000

const generateshortURL = require('./generateshortURL')
const ShortURL = require('./models/shortURL')

const exphbs = require('express-handlebars')
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

require('./config/mongoose')

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', (req, res) => {
  const originURL = req.body.url
  let shortURL = generateshortURL
  ShortURL.findOne({ origin_URL: originURL })
    .then(data => {
      if (!data) {
        ShortURL.create({ origin_URL: originURL, short_URL: shortURL })
      } else {
        // 輸入相同網址時，產生一樣的縮址
        shortURL = data.short_URL
      }
    })
    .then(res.render('shorturl', { shortURL: `https://localhost:${port}/${shortURL}`, originURL }))
    .catch(error => console.log(error))
})

app.get('/:shortURL', (req, res) => {
  const shortURL = req.params.shortURL
  ShortURL.findOne({ short_URL: shortURL })
    .then(data => {
      if (!data) {
        res.render('error', { URL: `https://localhost:${port}/${shortURL}`})
      } else {
        res.redirect(data.origin_URL)
      }
    })
    .catch(error => console.log(error))
})

app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})
app.listen()