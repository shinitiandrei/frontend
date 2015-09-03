'use strict';
angular.module('uolsacApp').config(
    function($provide) {
        $provide.factory('CardCvvValidator', ['$resource', 'FieldHandler', 'CreditCard',
            function($resource, FieldHandler, CreditCard) {

                
                function _execute(field) {

                    var message;
                    var fieldValue = field.value;
                    
                    function lenghtLessThanSix(fieldValue){
                        if(fieldValue.length < 3){
                            return true;
                        }
                    }
                    
                    var isEmpty = UOL.platform.utils.isEmpty(fieldValue);
                    
                    if(isEmpty === true || lenghtLessThanSix(fieldValue) === true){
                        
                        message = new FieldHandler.createMessage('cardCvv', 'Por favor, informe 3 números', 'has-error');
                        FieldHandler.add(message, { 'focus' : true });
                        return false;
                        
                    } else{
                        
                        var brand = CreditCard.getBrand();

                        var error = UOL.platform.fields.creditCard.checkCVV(brand, fieldValue);

                        if (error) {
                            message = new FieldHandler.createMessage('cardCvv', 'Código de segurança inválido', 'has-error');
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