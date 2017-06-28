(function() {
    'use strict'

    angular
        .module('gafApp')
        .factory('dataJson', dataJson);

    function dataJson($resource) {
        return $resource("https://script.google.com/macros/s/AKfycbygukdW3tt8sCPcFDlkMnMuNu9bH5fpt7bKV50p2bM/exec?id=1vsf043AXxF9gz9lSaxf46hABz9lSVDQl9hr7dQlSDFI&sheet=responses")
    }
})();