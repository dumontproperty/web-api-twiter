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
