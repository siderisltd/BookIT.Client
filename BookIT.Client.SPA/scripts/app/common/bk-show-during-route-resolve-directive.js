(function() {
    'use strict';

    angular.module('bookitApp.directives')
        .factory('bkShowDuringRouteResolve', ['$rootScope', function ($rootScope) {
            return {
                link: function (scope, element) {
                    element.addClass('show');

                    var unregister = $rootScope.$on('$routeChangeStart', function () {
                        element.removeClass('show');
                    });

                    scope.$on('$destroy', unregister);
                }
            };
        }
    ]);
}());