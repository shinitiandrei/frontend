'use strict';

angular.module('uolsacApp')
 .controller('updatePaymentMethodCreditCardCtrl', ['$scope', 'Validator', 'FieldHandler', '$location', 'Util', 'Recoveries',
        function updatePaymentMethodCreditCardCtrl($scope, Validator, FieldHandler, $location, Util, Recoveries) {

            FieldHandler.instantiateScope($scope);

            $scope.expirationInputs = [
                {
                    'type': 'text',
                    'name': 'cardExpirationMonth',
                    'class':'col-xs-6 col-sm-8 col-md-10 col-lg-9 no-padding-left',
                    'maxlength' : 2,
                    'placeholder': 'MM'
                },
                {
                    'type': 'text',
                    'name': 'cardExpirationYear',
                    'class':'col-xs-6 col-sm-8 col-md-10 col-lg-9 no-padding-left',
                    'maxlength' : 2,
                    'placeholder': 'AA'
                }
            ];

            $scope.creditCard = {

                updatePayment : function updatePayment(){

                    this.init = function(){

                        if(Util.isEmpty($scope.selectedCard)){

                            $scope.showCreditCardErrorMessage = true;

                        } else{

                            if($scope.selectedCard === 'otherCard'){

                                $scope.creditCard.updateOther();

                            } else {
                                $scope.creditCard.updateExisting();
                            }
                        }

                    };

                    this.init();
                },

                updateExisting : function updateExisting(){

                    this.init = function(){

                        FieldHandler.instantiateScope($scope);

                        if(!validateExistingCardSafeCode()) {
                            return null;
                        }

                        var i = $scope.index;

                        var paymentData = {
                            'creditCardNumber': $scope.cards[i].number,
                            'expirationDate': $scope.cards[i].expirationDate,
                            'flag': $scope.cards[i].name,
                            'paymentMethodConclusion': 'creditCard'
                        };

                        Recoveries.setPaymentData(paymentData);

                        $location.path('/cobranca/pagamentoalterado');
                    };

                    this.init();
                },

                updateOther: function updateOther(){

                    this.init = function(){

                        FieldHandler.instantiateScope($scope);

                        if(!validateCardNumber()) {
                            return null;
                        }

                        if(!validateExpirationDate()) {
                            return null;
                        }

                        if(!validateOtherCardSafeCode()) {
                            return null;
                        }

                        var expirationDateData = $scope.expirationInputs[0].value + '/' + $scope.expirationInputs[1].value;

                        var paymentData = {
                            'creditCardNumber': $scope.fields.number.value,
                            'expirationDate': expirationDateData,
                            'flag': 'master',
                            'paymentMethodConclusion': 'creditCard'
                        };

                        Recoveries.setPaymentData(paymentData);

                        $location.path('/cobranca/pagamentoalterado');
                    };

                    this.init();
                },

                getSelectedCardIndex : function getSelectedCardIndex(pos){
                    $scope.index = pos;
                }
            };

            var validateExistingCardSafeCode = function validateExistingCardSafeCode(){
                return Validator.execute([$scope.fields.existingCardSafeCode]);
            };

            var validateOtherCardSafeCode = function validateOtherCardSafeCode(){
                return Validator.execute([$scope.fields.otherCardSafeCode]);
            };

            var validateCardNumber = function validateCardNumber(){
                return Validator.execute([$scope.fields.number]);
            };

            var validateExpirationDate = function validateExpirationDate(){
                return Validator.execute([$scope.fields.expirationDate]);
            };

            //Mock
            $scope.cards = [
                {
                    'name' : 'visa',
                    'image' : '',
                    'number' : 'xxxx xxxx xxxx 3007',
                    'expirationDate' : '12/20'
                },
                {
                    'name' : 'master',
                    'image' : '',
                    'number' : 'xxxx xxxx xxxx 2243',
                    'expirationDate' : '11/18'
                }
            ];

        }
]);
