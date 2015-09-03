'use strict';
describe('Testes do Controller: creditCardCtrl - SAC UOL', function () {

    var creditCardCtrl,
        scope,
        location,
        httpBackend,
        quittance,
        creditCard,
        notify;


    var getBrandResponseMock = {
        'item':
            {
                'bin':545301,
                'brand':'mastercard',
                'cvvSize':3
            }
    };

    var getQuittanceOptionsMock = {
        'items':[
            {
                'description':'mastercard',
                'idPaymentMethod':4,
                'installments':6,
                'minValue':10.0
            },
            {
                'description':'diners',
                'idPaymentMethod':3,
                'installments':6,
                'minValue':10.0
            },
            {
                'description':'visa',
                'idPaymentMethod':6,
                'installments':6,
                'minValue':10.0
            },
            {
                'description':'boleto',
                'idPaymentMethod':33,
                'installments':1,
                'minValue':10.0
            },
            {
                'description':'amex',
                'idPaymentMethod':1,
                'installments':6,
                'minValue':10.0
            },
            {
                'description':'hipercard',
                'idPaymentMethod':37,
                'installments':6,
                'minValue':10.0
            }
        ]
    };


    var emptyExpirationDate = {
        'name':'expirationDate',
        'optionlist' :[
            {
                'value': ''
            },
            {
                'value': ''
            }
        ]
    };

    var invalidExpirationDate = {
        'name':'expirationDate',
        'optionlist' :[
            {
                'value': '01'
            },
            {
                'value': '01'
            }
        ]
    };

    var validExpirationDate = {
        'name':'expirationDate',
        'optionlist' :[
            {
                'value': '03'
            },
            {
                'value': '18'
            }
        ]
    };

    beforeEach( module('uolsacApp') );

    beforeEach(

        inject(

            function ( $injector, $controller, $rootScope, $compile, $location, $httpBackend, CreditCard ) {

                httpBackend = $injector.get('$httpBackend');
                scope = $rootScope.$new();
                location = $location;
                creditCard = CreditCard;

                var elm1 = angular.element('<div sac-input-credit-card type="\'text\'" maxlength="16" name="\'number\'" field="number" brand="cardBrand"></div>');
                $compile(elm1)(scope);

                var elm2 = angular.element('<div sac-multiple-input name="\'expirationDate\'" field="expirationDate" optionlist="expirationInputs"></div>');
                $compile(elm2)(scope);

                var elm3 = angular.element('<div sac-input type="\'text\'" maxlength="3" name="\'cardCvv\'" field="cardCvv"></div>');
                $compile(elm3)(scope);

                var elm4 = angular.element('<div sac-select name="\'installments\'" field="installments" optionlist="installmentsQuantity" optionname="name"></div>');
                $compile(elm4)(scope);

                creditCardCtrl = $controller('creditCardCtrl', { $scope : scope } );

            }

        )
    );


    //Card Number
    it('Verifica se o método de validação detecta um cartão não informado', function () {
        scope.fields.number.value = '';
        expect( creditCardCtrl._validateCardNumber() ).toBeFalsy();
        expect( scope.fields.number.css ).toBe('has-error');
        expect( typeof scope.fields.number.message ).toBe('string');

        scope.fields.number.value = null;
        expect( creditCardCtrl._validateCardNumber() ).toBeFalsy();
        expect( scope.fields.number.css ).toBe('has-error');
        expect( typeof scope.fields.number.message ).toBe('string');

        scope.fields.number.value = undefined;
        expect( creditCardCtrl._validateCardNumber() ).toBeFalsy();
        expect( scope.fields.number.css ).toBe('has-error');
        expect( typeof scope.fields.number.message ).toBe('string');
    });

    it('Verifica se o método de validação detecta um cartão inválido informado', function () {
        creditCard.setBrand('mastercard');
        scope.fields.number.value = '555566';
        expect( creditCardCtrl._validateCardNumber() ).toBeFalsy();
        expect( scope.fields.number.css ).toBe('has-error');
        expect( typeof scope.fields.number.message ).toBe('string');
    });


    it('Verifica se o método de validação detecta um cartão válido informado', function () {
        creditCard.setBrand('mastercard');
        scope.fields.number.value = '5453010000066167';
        expect( creditCardCtrl._validateCardNumber()).toBeTruthy();
    });



    //Expiration Date
    it('Verifica se o método de validação de data detecta uma data inválida', function () {
        scope.fields.number.value = '5453010000066167';
        creditCard.setBrand('mastercard');
        scope.fields.expirationDate = emptyExpirationDate;
        expect( creditCardCtrl._validateExpirationDate() ).toBeFalsy();
        expect( scope.fields.expirationDate.css ).toBe('has-error');
        expect( typeof scope.fields.expirationDate.message ).toBe('string');
    });


    it('Verifica se o método de validação de data detecta uma data inválida', function () {
        scope.fields.number.value = '5453010000066167';
        creditCard.setBrand('mastercard');
        scope.fields.expirationDate = invalidExpirationDate;
        expect( creditCardCtrl._validateExpirationDate() ).toBeFalsy();
        expect( scope.fields.expirationDate.css ).toBe('has-error');
        expect( typeof scope.fields.expirationDate.message ).toBe('string');
    });


    it('Verifica se o método de validação de data detecta uma data inválida', function () {
        scope.fields.number.value = '5453010000066167';
        creditCard.setBrand('mastercard');
        scope.fields.expirationDate = validExpirationDate;
        expect( creditCardCtrl._validateExpirationDate() ).toBeTruthy();
    });



    //Card CVV
    it('Verifica se o método de validação detecta um código de segurança não informado', function () {
        scope.fields.cardCvv.value = '';
        expect( creditCardCtrl._validateCvv() ).toBeFalsy();
        expect( scope.fields.cardCvv.css ).toBe('has-error');
        expect( typeof scope.fields.cardCvv.message ).toBe('string');

        scope.fields.cardCvv.value = null;
        expect( creditCardCtrl._validateCvv() ).toBeFalsy();
        expect( scope.fields.cardCvv.css ).toBe('has-error');
        expect( typeof scope.fields.cardCvv.message ).toBe('string');

        scope.fields.cardCvv.value = undefined;
        expect( creditCardCtrl._validateCvv() ).toBeFalsy();
        expect( scope.fields.cardCvv.css ).toBe('has-error');
        expect( typeof scope.fields.cardCvv.message ).toBe('string');
    });

    it('Verifica se o método de validação detecta um código de segurança inválido', function () {
        scope.fields.cardCvv.value = '11';
        scope.fields.number.value = '555566';
        creditCard.setBrand('mastercard');
        expect( creditCardCtrl._validateCvv() ).toBeFalsy();
        expect( scope.fields.cardCvv.css ).toBe('has-error');
        expect( typeof scope.fields.cardCvv.message ).toBe('string');
    });

    it('Verifica se o método de validação detecta um código de segurança válido', function () {
        scope.fields.cardCvv.value = '123';
        scope.fields.number.value = '555566';
        creditCard.setBrand('mastercard');
        expect( creditCardCtrl._validateCvv() ).toBeTruthy();
    });


    //Installments
    it('Verifica se o método de validação detecta quantidade de parcelas não selecionada', function () {
        scope.fields.installments.value = '';
        expect( creditCardCtrl._validateInstallment() ).toBeFalsy();
        expect( scope.fields.installments.css ).toBe('has-error');
        expect( typeof scope.fields.installments.message ).toBe('string');

        scope.fields.installments.value = null;
        expect( creditCardCtrl._validateInstallment() ).toBeFalsy();
        expect( scope.fields.installments.css ).toBe('has-error');
        expect( typeof scope.fields.installments.message ).toBe('string');

        scope.fields.installments.value = undefined;
        expect( creditCardCtrl._validateInstallment() ).toBeFalsy();
        expect( scope.fields.installments.css ).toBe('has-error');
        expect( typeof scope.fields.installments.message ).toBe('string');
    });

    it('Verifica se o método de validação detecta quantidade de parcelas selecionada', function () {
        scope.fields.installments.value = '1 x 100,00';
        expect( creditCardCtrl._validateInstallment() ).toBeTruthy();
    });

    //Payment
    it('Verifica se o método de pagamento é realizado com sucesso', function () {
        scope.idtAccount = 53310812;
        creditCard.setBrand('mastercard');
        scope.fields.number.value = '5453010000066167';
        scope.fields.cardCvv.value = '123';
        scope.fields.installments.value = '1';
        scope.fields.expirationDate = validExpirationDate;
        creditCardCtrl._creditCard.pay();
        httpBackend.expectPOST(/.*/).respond(200);
        httpBackend.flush();
        expect(location.path()).toBe('/cobranca/debitoquitado');
    });

    //Método que retorna apenas os 6 primeiros dígitos do cartão
    it('Verifica a função que retorna apenas os 6 primeiros dígitos do cartão', function () {
        scope.fields.number.value = '407320101010101';
        expect(creditCardCtrl._getOnlySixDigits(scope.fields.number.value)).toBe('407320');
    });

    //Método que formata o número de parcelas
    it('Verifica a função que formata as parcelas', function () {
        expect(creditCardCtrl._formatInstallments(2,200)).toBe('2 x 200,00');
    });


});
