'use strict';
angular.module('uolsacApp').config(
    function($provide) {
        $provide.factory('PasswordValidator', ['$resource', 'FieldHandler', 'Recoveries', 'User',
            function($resource, FieldHandler, Recoveries, User) {

                /**
                 * Validação geral de senha
                 */
                function _execute(fields) {

					var fieldPassword = fields && fields.length > 0 ? fields[0] : null;
					var fieldConfirmation = fields && fields.length > 1 ? fields[1] : null;
					var login = User.data.namLogin || Recoveries.getNamloginInUse();

					var error = null;

					if (fieldConfirmation) {
						error = UOL.platform.fields.password.checkPasswordAndPasswordConfirmation(fieldPassword.value, fieldConfirmation.value, login);
					} else {
						error = UOL.platform.fields.password.checkPassword(fieldPassword.value, login);
					}

                    if (error) {
                        var message = new FieldHandler.createMessage(error.field, error.message, 'has-error');
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
