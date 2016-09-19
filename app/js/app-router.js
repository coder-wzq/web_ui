'use strict';

angular.module("bvc.AppRouter", [
    "ui.router",
    "oc.lazyLoad",
    "bvc.CarRouter"
]).config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    // Redirect any unmatched url
    $urlRouterProvider.otherwise(function($injector, $location) {
        var $state = $injector.get("$state");
        var $rootScope = $injector.get("$rootScope");
        $rootScope.isLoggedIn = true;
        if (!$rootScope.isLoggedIn) {
            $state.go("login");
        }else{
            $state.go("blueview.car");
        }
    });
    $stateProvider
    .state("login", {
        url: "/login",
        templateUrl: "views/login/login.html",
        data: {pageTitle: ""},
        controller:"LoginController",
        resolve: {
            // _test_result:function(TestService){
            //     return TestService.getTestResult();
            // }
        }
    })
}]);