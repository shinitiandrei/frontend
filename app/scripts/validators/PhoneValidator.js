'use strict';
angular.module('uolsacApp').config(
    function($provide) {
        $provide.factory('PhoneValidator', ['$resource', 'FieldHandler',
            function($resource, FieldHandler) {

                /**
                 * Validação geral do celular
                 */
                function _execute(field) {

                    var phone = _extractPhone(field.value);
                    var error = UOL.platform.fields.telephone.check(phone.ddd, phone.number);

                    if (error) {
                        var message = new FieldHandler.createMessage(error.field, error.message, 'has-error');
                        FieldHandler.add(message, { 'focus' : true });
                        return false;
                    }

                    return true;
                }

                function _extractPhone(value) {

                    var ddd = '';
                    var number = '';

                    if (value) {
                        ddd = value.substring(0, 2);
                        number = value.substring(2);
                    }

                    return { ddd: ddd, number: number };
                }

                return {
                    execute : _execute
                };
            }
        ]);
    }
);