'use strict';
angular.module('uolsacApp').config(
    function($provide) {
        $provide.factory('CardExpirationValidator', ['$resource', 'FieldHandler',
            function($resource, FieldHandler) {

                function _execute(field) {

                    var message;

                    var error = UOL.platform.fields.creditCard.date(field.optionlist[0].value, '20'+field.optionlist[1].value);

                    if (error) {
                        message = new FieldHandler.createMessage('expirationDate', error.message, 'has-error');
                        FieldHandler.add(message, { 'focus' : true });
                        return false;
                    }

                    return true;
                }

                return {
                    execute : _execute
                };
            }
        ]);
    }
);