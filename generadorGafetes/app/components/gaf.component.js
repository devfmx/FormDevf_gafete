(function () {
    'use strict'

    var gafGen = {
        templateUrl: './app/components/gaf.component.html',
        controller: gafCtrl
    };

    angular
        .module('gafApp')
        .component('gafGen', gafGen);

    gafCtrl.$inject = ["gafApi", "DriveService"];

    function gafCtrl(gafApi, DriveService) {
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
                }).$promise.then(function (response) {
                    listaAlumnos = response.responses;
                    console.log(listaAlumnos);
                    if (listaAlumnos && listaFotos) {
                        dibujarGafetes(listaAlumnos, listaFotos);
                    }
                })

                //Descargar la lista de archivos dentro de carpeta de fotos
                DriveService.files.list({
                    q: "parents = '0B6XOavmaOXLAMGkzWFRFTTBMTUk'",
                    //maxResults: 10,
                    fields: 'items/title, items/id',
                } ).promise.then(function (response) {
                    var patt = new RegExp("[1-9][0-9]{2}");
                    var files = response.data.items;
                    for (var i = 0; i<files.length; i++) {
                        var numero = patt.exec(files[i].title);

                        // usar regex para sacar solo "123"
                        listaFotos[numero] = files[i].id;
                    }
                    console.log(listaFotos);
                    if (listaAlumnos && listaFotos) {
                        dibujarGafetes(listaAlumnos, listaFotos);
                    }
                })
            }

            function dibujarGafetes(listaAlumnos, listaFotos) {
                // juntar listaAlumnos y listaFotos
                for(var e = 0; e<listaAlumnos.length; e++){
                    listaAlumnos[e].id = listaFotos[listaAlumnos[e].img];
                }

                //for (var alumno in listaAlumnos) {
                //    alumno.id = listaFotos[alumno.img];
                //}
                vm.student = listaAlumnos;
                console.log(vm.student);
            }
        }
    }

})();