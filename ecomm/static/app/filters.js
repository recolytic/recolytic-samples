'use strict';

/* Filters */

var filters = angular.module('shop.filters', []).filter('startFrom', function(){
  	return function(input, start){
  		start = +start; //parse to int
  		return input.slice(start);
  	};
});