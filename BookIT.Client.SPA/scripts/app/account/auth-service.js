(function () {
    'use strict';

    var authService = function authService($http, $q, $cookies, data, identity) {
        var TOKEN_KEY = 'authentication'; // cookie key

        var getIdentity = function () {
            var deferred = $q.defer();

            data.get('account/identity')
                .then(function (identityResponse) {
                    identity.setUser(identityResponse);
                    deferred.resolve(identityResponse);
                });

            return deferred.promise;
        };

        var register = function register(user) {
            var defered = $q.defer();
            debugger;

            data.post('account/register', user)
                    .then(function (success) {
                    defered.resolve(true);
                });

            return defered.promise;
        }

        var login = function login(user) {
            var deferred = $q.defer();
            debugger;
            var grantTypeData = "grant_type=password&username=" + (user.username || '') + '&password=' + (user.password || '');
            var urlEncodedHeader = { 'Content-Type': 'application/x-www-form-urlencoded' }

            data.post('Token', grantTypeData, urlEncodedHeader)
                .then(function success(response) {
                    var tokenValue = response.access_token;

                    var expireDay = new Date();
                    expireDay.setHours(expireDay.getHours() + 100);

                    $cookies.put(TOKEN_KEY, tokenValue, { expires: expireDay });

                    $http.defaults.headers.common.Authorization = 'Bearer ' + tokenValue;

                    getIdentity().then(function() {
                        deferred.resolve(response);
                    });
                }), function(err) {
                deferred.reject(err);
            };

            return deferred.promise;
        };

        var logout = function logout() {
            $cookies.remove(TOKEN_KEY);
            $http.defaults.headers.common.Authorization = null;
            identity.removeUser();
        }

      
        return {
            register: register,
            login: login,
            getIdentity: getIdentity,
            isAuthenticated: function () {
                return !!$cookies.get(TOKEN_KEY);
            },
            logout: logout
        };
    };

    angular
        .module('bookitApp.services')
        .factory('auth', ['$http','$q', '$cookies', 'data', 'identity', authService]);
}());