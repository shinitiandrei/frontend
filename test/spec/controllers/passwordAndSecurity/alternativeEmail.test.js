'use-strict'

describe('Testes do Controller: passwordAndSecurity_alternativeEmailCtrl - SAC UOL', function(){

    // Seta as variaveis num escopo Global para ficarem acessíveis no contexto do Jasmine
    var passwordAndSecurity_alternativeEmailCtrl,
        scope,
        fieldHandler,
        location,
        httpBackend,
        user,
        notify;

    var responseSuccess = {
        'item': {
            'login': 'teste@teste.com',
            'type': 'alternativeEmail',
            'confirmed': false,
            'description': 'teste@alternativo.com',
            'external': false
        }
    };

    var responseError = {
        'errors': {
            'messages': {
                0:
                {
                    'code': 0,
                    'field': 'description',
                    'message': 'não pode ser nulo'
                }
            }
        }
    };

    beforeEach( module('uolsacApp') );

    beforeEach(

          inject( function ($injector, $rootScope, $location, $controller, FieldHandler, $compile, $httpBackend, User, Notify) { // Inicializa o Controller e injeta no escopo do Jasmine o $escopo do Angular

                httpBackend = $injector.get('$httpBackend');
                scope = $rootScope.$new();
                fieldHandler = FieldHandler;
                location = $location;
                user = User;
                notify = Notify.getAllNotifies();

                // Injeta as Diretivas de sac-input utilizadas no Controller
                var elm1 = angular.element('<div sac-input type="\'text\'" name="\'alternativeEmail\'" field="alternativeEmail" placeholder="\'E-mail alternativo\'" ></div>');
                $compile(elm1)(scope);


                // Linka o escopo do Controller com o contexto do Jasmine
                passwordAndSecurity_alternativeEmailCtrl = $controller('passwordAndSecurity_alternativeEmailCtrl', {
                    $scope : scope
                });

                spyOn(scope.alternativeEmail, 'create').and.callThrough();
                spyOn(scope.alternativeEmail, 'edit').and.callThrough();

          }

    ));

    afterEach(function() {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    //===============================================
    // ______---=====   Test Cases   =======---____
    //===============================================


    //E-mail
    it('Verifica se a validação detecta um e-mail alternativo inválido sem arroba', function () {
        scope.fields.alternativeEmail.value = 'teste.com';
        expect( scope.validateEmail() ).toBe(false);
        expect( scope.fields.alternativeEmail.css ).toBe('has-error');
        expect( typeof scope.fields.alternativeEmail.message ).toBe('string');

    });

    it('Verifica se o método de validação detecta um e-mail alternativo válido com arroba', function () {
        scope.fields.alternativeEmail.value = 'teste@alternativo.com';
        expect( scope.validateEmail() ).toBe(true);
    });

    it('Verifica se o método de validação detecta um e-mail alternativo não informado', function () {
        scope.fields.alternativeEmail.value = '';
        expect( scope.validateEmail() ).toBe(false);
        expect( scope.fields.alternativeEmail.css ).toBe('has-error');
        expect( typeof scope.fields.alternativeEmail.message ).toBe('string');

        scope.fields.alternativeEmail.value = null;
        expect( scope.validateEmail() ).toBe(false);
        expect( scope.fields.alternativeEmail.css ).toBe('has-error');
        expect( typeof scope.fields.alternativeEmail.message ).toBe('string');

        scope.fields.alternativeEmail.value = undefined;
        expect( scope.validateEmail() ).toBe(false);
        expect( scope.fields.alternativeEmail.css ).toBe('has-error');
        expect( typeof scope.fields.alternativeEmail.message ).toBe('string');

    });

    it('Verifica o sucesso do método criação de e-mail alternativo', function () {
        user.namLogin = 'teste@teste.com';
        scope.fields.alternativeEmail.value = 'teste@alternativo.com';
        scope.alternativeEmail.create();
        httpBackend.expectPOST(/.*/).respond(201, responseSuccess);
        httpBackend.flush();
        expect(scope.$parent.showThis).toBe('alternativeEmailRecovery');
        expect(scope.$parent.hideThis).toBe('alternativeEmailEdit');
        expect(notify[0].type).toBe('success');
        expect(notify[0].title).toBe('Sucesso!');
        expect(notify[0].message).toBe('Um e-mail de confirmação foi enviado para o novo e-mail alternativo.');

    });

    it('Verifica o erro do método criação de e-mail alternativo', function () {
        user.namLogin = 'teste@teste.com';
        scope.fields.alternativeEmail.value = 'teste@alternativo.com';
        scope.alternativeEmail.create();
        httpBackend.expectPOST(/.*/).respond(400, responseError);
        httpBackend.flush();
        expect(notify[0].type).toBe('danger');
        expect(notify[0].title).toBe('Erro!');
        expect(notify[0].message).toBeDefined();
    });

    it('Verifica o sucesso do método edição de e-mail alternativo', function () {
        user.namLogin = 'teste@teste.com';
        scope.fields.alternativeEmail.value = 'teste@alternativo.com';
        scope.alternativeEmail.edit();
        httpBackend.expectPUT(/.*/).respond(201, responseSuccess);
        httpBackend.flush();
        expect(scope.$parent.showThis).toBe('alternativeEmailRecovery');
        expect(scope.$parent.hideThis).toBe('alternativeEmailEdit');
        expect(notify[0].type).toBe('success');
        expect(notify[0].title).toBe('Sucesso!');
        expect(notify[0].message).toBe('Um e-mail de confirmação foi enviado para o novo e-mail alternativo.');
    });

    it('Verifica o erro do método edição de e-mail alternativo', function () {
        user.namLogin = 'teste@teste.com';
        scope.fields.alternativeEmail.value = 'teste@alternativo.com';
        scope.alternativeEmail.edit();
        httpBackend.expectPUT(/.*/).respond(400, responseError);
        httpBackend.flush();
        expect(notify[0].type).toBe('danger');
        expect(notify[0].title).toBe('Erro!');
        expect(notify[0].message).toBeDefined();
    });



});
