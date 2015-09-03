'use strict';
angular.module('uolsacApp').config(
    function($provide) {
        $provide.factory('IsEmptyValidator', ['$resource', 'FieldHandler',
            function($resource, FieldHandler) {

                /**
                 * Validação geral do Token
                 */
                function _execute(fields){

                    var message = {};

                    var currentField = fields && fields.length > 0 ? fields[0] : null;

                    var error = UOL.platform.utils.isEmpty(currentField.value);

                    if(error){
                        message = new FieldHandler.createMessage(currentField.name, 'Por favor, preencha o campo corretamente.', 'has-error');
                        FieldHandler.add( message, { 'focus' : true } );
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
