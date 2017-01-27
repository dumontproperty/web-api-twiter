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
