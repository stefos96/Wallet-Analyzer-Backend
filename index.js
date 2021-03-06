const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();

app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/public/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(express.static(__dirname + '/css'));
app.use(express.static(__dirname + '/js'));
app.use(express.static(__dirname + '/fonts'));

var favicon = require('serve-favicon');
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

app.use(require('body-parser').urlencoded({
  extended: true
}));

router.get('/', function (req, res) {
  res.render('index.html');
});

// post data from receipt creator
// then renders thankyou.html
app.post('/receipt_creator', function (req, res) {
  var products = req.body.product;
  var productPrices = req.body.product_price;
  var shopName = req.body.shop;

  var type = req.body.type;
  var afm = req.body.afm;
  var address = req.body.address;
  var phone = req.body.phone;
  var date = req.body.date;

  var info = {
    type,
    afm,
    address,
    phone,
    date
  }

  var productsArray = {};

  // TODO: check array
  if (products instanceof Array) {}

  var totalPrice = 0.0;

  if (products.length === productPrices.length) {
    products.forEach(function (prod, i) {
      productsArray[prod] = productPrices[i];
      totalPrice += parseFloat(productPrices[i]);
    });
  }

  module.exports = {
    shopName,
    productsArray,
    totalPrice,
    info
  };

  const firebaseHandler = require('./js/firebase.js');

  res.render('thankyou.html', {
    svgText: firebaseHandler.svgText,
    shopName: shopName,
    products: products,
    productPrices: productPrices,
    totalPrice: totalPrice,
    info: info
  });
});

// app.use(function (req, res) {
//   res.type('text/html');
//   res.status(404);
//   res.render('404.html');
// });

//add the router
app.use('/', router);
app.listen(process.env.port || 3000);

console.log('Running at Port 3000');