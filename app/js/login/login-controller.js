'use strict';

BlueViewApp.controller('LoginController',
        ['$scope', '$rootScope','$location','$state','AuthService','CarService',
          function($scope, $rootScope,$location,$state,AuthService,CarService) {
    $scope.$on('$viewContentLoaded', function() {
    });

    console.log('login page');
    $scope.login = function() {
    	// $state.go("blueview.car");
    	console.log($scope.username);
        AuthService.login($scope.username, $scope.password);
    };

    $scope.test = function() {
        // $state.go("blueview.car");
        CarService.getTestResult({testWord:'hello'});
    };
}]);
