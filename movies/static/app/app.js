'use strict';

// Declare app level module which depends on filters, and services
angular.module('movies'
  , ['movies.filters'
    , 'movies.directives'
    , 'movies.services'
    , 'movies.controllers'
    , 'ui.bootstrap']).
  //routing
  config(['$routeProvider', function($routeProvider) {
    //static
    $routeProvider.when('/home', {templateUrl: 'views/home.html', controller: 'HomeCtrl'});
    //default
    $routeProvider.otherwise({redirectTo: '/home'});
  }])