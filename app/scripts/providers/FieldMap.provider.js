'use strict';
angular.module('uolsacApp').config(
    function($provide) {
        $provide.factory('FieldMap',
            function() {

                // Referencia do 'this' dentro de funções
                var self = this;

                /**
                 * Campos do SAC
                 */
                this.fields = [
                    {
                        fieldName: 'cellphone',
                        validator: 'CellphoneValidator'
                    },
                    {
                        fieldName: 'cellphoneMultiple',
                        validator: 'CellphoneValidatorMultipleInput'
                    },
                    {
                        fieldName: 'login',
                        validator : 'LoginValidator'
                    },
                    {
                        fieldName: 'alternativeEmail',
                        validator : 'AlternativeEmailValidator'
                    },
                    {
                        fieldName: 'email',
                        validator: 'EmailValidator'
                    },
                    {
                        fieldGroup: ['password', 'passwordConfirmation'],
                        validator: 'PasswordValidator'
                    },
                    {
                        fieldName: 'turing',
                        validator : 'TuringValidator'
                    },
                    {
                        fieldGroup: ['token', 'passwordCurrent', 'question', 'answer', 'name','cpf','corporateName','cnpj','tradingName','birthDate','foundationDate', 'gender', 'stateTaxNumber', 'stateRegistrationUf', 'zipcode', 'emptyAddressStreet', 'emptyAddressNumber', 'emptyAddressNeighborhood', 'incompleteAddressNumber', 'existingCardSafeCode', 'otherCardSafeCode', 'debitDate', 'installments', 'bank', 'billetExpirationDate'],
                        validator: 'IsEmptyValidator'
                    },
                    {
                        fieldName: 'telephone',
                        validator: 'PhoneValidator'
                    },
                    {
                        fieldName: 'telephoneMultiple',
                        validator: 'PhoneValidatorMultipleInput'
                    },
                    {
                        fieldName: 'expirationDate',
                        validator: 'CardExpirationValidator'
                    },
                    {
                        fieldName: 'bookletEmail',
                        validator: 'BookletEmailValidator'
                    },
                    {
                        fieldName: 'agency',
                        validator: 'AgencyValidator'
                    },
                    {
                        fieldName: 'currentAccount',
                        validator: 'CurrentAccountValidator'
                    },
                    {
                        fieldName: 'number',
                        validator: 'CardNumberValidator'
                    },
                    {
                        fieldName: 'cardCvv',
                        validator: 'CardCvvValidator'
                    }
                ];

                /**
                 * Retorna o Campo devido
                 * @param  {string} fieldName O campo da plataforma
                 * @return {Object}
                 */
                this.getField = function(fieldName){

                    for (var i in self.fields) {

						var field = self.fields[i];

                        if (field.fieldName && field.fieldName === fieldName){
                            return field;
                        }

                        if (field.fieldGroup && field.fieldGroup.indexOf(fieldName) > -1){
                            return field;
                        }
                    }

                    return null;
                };

                return this;
            }
        );
    }
);
