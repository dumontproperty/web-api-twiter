'use strict';

/**
 * @ngdoc function
 * @name .controller:ProfileCtrl
 * @description
 * # ResetpasswordController
 * Controller of the
 */
angular.module('web-api-twitter')
        .controller('userProfileController', function ($scope, apiService, $auth, variablesService) {
            var USER_INFO = variablesService.getUserInfo();

            $scope.navigate = function (blockName) {
                initBocknavigation();
                if (blockName === 'ABOUT') {
                    initBockGlobaluserInformation();
                    $scope.ABOUT = true;
                } else if (blockName === 'CHANGE_PASSWORD') {
                    initBockChangePassword();
                    $scope.CHANGE_PASSWORD = true;
                }
            };

            $scope.changePassword = function (userPasword) {
                if(userPasword.holdPassword === ''){
                    $scope.errorMessage = 'Old password invalid !';
                }else if(userPasword.newPassword === ''){
                    $scope.errorMessage = 'New password invalid !';
                }

                apiService.changeUserPassword(userPasword, function (isErr, response) {
                    if (isErr) {
                        return $scope.errorMessage = 'Old password invalid !';
                    }

                    initBockChangePassword();

                   return $scope.successMessage = 'Password successfully changed !';

                });
            };

            function initBocknavigation() {
                $scope.ABOUT = false;
                $scope.CHANGE_PASSWORD = false;
            }

            function initBockChangePassword() {
                $scope.successMessage = '';
                $scope.errorMessage = '';

                $scope.userPassword = {
                    email: USER_INFO.email,
                    holdPassword: '',
                    newPassword: ''
                };
            }

            function initBockGlobaluserInformation() {
                $scope.successMessage = '';
                $scope.errorMessage = '';

                $scope.globalUserInformation = {
                    name: ''
                };

                apiService.getUserAccount(USER_INFO, function (isErr, response) {
                    if (isErr) {
                        return $scope.errorMessage = 'Error getting user informations !';
                    }
                    return  $scope.globalUserInformation = response.data.message;
                });
            }

            function init() {
                $scope.successMessage = '';
                initBockGlobaluserInformation();
                initBockChangePassword();
                initBocknavigation();
                $scope.ABOUT = true;
            }
            init();
        });
