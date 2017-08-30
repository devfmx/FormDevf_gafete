(function () {
    'use strict'

    var gafGen = {
        templateUrl: './app/components/gaf.component.html',
        controller: gafCtrl
    };

    angular
        .module('gafApp', ['ngm.ngDrive'])
        .component('gafGen', gafGen);

    angular.module('ngm.ngDrive')
        .provider('OauthService', ngDrive.Config)
        .config(function (OauthServiceProvider) {
            OauthServiceProvider.setScopes('https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive.readonly');
            OauthServiceProvider.setClientID('352484554989-k9pq3engsrbv8nrvh1bt7vkcj3imhsgf.apps.googleusercontent.com');
            OauthServiceProvider.setTokenRefreshPolicy(ngDrive.TokenRefreshPolicy.ON_DEMAND);
        });

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
                    if (listaAlumnos && listaFotos) {
                        dibujarGafetes(listaAlumnos, listaFotos);
                    }
                })

                //Descargar la lista de archivos dentro de carpeta de fotos
                DriveService.list({
                    q: "parents = '0B6XOavmaOXLAMGkzWFRFTTBMTUk'",
                    //maxResults: 10,
                    fields: 'items/title, items/id',
                }, true).$promise.then(function (response) {
                    var patt = new RegExp("[0-9]{4}");
                    for (file in response) {
                        var numero = patt.exec(file.title);

                        // usar regex para sacar solo "123"
                        listaFotos[numero] = file.id;
                    }

                    if (listaAlumnos && listaFotos) {
                        dibujarGafetes(listaAlumnos, listaFotos);
                    }
                })
            }

            function dibujarGafetes(listaAlumnos, listaFotos) {
                // juntar listaAlumnos y listaFotos
                for (alumno in listaAlumnos) {
                    alumno.id = listaFotos[alumno.img];
                }
                vm.student = listaAlumnos;
                console.log(vm.student);
            }
        }
    }

})();