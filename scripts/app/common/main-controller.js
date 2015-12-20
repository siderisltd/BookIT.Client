(function () {
    "use strict";

    function MainController(auth, identity, notifier) {
        var vm = this;
        debugger;

        //this is for the innitial load of the page
        waitForLogin();

        vm.logout = function () {
            vm.globallySetCurrentUserWhenLogin = undefined;
            auth.logout();
            waitForLogin(); //for second login
            notifier.success('User logged out');
        }

        function waitForLogin() {
            identity.getUser()
                 .then(function (user) {
                     debugger;
                     vm.globallySetCurrentUserWhenLogin = user;
                     console.log(user);
                 });
        }
    }

    angular.module('bookitApp')
        .controller('MainController', ['auth', 'identity', 'notifier', MainController]);
}());