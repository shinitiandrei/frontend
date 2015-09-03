'use strict';
angular.module('uolsacApp')
    .controller('genderCtrl', ['$scope', 'Util', 'FieldHandler', '$timeout', 'Validator',
        function($scope, Util, FieldHandler, $timeout, Validator) {

            FieldHandler.instantiateScope($scope); //> Instancia o Controller em uso no FieldHandler

            $scope.init = function(){
                
                //Mocks
                $scope.genderLabel = 'Masculino';

                $scope.radioList = [
                    {
                        'description' : 'Masculino',
                        'value' : 'M'
                    },
                    {
                        'description' : 'Feminino',
                        'value' : 'F'
                    }
                ];

            };

            $scope.gender = {

                edit: function edit(){

                    this.init = function(){

                        FieldHandler.instantiateScope($scope);

                        if(!$scope.validateGender()){
                            return null;
                        }

                        if($scope.fields.gender.value === 'M'){
                            $scope.genderLabel = 'Masculino';
                        } else if ($scope.fields.gender.value === 'F'){
                            $scope.genderLabel = 'Feminino';
                        }
                        
                        $scope.$parent.show = 'personalInformationGenderInfo';
                        $scope.$parent.hide = 'personalInformationGenderEdit';

                        $scope.showStatus = true;

                        $timeout(function(){
                            $scope.showStatus = false;
                        }, 3000);
                    
                    };

                    this.init();
                }
            };

            $scope.validateGender = function validateGender(){
                return Validator.execute([$scope.fields.gender]);
            };

            $scope.init();
            
        }
]);