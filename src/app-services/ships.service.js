(function () {

    'use strict';

    angular
        .module('app')
        .factory('ShipsService', ShipsService);

    ShipsService.$inject = ['$http', '$rootScope', 'UserService'];
    function ShipsService($http, $rootScope, UserService) {
        var username = $rootScope.globals.currentUser.username;
        var service = {
            GetStarships: GetStarships,
            GetStarship: GetStarship
        };
        return service;

        async function GetStarships(url) {
            if (!url) {
                url = 'https://swapi.co/api/starships/'
            }
            var canRequest = await UserService.tryRequest(username, url);
            if (!canRequest) return false;
            return $http.get(url, {
                headers: {
                    'Authorization': 'none'
                }
            }).then(function (res) {
                UserService.setRequest(username, url);
                return res.data;
            });

        }

        async function GetStarship(id) {
            if (!id) return false;
            var url = `https://swapi.co/api/starships/${id}/`;
            var canRequest = await UserService.tryRequest(username, url);
            if (!canRequest) return false;
            return $http.get(url, {
                headers: {
                    'Authorization': 'none'
                }
            }).then(function (res) {
                UserService.setRequest(username, url);
                return res.data;
            });

        }

    }
})();