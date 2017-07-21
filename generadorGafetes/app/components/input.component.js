(function () {
    'use strict'

    var input = {
        templateUrl: './app/components/input.component.html',
        controller: inputCtrl
    };

    angular
        .module('gafApp')
        .component('inputComponent', input);

    function inputCtrl() {
        var vm = this;
    }
})();