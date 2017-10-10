(function () {
    'use strict'

    angular
        .module('gafApp', ['ngResource', 'ngm.ngDrive'])

    angular.module('ngm.ngDrive')
        .provider('OauthService', ngDrive.Config)
        .config(function (OauthServiceProvider) {
            OauthServiceProvider.setScopes('https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive.readonly');
            OauthServiceProvider.setClientID('352484554989-k9pq3engsrbv8nrvh1bt7vkcj3imhsgf.apps.googleusercontent.com');
            OauthServiceProvider.setTokenRefreshPolicy(ngDrive.TokenRefreshPolicy.ON_DEMAND);
        });
})();