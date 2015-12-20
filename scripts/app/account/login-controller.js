(function () {
    "use strict";

    function LoginController(auth, $location, notifier) {
        var vm = this;

        vm.login = function (user, loginForm) {
            debugger;
            if (loginForm.$valid) {
                debugger;
                auth.login(user)
                    .then(function(success) {
                      if (success) {
                        //TODO: save the last url and reroute to it when user logs in
                        notifier.success('Successful login!');
                        $location.path('/');
                      }
                      else {
                              notifier.error('Username/Password combination is not valid!');   
                      }
                    }, function (err) {
                        notifier.error('Username/Password combination is not valid!');   
                    });
            }
        }
    }

    angular.module('bookitApp.controllers')
        .controller('LoginController', ['auth', '$location', 'notifier', LoginController]);
}());