'use strict';
angular.module('uolsacApp').config(
    function($provide) {
        $provide.factory('AgencyValidator', ['$resource', 'FieldHandler',
            function($resource, FieldHandler) {

                /**
                 * Validação geral do celular
                 */
                function _execute(field) {

                    var errorFirstField = UOL.platform.utils.isEmpty(field.optionlist[0].value);
                    var message;

                    if (errorFirstField) {
                        message = new FieldHandler.createMessage('agency', 'Insira o número da agência.', 'has-error');
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