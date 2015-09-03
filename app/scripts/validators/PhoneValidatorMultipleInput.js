'use strict';
angular.module('uolsacApp').config(
    function($provide) {
        $provide.factory('PhoneValidatorMultipleInput', ['$resource', 'FieldHandler',
            function($resource, FieldHandler) {

                /**
                 * Validação geral do celular
                 */
                function _execute(field) {

                    var error = UOL.platform.fields.telephone.check(field.optionlist[0].value, field.optionlist[1].value);

                    if (error) {
                        var message = new FieldHandler.createMessage('telephoneMultiple', error.message, 'has-error');
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