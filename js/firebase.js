const data = require('../index.js')

var shopName = data.shopName
var productsArray = data.productsArray
var totalPrice = data.totalPrice
var info = data.info


// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
var firebase = require("firebase/app");

// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/firestore");
require("firebase/database");




// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyAEwpzPozYVbtCKrt6Pd1NsiSu3JnuL-2A",
    authDomain: "wallet-analyzer.firebaseapp.com",
    databaseURL: "https://wallet-analyzer.firebaseio.com",
    projectId: "wallet-analyzer",
    storageBucket: "wallet-analyzer.appspot.com",
    messagingSenderId: "810830695492",
    appId: "1:810830695492:web:6741cd160e0bb166048011",
    measurementId: "G-HXFYFJX5N0"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);




// Get a reference to the database service
var database = firebase.database();

var receipt = {
    shop_name: shopName,
    items: productsArray,
    final_price: totalPrice,
    info: info
}

var key = database.ref().child('barcodes').push(receipt).key;

var JsBarcode = require('jsbarcode');

const {
    DOMImplementation,
    XMLSerializer
} = require('xmldom');
const xmlSerializer = new XMLSerializer();
const document_new = new DOMImplementation().createDocument('http://www.w3.org/1999/xhtml', 'html', null);
const svgNode = document_new.createElementNS('http://www.w3.org/2000/svg', 'svg');

JsBarcode(svgNode, key, {
    xmlDocument: document_new,
});

const svgText = xmlSerializer.serializeToString(svgNode);


module.exports = {
    svgText
};