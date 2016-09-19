'use strict';

var BlueViewApp = angular.module('BlueViewApp', [
    'ui.router',
    'ui.bootstrap',
    'ngResource',
    'oc.lazyLoad',
    'LocalStorageModule',
    'angular-echarts',
    'bvc.AppRouter'
]);

// var serviceBaseUrl =window.location.protocol+'//'+window.location.host+'/';
var serviceBaseUrl =window.location.protocol+'//localhost:8080';
var config = {
    serviceBaseUrl: serviceBaseUrl,
    version: '0.1'
};
/* Setup App Main Controller */
BlueViewApp.controller('AppController', ['$scope', '$rootScope',
 function ($scope, $rootScope) {
    $scope.$on('$viewContentLoaded', function () {
    });
    $rootScope.isLoggedIn = false;
    console.log($rootScope.isLoggedIn);
}]);

BlueViewApp.config(['$ocLazyLoadProvider', function ($ocLazyLoadProvider) {
    $ocLazyLoadProvider.config({
        // global configs go here
    });
}]);

BlueViewApp.config(['localStorageServiceProvider', function (localStorageServiceProvider) {
    localStorageServiceProvider.setPrefix('zshieldapp');
}]);


BlueViewApp.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.withCredentials = false;
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
    // $httpProvider.interceptors.push('myHttpInterceptor');
    $httpProvider.interceptors.push(function ($q, $rootScope,$location,$window) {
            return {
                'responseError': function (rejection) {
                    var status = rejection.status;
                    var config = rejection.config;
                    var method = config.method;
                    var url = config.url;

                    if ($location.$$path != '/login' && status == 401) {
                        $location.path("/");
                        $rootScope.isLoggedIn = false;
                        if ($rootScope.currentProfile) {
                            $rootScope.currentProfile.needChangePassword = false;
                        }
                        $window.location.reload();
                    } else {
                        $rootScope.error = method + " on " + url + " failed with status " + status;
                    }

                    return $q.reject(rejection);
                }
            };
        }
    );
    $httpProvider.interceptors.push(function ($q, $rootScope, localStorageService) {
            return {
                'request': function (config) {
                    var isRestCall = config.url.indexOf('/api/') > -1 || config.url.indexOf('/rest/') > -1;
                    if (true) {
                        var authToken = $rootScope.authToken;
                        //&& angular.isDefined($rootScope.authToken)
                        if (!angular.isDefined(authToken) && localStorageService.get('currentProfile')) {
                            authToken = localStorageService.get('currentProfile').token;
                        }
                        config.headers['X-Auth-Token'] = authToken;
                    }
                    return config || $q.when(config);
                }
            };
        }
    );
}]);