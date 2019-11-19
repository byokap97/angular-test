(function () {
    'use strict';

    angular
        .module('app')
        .controller('ShipController', ShipController);

    ShipController.$inject = ['ShipsService', 'FilmsService', 'PilotsService', '$scope', '$routeParams', '$location'];
    function ShipController(ShipsService, FilmsService, PilotsService, $scope, $routeParams, $location) {
        var _this = this;
        _this.shipId = null;

        _this.fetchInfo = function ()  {
            ShipsService.GetStarship($routeParams.idShip)
            .then(function (data) {
                _this.starship = data;
                _this.shipId = getId(_this.starship.url)
                if(_this.starship.films.length > 0){
                    getFilms();
                }
                if(_this.starship.pilots.length > 0){
                    getPilots();
                }
                $scope.$digest;
            })
            .catch(function () {
                _this.error = true;
                $scope.$digest();
            })
        }
        
        
        function getFilms(){
            _this.starship.films_info = [];
            _this.starship.films.forEach(url => {
                FilmsService.GetFilms(url)
                .then(function (data) {
                    var info = {
                        id: getId(url),
                        info: data
                    }
                    _this.starship.films_info.push(info)
                    $scope.$digest;
                })
                .catch(function () {
                    _this.error = true;
                    $scope.$digest();
                })
            });
        }

        function getPilots(){
            _this.starship.pilots_info = [];
            _this.starship.pilots.forEach(url => {
                PilotsService.GetPilots(url)
                .then(function (data) {
                    var info = {
                        id: getId(url),
                        info: data
                    }
                    _this.starship.pilots_info.push(info)
                    $scope.$digest;
                })
                .catch(function () {
                    _this.error = true;
                    $scope.$digest();
                })
            });
        }

        function getId(url) {
            if(!url) return false;
            return url.split("/").filter(function (item) {
                return item !== "";
            }).slice(-1)[0];
        }

        _this.go = function ( path ) {
            $location.path( path );
        };
    
        _this.error = undefined;
        _this.starship = {};
        
        _this.fetchInfo();
        
    }
})();