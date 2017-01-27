'use strict';

angular.module('web-api-twitter')
        .controller('NewUserController', function ($scope, dataBroker, variablesService, tools) {
            var userRoles = variablesService.userRoles;
            $scope.userRoles = userRoles.getRoles();

            // create a new account with Email and Password.
            $scope.signUp = function (newUser) {
                if (checkUser(newUser)) {
                    var a = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890';
                    newUser.password = genPassword(8,a);
                    dataBroker.signUp(newUser, function (isErr, responce) {
                        console.log('responce  = ' + JSON.stringify(responce));
                        if (isErr) {

                            if(responce.data.message === 'element already exsist !'){
                                 $scope.errorMessage = 'User already exist !';
                            return;
                            }

                            $scope.errorMessage = 'Error sign up !';
                            return;
                        }
                        init();
                        $scope.successMessage = 'Account successfully created !';
                        return;
                    });
                }
            };

            //functions
            function init() {
                $scope.errorMessage = '';
                $scope.successMessage = '';

                $scope.newUser = {
                    name: '',
                    email: '',
                    password: '',
                    role: userRoles.ADMIN
                };
            }

            init();

            //validate new user data
            function checkUser(newUser) {
                var isError = false;
                 $scope.errorMessage = '';

                if (newUser.name === '') {
                    isError =true;
                    $scope.errorMessage = 'Username is required !';
                } else if (!tools.checkEmailFormat(newUser.email)) {
                    isError =true;
                    $scope.errorMessage = 'Invalid email !';
                }

                return !isError;
            }


            function genPassword(n, a) {
                var index = (Math.random() * (a.length - 1)).toFixed(0);
                return n > 0 ? a[index] + genPassword(n - 1, a) : '';
            }

        });
