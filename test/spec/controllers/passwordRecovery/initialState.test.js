'use strict';

describe('Testes do Controller: passwordRecovery_initialStateCtrl - SAC UOL', function () {

    // Seta as variaveis num escopo Global para ficarem acessíveis no contexto do Jasmine
    var passwordRecovery_initialStateCtrl,
        scope,
        fieldHandler,
        recoveries,
        location,
        rootScope;

    /**
     * MONKEYS MOCKS
     */

    // Dica de Senha
    var passwordTipRecoveryMock = {
       item: {
            links: [{rel: 'tip'}]
        }
    };

    // Confirmação de Celular
    var cellphoneConfirmationRecoveryMock = {
        item: {
            links: [{rel: 'cellphone'}]
        }
    };

    beforeEach( module('uolsacApp') );

    beforeEach(

        inject( function ($location, $controller, $rootScope, Recoveries, $http, FieldHandler, $compile) { // Inicializa o Controller e injeta no escopo do Jasmine o $escopo do Angular

            scope = $rootScope.$new();

            rootScope = $rootScope;

            fieldHandler = FieldHandler;
            recoveries = Recoveries;
            location = $location;

            // Injeta as Diretivas de sac-input utilizadas no Controller
            var elm = angular.element('<div sac-input type="\'text\'" name="\'login\'" field="login" placeholder="\'Seu e-mail\'" ></div>');
            $compile(elm)(scope);

            // Linka o escopo do Controller com o contexto do Jasmine
            passwordRecovery_initialStateCtrl = $controller('passwordRecovery_initialStateCtrl', {
                $scope : scope
            });

            spyOn(scope, 'onSuccess').and.callThrough();
        }
    ));



    //===============================================
    // ______---=====   Test Cases   =======---____
    //===============================================

    it('Verifica se a validação detecta um login inválido sem arroba', function () {
        scope.fields.login.value = 'testemailsemarroba.com';
        expect( scope.validate() ).toBe(false);
    });

    it('Verifica se o método de validação detecta um login válido com arroba', function () {
        scope.fields.login.value = 'teste@teste.com';
        expect( scope.validate() ).toBe(true);
    });

    it('Verifica se o método de validação detecta um login não informado', function () {

        scope.fields.login.value = '';
        expect( scope.validate() ).toBe(false);
        expect( scope.fields.login.css ).toBe('has-error');
        expect( typeof scope.fields.login.message ).toBe('string');

        scope.fields.login.value = null;
        expect( scope.validate() ).toBe(false);
        expect( scope.fields.login.css ).toBe('has-error');
        expect( typeof scope.fields.login.message ).toBe('string');


        scope.fields.login.value = undefined;
        expect( scope.validate() ).toBe(false);
        expect( scope.fields.login.css ).toBe('has-error');
        expect( typeof scope.fields.login.message ).toBe('string');
    });

    it('Verifica se o erro no campo Login é realmente incluído no escopo', function () {
        scope.fields.login.value = 'usuarioLogin';
        expect( scope.validate() ).toBe(false);
        expect( scope.fields.login.css ).toBe('has-error');
        expect( typeof scope.fields.login.message ).toBe('string');
    });

    it('redireciona para DICA DE SENHA', function () {

        scope.onSuccess(passwordTipRecoveryMock);
        expect(scope.onSuccess).toHaveBeenCalled();
        expect(location.path()).toBe('/recuperarsenha/dicadesenha');

    });

    it('redireciona para CONFIRMACAO DE CELULAR', function () {

        scope.onSuccess(cellphoneConfirmationRecoveryMock);
        expect(scope.onSuccess).toHaveBeenCalled();
        expect(location.path()).toBe('/recuperarsenha/celular');

    });

});
