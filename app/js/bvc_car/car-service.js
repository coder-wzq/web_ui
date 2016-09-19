'use strict';

BlueViewApp.factory("CarService", ['$http', '$resource', '$rootScope', '$state', '$q', 
    function($http, $resource, $rootScope, $state, $q) {
    var service = {};
    service.getTestResult = function(options){
        var deferred = $q.defer();
        var path = config.serviceBaseUrl + "/bvc/test/hello?"+new Date().getTime();
        return  $http({
           method: 'GET',
           url: path,
           data: options
           // headers:{'Content-Type':'application/json'}
           // headers:{'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
       });
    }


    service.exportImage = function(data){
      var deferred = $q.defer();
      var path = config.serviceBaseUrl + "/bvc/test/saveImage?"+new Date().getTime();
      return  $http({
         method: 'POST',
         url: path,
         data: data
      });
    }

    return service;
}]);