const express = require('express')
const router = express.Router()
const ShortURL = require('../../models/shortURL')
const generateshortURL = require('../../generateshortURL')

const bodyParser = require('../../node_modules/body-parser')
router.use(bodyParser.urlencoded({ extended: true}))

router.use(express.static('public'))

router.get('/', (req, res) => {
  res.render('index')
})

router.post('/', (req, res) => {
  console.log(req.body)
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
    .then(res.render('shorturl', { shortURL: `${req.headers.origin}/${shortURL}`, originURL }))
    .catch(error => console.log(error))
})

router.get('/:shortURL', (req, res) => {
  const shortURL = req.params.shortURL
  ShortURL.findOne({ short_URL: shortURL })
    .then(data => {
      if (!data) {
        res.render('error', { URL: `https://${req.headers.host}/${shortURL}` })
      } else {
        res.redirect(data.origin_URL)
      }
    })
    .catch(error => console.log(error))
})

module.exports = router