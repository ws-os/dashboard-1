(function () {
    'use strict';

    angular.module('qorDash.configurations');

    instancesController.$inject = ['$scope', '$state', '$stateParams', '$http', 'API_URL'];
    function instancesController($scope, $state, $stateParams, $http, API_URL) {

        // TODO Make global
        Object.filter = function( obj, predicate) {
            var key;

            for (key in obj) {
                if (obj.hasOwnProperty(key) && predicate(key)) {
                    return obj[key];
                }
            }
        };

        $scope.checked = {};

        $scope.$watch('services', function() {
            if (!$scope.services) {
                return;
            }

            $scope.service = Object.filter($scope.services, function (key) {
                return $stateParams.service == key;
            });

            $scope.service.instances.forEach(function(instance) {
                $scope.checked[instance] = false;
            });
        });

        $scope.saveAvailableHelper = 0;

        $scope.changeState = function(val) {
            if (val) {
                $scope.saveAvailableHelper++;
            } else {
                $scope.saveAvailableHelper--;
            }
        };

        $scope.show = function() {
            var selectedInstances = [];
            for (var i in $scope.checked) {
                if ($scope.checked[i]) {
                    selectedInstances.push(i);
                }
            }
            if (selectedInstances.length > 0) {
                $state.go('app.configurations.services.instances.editor', {instances: selectedInstances});
            }
        }

    }

    angular.module('qorDash.configurations')
        .controller('InstancesController', instancesController);
})();
