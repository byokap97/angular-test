(function () {

    'use strict';
    angular.module('app')
    .component('starshipsList', {
        controller: StarshipsListController,
        templateUrl: './ships/starships-list/starships-list.component.html',
        bindings: {
            starships: '<',
            nextShipsAvailable: '<',
            onFetchNextPage: '&',
        }
    })
    function StarshipsListController($scope) {
        var ctrl = this;
        ctrl.nextShips;
        ctrl.$onInit = function (){
            ctrl.nextShips = ctrl.nextShipsAvailable
        }

        
        ctrl.fetchNextPage = function () {
            ctrl.onFetchNextPage();
        }
    }


})();