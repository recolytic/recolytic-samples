'use strict';

/* Services */

var services = angular.module('movies.services',['ngCookies']);

var self =this;
//var recolyticHost = "http://www.api.recolytic.com/";

self.shuffle = function (sourceArray) {
  for (var n = 0; n < sourceArray.length - 1; n++) {
      var k = n + Math.floor(Math.random() * (sourceArray.length - n));
      var temp = sourceArray[k];
      sourceArray[k] = sourceArray[n];
      sourceArray[n] = temp;
  }
}

//angular known bug
services.config(function($httpProvider){
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
});

//Movies Data Service
services.factory('DataStoreService', function($http, $cookieStore){
  var movSrv ;
  return function(callback){
    if(movSrv){
       callback(movSrv);
    } else {
      $http.get('/store/movieStore.json').success(function(data){
        var moviesArray = [];
        for(var id in data)  moviesArray.push(data[id]);

        movSrv = {
          moviesStore : data,
          movies : moviesArray,
          getStore : function() { 
            var likes = $cookieStore.get("likes");
            if(likes) for (var i = 0; i < likes.length; i++) this.moviesStore[likes[i]].wasLiked = true; 
            return this.moviesStore;
          },
          getMovies:function(){
            self.shuffle(this.movies);        
            return this.movies;
          },
          //add the liked movie in an array stored in a cookie
          persistLike:function(movie){
            var likes = $cookieStore.get("likes");
            if(likes) likes.push(movie.id);
            else likes = [movie.id];
            $cookieStore.put("likes", likes);
          }
        };
        callback(movSrv);
      });
    }
  };
});

//recommendation service
services.factory('RecoService', function($http){
  var recoSrv = {
    baseUrl : "http://api.recolytic.com/",
    apikey :  "xxxxx-xxxxx-xxxxxx--xxxxxxxx", //TODO: replace with your subsciption api key
    collect : function(movieId, callback, errorCallback){
      var url = recoSrv.baseUrl + "collect/"+ recoSrv.apikey+"?rxid="+movieId+"&l=5&callback=JSON_CALLBACK";  
      $http({method: 'jsonp', url:url}).success(callback).error(errorCallback); 
    },
    recommend : function(callback, errorCallback){
      //var url = recoSrv.baseUrl + "recommend/hybrid/switch/"+ recoSrv.apikey+"?l=5&callback=JSON_CALLBACK";
      var url = recoSrv.baseUrl + "recommend/pcf/uu/"+ recoSrv.apikey+"?location=home_page&l=5&callback=JSON_CALLBACK";
      
      $http({method: 'jsonp', url:url})
      .success(callback).error(errorCallback); 
    },
    collectAndRecommend : function(movieId, callback, errorCallback){
      recoSrv.collect(movieId, function(){
        recoSrv.recommend(callback, errorCallback);
      });
    },
    uptake : function(strategy, location, resource, callback, errorCallback){
      var url =  recoSrv.baseUrl + "measure/uptake/"+ recoSrv.apikey+"?strategy=" + strategy+ "&strategy=user%20to%20user&location=home_page&callback=JSON_CALLBACK";  
      $http({method: 'jsonp', url:url}).success(callback).error(errorCallback); 
    }
  };
  return  recoSrv; 
});