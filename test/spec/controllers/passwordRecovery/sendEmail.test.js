'use strict';

describe('Testes do Controller: passwordRecovery_sendEmailCtrl - SAC UOL', function () {

    // Seta as variaveis num escopo Global para ficarem acessíveis no contexto do Jasmine
    var passwordRecovery_sendEmailCtrl,
        scope,
        fieldHandler,
        location,
        httpBackend;

    // Mock para erro na recuperação por e-mail alternativo
    var alternativeEmailResponseMock = {
        "errors":
            {
                "messages" :
                    [{
                        "code": 404003,
                        "field":"alternativeMail",
                        "message":"E-mail alternativo não encontrado."
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
            var elm = angular.element('<div sac-input type="\'text\'" name="\'alternativeEmail\'" field="alternativeEmail" placeholder="\'E-mail alternativo\'"></div>');
            $compile(elm)(scope);

            // Linka o escopo do Controller com o contexto do Jasmine
            passwordRecovery_sendEmailCtrl = $controller('passwordRecovery_sendEmailCtrl', {
                $scope : scope
            });

            spyOn(scope.alternativeEmail, 'send').and.callThrough();
            spyOn(scope.alternativeEmail, 'onSuccess').and.callThrough();
			spyOn(scope.alternativeEmail, 'onError').and.callThrough();
            spyOn(scope, 'nextStep').and.callThrough();

        }

    ));

    afterEach(function() {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    //===============================================
    // ______---=====   Test Cases   =======---____
    //===============================================

    it('Verifica se a validação detecta um e-mail alternativo inválido sem arroba', function () {
        scope.fields.alternativeEmail.value = 'romulobordezanigmail.com';
        expect( scope.validate() ).toBe(false);
    });

    it('Verifica se o método de validação detecta um e-mail alternativo válido com arroba', function () {
        scope.fields.alternativeEmail.value = 'romulobordezani@gmail.com';
        expect( scope.validate() ).toBe(true);
    });

    it('Verifica se o método de validação detecta um e-mail alternativo não informado', function () {

        scope.fields.alternativeEmail.value = '';
        expect( scope.validate() ).toBe(false);
        expect( scope.fields.alternativeEmail.css ).toBe('has-error');
        expect( typeof scope.fields.alternativeEmail.message ).toBe('string');

        scope.fields.alternativeEmail.value = null;
        expect( scope.validate() ).toBe(false);
        expect( scope.fields.alternativeEmail.css ).toBe('has-error');
        expect( typeof scope.fields.alternativeEmail.message ).toBe('string');


        scope.fields.alternativeEmail.value = undefined;
        expect( scope.validate() ).toBe(false);
        expect( scope.fields.alternativeEmail.css ).toBe('has-error');
        expect( typeof scope.fields.alternativeEmail.message ).toBe('string');
    });

    it('Verifica se o erro no campo de e-mail alternativo a é realmente incluído no escopo', function () {
        scope.fields.alternativeEmail.value = 'romulobordezani';
        expect( scope.validate() ).toBe(false);
        expect( scope.fields.alternativeEmail.css ).toBe('has-error');
        expect( typeof scope.fields.alternativeEmail.message ).toBe('string');
    });

    it('Verifica o método de sucesso no envio de e-mail alternativo', function () {
        scope.alternativeEmail.onSuccess();
        expect(scope.alternativeEmail.onSuccess).toHaveBeenCalled();
    });

    it('Verifica a chamada do método onError ao executar o método que envia o e-mail alternativo', function() {
        scope.fields.alternativeEmail.value = 'teste@teste.com';
        scope.alternativeEmail.send();
        httpBackend.expectPOST(/.*/).respond(404, alternativeEmailResponseMock);
        httpBackend.flush();
        expect( scope.listNotify ).toBeUndefined();
    });

    it('Verifica a chamada do método onSucces ao executar o método que envia o e-mail alternativo', function() {
        scope.fields.alternativeEmail.value = 'teste@teste.com';
        scope.alternativeEmail.send();
        httpBackend.expectPOST(/.*/).respond(201);
        httpBackend.flush();
        expect(scope.alternativeEmail.onSuccess).toHaveBeenCalled();
    });

});
