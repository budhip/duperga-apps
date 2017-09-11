var page = require('webpage').create();
page.settings.userAgent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/28.0.1500.71 Safari/537.36';

var url = 'https://www.kompas.com/'
page.open(url, function() {
    window.setTimeout(function() {
        var output = page.evaluate(function() {
            return document
        });
        console.log(`----------- ini outputnya --------------`)
        console.log(JSON.stringify(output));
        console.log(`ini coba liat conentnya`)
        console.log(JSON.stringify(output.content))
    }, 1000);
    phantom.exit()
});
