(function() {
    'use strict'

    angular
        .module('gafApp')
        .factory("gafApi", gafApi);

    function gafApi($resource) {
        return $resource("https://script.google.com/macros/s/AKfycbygukdW3tt8sCPcFDlkMnMuNu9bH5fpt7bKV50p2bM/exec?id=:dex&sheet=responses");
    }
})();