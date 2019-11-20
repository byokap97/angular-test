(function () {

    'use strict';

    angular
        .module('app')
        .factory('PilotsService', PilotsService);

    PilotsService.$inject = ['$http', '$rootScope', 'UserService'];
    function PilotsService($http, $rootScope, UserService) {
        var username = $rootScope.globals.currentUser.username;
        var service = {
            GetPilots: GetPilots,
        };
        return service;

        async function GetPilots(url) {
            if (!url) {
                url = 'https://swapi.co/api/films/'
            }
            var canRequest = await UserService.tryRequest(username, url);
            if (!canRequest) return canRequest;
            return $http.get(url, {
                headers: {
                    'Authorization': 'none'
                }
            }).then(function (res) {
                UserService.setRequest(username, url);
                return { success: true, data: res.data };
            });

        }

    }
})();