'use strict';
angular.module('uolsacApp').config(
    function($provide) {
        $provide.factory('LoginValidator', ['$resource', 'FieldHandler',
            function($resource, FieldHandler) {

                /**
                 * Validação geral do email
                 */
                function _execute(field) {

					var error = UOL.platform.fields.email.check(field.value, true);

                    if (error) {

                        var message = new FieldHandler.createMessage('login', error.message, 'has-error');
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