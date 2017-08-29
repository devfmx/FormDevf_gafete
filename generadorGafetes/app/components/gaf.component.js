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
            vm.folder;
            vm.search = dosearch;

            function dosearch() {
                var listaAlumnos = [];
                var listaFotos = [];

                //
                vm.apiData = gafApi.get({
                    dex: vm.dex
                }).$promise.then(function(response) {
                    listaAlumnos = response;
                    if (listaFotos) {
                      dibujarGafetes();
                    }
                })

                //Descargar la lista de archivos dentro de carpeta de fotos
                //  DriveService.get(...).$promise.then(function(response) {
                //    for (file in response) {
                //      var numero = file.name; // DSC_123.jpg
                //      // usar regex para sacar solo "123"
                //      listaFotos[numero] = file.url;
                //    }
                //    if (listaAlumnos) {
                //      dibujarGafetes();
                //    }
                //  })
            }

            function dibujarGafetes() {
              // juntar listaAlumnos y listaFotos
              for (alumno in listaAlumnos) {
                alumno.foto = listaFotos[alumno.foto];
              }
              vm.student = listaAlumnos;
            }
        }
    }
    
})();
