(function() {
    'use strict'

    angular
        .module('gafApp')
        .factory('dataJson', dataJson);

    function dataJson($resource) {
        return $resource("./app/assets/data.json")
    }
})();