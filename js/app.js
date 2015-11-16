'use strict';

angular.module('TeamApp', [])
    .controller('TeamCtrl', ['$scope', '$http', function($scope, $http) { 
    	var submitting = false;
        $scope.checkPass = function() { //function to check that the given password is valid
            if($scope.psw === $scope.psw2){
                $scope.newForm.psw2.$setValidity('psw2', true); //valid
            } else {
                $scope.newForm.psw2.$setValidity('psw2', false); //invalid
            }
        }
        $scope.checkName = function() { //function to check that the given name is valid
        	if($scope.lastName.length >= 1) {
        		$scope.newForm.lastName.$setValidity('lastName', true); //valid
            } else {
                $scope.newForm.lastName.$setValidity('lastName', false); //invalid
            }
        }
        $scope.checkBirth = function() { //function to check that the given age is older than 16
        	var today = new Date();
            today.setYear(today.getFullYear() - 16);
            var userDay = $scope.bDay;
            var ansLength = userDay.length;
            var birthYear = userDay.substring(ansLength - 4);
            var birthMonth = userDay.substring(0, 2);
            var birthDate = userDay.substring(ansLength - 7, ansLength - 5);
            if(birthYear < today.getFullYear() && ansLength == 10) { //checks year of given birthday
                $scope.newForm.bDay.$setValidity('bDay', true);
            } else if (birthYear == today.getFullYear() && ansLength == 10) {
                if (birthMonth < today.getMonth() + 1) { //compares birth month
                    $scope.newForm.bDay.$setValidity('bDay', true);
                } else if (birthMonth == today.getMonth() + 1) {
                    if (birthDate <= today.getDate()) { //comares birth day
                        $scope.newForm.bDay.$setValidity('bDay', true); //valid
                    } else {
                        $scope.newForm.bDay.$setValidity('bDay', false); //invalid
                    } 
                } else {
                    $scope.newForm.bDay.$setValidity('bDay', false); //invalid
                }
            } else {
               $scope.newForm.bDay.$setValidity('bDay', false); //invalid
            }
        }
        $scope.checkEmail = function() { //function to check that the given email is valid
        	if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test($scope.Email)) {
        		$scope.newForm.Email.$setValidity('Email', true); //valid
            } else {
                $scope.newForm.Email.$setValidity('Email', false); //invalid
            }
        }

        $scope.success = function() { //alerts the user of a valid account registration
            document.getElementById("success").innerHTML = "<div class='alert alert-success'><strong>Success!</strong> You have successfully signed up.</div>";

        }

        $scope.reset = function() { //resets form after successful account creation
            document.getElementById("success").innerHTML = "";
            $scope.newForm.$setPristine();
            $scope.newForm.$setUntouched();        }
    }]);

