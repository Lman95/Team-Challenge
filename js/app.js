'use strict';

angular.module('TeamApp', [])
    .controller('TeamCtrl', ['$scope', '$http', function($scope, $http) {
    	var submitting = false;
        $scope.checkPass = function() {
            if($scope.psw === $scope.psw2){
                $scope.newForm.psw2.$setValidity('psw2', true);
            } else {
                $scope.newForm.psw2.$setValidity('psw2', false);
            }
        }
        $scope.checkName = function() {
        	if($scope.lastName.length >= 1) {
        		$scope.newForm.lastName.$setValidity('lastName', true);
            } else {
                $scope.newForm.lastName.$setValidity('lastName', false);
            }
        }
        $scope.checkBirth = function() {
        	var today = new Date();
        	today.setYear(today.getFullYear() - 16);
        	var userDay = $scope.bDay;
        	var birthYear = userDay.substring(userDay.length - 4);
        	var birthMonth = userDay.substring(0, 2);
        	var birthDate = userDay.substring(userDay.length - 7, userDay.length - 5);
        	if(birthYear < today.getFullYear()) {
        		$scope.newForm.bDay.$setValidity('bDay', true);
            } else if (birthYear == today.getFullYear()) {
            	if (birthMonth < today.getMonth() + 1) {
            		$scope.newForm.bDay.$setValidity('bDay', true);
            	} else if (birthMonth == today.getMonth() + 1) {
            		if (birthDate <= today.getDate()) {
            			$scope.newForm.bDay.$setValidity('bDay', true);
            		} else {
                		$scope.newForm.bDay.$setValidity('bDay', false);
                	} 
                } else {
                	$scope.newForm.bDay.$setValidity('bDay', false);
               	}
            } else {
               $scope.newForm.bDay.$setValidity('bDay', false);
            }
        }
        $scope.checkEmail = function() {
        	if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test($scope.Email)) {
        		$scope.newForm.Email.$setValidity('Email', true);
            } else {
                $scope.newForm.Email.$setValidity('Email', false);
            }
        }
    }]);

