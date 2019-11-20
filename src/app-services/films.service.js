(function () {

    'use strict';

    angular
        .module('app')
        .factory('FilmsService', FilmsService);

    FilmsService.$inject = ['$http', '$rootScope', 'UserService'];
    function FilmsService($http, $rootScope, UserService) {
        var username = $rootScope.globals.currentUser.username;
        var service = {
            GetFilms: GetFilms,
        };        
        return service;

        function GetFilms(url) {
            if (!url) {
                url  ='https://swapi.co/api/films/'
            }
            var canRequest = await UserService.tryRequest(username, url);
            if(!canRequest) return false;

            return $http.get(url,{
                headers: {
                    'Authorization': 'none'        
                }
            }).then(function(res){
                UserService.setRequest(username, url);
                return res.data;
            });
        
        }
       
    }
})();