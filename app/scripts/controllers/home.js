'use strict';
angular.module('web-api-twitter')
        .controller('HomeController', function ($rootScope, variablesService) {
            var userInfo = variablesService.getUserInfo();
            $rootScope.USER_NAME = userInfo.name;
        });
