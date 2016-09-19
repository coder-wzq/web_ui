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
}]);;'use strict';

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
}]);;'use strict';

BlueViewApp.controller('CarController',
        ['$scope', '$rootScope','$location','CarService','_test_result',
          function($scope, $rootScope,$location,CarService,_test_result) {
    $scope.$on('$viewContentLoaded', function() {
    });
    var base = +new Date(2016, 8, 3);
	var oneDay = 24 * 3600 * 1000;

	var data = [];
	for (var i = 1; i < 100; i++) {
	    var now = new Date(base += oneDay);
	    data.push({x:[now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),y:Math.round((Math.random()) * 100)});
	}
	var pageload = {
        name: 'page.load',
        datapoints: data
    };
    $scope.data1 = [ pageload ];


	var data = [];
	for (var i = 1; i < 10; i++) {
	    var now = new Date(base += oneDay);
	    data.push({x:[now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),y:Math.round((Math.random()) * 100)});
	}
	var pageload = {
        name: 'page.load',
        datapoints: data
    };
    $scope.data2 = [ pageload ];

    var data = [];
	for (var i = 1; i < 50; i++) {
	    var now = new Date(base += oneDay);
	    data.push({x:[now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),y:Math.round((Math.random()) * 100)});
	}
	var pageload = {
        name: 'page.load',
        datapoints: data
    };
    $scope.data3 = [ pageload ];


    $scope.config = {
        // title: '',
        // subtitle: '',
        yAxis: { scale: true },
        debug: true,
        stack: true,
        width:500,
        height:300,
        showLegend:false
    };

    $scope.rowCollection = [
        {title: 'Laurent', net: 'Renard', createTime: '1987-05-21', reply: 102},
        {title: 'Laurent', net: 'Renard', createTime: '1987-05-21', reply: 102},
        {title: 'Laurent', net: 'Renard', createTime: '1987-05-21', reply: 102},
        {title: 'Laurent', net: 'Renard', createTime: '1987-05-21', reply: 102},
        {title: 'Laurent', net: 'Renard', createTime: '1987-05-21', reply: 102},
        {title: 'Laurent', net: 'Renard', createTime: '1987-05-21', reply: 102},
        {title: 'Laurent', net: 'Renard', createTime: '1987-05-21', reply: 102}
    ];

//'infographic', 'macarons', 'shine', 'dark', 'blue', 'green', 'red'
    $scope.pieConfig = {
        title: 'Pie Chart',
        subtitle: 'Pie Chart Subtitle',
        width:500,
        height:290,
        showLegend:true,
        center:['45%', '55%'],
        radius:'75%',
        theme:'macarons',
        debug: true
    };
    $scope.pieData = [ {
        name: 'page.load',
        datapoints: [
            { x: '好', y: 33 },
            { x: '一般', y: 44 },
            { x: '不好', y: 22 }
        ]
    } ];



    console.log(_test_result.data);
    console.log('car page');
    //-----------------------------------
    $scope.testWords = [{text:'wzq',size:100,test:'good'},{text:'qqqq',size:10,test:'good'},{text:'wwww',size:20,test:'good'},{text:'eeee',size:30,test:'good'},
          {text:'rrrr',size:50,test:'good'},{text:'tttt',size:70,test:'good'},{text:'yyyy',size:20,test:'good'},
          {text:'rrrr1',size:50,test:'good'},{text:'ttt1t',size:70,test:'good'},{text:'yyyy1',size:20,test:'good'},
          {text:'rrr2r',size:50,test:'good'},{text:'t2ttt',size:70,test:'good'},{text:'yy2yy',size:20,test:'good'},
          {text:'rrr3r',size:50,test:'good'},{text:'tt3tt',size:70,test:'good'},{text:'yyy3y',size:20,test:'good'},
          {text:'rr4rr',size:50,test:'good'},{text:'tt4tt',size:70,test:'good'},{text:'yy4yy',size:20,test:'good'},
          {text:'rr5rr',size:50,test:'good'},{text:'tt5tt',size:70,test:'good'},{text:'yy5yy',size:20,test:'good'},
          {text:'rr6rr',size:50,test:'good'},{text:'tt6tt',size:70,test:'good'},{text:'yyy6y',size:20,test:'good'}];

}]);
	;angular.module("bvc.CarRouter", [
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
}]);;'use strict';

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
    return service;
}]);;BlueViewApp.directive('wordsCloud', function () {

  return {
         restrict: 'AE',
         replace: true,
         template: '<div id="chart"></div>',
         require: '^ngModel',
         scope: {
            ngModel: '='
         },
         link: function (scope, element, attrs,ngModel) {

          var fill = d3.scale.category20();

          scope.$watch("ngModel", function(data){
            var layout = d3.layout.cloud()
              .size([490, 290])
              .words(data)
              .padding(1)
              .rotate(function() { return ~~(Math.random() * 2) * 90; })
              .font("Impact")
              .fontSize(function(d) { return d.size; })
              .on("end", draw);

              function draw(words) {
                d3.select("#chart").append("svg")
                    .attr("width", layout.size()[0])
                    .attr("height", layout.size()[1])
                  .append("g")
                    .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
                  .selectAll("text")
                    .data(words)
                  .enter().append("text")
                    .style("font-size", function(d) { return d.size + "px"; })
                    .style("font-family", "Impact")
                    .style("fill", function(d, i) { return fill(i); })
                    .attr("text-anchor", "middle")
                    .attr("transform", function(d) {
                      return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                    })
                    .text(function(d) { return d.text; });
              }
              layout.start();
          });
         } 
      };
});;'use strict';

BlueViewApp.factory("AuthService", ['$http', '$resource', '$rootScope', '$state', '$q', 'localStorageService',
    function($http, $resource, $rootScope, $state, $q,localStorageService) {
    var service = {};

    service.login = function(username, password) {
        $http({
            method: 'POST',
            url: config.serviceBaseUrl + '/login',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            transformRequest: function(obj) {
                var str = [];
                for(var p in obj)
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
            },
            data: {username: username, password: password}
        }).then(function (response) {
            console.log(response);
            var userdata = response.data.__wrapObject;
            if (!userdata.accountNonExpired) {
                alert("account expired");
                return;
            }
            if (!userdata.credentialsNonExpired) {
                alert("credential expired");
                return;
            }
            if (!userdata.accountNonLocked) {
                alert("account locked");
                return;
            }

            $rootScope.currentUser = response.data.__wrapObject;
            $rootScope.authToken=$rootScope.currentUser.token;
            $rootScope.isLoggedIn = true;
            localStorageService.set("currentUser", $rootScope.currentUser);
            console.log('login success');
            $state.go("blueview.car");
            // onLoginSuccess(response);
        }, function (error) {
            $rootScope.loggingIn = false;
            console.log(error);
        });
    }
    return service;
}]);;'use strict';

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
