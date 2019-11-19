(function () {
    'use strict';

    angular
        .module('app')
        .factory('UserService', UserService);

    UserService.$inject = ['$timeout', '$filter', '$q'];
    function UserService($timeout, $filter, $q) {

        var service = {};

        service.GetAll = GetAll;
        service.GetById = GetById;
        service.GetByUsername = GetByUsername;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;

        service.setRequest = setRequest;
        service.getRequests = getRequests;
        service.tryRequest = tryRequest;

        return service;

        function GetAll() {
            var deferred = $q.defer();
            deferred.resolve(getUsers());
            return deferred.promise;
        }

        function GetById(id) {
            var deferred = $q.defer();
            var filtered = $filter('filter')(getUsers(), { id: id });
            var user = filtered.length ? filtered[0] : null;
            deferred.resolve(user);
            return deferred.promise;
        }

        function GetByUsername(username) {
            var deferred = $q.defer();
            var filtered = $filter('filter')(getUsers(), { username: username });
            var user = filtered.length ? filtered[0] : null;
            deferred.resolve(user);
            return deferred.promise;
        }

        function setRequest(username, url) {
            var deferred = $q.defer();
            // simulate api call with $timeout
            $timeout(function () {
                GetByUsername(username)
                    .then(function (user) {
                        if (user == null) {
                            deferred.resolve({ success: false, message: 'Username "' + user.username + '" doesnt exists' });
                        } else {
                            user.requests = user.requests || [];
                            var filtered = $filter('filter')(user.requests, { url: url });
                            var request = filtered.length ? filtered[0] : null;
                            if(request){
                                for (var i = 0; i < user.requests.length; i++) {
                                    if (user.requests[i].url === user.url) {
                                        request.date = Date.now();
                                        user.requests[i] = request;
                                        break;
                                    }
                                }
                            } else {
                                var request = {
                                    url: url,
                                    date: Date.now()
                                }
                                user.requests.push(request)
                            }
                        
                            Update(user)
                                .then(function () {
                                    deferred.resolve({ success: true });
                                });
                        }
                    });
            }, 1000);

            return deferred.promise;
        }

        // function GetRequestOfUser(username, url) {
        //     var deferred = $q.defer();
        //     var user = GetByUsername(username);
        //     var resquests = user.requests || [];
        //     var filtered = $filter('filter')(resquests, { url: url });
        //     var request = filtered.length ? filtered[0] : null;
        //     deferred.resolve(request);
        //     return deferred.promise;
        // }

        function getRequests(username) {
            var deferred = $q.defer();
            // simulate api call with $timeout
            $timeout(function () {
                GetByUsername(username)
                    .then(function (user) {
                        if (user == null) {
                            deferred.resolve({ success: false, message: 'Username "' + user.username + '" doesnt exists' });
                        } else {
                            user.requests = user.requests || [];
                            deferred.resolve(user.requests);
                        }
                    });
            }, 1000);

            return deferred.promise;
        }

        function tryRequest(username, url) {
            var deferred = $q.defer();
            // simulate api call with $timeout
            $timeout(function () {
                getRequests(username)
                    .then(function (requests) {
                        var requested = $filter('filter')(requests, { url: url });
                        if (requested.length) {
                            var five_min = 5 * 60 * 1000;
                            var timing = new Date() - new Date(requested[0].date) < five_min;
                            if (!timing) {
                                setRequest(username, url)
                                    .then(function () {
                                        deferred.resolve(true);
                                    });
                            } else {
                                deferred.resolve(false);
                            }
                        } else {
                            setRequest(username, url)
                                .then(function () {
                                    deferred.resolve(true);
                                });
                        }
                    });
            }, 1000);

            return deferred.promise;
        }

        function Create(user) {
            var deferred = $q.defer();

            // simulate api call with $timeout
            $timeout(function () {
                GetByUsername(user.username)
                    .then(function (duplicateUser) {
                        if (duplicateUser !== null) {
                            deferred.resolve({ success: false, message: 'Username "' + user.username + '" is already taken' });
                        } else {
                            var users = getUsers();

                            // assign id
                            var lastUser = users[users.length - 1] || { id: 0 };
                            user.id = lastUser.id + 1;

                            // save to local storage
                            users.push(user);
                            setUsers(users);

                            deferred.resolve({ success: true });
                        }
                    });
            }, 1000);

            return deferred.promise;
        }

        function Update(user) {
            var deferred = $q.defer();

            var users = getUsers();
            for (var i = 0; i < users.length; i++) {
                if (users[i].id === user.id) {
                    users[i] = user;
                    break;
                }
            }
            setUsers(users);
            deferred.resolve();

            return deferred.promise;
        }

        function Delete(id) {
            var deferred = $q.defer();

            var users = getUsers();
            for (var i = 0; i < users.length; i++) {
                var user = users[i];
                if (user.id === id) {
                    users.splice(i, 1);
                    break;
                }
            }
            setUsers(users);
            deferred.resolve();

            return deferred.promise;
        }

        // private functions

        function getUsers() {
            if (!localStorage.users) {
                localStorage.users = JSON.stringify([]);
            }

            return JSON.parse(localStorage.users);
        }

        function setUsers(users) {
            localStorage.users = JSON.stringify(users);
        }
    }
})();