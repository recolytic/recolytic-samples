'use strict';

/* Services */

var services = angular.module('shop.services',['ngCookies']);

//angular known bug
services.config(function($httpProvider){
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
});

//array helper method
function firstOrDefault(arr, predicate){
  var result;
  for (var i=0;i<arr.length;i++) { 
    if(predicate(arr[i])) {
      result = arr[i];
      break;
    }
  }
  return result;
};



services.factory('CatalogService', function($http,$window){
  var catalogSrv;
  return function(callback){
    if(catalogSrv){
      callback(catalogSrv);
    }else{
      //get the full catalog
      $http.get('/store/catalog.json').success( function(catalog){
        	//initiate an empty set of priority resources
        	var priorityResources ={};
        	var scopes =[];

	        //set the sections and the category and fill the scopes array
	        Object.keys(catalog).forEach(function(section){
	          priorityResources[section] = {};
	          Object.keys(catalog[section]).forEach(function(category){
	            priorityResources[section][category] = []; 
	            scopes.push(section + '|' + category);
	          });
	        })
          	//define the catalog serv    
          	catalogSrv = {
            	catalog : catalog,
            	sampleCatalog : priorityResources,
            	getProduct : function(section, category, pid){
              		return firstOrDefault(this.catalog[section][category], function(p){ return p.id == pid;});
            	},
            getProductForId : function(pid){
              var p;
              for(var section in this.catalog){
                for(var category in this.catalog[section]){
                  for(var index in this.catalog[section][category]){
                    if(this.catalog[section][category][index].id == pid){
                       p =  {section:section, category: category, product:this.catalog[section][category][index]};
                       break;
                    }
                  }
                  if(p) break;
                }
                if(p) break;
              }

              return p;    
            },
            getProducts : function(pids){
               var self = this;
              return pids.map(function(pid){ 
                              var productHierarchy = pid.split('|');
                              return firstOrDefault(self.catalog[productHierarchy[0]][productHierarchy[1]], function(p){
                                                                    return p.id == productHierarchy[2];})
              });
            },
            getSampleSection: function(section){
              return this.sampleCatalog[section];
            },
            getSection : function(section){
              return this.catalog[section];
            },
            getCategory : function(section, category){
              return this.catalog[section][category];
            }};
            //return the catalog service instance   
            callback(catalogSrv);
          }); // // calls handler
        }); // end // calls 
    }
  }
});