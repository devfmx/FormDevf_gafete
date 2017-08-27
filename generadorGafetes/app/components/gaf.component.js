(function() {
    'use strict'

    var gafGen = {
        templateUrl: './app/components/gaf.component.html',
        controller: gafCtrl
    };

    angular
        .module('gafApp')
        .component('gafGen', gafGen);

    gafCtrl.$inject = ["gafApi"];

    function gafCtrl(gafApi) {
        var vm = this;

        vm.$onInit = onInit;

        function onInit() {
            vm.student = null;
            vm.dex;
            vm.search = dosearch;

            function dosearch() {
                vm.apiData = gafApi.get({
                    dex: vm.dex
                }).$promise.then(function(response) {
                    vm.student = response;
                    console.log(vm.student)
                })
            }
        }      
    }


})();
