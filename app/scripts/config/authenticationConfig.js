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
        $authProvider.authToken = '';
        $authProvider.storageType = 'localStorage';

    })
