'use strict';

/**
 * @ngdoc service
 * @name .apiService
 * @description
 * # apiService
 * this service manage all call request to the back-end server.
 */
angular.module('web-api-twitter')
        .service('apiService', function ($http, variablesService, $auth) {

            $http.defaults.headers.post = {'Content-Type': 'application/json'};

            var serverConfig = variablesService.serverConfig;

            var modelNames = variablesService.modelNames;

            //var baseURL = '//' + serverConfig.host + ':' + serverConfig.port;

            var baseURL = '//' + serverConfig.host;

            var isError = true;

            var SUCCESS_REQUEST = '1';

            //get user account
            this.getUserAccount = function (user, result) {
                $http.get(baseURL + '/getElement/' + modelNames.INNERVIEW_USER + '/' + user._id)
                        .then(function (responce) {
                            if (responce.data.status === SUCCESS_REQUEST) {
                                return result(!isError, responce);
                            } else {
                                return result(isError, responce);
                            }

                        }, function (responce) {
                            return result(isError, responce);
                        });
            };

            //connect a user
            this.signIn = function (newUser, result) {
                $http.post(baseURL + '/auth/login', newUser)
                        .then(function (responce) {
                            if (responce.data.status === SUCCESS_REQUEST) {
                                return result(!isError, responce);
                            } else {
                                return result(isError, responce);
                            }
                        }, function (responce) {
                            return result(isError, responce);
                        });
            };


            //create a new user accunt
            this.signUp = function (newUser, result) {
                $http.post(baseURL + '/auth/signup', newUser)
                        .then(function (responce) {
                            if (responce.data.status === SUCCESS_REQUEST) {
                                return result(!isError, responce);
                            } else {
                                return result(isError, responce);
                            }
                        }, function (responce) {
                            return result(isError, responce);
                        });
            };

            //log out the user session
            this.changeUserPassword = function (userPasword, result) {
                $http.post(baseURL + '/changePassword', userPasword)
                        .then(function (responce) {
                            if (responce.data.status === SUCCESS_REQUEST) {
                                return result(!isError, responce);
                            } else {
                                return result(isError, responce);
                            }
                        }, function (responce) {
                            return result(isError, responce);
                        });
            };

            //resset the user password
            this.resetUserPasswordEmail = function (user, result) {
                $http.post(baseURL + '/resetPassword', user)
                        .then(function (responce) {
                            if (responce.data.status === SUCCESS_REQUEST) {
                                return result(!isError, responce);
                            } else {
                                return result(isError, responce);
                            }
                        }, function (responce) {
                            return result(isError, responce);
                        });
            };

            //send reset password email to the user
            this.sendResetPasswordEmail = function (user, result) {
                $http.post(baseURL + '/sendResetEmail', user)
                        .then(function (responce) {
                            if (responce.data.status === SUCCESS_REQUEST) {
                                return result(!isError, responce);
                            } else {
                                return result(isError, responce);
                            }
                        }, function (responce) {
                            return result(isError, responce);
                        });
            };



            this.startStream = function (names) {
                return $http.post(baseURL + '/startStream', names);
            };


            this.stopStream = function () {
                return $http.get(baseURL + '/stopStream');
            };

            this.getTwit = function(){
              return $http.get(baseURL + '/getElements/' + modelNames.TWIT);
            };
        });
