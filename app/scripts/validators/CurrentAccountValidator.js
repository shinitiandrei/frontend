'use strict';
angular.module('uolsacApp').config(
    function($provide) {
        $provide.factory('CurrentAccountValidator', ['$resource', 'FieldHandler',
            function($resource, FieldHandler) {

                /**
                 * Validação geral do celular
                 */
                function _execute(field) {

                    var errorFirstField = UOL.platform.utils.isEmpty(field.optionlist[0].value);
                    var errorSecondField = UOL.platform.utils.isEmpty(field.optionlist[1].value);
                    var message;

                    if (errorFirstField) {
                        message = new FieldHandler.createMessage('currentAccount', 'Insira o número da conta corrente.', 'has-error');
                        FieldHandler.add(message, { 'focus' : true });
                        return false;
                    } else if (errorSecondField){
                        message = new FieldHandler.createMessage('currentAccount', 'Insira o dígito da conta corrente', 'has-error');
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