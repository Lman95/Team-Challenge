'use strict';

angular.module('TeamApp', [])
    .controller('TeamCtrl', ['$scope', '$http', function($scope, $http) {
        $scope.checkPass = function() {
            if($scope.psw === $scope.psw2){
                $scope.newForm.psw2.$setValidity('psw2', true);
            } else {
                $scope.newForm.psw2.$setValidity('psw2', false);
            }
        }
    }]);

