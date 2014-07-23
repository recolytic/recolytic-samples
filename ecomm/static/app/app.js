'use strict';

// Declare app level module which depends on filters, and services
angular.module('shop'
  , ['shop.filters'
  , 'shop.services'
  , 'shop.directives'
  , 'shop.controllers'
  , 'ui.bootstrap']).
//routing
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/home', {templateUrl: 'views/home.html', controller: 'HomeCtrl'});
    $routeProvider.when('/univers/:univers', {templateUrl: 'views/univers.html', controller: 'UniversCtrl'});
    $routeProvider.when('/product/:pid', {templateUrl: 'views/product.html', controller: 'ProductCtrl'});
    $routeProvider.when('/category/:univers/:category', {templateUrl: 'views/category.html', controller: 'CategoryCtrl'});
    $routeProvider.when('/cart', {templateUrl: 'views/cart.html', controller: 'CartCtrl'});
    $routeProvider.otherwise({redirectTo: '/home'});
  }])