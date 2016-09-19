angular.module("bvc.CarRouter", [
    "ui.router",
    "oc.lazyLoad"
]).config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state("blueview", {
        url: "/blueview",
        templateUrl: "views/car/car.html",
        data: {pageTitle: ""},
        controller:"CarController",
        resolve: {
            _test_result:function(CarService){
                return CarService.getTestResult();
            }
        }
    }).state("blueview.car", {
        url: "/car",
        templateUrl: "views/login/login.html",
        data: {pageTitle: ""},
        controller:"CarController",
        resolve: {
            _test_result:function(CarService){
                return CarService.getTestResult();
            }
        }
    })
}]);