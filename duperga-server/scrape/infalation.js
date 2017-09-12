
require('ssl-root-cas').inject()
var https = require('https')
var axios = require('axios')
var cheerio = require('cheerio')
var url = `https://www.bps.go.id/linkTabelStatis/view/id/907`

const agent = new https.Agent({
  rejectUnauthorized: false
});
axios.get(url, { httpsAgent: agent })
.then(resp => {
  let page = resp.data
  const $ = cheerio.load(page)
  // let field = $('.xl937862').get()
  // let data1 = $('td.xl887862').get()
  // let data2 = $('td.xl877862').get()

  let first = $('.xl637862td').children('.xl877862').get()
  // console.log(`------------- 1 ${data1.length}`)
  console.log(first)
  // console.log(`----------------- field`)
  // console.log(field[0])
  // console.log(data1[0].children[0].data)
  // console.log(data1[1].children[0].data)
  // console.log(data1[2].children[0].data)
  // console.log(`------------- 2 ${data2.length}`)
  // console.log(data2[0].children[0].data)\

  // for (let i = 0; i < field.length; i++) {
  //   let year = field[i].children[0].data
  //   console.log(year)
  // }
  //
  // for (let i = 0; i < data1.length; i++) {
  //   let d1 = data1[i].children[0].data
  //   console.log(d1)
  // }
  //
  // for (let i = 0; i < data2.length; i++) {
  //   let d2 = data2[i].children[0].data
  //   console.log(d2)
  // }
})
.catch(err => console.log(err))
