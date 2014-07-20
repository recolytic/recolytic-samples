'use strict';

/** Helper functions**/

// holds  the plumbing for like action, called by different controllers
var likeAction = function(scope, dataStoreService, recoService,  recoHandler, isUptake){
	return function(movie){
		if(!movie.wasLiked){
			movie.wasLiked= true;
			dataStoreService(function(dataservice){
				dataservice.persistLike(movie);
				recoService.collectAndRecommend(movie.id , function(recos){
					recoHandler(recos);
					//in this case, the user find the recommandation relevent 
					if(isUptake) recoService.uptake(function(){}, function(){});
				}
				,function(){ scope.err = true; }); 
			});
		}
	};
}

/* Controllers */

var ctrl = angular.module('movies.controllers',['ngCookies']);

ctrl.controller('HomeCtrl', function($scope, $dialog, $http, $window, DataStoreService, RecoService) {
	//Analytics
	$scope.$on('$viewContentLoaded', function(event) {
    	$window.ga('send', 'pageview', {page:'home', title: 'home'});
  	});

	$scope.moviesStore = {};
	$scope.movies = [];
  	$scope.recommended = [];
	$scope.err = false;
	$scope.pageSize = 10;
	$scope.currentPage = 0;
	$scope.explanationMode = false;

	DataStoreService(function(dataservice){
		$scope.moviesStore = dataservice.getStore();
		$scope.movies = dataservice.getMovies();

		// pop up more details for a given movie
		$scope.showDetails = function(movie, isAReco){
			if(!movie.director) movie =  $scope.moviesStore[movie.id]; 
			var movieDetails = $dialog.dialog({
	 			backdropFade: true,
	    		dialogFade:true,
				resolve: {
	                movie: function () { return movie;},
	                movies : function(){ return $scope.movies;},
	                refreshReco : function(){ return $scope.refreshReco;},
	                isReco : function(){ return isAReco; }
	            }}).open('movieDetails.html','MovieDetailsController');			
		}
		//recommendation handler : request a refresh 
		$scope.refreshReco = function(recommended){  $scope.recommended = recommended;}	
		// like action 
		$scope.like = likeAction($scope, DataStoreService, RecoService, $scope.refreshReco );
		// up take
		$scope.isRelevent = function(){ RecoService.uptake(); }
		//initial recommendations
		RecoService.recommend($scope.refreshReco);
		//hide / show explanation
		$scope.changeExplanationMode =  function(){ $scope.explanationMode = !$scope.explanationMode; }

		// pagging 
		$scope.numberOfPages = function(){ return Math.ceil($scope.movies.length / $scope.pageSize); }
		$scope.isPreviousDisabled = function(){ return $scope.currentPage == 0; }
		$scope.isNextDisabled = function(){ return $scope.currentPage >= ($scope.numberOfPages() -1);}
		$scope.incrementPagePosition = function(){ if($scope.currentPage < ($scope.numberOfPages()-1))  $scope.currentPage  = $scope.currentPage +1;}
		$scope.decrementPagePosition = function(){ if($scope.currentPage >= 1) $scope.currentPage  = $scope.currentPage -1;}
		$scope.position = function() { return ($scope.currentPage+1) +" / "+ ($scope.numberOfPages()) }		
	});
});

//movie details modal pop up controller 
ctrl.controller('MovieDetailsController',function($scope,$window, dialog, movie, movies, refreshReco, isReco, DataStoreService, RecoService) {
	//Analytics
	$scope.$on('$viewContentLoaded', function(event) {
    	$window.ga('send', 'pageview', {page:'movie details', title: 'movie details'});
  	});

	$scope.currentMovie = movie;
	$scope.movies = movies;
	$scope.isReco = isReco;

	$scope.ok = function(result) { dialog.close(); };
    $scope.like =  likeAction($scope, DataStoreService, RecoService, refreshReco, isReco);
});