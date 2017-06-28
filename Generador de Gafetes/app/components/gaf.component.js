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
            vm.desalumnos = null;

            vm.data = dataJson.get()
            vm.desalumnos = vm.data.responses
            console.log(vm.data.responses)
        }
    }
})();