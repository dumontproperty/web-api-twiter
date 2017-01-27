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
