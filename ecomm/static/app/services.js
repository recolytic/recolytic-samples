'use strict';

/* Services */

var services = angular.module('shop.services',['ngCookies']);

//angular known bug
services.config(function($httpProvider){
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
});

// Movies static repository
services.factory('CatalogService', function($http,$window){
  var catalogSrv = {
    section : null,
    category : null,
    currentProduct : null,
    sampleSection : null,

    getProduct : function(pid){
      var self = this;
      $http.get('/api/product/'+ pid).success(function(data) { 
          self.currentProduct =  data;});
      return self.currentProduct;
    },
    getSection : function(section){
      var self = this;
      $http.get('/api/catalog/'+ section).success(function(data) { 
        self.section =  data;});
      return self.section;
    },
    getSampleSection : function(section){
      var self = this;
      $http.get('/api/sampleCatalog/'+ section).success(function(data) { 
        self.sampleSection =  data;});
      return self.section;
    },    
    getCategory : function(section, category){
      var self = this;
      $http.get('/api/category/'+section +'/'+ category).success(function(data) { 
        self.category =  data;});
      return self.sampleCatalog;
    }
  };
  return catalogSrv;
});

//simple cart service 
services.factory('CartService', function($cookieStore, CatalogService){
  var cartSrv = {
    addToCart : function(product){
      var cart = $cookieStore.get("cart");
      var key =  product.id;
      if(cart){
         if(!cart[key]) {
            cart[key] = product;
         }
      } else {
        cart  = {} ;
        cart[key] = product 
      }
      //update the cookie
      $cookieStore.put("cart", cart);
    },
    loadCart : function(callback){
      var cart = $cookieStore.get("cart");
      return cart;
    },
    canAddToCart : function(pid){
      var cart = $cookieStore.get("cart");
      if(cart){
        if(cart[pid]) {
          return false;
        }else{
          return true;
        }
      }else{
        return true;
      }
    },
    clearCart : function(){
      $cookieStore.remove("cart");
    }
  };
  return cartSrv;
});
