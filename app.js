const express = require('express')
const app = express()
const port = 3000

const generateshortURL = require('./generateshortURL')

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
  const shortURL = generateshortURL
  res.render('shorturl', { shortURL })
})

app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})
