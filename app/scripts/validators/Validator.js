'use strict';
angular.module('uolsacApp').config(
    function($provide) {
        $provide.factory('Validator', ['$injector', 'FieldMap',
            function($injector, FieldMap) {

                /**
                 * Executa a lista de validators, retorna true caso todos
                 * executarem com sucesso e false caso algum retorne como false
                 */
                function _execute(fields) {

                    var isValid = true;
                    var returnValidator = true;

                    for (var i = 0; i < fields.length; i++) {

                        var fieldMap = FieldMap.getField(fields[i].name);

                        if (fieldMap.validator) {

							var fieldParams = _findFieldParams(fieldMap, fields);
                            returnValidator = _callValidator(fieldParams, fieldMap.validator);
                        }

                        if (!returnValidator) {
                            isValid = false;
                        }
                    }

                    return isValid;
                }

                /**
                 * Function que abstrai a logica de injeção e execução do validator
                 */
                function _callValidator(field, validator) {

                    var returnValidator = false;

                    function explicit(validator) {
                        returnValidator = validator.execute(field);
                    }

                    explicit.$inject = [validator];
                    $injector.invoke(explicit);

                    return returnValidator;
                }

				function _findFieldParams(fieldMap, fields) {

					var fieldParams = null;

					if (fieldMap.fieldName) {
						fieldParams = _findFields([fieldMap.fieldName], fields);
						fieldParams = fieldParams.length > 0 ? fieldParams[0] : null;
					} else
					if (fieldMap.fieldGroup) {
						fieldParams = _findFields(fieldMap.fieldGroup, fields);
					}

					return fieldParams;
				}

				function _findFields(fieldNames, fields) {

					var result = [];

					for (var i in fieldNames) {

						var fieldName = fieldNames[i];
						var field = _findField(fieldName, fields);

						if (field) {
							result.push(field);
						}
					}

					return result;
				}

				function _findField(fieldName, fields) {

					for (var i in fields) {

						var field = fields[i];

						if (field.name === fieldName) {
							return field;
						}
					}

					return null;
				}

                return {
                    execute: _execute
                };
            }
        ]);
    }
);
