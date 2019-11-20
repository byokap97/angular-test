(function () {

    'use strict';
    angular.module('app')
        .component('menu', {
            controller: menuController,
            templateUrl: './menu/menu.component.html',
            bindings: {
            }
        })
    function menuController($scope, $location) {
        var ctrl = this;
        ctrl.$onInit = function () {

        }

        ctrl.go = function (path) {
            $location.path(path);
        };

    }


})();