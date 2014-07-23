var catalog = require('../../datastore/catalog.json'),
    sampleCatalog = require('../../datastore/sampleCatalog.json'),
    products = require('../../datastore/products.json');
 
exports.loadUnivers = function(section){
  return catalog[section];
}

exports.loadSampleUnivers = function(section){
  return sampleCatalog[section];
}

exports.loadCategory = function(section, category){
  return catalog[section][category];
}

exports.loadProduct = function(productId) {
  return products[productId];
}






