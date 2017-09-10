var axios = require('axios')

const cheerio = require('cheerio')

function getData() {
  axios.get(`https://www.rumah123.com/search/?category=dijual&area=Bandung+Kota%2C+Bandung&keyword=&keyword_area=Bandung+Kota%2C+Bandung&installmentmin=0&installmentmax=0&type=rumah&time=1505049659330&sort=hargamin`)
  .then(({data}) => {
    let page = data
    console.log(page)
    const $ = cheerio.load(page)
    let html = $('.listing').text()
    console.log(html)
  })
  .catch(err => console.log(err))
}


// console.log(h1)

getData()
