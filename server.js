// start client server
 var express = require('express'),
   app = express(),
   http = require('http'),
   httpServer = http.Server(app);
 app.use('/assets',express.static('assets')); 
 app.get('/assets/products', function(req, res) {
   res.sendFile(__dirname + '/assets/products/appliances.json');   
  });
 app.get('/', function(req, res) {
   res.sendFile(__dirname + '/product_list_page.html');   
  });

 app.listen(3000);
 console.log('express server started');


// grab remote json and localize to avoid CORS and create an endpoint
var fs = require('fs');
var request = require('request');
var url = 'http://m.lowes.com/CatalogServices/product/nvalue/v1_0?nValue=4294857975&maxResults=6&showURL=1&rollUpVariants=1&showUrl=true&storeNumber=0595&priceFlag=rangeBalance&showMarketingBullets=1';
request({
    url: url,
    json: true
}, function (error, response, data) {

    if (!error && response.statusCode === 200) {            
        // localize JSON data to avoid CORS  
        jsonObj = JSON.stringify(data);        
        fs.writeFile('assets/products/appliances.json', jsonObj, 'utf8');        
        console.log(jsonObj);
        console.log('json localized success');
    }

}); 
