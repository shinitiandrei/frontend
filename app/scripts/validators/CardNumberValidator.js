'use strict';
angular.module('uolsacApp').config(
    function($provide) {
        $provide.factory('CardNumberValidator', ['$resource', 'FieldHandler', 'CreditCard',
            function($resource, FieldHandler, CreditCard) {


                function _execute(field) {

                    var message;
                    var fieldValue = field.value;

                    function lenghtLessThanSix(fieldValue){
                        if(fieldValue.length < 6){
                            return true;
                        }
                    }

                    var isEmpty = UOL.platform.utils.isEmpty(fieldValue);

                    if(isEmpty === true || lenghtLessThanSix(fieldValue) === true){

                        message = new FieldHandler.createMessage('number', 'Por favor, informe no mínimo 6 números', 'has-error');
                        FieldHandler.add(message, { 'focus' : true });
                        return false;

                    } else {

                        var brand = CreditCard.getBrand();

                        var error = UOL.platform.fields.creditCard.checkNumber(brand, fieldValue);

                        if (error) {
                            message = new FieldHandler.createMessage('number', 'Cartão inválido', 'has-error');
                            FieldHandler.add(message, { 'focus' : true });
                            return false;
                        }

                        return true;

                    }

                }

                return {
                    execute : _execute
                };
            }
        ]);
    }
);
