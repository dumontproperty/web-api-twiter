'use strict';
angular.module('web-api-twitter')
        .controller('HomeController', function ($scope, $rootScope, variablesService, apiService) {
            var userInfo = variablesService.getUserInfo();
            $rootScope.USER_NAME = userInfo.name;
            $scope.twits = [];

            $scope.startStream = function(){
              apiService.startStream(['bananas', 'oranges', 'strawberries']).then(function(){});
            }

            $scope.stopStream = function(){
              apiService.stopStream().then(function(){
              });
            };

            $scope.getTwit = function(){
              apiService.getTwit().then(function(response){
                $scope.twits = response.data.message;
              });
            };
        });
