(function () {

    'use strict';

    angular
        .module('app')
        .factory('FilmsService', FilmsService);

    FilmsService.$inject = ['$http'];
    function FilmsService($http) {
        
        var service = {
            GetFilms: GetFilms,
        };        
        return service;

        function GetFilms(url) {
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