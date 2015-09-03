'use strict';
angular.module('uolsacApp')
    .controller('foundationDateCtrl', ['$scope', 'Util', 'FieldHandler', '$timeout', '$compile', 'Validator',
        function($scope, Util, FieldHandler, $timeout, $compile, Validator) {

            FieldHandler.instantiateScope($scope); //> Instancia o Controller em uso no FieldHandler

            $scope.init = function(){
                $scope.foundationDateLabel = '22 de junho de 1986';
            };

            $scope.foundationDate = {

                edit: function edit(){

                    this.init = function(){

                        FieldHandler.instantiateScope($scope);
                        
                        if(!$scope.validateDate()){
                            return null;
                        }

                        $scope.$parent.show = 'juridicalInformationFoundingDateInfo';
                        $scope.$parent.hide = 'juridicalInformationFoundingDateEdit';

                        $scope.showStatus = true;

                        $timeout(function(){
                            $scope.showStatus = false;
                        }, 3000);
                    };

                    this.init();
                }
            };

            $scope.validateDate = function validateDate(){
                return Validator.execute([$scope.fields.foundationDate]);
            };

            $scope.init();
            
        }
]);