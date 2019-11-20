(function () {
    'use strict';

    angular
        .module('app')
        .controller('ShipController', ShipController);

    ShipController.$inject = ['ShipsService', 'FilmsService', 'PilotsService', '$scope', '$routeParams', '$location'];
    function ShipController(ShipsService, FilmsService, PilotsService, $scope, $routeParams, $location) {
        var _this = this;
        _this.shipId = null;

        _this.fetchInfo = function () {
            _this.dataLoading = true;
            ShipsService.GetStarship($routeParams.idShip)
                .then(function (response) {
                    if (response.success) {
                        var data = response.data;
                        _this.starship = data;
                        _this.shipId = getId(_this.starship.url)
                        if (_this.starship.films.length > 0) {
                            getFilms();
                        }
                        if (_this.starship.pilots.length > 0) {
                            getPilots();
                        }
                    } else {
                        _this.error = true;
                    }
                    _this.dataLoading = false;
                    $scope.$digest();
                })
                .catch(function () {
                    _this.error = true;
                    _this.dataLoading = false;
                    $scope.$digest();
                })
        }


        function getFilms() {
            _this.starship.films_info = [];
            _this.starship.films.forEach(url => {
                FilmsService.GetFilms(url)
                    .then(function (response) {
                        if (response.success) {
                            var data = response.data;
                            var info = {
                                id: getId(url),
                                info: data
                            }
                            _this.starship.films_info.push(info)
                        } else {
                            _this.filmError = true;
                        }
                        $scope.$digest();
                    })
                    .catch(function () {
                        _this.filmError = true;
                        $scope.$digest();
                    })
            });
            
        }

        function getPilots() {
            _this.starship.pilots_info = [];
            _this.starship.pilots.forEach(url => {
                PilotsService.GetPilots(url)
                    .then(function (response) {
                        if (response.success) {
                            var data = response.data;
                            var info = {
                                id: getId(url),
                                info: data
                            }
                            _this.starship.pilots_info.push(info)
                        } else {
                            _this.pilotError = true;
                        }
                        $scope.$digest();
                    })
                    .catch(function () {
                        _this.pilotError = true;
                        $scope.$digest();
                    })
            });
        }

        function getId(url) {
            if (!url) return false;
            return url.split("/").filter(function (item) {
                return item !== "";
            }).slice(-1)[0];
        }

        _this.go = function (path) {
            $location.path(path);
        };

        _this.error = false;
        _this.pilotError = false;
        _this.filmError = false;
        _this.starship = {};
        _this.dataLoading = true;

        _this.fetchInfo();

    }
})();