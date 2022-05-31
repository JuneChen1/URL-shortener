const data = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('')
const length = 5
function shortURL(array) {
  let shortURL = ''
  for(let i = 0; i < length; i++) {
    const index = Math.floor(Math.random() * array.length)
    shortURL += array[index]
  }
  return 'http://shortURL/' + shortURL
}

module.exports = shortURL(data)