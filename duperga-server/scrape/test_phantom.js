var page = require('webpage').create();
var url = 'https://www.instagram.com/';

page.open(url, function (status) {
    var js = page.evaluate(function () {
        return document;
    });
    let source = js.all[0].outerHTML
    console.log(source);
    phantom.exit();
});
