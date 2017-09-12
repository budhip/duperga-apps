var axios = require('axios')
const cheerio = require('cheerio')
var url = `http://rumahdijual.com/carirumah.php?transaksi=BELI&jenis=RUMAH&kota=Bandung&minprice=&maxprice=500000000&ltmin=0&ktmin=0&q=&sort=0`


axios.get(url)
.then(resp => {
  let pageString = resp.data
  const $ = cheerio.load(pageString)
  let tdInfoSpec = $('td.tdInfoSpec').get()
  let tdTitleDesc = $('.TdTitleDesc').get()

  let houses = []

  for (let i = 0; i < tdInfoSpec.length; i++) {
    let house = {
       
    }
  }

  console.log(`harga: ${tdInfoSpec[0].children[0].children[0].data}`) // harga
  console.log(`wilayah" ${tdTitleDesc[0].children[2].children[2].children[1].children[0].data}`) // wilayah agak luas
  //
  console.log(`luas tanah: ${tdInfoSpec[0].children[0].next.children[0].data}`) // luas tanah
  console.log(`luas bangunan: ${tdInfoSpec[0].children[1].next.children[0].data}`) // luas bangunan
  console.log(`jumlah kamar: ${tdInfoSpec[0].children[3].children[0].children[0].data}`) // info kamar (ditangguhkan)

  console.log(`alamat: ${tdTitleDesc[0].children[0].next.next.next.children[0].data}`) // lokasi
  console.log(`url: ${tdTitleDesc[0].children[0].next.children[0].children[0].attribs.href}`) // url

})
.catch(err => {
  console.log(err)
})
