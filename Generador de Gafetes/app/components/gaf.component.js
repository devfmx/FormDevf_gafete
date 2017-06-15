(function() {
    'use strict'

    var gafGen = {
        templateUrl: './app/components/gaf.component.html',
        controller: gafCtrl,
    };

    angular
        .module('gafApp')
        .component('gafGen', gafGen);

    gafCtrl.$inject = ["dataJson"]

    function gafCtrl(dataJson) {
        var vm = this;

        vm.$onInit = onInit;

        function onInit() {
            vm.data = null;

            vm.data = dataJson.query()
            console.log(vm.data)
        }
    }
})();