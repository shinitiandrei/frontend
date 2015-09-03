'use strict';
angular.module('uolsacApp')
 .controller('creditCardCtrl', ['$scope', '$http', 'FieldHandler', 'Validator', 'Quittance', '$location', 'CreditCard',
        function creditCardCtrl($scope, $http, FieldHandler, Validator, Quittance, $location, CreditCard) {

            function init () {

                FieldHandler.instantiateScope($scope);
                $scope.inputEnable = true;

                //Inicialização Multiple Inputs
                $scope.expirationInputs = [
                    {
                        'type': 'text',
                        'name': 'cardExpirationMonth',
                        'class':'col-xs-6 col-sm-8 col-md-10 col-lg-9 no-padding-left',
                        'maxlength' : 2,
                        'placeholder': 'MM',
                        'disabledinput': $scope.inputEnable

                    },
                    {
                        'type': 'text',
                        'name': 'cardExpirationYear',
                        'class':'col-xs-6 col-sm-8 col-md-10 col-lg-9 no-padding-left',
                        'maxlength' : 2,
                        'placeholder': 'AA',
                        'disabledinput': $scope.inputEnable
                    }
                ];


            }

            var creditCard = {
                pay: function pay() {
                    this.init = function(){
                        FieldHandler.instantiateScope($scope);

                        if(!validateCardNumber()) {
                            return null;
                        }
                        if(!validateExpirationDate()) {
                            return null;
                        }
                        if(!validateCvv()) {
                            return null;
                        }
                        if(!validateInstallment()) {
                            return null;
                        }

                        var uriParameters = {
                            'id':  $scope.idtAccount
                        };

                        var creditCardData = {
                            'value': $scope.debitValue,
                            'quittancePaymentMethod': {
                                'number': $scope.fields.number.value,
                                'expMonth': $scope.expirationInputs[0].value,
                                'expYear': '20'+$scope.expirationInputs[1].value,
                                'cvv': $scope.fields.cardCvv.value,
                                'idPaymentMethod': $scope.selectedPaymentMethod,
                                'installments': $scope.fields.installments.value.charAt(0)
                            }
                        };

                        Quittance.resource.post(uriParameters, creditCardData, this.onSuccess);

                    };

                    this.onSuccess = function onSuccess () {
                        $location.path('/cobranca/debitoquitado');
                    };

                    this.init();
                }

            };

            $scope.makePayment = function(){
                creditCard.pay();
            };

            $scope.getCardBrand = function() {
                var cardNumber = $scope.fields.number.value;
                var cachedCardNumber = CreditCard.getCardNumber();
                if (cardNumber.length > 5 && getOnlySixDigits(cardNumber) !== getOnlySixDigits(cachedCardNumber)) {
                    var uriParameters = {
                        'bin': getOnlySixDigits(cardNumber)
                    };
                    CreditCard.resource.get(uriParameters, null, onGetCardBrand, onGetCardBrandError);
                }
                if (cardNumber.length < 6) {
                    $scope.cardBrand = '';
                    $scope.inputEnable = true;
                }
                CreditCard.setCardNumber(cardNumber);
            };

            function onGetCardBrand ( request ) {
                $scope.installmentsQuantity = [];
                var quittanceOptions = Quittance.getQuittanceOptions();
                var cardMatch = 0;
                for( var optionsCounter=0; optionsCounter < quittanceOptions.length; optionsCounter++){
                    var brandOptions = quittanceOptions[optionsCounter].description.toLowerCase();
                    if(brandOptions === request.item.brand){
                        calculateInstallments(quittanceOptions[optionsCounter].installments, quittanceOptions[optionsCounter].minValue);
                        $scope.selectedPaymentMethod = quittanceOptions[optionsCounter].idPaymentMethod;
                        $scope.cardBrand = request.item.brand;
                        cardMatch++;
                    }
                }
                if(cardMatch < 1){
                    $scope.cardBrand = '';
                    $scope.inputEnable = true;
                    var message = new FieldHandler.createMessage('number', 'Cartão não suportado', 'has-error');
                    FieldHandler.add(message, { 'focus' : true });
                } else {
                    $scope.inputEnable = false;
                    $scope.clear($scope);
                }

                CreditCard.setBrand($scope.cardBrand);
            }

            function onGetCardBrandError ( request ) {
                $scope.cardBrand = '';
                $scope.inputEnable = true;
                FieldHandler.instantiateScope($scope);
                var message = new FieldHandler.createMessage('number', request.data.errors.messages[0].message, 'has-error');
                FieldHandler.add(message, { 'focus' : true });
            }

            function getOnlySixDigits (number) {
                number+='';
                return number.substring(0,6);
            }


            function calculateInstallments (installments,minValue){
                var debitValue = $scope.debitValue;
                if(debitValue < minValue){
                    $scope.installmentsQuantity.push(formatInstallments(1, debitValue));
                }
                for(var installmentsCounter = 1; installmentsCounter <= installments; installmentsCounter++){
                    var value = debitValue / installmentsCounter;
                    if(value >= minValue){
                        $scope.installmentsQuantity.push(formatInstallments(installmentsCounter,value));
                    }
                }
            }

            function formatInstallments(number,value){
                var fortmattedValue = value.toString();
                fortmattedValue = parseFloat(fortmattedValue).toFixed(2);
                fortmattedValue =  number + ' x ' + fortmattedValue.replace('.',',');
                return fortmattedValue;
            }

            function validateCardNumber (){
                return Validator.execute([$scope.fields.number]);
            }

            function validateExpirationDate(){
                return Validator.execute([$scope.fields.expirationDate]);
            }

            function validateCvv(){
                return Validator.execute([$scope.fields.cardCvv]);
            }

            function validateInstallment(){
                return Validator.execute([$scope.fields.installments]);
            }

            init();

            return {
                _creditCard : creditCard,
                _onGetCardBrand : onGetCardBrand,
                _validateCardNumber : validateCardNumber,
                _validateExpirationDate : validateExpirationDate,
                _validateCvv : validateCvv,
                _validateInstallment : validateInstallment,
                _getOnlySixDigits: getOnlySixDigits,
                _formatInstallments: formatInstallments
            };

        }
]);
