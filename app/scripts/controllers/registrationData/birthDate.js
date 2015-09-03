'use strict';
angular.module('uolsacApp')
    .controller('birthDateCtrl', ['$scope', 'Util', 'FieldHandler', '$timeout', '$compile', 'Validator',
        function($scope, Util, FieldHandler, $timeout, $compile, Validator) {

            FieldHandler.instantiateScope($scope); //> Instancia o Controller em uso no FieldHandler

            $scope.init = function(){

                $scope.birthDateLabel = '22 de junho de 1986';

            };

            $scope.birthDate = {

                edit: function edit(){

                    FieldHandler.instantiateScope($scope);

                    if(!$scope.validateDate()){
                        return null;
                    }

                    this.init = function(){
                        $scope.$parent.show = 'personalInformationBirthDateInfo';
                        $scope.$parent.hide = 'personalInformationBirthDateEdit';

                        $scope.showStatus = true;

                        $timeout(function(){
                            $scope.showStatus = false;
                        }, 3000);
                    };
                    
                    this.init();
                }
            };

            $scope.validateDate = function validateDate(){
                return Validator.execute([$scope.fields.birthDate]);
            };

            $scope.init();
        }

]);