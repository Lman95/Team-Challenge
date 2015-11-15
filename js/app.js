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
            var ansLength = userDay.length;
            var birthYear = userDay.substring(ansLength - 4);
            var birthMonth = userDay.substring(0, 2);
            var birthDate = userDay.substring(ansLength - 7, ansLength - 5);
            if(birthYear < today.getFullYear() && ansLength == 10) {
                $scope.newForm.bDay.$setValidity('bDay', true);
            } else if (birthYear == today.getFullYear() && ansLength == 10) {
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

        $scope.success = function() {
            document.getElementById("success").innerHTML = "<div class='alert alert-success'><strong>Success!</strong> You have successfully signed up.</div>";
            //document.getElementById("success").style.visibility = "visible";
        }

        $scope.reset = function() {
            document.getElementById("success").innerHTML = "";
            //document.getElementById("success").style.visibility = "hidden";
        }
    }]);

