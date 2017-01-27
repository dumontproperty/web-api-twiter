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
