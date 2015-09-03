'use strict';
angular.module('uolsacApp')
    .controller('nameAndCpfCtrl', ['$scope', 'FieldHandler', '$timeout', 'Validator',
        function($scope, FieldHandler, $timeout, Validator) {

            FieldHandler.instantiateScope($scope);
            
            $scope.init = function(){

                $timeout(function(){
                    $scope.fields.name.value = $scope.nameLabel;
                }, 0);
            };

            $scope.cpf = {

                create: function create(){

                    this.init = function(){

                        FieldHandler.instantiateScope($scope);

                        if(!$scope.validateName()) {
                            return null;
                        } else {
                            if (!$scope.validateCpf()){
                                return null;
                            }
                        }

                        $scope.nameLabel = $scope.fields.name.value;
                        $scope.cpfLabel = $scope.cpf.maskedCpfLabel($scope.fields.cpf.value);

                        $scope.$parent.show = 'personalInformationNameAndCPFInfo';
                        $scope.$parent.hide = 'personalInformationNameAndCPFRegister';

                        $scope.showStatus = true;

                        /*variável que controla se o campo já está cadastrado ou não*/
                        $scope.registered = true;

                        $timeout(function(){
                            $scope.showStatus = false;
                        }, 3000);

                    };

                    this.init();
                },

                maskedCpfLabel : function maskedCpfLabel(number){
                    var cpfLabel = number;

                    cpfLabel = cpfLabel.replace(/\D/g,'');
                    cpfLabel = cpfLabel.replace(/(\d{3})(\d)/,'$1.$2');
                    cpfLabel = cpfLabel.replace(/(\d{3})(\d)/,'$1.$2');
                    cpfLabel = cpfLabel.replace(/(\d{3})(\d{1,2})$/,'$1-$2');

                    return cpfLabel;
                }
            };

            $scope.validateName = function validateName(){
                return Validator.execute([$scope.fields.name]);
            };

            $scope.validateCpf = function validateCpf(){
                return Validator.execute([$scope.fields.cpf]);
            };

            /*mock nome*/
            $scope.nameLabel = 'José da Silva';

            /*mock cpf*/
            $scope.cpfLabel = '123.456.789-00';

            $scope.init();

        }
]);