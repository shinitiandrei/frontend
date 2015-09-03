'use strict';

describe('Testes do Controller: passwordRecovery_verifySmsTokenCtrl - SAC UOL', function () {

    // Seta as variaveis num escopo Global para ficarem acessíveis no contexto do Jasmine
    var passwordRecovery_verifySmsTokenCtrl,
        scope,
        fieldHandler,
        rootScope,
        location,
        httpBackend;

    // Mock para erro na recuperação por celular
    var smsRecoveryMock = {
        "errors": 
            {
                "messages":
                    [{
                        "code":400010,
                        "field":"token",
                        "message":"O código informado está incorreto."
                    }]
            }
    };

    var smsSendTokenErrorMock = {
        "errors":
            {
                "messages":
                    [{
                        "code":409001,
                        "field":"token",
                        "message":"Aguarde mais 1 minuto antes de solicitar o envio do código novamente."
                    }]
            }
    };

    beforeEach( module('uolsacApp') );

    beforeEach(

        inject( function ($injector, $controller, $rootScope, FieldHandler, $compile, $location, $httpBackend) { // Inicializa o Controller e injeta no escopo do Jasmine o $escopo do Angular

            scope = $rootScope.$new();
            fieldHandler = FieldHandler;
            location = $location;
            httpBackend = $injector.get('$httpBackend');

            // Injeta as Diretivas de sac-input utilizadas no Controller
            var elm = angular.element('<div sac-input type="\'text\'" name="\'token\'" field="token" placeholder="\'Token\'" ></div>');
            $compile(elm)(scope);

            // Linka o escopo do Controller com o contexto do Jasmine
            passwordRecovery_verifySmsTokenCtrl = $controller('passwordRecovery_verifySmsTokenCtrl', {
                $scope : scope
            });


            spyOn(scope.sms, 'checkAndSubmitToken').and.callThrough();
            spyOn(scope.sms, 'onSuccess').and.callThrough();
            spyOn(scope.sms, 'sendTokenAgain').and.callThrough();
            spyOn(scope.sms, 'onSendTokenSuccess').and.callThrough();
            spyOn(scope.sms, 'onSendTokenError').and.callThrough();

        }

    ));

    //===============================================
    // ______---=====   Test Cases   =======---____
    //===============================================

    it('Verifica se o método de validação detecta um Token não informado', function () {

        scope.fields.token.value = '';
        expect( scope.validate() ).toBe(false);
        expect( scope.fields.token.css ).toBe('has-error');
        expect( typeof scope.fields.token.message ).toBe('string');

        scope.fields.token.value = null;
        expect( scope.validate() ).toBe(false);
        expect( scope.fields.token.css ).toBe('has-error');
        expect( typeof scope.fields.token.message ).toBe('string');


        scope.fields.token.value = undefined;
        expect( scope.validate() ).toBe(false);
        expect( scope.fields.token.css ).toBe('has-error');
        expect( typeof scope.fields.token.message ).toBe('string');
    });

    it('Verifica se o erro no campo tokenSms é realmente incluído no escopo', function () {
        scope.fields.token.value = '';
        expect( scope.validate() ).toBe(false);
        expect( scope.fields.token.css ).toBe('has-error');
        expect( typeof scope.fields.token.message ).toBe('string');
    });

    it('Verifica se chamada do método onSuccess redireciona para tela de alteração de senha', function() {
        scope.fields.token.value = '1q1q1q1';
        scope.sms.checkAndSubmitToken();
        httpBackend.expectPUT(/.*/).respond(201);
        httpBackend.flush();
        expect(scope.sms.onSuccess).toHaveBeenCalled();
        expect(location.path()).toBe('/recuperarsenha/alterarsenha');
    });

    it('Verifica a chamada do método de erro ao inserir um Token inválido', function() {
        scope.fields.token.value = '1q1q1q1';
        scope.sms.checkAndSubmitToken();
        httpBackend.expectPUT(/.*/).respond(404, smsRecoveryMock);
        httpBackend.flush();
        expect( scope.fields.token.css ).toBe('has-error');
    });

    it('Verifica o método de sucesso no reenvio de Token', function () {
        scope.sms.sendTokenAgain();
        httpBackend.expectPOST(/.*/).respond(201);
        httpBackend.flush();
        expect(scope.sms.onSendTokenSuccess).toHaveBeenCalled();
    });

    it('Verifica o método de erro no envio do Token', function () {
        scope.sms.sendTokenAgain();
        httpBackend.expectPOST(/.*/).respond(409, smsSendTokenErrorMock);
        httpBackend.flush();
        expect(scope.sms.onSendTokenError).toHaveBeenCalled();
    });

});