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
                    prod: 'twittergeoloc.appspot.com'
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
