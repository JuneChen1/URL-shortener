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
  const shortURL = generateshortURL
  ShortURL.create({ origin_URL: originURL, short_URL: shortURL})
    .then(res.render('shorturl', { shortURL }))
    .catch(error => console.log(error))
})

app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})
