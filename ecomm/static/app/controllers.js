'use strict';

var ctrl = angular.module('shop.controllers',['ngCookies']);

var apiKey = "xxx-xxxxx-xxxxxx-xxxx-xxxxxx"; //TOD replace with your subscrption api key
var baseUrl = "http://api.recolytic.Com/"

//needed for query string serialization
jQuery.ajaxSettings.traditional = true;

// controllers
//Navigation controller
ctrl.controller('NavCtrl', function($scope,$location){
	$scope.getClass = function(path) { if ($location.path().indexOf(path) !== -1) { return "active";} else { return ""; };}
});

//Home controller
ctrl.controller('HomeCtrl', function($scope,$location, $http, $window){
	$scope.topnWoman = [];
	$scope.topnMan = [];
	$scope.uu =[];
	$scope.explanationMode = true;

	var uptake  = function(productId, page, strategy) {
		$window._rtq.push(['uptake',productId, page, strategy]);
		$location.path("/product/"+ productId);
	};

	$scope.uuUptake = function(productId){
		uptake(productId,"landing_page","user to user");
	}

	$scope.topnUptake = function(productId){
		uptake(productId,"landing_page","most popular");
	}

	//recommendation section
	var params = {};
	params['location'] = "landing_page";
    params['callback']= "JSON_CALLBACK";
    // most popular for woman scope
	params['sc']= ["Femme"];
	$http.jsonp(baseUrl + 'recommend/np/topn/' + apiKey + "?"+$.param(params)).success(function(topn) {
		$scope.topnWoman = topn;
    });	

	//most popular for man scope
	params['sc']= ["Homme"];
	$http.jsonp(baseUrl + 'recommend/np/topn/' + apiKey + "?"+$.param(params)).success(function(topn) {
		$scope.topnMan = topn;
    });	

	delete params.sc;
    $http.jsonp(baseUrl + 'recommend/pcf/uu/' + apiKey + "?"+$.param(params)).success(function(uu) {
    	if(!$.isEmptyObject(uu)) $scope.uu = uu;
    });	
});

//Catalog controller 
ctrl.controller('UniversCtrl', function($scope,$routeParams, $http) {

	$scope.sampleSectionCatalog = [];
	$scope.technicalError = false;
	$scope.univers = $routeParams.univers;
	$scope.isMan = $scope.univers == "Homme";
	$scope.isWoman = $scope.univers == "Femme";
	$scope.explanationMode = false;

	$scope.formatTitle = function(product){
		return formatProductName(product, 60);
	}
	
	$http.get('/api/sampleUnivers/'+ $scope.univers).success(function(data) { 
        $scope.sampleUniversCatalog =  data;
    });

	$scope.changeExplanationMode =  function(){ $scope.explanationMode = !$scope.explanationMode; }
});


//Category Controller
ctrl.controller('CategoryCtrl', function($scope,$routeParams, $http){
	$scope.univers = $routeParams.univers;
	$scope.category = $routeParams.category;
	$scope.isMan = $scope.section == "Homme";
	$scope.isWoman = $scope.section == "Femme";

	$http.get('/api/catalog/'+ $scope.univers +'/'+ $scope.category).success(function(data) { 
        $scope.products =  data;
    });	

	$scope.formatTitle = function(product){
		return formatProductName(product, 46 );
	}
});

//Product Controller
ctrl.controller('ProductCtrl', function($scope,$routeParams,$location, $cookieStore,$window, $http, CartService){
	$scope.pid = $routeParams.pid;
	$scope.recommendations = [];
	$scope.canAddToCart = CartService.canAddToCart($scope.pid );
	
	$http.get('/api/product/'+ $scope.pid ).success(function(data) { 
		$scope.product =  data;
		$scope.univers =   $scope.product.section ;
		$scope.category =   $scope.product.category ;
		$scope.isMan = $scope.section == "Homme";
		$scope.isWoman = $scope.section == "Femme";
		$window._rtq.push(['collect', $scope.pid,1 ]);
    });	

	$scope.addToCart = function(product){
		if($scope.canAddToCart){
			CartService.addToCart(product);
			$scope.canAddToCart = false;
			$window._rtq.push(['collect', $scope.pid,2]);
		}
	}; 

});


ctrl.controller('CartCtrl', function($scope, $http, $window,$location, CartService, CatalogService) {

	$scope.explanationMode = false;
	$scope.orderPlaced = false;
	$scope.recommendations = [];
	$scope.products = CartService.loadCart();
	$scope.isEmpty = !$scope.products;

	if(!$scope.isEmpty) {
		$scope.totalPrice =  Object.keys($scope.products).map(function(id){return parseInt($scope.products[id].price.replace(' €',''))}).reduce(function(a,b){return a+b}) + ' €';
		$scope.cartLength = Object.keys($scope.products).length;

		//recommendation section
		var params = {};
		params['location'] = "shopping_cart";
		params['rx'] = Object.keys($scope.products);
		params['at']= 2;
	    params['callback']= "JSON_CALLBACK";
	    
		$http.jsonp(baseUrl + 'recommend/cf/basket/' + apiKey + "?"+$.param(params)).success(function(coo) {
			$scope.recommendations = coo;
	    });			
	}

	$scope.order = function(){
		Object.keys($scope.products).forEach(function(product){
			$window._rtq.push(['collect', product.id,3]);
		}); 
		
		//do the logic
		CartService.clearCart();
		$scope.products = [];
		$scope.isEmpty = true;
		$scope.orderPlaced = true;
	}

	$scope.dropCart = function(){
		//logic
		CartService.clearCart();
		$scope.products = [];
		$scope.isEmpty = true;
	}

	var uptake  = function(productId, page, strategy) {
		$window._rtq.push(['uptake',productId, page, strategy]);
		$location.path("/product/"+ productId);
	}

	$scope.basketUptake = function(productId){
		uptake(productId,"shopping_cart","co-occurence");
	}

	$scope.formatTitle = function(product){
		return formatProductName(product, 20 );
	};	

});

var formatProductName = function(product, size){
	var title =  product.name +': '+  product.brand +'.'; //+', ' +product.price + '.';
	if(title.length > size) return  title.substring(0,size-3) + '...';	
	else return title;
}