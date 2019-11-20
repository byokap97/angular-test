(function () {
    'use strict';

    angular
        .module('app')
        .controller('ShipsController', ShipsController);

    ShipsController.$inject = ['ShipsService', '$scope', '$location'];
    function ShipsController(ShipsService, $scope, $location) {
        var _this = this;


        _this.fetchNext = function () {
            _this.dataLoading = true;
            var url = _this.lastResponse ? _this.lastResponse.next : null;
            ShipsService.GetStarships(url)
                .then(function (response) {
                    _this.dataLoading = false;
                    if (response.success) {
                        var data = response.data;
                        _this.starships = _this.starships.concat(data.results);
                        _this.lastResponse = data;
                        if (_this.lastResponse && !_this.lastResponse.next) {
                            _this.nextShips = false;
                        }
                    } else {
                        _this.error = true;
                    }
                    $scope.$digest();
                })
                .catch(function () {
                    _this.error = true;
                    _this.dataLoading = false;
                    $scope.$digest();
                })
        }
        _this.error = undefined;
        _this.lastResponse = {};
        _this.nextShips = true;
        _this.dataLoading = true;
        _this.starships = [];

        _this.go = function (path) {
            $location.path(path);
        };

        _this.fetchNext();

    }
})();