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

                //listaAlumnos = [{"name":"Alejandro","last_name":"Alonso Barba","Cinta":"Cinta Roja","Photo_time":"1899-12-31T03:10:04.655Z","img":"IMG_20170920_203325840_HDR.jpg"},{"name":"Alejandro","last_name":"Concha Orduño","Cinta":"Cinta Blanca","Photo_time":"1899-12-31T03:34:07.682Z","img":"IMG_20170920_205728864.jpg"},{"name":"Martin Alejandro","last_name":"Mendoza Lopez","Cinta":"Cinta Roja","Photo_time":"1899-12-31T03:20:59.496Z","img":"IMG_20170920_204419678.jpg"},{"name":"Arturo Adrian","last_name":"Reynoso Ibarra","Cinta":"Cinta Negra","Photo_time":"1899-12-31T03:18:17.815Z","img":"IMG_20170920_204139485_HDR.jpg"},{"name":"Carlos Abel","last_name":"Barragán Rodríguez","Cinta":"Cinta Roja","Photo_time":"1899-12-31T03:08:44.659Z","img":"IMG_20170920_203205433.jpg"},{"name":"Claudio","last_name":"Rivas","Cinta":"Cinta Roja","Photo_time":"1899-12-31T03:14:29.333Z","img":"IMG_20170920_203750596.jpg"},{"name":"Daniel Antonio","last_name":"Briones Pérez","Cinta":"Cinta Negra","Photo_time":"1899-12-31T03:19:35.169Z","img":"IMG_20170920_204255765.jpg"},{"name":"David","last_name":"Diaz de Leon Gaytan","Cinta":"Cinta Negra","Photo_time":"1899-12-31T03:12:05.112Z","img":"IMG_20170920_203526133.jpg"},{"name":"Diego Alejandro","last_name":"Huerta Barragan","Cinta":"Cinta Roja","Photo_time":"1899-12-31T03:18:01.467Z","img":"IMG_20170920_204122191.jpg"},{"name":"Dulce Lucero","last_name":"Ruvalcaba Valenzuela","Cinta":"Cinta Roja","Photo_time":"1899-12-31T03:26:30.000Z","img":"IMG_20170920_204950512.jpg"},{"name":"Eduardo","last_name":"Arreguín Velasco","Cinta":"Cinta Negra","Photo_time":"1899-12-31T03:11:43.223Z","img":"IMG_20170920_203504324.jpg"},{"name":"Efrain","last_name":"Deniz Valencia","Cinta":"Cinta Roja","Photo_time":"1899-12-31T03:11:04.550Z","img":"IMG_20170920_203425188.jpg"},{"name":"Gabriela","last_name":"Ayón Muñoz","Cinta":"Cinta Blanca","Photo_time":"","img":"IMG_20170920_215803548.jpg"},{"name":"Gabriela","last_name":"Zamora González","Cinta":"Cinta Blanca","Photo_time":"1899-12-31T03:43:35.256Z","img":"IMG_20170920_210656062.jpg"},{"name":"Germán","last_name":"Sánchez Vázquez","Cinta":"Cinta Blanca","Photo_time":"1899-12-31T03:41:21.097Z","img":"IMG_20170920_210438492.jpg"},{"name":"Gustavo Mahatma","last_name":"Morales Lomeli","Cinta":"Cinta Roja","Photo_time":"1899-12-31T03:10:31.769Z","img":"IMG_20170920_203352353.jpg"},{"name":"Jose Homero","last_name":"Valdovinos Toledo","Cinta":"Cinta Roja","Photo_time":"1899-12-31T03:23:21.027Z","img":"IMG_20170920_204641996.jpg"},{"name":"Israel Antonio","last_name":"Cerón Marchán","Cinta":"Cinta Negra","Photo_time":"1899-12-31T03:13:01.510Z","img":"IMG_20170920_203621814.jpg"},{"name":"Israel García Herrera","last_name":"García Herrera","Cinta":"Cinta Roja","Photo_time":"1899-12-31T03:07:08.000Z","img":"IMG_20170920_203030366.jpg"},{"name":"Javier","last_name":"Robles Romualdo","Cinta":"Cinta Negra","Photo_time":"1899-12-31T03:19:50.342Z","img":"IMG_20170920_204311065.jpg"},{"name":"Jessica","last_name":"Barrientos Cruz","Cinta":"Cinta Negra","Photo_time":"1899-12-31T03:18:31.336Z","img":"IMG_20170920_204152257.jpg"},{"name":"Jonathan","last_name":"Marin Grijalva","Cinta":"Cinta Blanca","Photo_time":"1899-12-31T03:37:07.831Z","img":"IMG_20170920_210028802.jpg"},{"name":"Jorge Eduardo","last_name":"Chávez Ramos","Cinta":"Cinta Roja","Photo_time":"1899-12-31T03:11:27.713Z","img":"IMG_20170920_203448181_HDR.jpg"},{"name":"Jorge Emmanuel","last_name":"Vera Lopez","Cinta":"Cinta Negra","Photo_time":"1899-12-31T03:11:54.552Z","img":"IMG_20170920_203515781.jpg"},{"name":"Jorge","last_name":"Flores Villegas","Cinta":"Cinta Blanca","Photo_time":"1899-12-31T03:33:56.843Z","img":"IMG_20170920_205718325.jpg"},{"name":"Juan Carlos","last_name":"Cárdenas Viera","Cinta":"Cinta Roja","Photo_time":"1899-12-31T03:28:21.772Z","img":"IMG_20170920_205137474.jpg"},{"name":"Juan Francisco","last_name":"Esperanza Contreras","Cinta":"Cinta Negra","Photo_time":"1899-12-31T03:19:22.051Z","img":"IMG_20170920_204243680.jpg"},{"name":"Julio Cesar","last_name":"Velázquez Álvarez","Cinta":"Cinta Roja","Photo_time":"1899-12-31T03:17:45.374Z","img":"IMG_20170920_204106924.jpg"},{"name":"Kenia","last_name":"Galván Robles","Cinta":"Cinta Blanca","Photo_time":"1899-12-31T03:37:18.680Z","img":"IMG_20170920_210039888.jpg"},{"name":"Luis Alberto ","last_name":"Jauregui Garcia","Cinta":"Cinta Blanca","Photo_time":"1899-12-31T03:36:33.000Z","img":"IMG_20170920_205954078.jpg"},{"name":"Luis Eduardo","last_name":"Machuca Rendon","Cinta":"Cinta Roja","Photo_time":"1899-12-31T03:21:19.624Z","img":"IMG_20170920_204440969.jpg"},{"name":"Luis Enrique","last_name":"Rios Villanueva","Cinta":"Cinta Negra","Photo_time":"1899-12-31T03:12:19.153Z","img":"IMG_20170920_203540366.jpg"},{"name":"Luis Fernando ","last_name":"Gutiérrez Romo","Cinta":"Cinta Negra","Photo_time":"1899-12-31T03:12:46.969Z","img":"IMG_20170920_203608133.jpg"},{"name":"Luis ","last_name":"Hidalgo ","Cinta":"Cinta Roja","Photo_time":"1899-12-31T03:19:07.796Z","img":"IMG_20170920_204229390.jpg"},{"name":"Manuel Alejandro","last_name":"Gutiérrez Estrella","Cinta":"Cinta Blanca","Photo_time":"1899-12-31T03:33:30.396Z","img":"IMG_20170920_205650346.jpg"},{"name":"Manuel Alejandro","last_name":"Mijangos González","Cinta":"Cinta Blanca","Photo_time":"1899-12-31T03:35:49.051Z","img":"IMG_20170920_205905940.jpg"},{"name":"Martin Sebastian","last_name":"Perez Lopez","Cinta":"Cinta Blanca","Photo_time":"","img":"IMG_20170920_220005601.jpg"},{"name":"Mauricio","last_name":"Espinosa Sosa","Cinta":"Cinta Roja","Photo_time":"1899-12-31T03:13:16.671Z","img":"IMG_20170920_203637917.jpg"},{"name":"Miguel","last_name":"Aramburo","Cinta":"Cinta Negra","Photo_time":"1899-12-31T03:12:31.020Z","img":"IMG_20170920_203552359.jpg"},{"name":"Miguel","last_name":"Gutiérrez","Cinta":"Cinta Blanca","Photo_time":"1899-12-31T03:41:32.115Z","img":"IMG_20170920_210453114.jpg"},{"name":"Netzahualcóyotl ","last_name":"López López","Cinta":"Cinta Roja","Photo_time":"1899-12-31T03:22:37.000Z","img":"IMG_20170920_204557654.jpg"},{"name":"Paul","last_name":"Raygoza","Cinta":"Cinta Blanca","Photo_time":"1899-12-31T03:33:46.303Z","img":"IMG_20170920_205706325.jpg"},{"name":"Ramiro Gerardo","last_name":"Perez Zamorano","Cinta":"Cinta Roja","Photo_time":"1899-12-31T03:06:53.959Z","img":"IMG_20170920_203015002.jpg"},{"name":"Rodolfo","last_name":"Martínez Vega","Cinta":"Cinta Negra","Photo_time":"1899-12-31T03:18:51.460Z","img":"IMG_20170920_204212290.jpg"},{"name":"Sadot Maximiliano","last_name":"Cortés Márquez","Cinta":"Cinta Roja","Photo_time":"1899-12-31T03:16:53.351Z","img":"IMG_20170920_204014178.jpg"}]


                vm.apiData = gafApi.get({
                    dex: vm.dex
                }).$promise.then(function (response) {
                    listaAlumnos = response.Photos;
                    console.log(listaAlumnos);
                    if (listaAlumnos && listaFotos) {
                        dibujarGafetes(listaAlumnos, listaFotos);
                    }
                })

                //Descargar la lista de archivos dentro de carpeta de fotos
                DriveService.files.list({
                    q: "parents = '0BxFsPNTCfllZRGFOU2RaWTdTQ0k'",
                    //maxResults: 10,
                    fields: 'items/title, items/id',
                } ).promise.then(function (response) {
                    var patt = new RegExp("[1-9][0-9]{2}");
                    var files = response.data.items;
                    for (var i = 0; i<files.length; i++) {
                        listaFotos[files[i].title] = files[i].id;
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
                console.log(listaAlumnos);

                //for (var alumno in listaAlumnos) {
                //    alumno.id = listaFotos[alumno.img];
                //}
                vm.student = listaAlumnos;
                console.log(vm.student);
            }
        }
    }

})();
