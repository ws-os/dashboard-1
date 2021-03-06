(function () {
    'use strict';

    angular
        .module('qorDash.auth')
        .controller('LoginController', loginController);

    function loginController($state, user, LOGIN_PAGE_ICON_URL) {
        var vm = this;

        vm.login = login;
        vm.removeError = removeError;
        vm.successCallback = successCallback;
        vm.isLoading = false;

        vm.ICON_URL = LOGIN_PAGE_ICON_URL;
        vm.userCredentials = {};

        if (user.isAuthed()) {
            $state.go('app.dashboard');
            return;
        }

        function login() {
            vm.isLoading = true;
            user.login(vm.userCredentials.login, vm.userCredentials.password)
                .then(successCallback)
                .catch(errorCallback)
                .finally(function(){
                    vm.isLoading = false;
                });
        }

        function successCallback() {
            $state.go('app.dashboard');
        }

        function errorCallback(response) {
            var errorCode = response && response.data && response.data.error ? response.data.error : 'unknown';
            vm.loginForm.$setValidity(errorCode, false);
        }

        function removeError() {
            if (vm.loginForm.$invalid && vm.loginForm.$submitted){
                vm.loginForm.$setPristine();
                vm.loginForm.$setUntouched();
                for (var errorCode in vm.loginForm.$error) {
                    vm.loginForm.$setValidity(errorCode, true);
                }
            }
        }
    }
})();
