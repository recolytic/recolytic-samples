'use strict';

// Declare app level module which depends on filters, and services
angular.module('shop'
  , ['shop.filters'
  , 'shop.services'
  , 'shop.directives'
  , 'shop.controllers'
  ,'ui.bootstrap']).
  //routing
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/home', {templateUrl: 'views/home.html', controller: 'HomeCtrl'});
    $routeProvider.when('/catalog/:section', {templateUrl: 'views/section.html', controller: 'CatalogCtrl'});
    $routeProvider.when('/product/:section/:category/:pid', {templateUrl: 'views/product.html', controller: 'ProductCtrl'});
    $routeProvider.when('/category/:section/:category', {templateUrl: 'views/category.html', controller: 'CategoryCtrl'});
    $routeProvider.when('/cart', {templateUrl: 'views/cart.html', controller: 'CartCtrl'});
    //default
    $routeProvider.otherwise({redirectTo: '/home'});
  }])