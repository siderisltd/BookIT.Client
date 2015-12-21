(function () {
    "use strict";

    //TODO: Validate and show message if input is incorrect. Also do not fill the progress bar
    function RegisterController(auth, $location, $timeout, notifier) {
        var vm = this,
            numberOfFields = $('.forms li').length,
            updateValue = 100 / numberOfFields,
            CLIENT_ROLE = 'Client';

        vm.status = "Profile completeness...";

        vm.changeInput = function () {
            debugger;
            var totalUpdate = 0;
            $(".forms input, .forms option:selected").each(function () {
                if (this.value !== "") {
                    //for select -> Default value is not count-able
                    var isOptionElement = $(this).is("option");

                    if (isOptionElement && ((this.value !== 'Default') && this.value !== '? undefined:undefined ?')) {
                        totalUpdate += updateValue;
                    } else if (!isOptionElement) {
                        totalUpdate += updateValue;
                    }
                }
            });
            vm.progress = totalUpdate;
        };


        function checkAndAssignClientRole(user) {
            user.roles = user.roles || [];
            //client role does not exist in the array of roles
            if ($.inArray(CLIENT_ROLE, user.roles) !== 0) {
                user.roles.push(CLIENT_ROLE);
            }
        }

        vm.registerUser = function registerUser(user, registerUserForm) {
            if (registerUserForm.$valid) {
                checkAndAssignClientRole(user);
                auth.register(user)
                    .then(function () {
                        notifier.success('User registered!');
                        $location.path('/account/login');
                    }, function (err) {
                        notifier.error('Internal user registration problem');
                    });
            }
        }

        vm.registerCompany = function registerCompany(companyCreator, registerCompanyForm) {
            if (registerCompanyForm.$valid) {
                debugger;
                checkAndAssignClientRole(companyCreator);
                auth.register(companyCreator)
                    .then(function () {
                        notifier.success('Company registered!');
                        $location.path('/account/login');
                    }, function (err) {
                        notifier.error('Internal company registration problem');
                        $location.path('/account/login');
                    });
            }

        }

        vm.selectOptions = {
            placeholder: "Select roles...",
            dataTextField: "RoleName",
            dataValueField: "RoleValue",
            valuePrimitive: true,
            autoBind: false,
            dataSource: [
                { RoleName: 'Owner', RoleValue: 'Owner' },
                { RoleName: 'Admin', RoleValue: 'Admin' },
                { RoleName: 'Creator', RoleValue: 'Creator' },
                { RoleName: 'Employee', RoleValue: 'Employee' },
                { RoleName: 'Manager', RoleValue: 'Manager' },
                { RoleName: 'Supervisor', RoleValue: 'Supervisor' },
                { RoleName: 'Worker', RoleValue: 'Worker' },
                { RoleName: 'Client', RoleValue: 'Client' }
            ]
        }

        //vm.selectedIds = ['Owner', 'Admin'];
    }


    angular.module('bookitApp.controllers')
        .controller('RegisterController', ['auth', '$location', '$timeout', 'notifier', RegisterController]);
}());

