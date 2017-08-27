(function() {
    'use strict'

    var pickerApi = {
        templateUrl: './app/components/picker.component.html',
        controller: pickerCtrl
    };

    angular.module('pickerApp', ['lk-google-picker'])
        .component('pickerApi', pickerApi)
        .config(['lkGoogleSettingsProvider', function (lkGoogleSettingsProvider) {
          lkGoogleSettingsProvider.configure({
            apiKey   : 'CsO_Va09zRN3lPaNzn52ZA5W',
            clientId : '352484554989-k9pq3engsrbv8nrvh1bt7vkcj3imhsgf.apps.googleusercontent.com',
            scopes   : ['https://www.googleapis.com/auth/drive'],
            //locale   : 'ja',
            features : [],
            //views    : ['..', '..']
          });
        }]);

    function pickerCtrl($scope) {
      $scope.files = [];

      $scope.onLoaded = function () {
        console.log('Google Picker loaded!');
      }

      $scope.onPicked = function (docs) {
        angular.forEach(docs, function (file, index) {
          $scope.files.push(file);
        });
      }

      $scope.onCancel = function () {
        console.log('Google picker close/cancel!');
      }
    }
    
})();
