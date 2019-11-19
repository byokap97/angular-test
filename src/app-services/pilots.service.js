(function () {

    'use strict';

    angular
        .module('app')
        .factory('PilotsService', PilotsService);

    PilotsService.$inject = ['$http'];
    function PilotsService($http) {
        
        var service = {
            GetPilots: GetPilots,
        };        
        return service;

        function GetPilots(url) {
            if (!url) {
                url  ='https://swapi.co/api/films/'
            }
            return $http.get(url,{
                headers: {
                    'Authorization': 'none'        
                }
            }).then(function(res){
                return res.data;
            });
        
        }
       
    }
})();