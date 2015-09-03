'use-strict'

describe('Testes do Controller: passwordAndSecurity_passwordCtrl - SAC UOL', function(){

    var passwordAndSecurity_passwordCtrl,
        scope,
        recoveries,
        location,
        httpBackend,
        notify,
        fieldHandler;

    var responseSuccess = {
        'item': {
            'login': 'teste@teste.com',
            'type': 'alternativeEmail',
            'confirmed': false,
            'description': 'teste@alternativo.com',
            'external': false
        }
    };

    beforeEach( module('uolsacApp') );

    beforeEach(

          inject( function ($injector, $controller, $rootScope, Recoveries, $compile, $location, $httpBackend, Notify, FieldHandler) { // Inicializa o Controller e injeta no escopo do Jasmine o $escopo do Angular

                httpBackend = $injector.get('$httpBackend');
                scope = $rootScope.$new();
                location = $location;
                recoveries = Recoveries;
                notify = Notify.getAllNotifies();
                fieldHandler = FieldHandler;

                var elm1 = angular.element('<div sac-input type="\'password\'" name="\'passwordCurrent\'" field="passwordCurrent"></div>');
                $compile(elm1)(scope);

                var elm2 = angular.element('<div sac-input-password name="\'password\'" field="password" placeholder="\'\'" id="password" showcheckbox="true"></div>');
                $compile(elm2)(scope);

                var elm3 = angular.element('<div sac-input type="\'password\'" name="\'passwordConfirmation\'" field="passwordConfirmation"></div>');
                $compile(elm3)(scope);

                passwordAndSecurity_passwordCtrl = $controller('passwordAndSecurity_passwordCtrl', {
                    $scope : scope
                });

                spyOn(scope.passwordLogged, 'change').and.callThrough();

          }

    ));

    afterEach(function() {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });





    //===============================================
    // ______---=====   Test Cases   =======---____
    //===============================================

    //Password
    it('Verifica se a validação detecta uma senha atual não informada', function () {

        scope.fields.passwordCurrent.value = '';
        expect( scope.validateCurrentPassword() ).toBe(false);
        expect( scope.fields.passwordCurrent.css ).toBe('has-error');
        expect( typeof scope.fields.passwordCurrent.message ).toBe('string');

        scope.fields.passwordCurrent.value = null;
        expect( scope.validateCurrentPassword() ).toBe(false);
        expect( scope.fields.passwordCurrent.css ).toBe('has-error');
        expect( typeof scope.fields.passwordCurrent.message ).toBe('string');

        scope.fields.passwordCurrent.value = undefined;
        expect( scope.validateCurrentPassword() ).toBe(false);
        expect( scope.fields.passwordCurrent.css ).toBe('has-error');
        expect( typeof scope.fields.passwordCurrent.message ).toBe('string');

    });

    it('Verifica se a validação detecta a nova senha não informada', function () {
        scope.fields.passwordCurrent.value = '1q2w3e4r';

        scope.fields.password.value = '';
        expect( scope.validateCurrentPassword() ).toBe(true);
        expect( scope.validatePasswordAndPasswordConfirmation() ).toBe(false);
        expect( scope.fields.password.css ).toBe('has-error');
        expect( typeof scope.fields.password.message ).toBe('string');

        scope.fields.password.value = null;
        expect( scope.validateCurrentPassword() ).toBe(true);
        expect( scope.validatePasswordAndPasswordConfirmation() ).toBe(false);
        expect( scope.fields.password.css ).toBe('has-error');
        expect( typeof scope.fields.password.message ).toBe('string');

        scope.fields.password.value = undefined;
        expect( scope.validateCurrentPassword() ).toBe(true);
        expect( scope.validatePasswordAndPasswordConfirmation() ).toBe(false);
        expect( scope.fields.password.css ).toBe('has-error');
        expect( typeof scope.fields.password.message ).toBe('string');

    });

    it('Verifica se a validação detecta a confirmação de nova senha não informada', function () {

        scope.fields.passwordCurrent.value = '1q2w3e4r';
        scope.fields.password.value = '1q2w3e4r5t';
        recoveries.setNamloginInUse('teste@teste.com');


        scope.fields.passwordConfirmation.value = '';
        expect( scope.validateCurrentPassword() ).toBe(true);
        expect( scope.validatePasswordAndPasswordConfirmation() ).toBe(false);

        expect( scope.fields.passwordConfirmation.css ).toBe('has-error');
        expect( typeof scope.fields.passwordConfirmation.message ).toBe('string');

        scope.fields.passwordConfirmation.value = null;
        expect( scope.validateCurrentPassword() ).toBe(true);
        expect( scope.validatePasswordAndPasswordConfirmation() ).toBe(false);
        expect( scope.fields.passwordConfirmation.css ).toBe('has-error');
        expect( typeof scope.fields.passwordConfirmation.message ).toBe('string');

        scope.fields.passwordConfirmation.value = undefined;
        expect( scope.validateCurrentPassword() ).toBe(true);
        expect( scope.validatePasswordAndPasswordConfirmation() ).toBe(false);
        expect( scope.fields.passwordConfirmation.css ).toBe('has-error');
        expect( typeof scope.fields.passwordConfirmation.message ).toBe('string');

    });

    it('Verifica o sucesso do método de alteração de senha', function () {
        scope.fields.passwordCurrent.value = '1q2w3e4r';
        scope.fields.password.value = '1q2w3e4r5t';
        scope.fields.passwordConfirmation.value = '1q2w3e4r5t';
        recoveries.setNamloginInUse('teste@teste.com');

        scope.passwordLogged.change();
        httpBackend.expectPOST(/.*/).respond(201, responseSuccess);
        httpBackend.flush();
        expect(notify[0].type).toBe('success');
        expect(notify[0].title).toBe('Sucesso!');
        expect(notify[0].message).toBe('Senha alterada com sucesso.');
    });


});
