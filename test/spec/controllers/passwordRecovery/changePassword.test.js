'use strict';

describe('Testes do Controller: passwordRecovery_changePasswordCtrl - SAC UOL', function () {

    // Seta as variaveis num escopo Global para ficarem acessíveis no contexto do Jasmine
    var passwordRecovery_changePasswordCtrl,
        scope,
        fieldHandler,
        location,
        httpBackend,
        recoveries;

    // Mock para erro na recuperação por e-mail alternativo
    var errorDataMock = {
        "errors":
            {
                "messages":
                    [{
                        "code": 400,
                    }]
            }
    };

    beforeEach( module('uolsacApp') );

    beforeEach(

        inject( function ($injector, $controller, $rootScope, FieldHandler, $compile, $location, $httpBackend, Recoveries) { // Inicializa o Controller e injeta no escopo do Jasmine o $escopo do Angular

            httpBackend = $injector.get('$httpBackend');
            scope = $rootScope.$new();
            fieldHandler = FieldHandler;
            location = $location;
            recoveries = Recoveries;


            //Injeta a Diretivas de sac-input e sac-input-password utilizada no Controller
            var elm1 = angular.element('<div sac-input-password name="\'password\'" field="password" placeholder="\'\'" id="password" showcheckbox="true"></div>');
            var elm2 = angular.element('<div sac-input type="\'password\'" name="\'passwordConfirmation\'" field="passwordConfirmation"></div>');
            $compile(elm1)(scope);
            $compile(elm2)(scope);


            // Linka o escopo do Controller com o contexto do Jasmine
            passwordRecovery_changePasswordCtrl = $controller('passwordRecovery_changePasswordCtrl', {
                $scope : scope
            });

            spyOn(scope.token, 'checkIfIsValid').and.callThrough();
            spyOn(scope.token, 'onSuccess').and.callThrough();
            spyOn(scope.token, 'onError').and.callThrough();
            spyOn(scope.passwordNonLogged, 'change').and.callThrough();
            spyOn(scope.passwordNonLogged, 'onSuccess').and.callThrough();

        }

    ));

    afterEach(function() {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    //===============================================
    // ______---=====   Test Cases   =======---____
    //===============================================

    it('Verifica se o método de validação detecta uma senha não informada', function () {
        scope.fields.password.value = '';
        expect( scope.validate() ).toBeFalsy();
        expect( scope.fields.password.css ).toBe('has-error');
        expect( typeof scope.fields.password.message ).toBe('string');

        scope.fields.password.value = null;
        expect( scope.validate() ).toBeFalsy();
        expect( scope.fields.password.css ).toBe('has-error');
        expect( typeof scope.fields.password.message ).toBe('string');

        scope.fields.password.value = undefined;
        expect( scope.validate() ).toBeFalsy();
        expect( scope.fields.password.css ).toBe('has-error');
        expect( typeof scope.fields.password.message ).toBe('string');

    });

    it('Verifica se o método de validação detecta uma confirmação de senha não informada', function () {

        scope.fields.password.value = '1q2w3e4r';
        scope.fields.passwordConfirmation.value = '';
        recoveries.setNamloginInUse('teste@teste.com');
        expect( scope.validate() ).toBeFalsy();
        expect( scope.fields.passwordConfirmation.css ).toBe('has-error');
        expect( typeof scope.fields.passwordConfirmation.message ).toBe('string');


        scope.fields.password.value = '1q2w3e4r';
        scope.fields.passwordConfirmation.value = null;
        recoveries.setNamloginInUse('teste@teste.com');
        expect( scope.validate() ).toBeFalsy();
        expect( scope.fields.passwordConfirmation.css ).toBe('has-error');
        expect( typeof scope.fields.passwordConfirmation.message ).toBe('string');

        scope.fields.password.value = '1q2w3e4r';
        scope.fields.passwordConfirmation.value = undefined;
        recoveries.setNamloginInUse('teste@teste.com');
        expect( scope.validate() ).toBeFalsy();
        expect( scope.fields.passwordConfirmation.css ).toBe('has-error');
        expect( typeof scope.fields.passwordConfirmation.message ).toBe('string');

    });


    it('Verifica o sucesso do método de de validação do Token', function () {
        scope.token.checkIfIsValid();
        httpBackend.expectPUT(/.*/).respond(200);
        httpBackend.flush();
        expect(scope.token.onSuccess).toHaveBeenCalled();
    });


    it('Verifica o erro do método de de validação do Token', function () {
        scope.token.checkIfIsValid();
        httpBackend.expectPUT(/.*/).respond(400, errorDataMock);
        httpBackend.flush();
        expect(scope.token.onError).toHaveBeenCalled();
    });


    it('Verifica o sucesso no método de alteração de senha', function () {
        scope.fields.password.value = '1q2w3e4r';
        scope.fields.passwordConfirmation.value = '1q2w3e4r';
        recoveries.setNamloginInUse('teste@teste.com');
        scope.passwordNonLogged.change();
        expect( scope.validate() ).toBeTruthy();
        httpBackend.expectPOST(/.*/).respond(200);
        httpBackend.flush();
        expect(scope.passwordNonLogged.onSuccess).toHaveBeenCalled();
    });


});
