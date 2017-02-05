'use strict';

/**
 * @ngdoc function
 * @name .controller:LoginController
 * @description
 * # LoginController
 * Controller of the
 */

angular.module('web-api-twitter')
        .controller('LoginController', function (tools, $rootScope, $scope, $auth, $location, apiService, variablesService, localStorage) {
            $rootScope.IS_USER_LOGGED = false;

            var iSSendEmailRunning = false;

            $scope.onGoToLoginView = function () {

                resetField();
            };

            $scope.onGoToForgotPasswordView = function () {
                resetField();
            };

            /*-------------------------------------------------------------------------
             *                              LOGIN HANDLE
             *-------------------------------------------------------------------------*/

            //user authentication with an external account like (Google, facebook ...)
            $scope.authenticate = function (provider) {
                $auth.authenticate(provider);
            };


            //Sign in a user
            $scope.loginUser = function (user) {

                if (user.email === '') {
                    return $scope.errorMessage = 'Username is required !';
                }

                if (user.password === '') {
                    return $scope.errorMessage = 'Password is required !';
                }

                apiService.signIn(user, function (isErr, response) {
                    if (isErr) {
                        return $scope.errorMessage = 'Invalid email or password !';
                    }

                    //Saves a JWT token to Local Storage.
                    $auth.setToken(JSON.stringify({token: response.data.token}));

                    resetField();

                    //go to home view
                    $rootScope.IS_USER_LOGGED = true;

                    //show the welcoming message
                    setTimeout(function () {
                        if (!$('.login-content')[0]) {
                            tools.notify('Welcome back ' + $rootScope.USER_NAME);
                        }
                    }, 2000);

                    return $location.path('home');
                });
            };

            $scope.automaticLogin = function () {
                setAtomaticLogin();
            };



            /*-------------------------------------------------------------------------
             *                         FOGOT PASSWORD HANDLE
             *-------------------------------------------------------------------------*/

            $scope.sendRessetPasswordEmail = function (user) {

                if(iSSendEmailRunning){
                    return;
                }
                if (!tools.checkEmailFormat(user.email)) {
                    return $scope.errorMessage = 'Invalid email !';
                }

                iSSendEmailRunning = true;

                apiService.sendResetPasswordEmail(user, function (isErr, responce) {

                    if (isErr) {
                        return $scope.errorMessage = 'Error sending email !';
                    }

                    resetField();
                    $scope.successMessage = 'Email successfully sent !';

                });
            };

            //funcitons
            function setAtomaticLogin() {
                if ($scope.isAutomaticLogin) {
                    localStorage.set('AUTOMATIC_LOGIN', false);
                } else {
                    localStorage.set('AUTOMATIC_LOGIN', true);
                }

                setIsAutomaticLoginValue(localStorage.get('AUTOMATIC_LOGIN', false));
            }

            function setIsAutomaticLoginValue(value) {
                if (value === 'false') {
                    $scope.isAutomaticLogin = false;
                } else {
                    $scope.isAutomaticLogin = true;
                }
            }


            function resetField() {
                iSSendEmailRunning = false;
                $scope.errorMessage = '';
                $scope.successMessage = '';

                $scope.user = {
                    email: '',
                    password: ''
                };

                setIsAutomaticLoginValue(localStorage.get('AUTOMATIC_LOGIN', false));
            }

            resetField();
        });
