(function () {
    'use strict';

    var identityService = function identityService($q) {
        var currentUser = {}; // current user if any property exists
        var deferred = $q.defer();

        return {
            getUser: function () {
                if (this.isAuthenticated()) {
                    return $q.resolve(currentUser);
                }

                return deferred.promise;
            },
            isAuthenticated: function () {
                return Object.getOwnPropertyNames(currentUser).length !== 0;
            },
            //here we can check user role as another property
            setUser: function (user) {
                currentUser = user;
                deferred.resolve(user);
            },
            removeUser: function () {
                currentUser = {};
                deferred = $q.defer();
            }
        };
    };

    angular
        .module('bookitApp.services')
        .factory('identity', ['$q', identityService]);
}());