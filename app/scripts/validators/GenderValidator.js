'use strict';
angular.module('uolsacApp').config(
    function($provide) {
        $provide.factory('GenderValidator', ['$resource', 'FieldHandler',
            function($resource, FieldHandler) {

                function _execute(field){

                    var message = {};

                    var error = UOL.platform.utils.gender(field.value);

                    if(error){
                        message = new FieldHandler.createMessage(field.name, 'Por favor, preencha o campo corretamente.', 'has-error');
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
