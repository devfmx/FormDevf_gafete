(function() {
    'use strict'

    var driveApi = {
        templateUrl: './app/components/drive.component.html',
        controller: driveCtrl
    };

    angular
        .module('driveApp', ['ngm.ngDrive'])
        .component('driveApi', driveApi);

        angular.module('ngm.ngDrive')
           .provider('OauthService', ngDrive.Config)
           .config(function (OauthServiceProvider) {
               OauthServiceProvider.setScopes('https://www.googleapis.com/auth/drive.file');
               OauthServiceProvider.setClientID('352484554989-k9pq3engsrbv8nrvh1bt7vkcj3imhsgf.apps.googleusercontent.com');
               OauthServiceProvider.setTokenRefreshPolicy(ngDrive.TokenRefreshPolicy.ON_DEMAND);
        });

    driveCtrl.$inject = ["DriveService"];

    function driveCtrl(DriveService) {
        var vm = this;

        vm.$onInit = onInit;

        function onInit() {
          vm.filesArray = DriveService.files.list({
              q: 'trashed = false',
              maxResults: 10,
              fields: 'items/title'
          }, true).data;
        }
    }
})();
