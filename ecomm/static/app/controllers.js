'use strict';

var ctrl = angular.module('shop.controllers',['ngCookies']);

//Navigation controller
ctrl.controller('NavCtrl', function($scope,$location){
	$scope.getClass = function(path) { if ($location.path().indexOf(path) !== -1) { return "active";} else { return ""; };}
});

ctrl.controller('HomeCtrl', function($scope,$location,RecommendationService, CatalogService){
	$scope.topn = {};
	$scope.uu =[];
	$scope.explanationMode = true;
	$scope.changeExplanationMode =  function(){ $scope.explanationMode = !$scope.explanationMode; }

	$scope.visitRecommendedProduct = function(p){
		_rtq.push(['uptake']);
		$location.path(p.url);
	}

	RecommendationService.topn(function(recos){
		CatalogService(function(instance){
			$scope.topn = {'Femme':[],'Homme':[]};
			recos.forEach(function(reco){
				var pm =  instance.getProductForId(reco.id);
				if($scope.topn[pm.section].length <3){
					$scope.topn[pm.section].push({section:pm.section, url:'product/'+ pm.section +'/'+ pm.category + '/' + reco.id, media: reco.media, title: reco.title, score: reco.score, metadata:reco.metadata});
				}
			});
		});
	});

	RecommendationService.uu(function(recos){
		CatalogService(function(instance){
			$scope.uu = recos.map(function(reco) {
						var pm =  instance.getProductForId(reco.id);
						return {url:'product/'+ pm.section +'/'+ pm.category + '/' + reco.id, media: reco.media, title: reco.title, score: reco.score, metadata:reco.metadata};
			});
		});
	});
});
