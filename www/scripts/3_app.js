'use strict';

angular.module('web-api-twitter', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'satellizer',
        'app-templates'
    ])
    .run(function(tools, $rootScope) {
        $rootScope.logout = tools.logout;
        // register listener to watch route changes
        $rootScope.$on("$routeChangeStart", function(event, next, current) {
            //check the user session validity
            if (next.controller !== 'ResetpasswordController') {
                if (!tools.isUserConnexionValid()) {
                    //logout the user and go to the login view
                    tools.logout();
                } else {
                    $rootScope.IS_USER_LOGGED = true;
                }
            }
        });
    });

angular.module('web-api-twitter')
    .config(function($authProvider) {
        // Optional: For client-side use (Implicit Grant), set responseType to 'token'
        $authProvider.facebook({
            clientId: 'Facebook App ID',
            responseType: 'token'
        });

        $authProvider.google({
            clientId: 'Google Client ID'
        });

        $authProvider.httpInterceptor = function() {
            return true;
        };

        $authProvider.withCredentials = true;
        $authProvider.tokenRoot = null;
        $authProvider.tokenName = 'token';
        $authProvider.tokenPrefix = 'satellizer';
        $authProvider.authHeader = 'Authorization';
        //$authProvider.authToken = '';
        $authProvider.storageType = 'localStorage';

    })


angular.module('web-api-twitter')
.config(function ($httpProvider) {
    $httpProvider.defaults.headers.common = {};
    $httpProvider.defaults.headers.post = {};
    $httpProvider.defaults.headers.put = {};
    $httpProvider.defaults.headers.patch = {};
})

angular.module('web-api-twitter')
    .config(function($routeProvider, $locationProvider) {
      //$locationProvider.html5Mode(true);
        $routeProvider
            .when('/home', {
                templateUrl: 'views/home.html',
                controller: 'HomeController',
                controllerAs: 'home'
            })
            .when('/createuser', {
                templateUrl: 'views/createuser.html',
                controller: 'NewUserController',
                controllerAs: 'createuser'
            })
            .when('/login', {
                templateUrl: 'views/login.html',
                controller: 'LoginController',
                controllerAs: 'login'
            })
            .when('/profile', {
                templateUrl: 'views/userprofile.html',
                controller: 'userProfileController',
                controllerAs: 'userprofile'
            })
            .when('/resetPassword/:id/:exprationTime', {
                templateUrl: 'views/resetpassword.html',
                controller: 'ResetpasswordController',
                controllerAs: 'resetPassword'
            })
            .when('/createUser', {
                templateUrl: 'views/createuser.html',
                controller: 'NewUserController',
                controllerAs: 'createUser'
            })
            .otherwise({
                redirectTo: '/home'
            });
    })

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

'use strict';

angular.module('web-api-twitter')
        .controller('NewUserController', function ($scope, apiService, variablesService, tools) {
            var userRoles = variablesService.userRoles;
            $scope.userRoles = userRoles.getRoles();

            // create a new account with Email and Password.
            $scope.signUp = function (newUser) {
                if (checkUser(newUser)) {
                    var a = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890';
                    newUser.password = genPassword(8,a);
                    apiService.signUp(newUser, function (isErr, responce) {
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

'use strict';

/**
 * @ngdoc function
 * @name .controller:ResetpasswordController
 * @description
 * # ResetpasswordController
 * Controller of the
 */
angular.module('web-api-twitter')
        .controller('ResetpasswordController', function ($scope, $rootScope, apiService, $routeParams, $location, $auth) {
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
                    apiService.resetUserPasswordEmail(userPassword, function (isErr, responce) {
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

            var baseURL = '//' + serverConfig.host + ':' + serverConfig.port;

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

'use strict';
angular.module('web-api-twitter')
        .service('localStorage', function ($window) {

            this.set = function (key, value) {
                $window.localStorage[key] = value;
            };

            this.get = function (key, defaultValue) {
                return $window.localStorage[key] || defaultValue;
            };

            this.remove = function (key) {
                delete $window.localStorage[key];
            };

            this.setObject = function (key, value) {
                $window.localStorage[key] = JSON.stringify(value);
            };

            this.getObject = function (key) {
                return JSON.parse($window.localStorage[key] || '{}');
            };
        });

'use strict';

angular.module('web-api-twitter')
        .service('tools', function ($rootScope, $auth, $location, variablesService, localStorage) {

            var _this = this;

            //deletes a token from Local Storage (or Session Storage).
            this.logout = function () {
                $auth.logout();
                $rootScope.IS_USER_LOGGED = false;
                $location.path('login');
            };

            //check user session validity
            this.userSessionIsValid = function (userInfo) {
                return userInfo !== undefined && userInfo.exp > moment().unix();
            };

            this.notify = function (message) {
                var type = 'inverse';
                $.growl({
                    message: message
                }, {
                    type: type,
                    allow_dismiss: false,
                    label: 'Cancel',
                    className: 'btn-xs btn-inverse',
                    placement: {
                        from: 'bottom',
                        align: 'left'
                    },
                    delay: 2500,
                    animate: {
                        enter: 'animated fadeInUp',
                        exit: 'animated fadeOutDown'
                    },
                    offset: {
                        x: 30,
                        y: 30
                    }
                });
            };

            //check the user session velidity
            this.isUserConnexionValid = function () {
                var userInfo = variablesService.getUserInfo();
                var isAutomaticLogin = localStorage.get('AUTOMATIC_LOGIN', false);
                if (!$auth.isAuthenticated() || (!_this.userSessionIsValid(userInfo) && isAutomaticLogin === false)) {
                    return false;
                }
                return true;
            };

            this.checkEmailFormat = function(email){
                var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(email);
            };

        });

'use strict';
/**
 * @ngdoc service
 * @name .variablesService
 * @description
 * # variablesService
 * Service in the.
 */

angular.module('web-api-twitter')
        .service('variablesService', function ($auth) {
            var PRODUCTION_MODE = true; // true, false

            //innerview server configuration
            var server = {
                port: {
                    dev: 8080,
                    prod: 8080
                },
                host: {
                    dev: 'localhost',
                    prod: 'localhost'
                },
                getServerConfig: function () {
                    if (PRODUCTION_MODE) {
                        return{
                            port: server.port.prod,
                            host: server.host.prod
                        };
                    }
                    return {
                        port: server.port.dev,
                        host: server.host.dev
                    };
                }
            };

            this.serverConfig = server.getServerConfig();

            //element model name
            this.modelNames = {
                USER: 'User',
                INNERVIEW_USER: 'InnerviewUser',
                TWIT: "Twit"
            };

            //innerview user role
            this.userRoles = {
                ADMIN: 'admin',
                COLLAB: 'collab',
                CLIENT: 'client',
                getRoles: function () {
                    return [this.ADMIN, this.COLLAB, this.CLIENT];
                }
            };

            this.getUserInfo = function () {
                return $auth.getPayload();
            };
        });
