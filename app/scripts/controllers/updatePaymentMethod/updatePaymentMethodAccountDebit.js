'use strict';
angular.module('uolsacApp')
 .controller('updatePaymentMethodAccountDebitCtrl', ['$scope', 'FieldHandler', 'Validator', '$location', 'Recoveries', 'Util',
        function updatePaymentMethodAccountDebitCtrl($scope, FieldHandler, Validator, $location, Recoveries, Util) {

            $scope.agencyInputs = [
                {
                    'type': 'text',
                    'name': 'agencyNumber',
                    'class':'col-xs-7 col-sm-10 col-md-10 col-lg-10 no-padding-left no-margin'
                },
                {
                    'type': 'text',
                    'name': 'agencyDigit',
                    'class':'col-xs-4 col-sm-4 col-md-4 col-lg-4 checkDigitWidth no-padding-left no-margin',
                    'maxlength' : 1
                }
            ];

            $scope.currentAccountInputs = [
                {
                    'type': 'text',
                    'name': 'currentAccountNumber',
                    'class':'col-xs-10 col-sm-10 col-md-10 col-lg-10 no-padding-left no-margin'
                },
                {
                    'type': 'text',
                    'name': 'currentAccountDigit',
                    'class':'col-xs-4 col-sm-4 col-md-4 col-lg-4 checkDigitWidth no-padding-left no-margin',
                    'maxlength' : 1
                }
            ];

            $scope.accountInformation = {

				update : function update(){

					this.init = function init(){

						FieldHandler.instantiateScope($scope);

                        if(!validateDebitDate()){
                            return null;
                        }

                        if(!validateBank()){
                            return null;
                        }

                        if(!validateAgency()){
                            return null;
                        }

                        if(!validateCurrentAccount()){
                            return null;
                        }

                        if(!validateCPF()){
                            return null;
                        }

                        if(Util.isEmpty($scope.agencyInputs[1].value)){

                            $scope.agency = $scope.agencyInputs[0].value;

                        } else{

                            $scope.agency = $scope.agencyInputs[0].value + '-' + $scope.agencyInputs[1].value;
                        }

                        var currentAccount = $scope.currentAccountInputs[0].value + '-' + $scope.currentAccountInputs[1].value;

                        var accountInformationData = {
                            'debitDay': $scope.fields.debitDate.value,
                            'bank': $scope.fields.bank.value,
                            'agency':  $scope.agency,
                            'currentAccount': currentAccount,
                            'cpf': $scope.fields.cpf.value
                        };

                        var paymentData = {
                            'accountInformationData': accountInformationData,
                            'paymentMethodConclusion': 'accountDebit',
                            'flag': 'visa'
                        };

                        Recoveries.setPaymentData(paymentData);
                            
                        $location.path('/cobranca/pagamentoalterado');

					};

					this.init();
				}
            };

            var validateDebitDate = function validateDebitDate(){
                return Validator.execute([$scope.fields.debitDate]);
            };

            var validateBank = function validateBank(){
                return Validator.execute([$scope.fields.bank]);
            };

            var validateAgency = function validateAgency(){
                return Validator.execute([$scope.fields.agency]);
            };

            var validateCurrentAccount = function validateCurrentAccount(){
                return Validator.execute([$scope.fields.currentAccount]);
            };

            var validateCPF = function validateCPF(){
                return Validator.execute([$scope.fields.cpf]);
            };

            //Mocks
            $scope.banks = [ 'Banco do Brasil', 'Itaú', 'Bradesco'];
            $scope.debitDay = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];

        }
]);
