'use strict';
angular.module('uolsacApp').config(
    function($provide) {
        $provide.factory('CellphoneValidatorMultipleInput', ['$resource', 'FieldHandler',
            function($resource, FieldHandler) {

                /**
                 * Validação geral do celular
                 */
                function _execute(field) {

                    var error = UOL.platform.fields.cellphone.check(field.optionlist[0].value, field.optionlist[1].value);

                    if (error) {
                        var message = new FieldHandler.createMessage('cellphoneMultiple', error.message, 'has-error');
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