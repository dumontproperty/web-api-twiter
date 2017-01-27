'use strict';

/**
 * @ngdoc function
 * @name .controller:ResetpasswordController
 * @description
 * # ResetpasswordController
 * Controller of the
 */
angular.module('web-api-twitter')
        .controller('ResetpasswordController', function ($scope, $rootScope, dataBroker, $routeParams, $location, $auth) {
            //make sure no users connected while password reseting
            $auth.logout();
            $rootScope.IS_USER_LOGGED = false;

            //get the user id
            var routeParams = $routeParams;
            if(moment().unix() > routeParams.exprationTime){
                return $location.path('login');
            }

            function init() {
                $scope.logError = false;
                $scope.logError = false;
                $scope.logMessage = '';

                $scope.userPassword = {
                    _id: routeParams.id,
                    newPassword: '',
                    confirmPassword: ''
                };
            }

            init();

            $scope.reset = function (userPassword) {
                if ((userPassword.newPassword !== '') && (userPassword.newPassword === userPassword.confirmPassword)) {
                    dataBroker.resetUserPasswordEmail(userPassword, function (isErr, responce) {
                        if (isErr) {
                            $scope.logError = true;
                            return $scope.logMessage = 'error reset password';
                        }
                        init();
                        return $location.path('login');
                    });
                } else {
                    $scope.logError = true;
                    return $scope.logMessage = 'passwords not matching';
                }
            };
        });
