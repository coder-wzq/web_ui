'use strict';

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
}]);