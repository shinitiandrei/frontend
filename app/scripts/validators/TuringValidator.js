'use strict';
angular.module('uolsacApp').config(
    function($provide) {
        $provide.factory('TuringValidator', ['$resource', 'FieldHandler',
            function($resource, FieldHandler) {

                /**
                 * Validação geral do Turing
                 */
                function _execute(field){

                    var message = {};

                    var error = UOL.platform.utils.isEmpty(field.answer);

                    if (error){
                        message = new FieldHandler.createMessage('turing', 'Por favor, informe o que você vê na imagem.','has-error');
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