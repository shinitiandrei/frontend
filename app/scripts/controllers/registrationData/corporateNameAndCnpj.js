'use strict';
angular.module('uolsacApp')
    .controller('corporateNameAndCnpjCtrl', ['$scope', 'FieldHandler', '$timeout', 'Validator',
        function($scope, FieldHandler, $timeout, Validator) {

            FieldHandler.instantiateScope($scope);

            $scope.init = function(){

                //Mocks
                $scope.corporateNameLabel = 'Universo Online S/A';
                $scope.cnpjLabel = '12.345.678/9012-34';

                $timeout(function(){
                    $scope.fields.corporateName.value = $scope.corporateNameLabel;
                }, 0);

            };

            $scope.cnpj = {

                edit: function edit(){

                    this.init = function(){

                        FieldHandler.instantiateScope($scope);

                        if (!$scope.validateCorporateName()){
                            return null;
                        } else {
                            if (!$scope.validateCnpj()){
                                return null;
                            }
                        }

                        $scope.corporateNameLabel = $scope.fields.corporateName.value;
                        $scope.cnpjLabel = $scope.cnpj.maskedCnpjLabel($scope.fields.cnpj.value);

                        $scope.$parent.show = 'juridicalInformationCorporateNameAndCnpjInfo';
                        $scope.$parent.hide = 'juridicalInformationCorporateNameAndCnpjRegister';

                        $scope.showStatus = true;

                        /*variável que controla se o campo já está cadastrado ou não*/
                        $scope.registered = true;

                        $timeout(function(){
                            $scope.showStatus = false;
                        }, 3000);
                        
                    };

                    this.init();
                },

                maskedCnpjLabel : function maskedCnpjLabel(number){
                    var cnpjLabel = number;

                    cnpjLabel = cnpjLabel.replace(/\D/g,'');
                    cnpjLabel = cnpjLabel.replace(/^(\d{2})(\d)/,'$1.$2');
                    cnpjLabel = cnpjLabel.replace(/^(\d{2})\.(\d{3})(\d)/,'$1.$2.$3');
                    cnpjLabel = cnpjLabel.replace(/\.(\d{3})(\d)/,'.$1/$2');
                    cnpjLabel = cnpjLabel.replace(/(\d{4})(\d)/,'$1-$2');

                    return cnpjLabel;
                }
            };

            $scope.validateCorporateName = function validateCorporateName(){
                return Validator.execute([$scope.fields.corporateName]);
            };

            $scope.validateCnpj = function validateCnpj(){
                return Validator.execute([$scope.fields.cnpj]);
            };
            
            $scope.init();
            
        }
]);