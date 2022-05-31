const data = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('')
function shortURL(length) {
  let shortURL = ''
  for(let i = 0; i < length; i++) {
    const index = Math.floor(Math.random() * data.length)
    shortURL += data[index]
  }
  return shortURL
}

module.exports = shortURL
