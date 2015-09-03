'use-strict'

describe('Testes do Controller: passwordAndSecurity_cellphoneCtrl - SAC UOL', function(){

    // Seta as variaveis num escopo Global para ficarem acessíveis no contexto do Jasmine
    var passwordAndSecurity_cellphoneCtrl,
        scope,
        fieldHandler,
        httpBackend,
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

          inject( function ($injector, $controller, $rootScope, FieldHandler, $compile, $httpBackend, User, Notify) { // Inicializa o Controller e injeta no escopo do Jasmine o $escopo do Angular

            scope = $rootScope.$new();
            fieldHandler = FieldHandler;
            notify = Notify.getAllNotifies();
            httpBackend = $injector.get('$httpBackend');


            var elm1 = angular.element('<div sac-input type="\'text\'" name="\'token\'" field="token" placeholder="\'Token\'" ></div>');
            $compile(elm1)(scope);

            var elm2 = angular.element('<div sac-input type="\'text\'" mask="\'(99) 99999999?9\'" name="\'cellphone\'" field="cellphone" placeholder="\'(__) _________\'" ></div>');
            $compile(elm2)(scope);

             // Linka o escopo do Controller com o contexto do Jasmine
            passwordAndSecurity_cellphoneCtrl = $controller('passwordAndSecurity_cellphoneCtrl', {
                $scope : scope
            });

            spyOn(scope.token, 'insert').and.callThrough();
            spyOn(scope.cellphone, 'create').and.callThrough();
            spyOn(scope.cellphone, 'edit').and.callThrough();
            spyOn(scope.cellphone, 'maskCellphoneLabel').and.callThrough();
            spyOn(scope.sms, 'send').and.callThrough();
            spyOn(scope.sms, 'sendAgain').and.callThrough();

        }

    ));

    afterEach(function() {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    //===============================================
    // ______---=====   Test Cases   =======---____
    //===============================================

    //Token
    it('Verifica se o método de validação detecta um Token não informado', function () {

        scope.fields.token.value = '';
        expect( scope.validateToken() ).toBe(false);
        expect( scope.fields.token.css ).toBe('has-error');
        expect( typeof scope.fields.token.message ).toBe('string');

        scope.fields.token.value = null;
        expect( scope.validateToken() ).toBe(false);
        expect( scope.fields.token.css ).toBe('has-error');
        expect( typeof scope.fields.token.message ).toBe('string');

        scope.fields.token.value = undefined;
        expect( scope.validateToken() ).toBe(false);
        expect( scope.fields.token.css ).toBe('has-error');
        expect( typeof scope.fields.token.message ).toBe('string');

    });

    it('Verifica o sucesso do método inserção de token', function () {
        scope.fields.token.value = '1q2w3e';
        scope.token.insert();
        httpBackend.expectPUT(/.*/).respond(201);
        httpBackend.flush();
        expect(scope.$parent.hideThis).toBe('insertSms');
        expect(scope.$parent.showThis).toBe('cellphoneRecovery');
    });


    //Celular
    it('Verifica se o método de validação detecta um Celular não informado', function () {

        scope.fields.cellphone.value = '';
        expect( scope.validateCellPhone() ).toBe(false);
        expect( scope.fields.cellphone.css ).toBe('has-error');
        expect( typeof scope.fields.cellphone.message ).toBe('string');

        scope.fields.cellphone.value = null;
        expect( scope.validateCellPhone() ).toBe(false);
        expect( scope.fields.cellphone.css ).toBe('has-error');
        expect( typeof scope.fields.cellphone.message ).toBe('string');

        scope.fields.cellphone.value = undefined;
        expect( scope.validateCellPhone() ).toBe(false);
        expect( scope.fields.cellphone.css ).toBe('has-error');
        expect( typeof scope.fields.cellphone.message ).toBe('string');

    });

    it('Verifica se o método de validação detecta um Celular inválido', function () {
        scope.fields.cellphone.value = '1111111111';
        expect( scope.validateCellPhone() ).toBe(false);
        expect( scope.fields.cellphone.css ).toBe('has-error');
        expect( typeof scope.fields.cellphone.message ).toBe('string');
    });

    it('Verifica o sucesso do método criação de celular', function () {
        scope.fields.cellphone.value = '16999998888';
        scope.cellphone.create();
        httpBackend.expectPOST(/.*/).respond(201, responseSuccess);
        httpBackend.flush();
        expect(scope.$parent.hideThis).toBe('cellphoneEdit');
        expect(scope.$parent.showThis).toBe('sendSms');

    });

    it('Verifica o erro do método criação de celular', function () {
        scope.fields.cellphone.value = '16999998888';
        scope.cellphone.create();
        httpBackend.expectPOST(/.*/).respond(404, responseError);
        httpBackend.flush();
        expect(notify[0].type).toBe('danger');
        expect(notify[0].title).toBe('Erro!');
        expect(notify[0].message).toBeDefined();
    });

    it('Verifica o sucesso do método edicao de celular', function () {
        scope.fields.cellphone.value = '16999998888';
        scope.cellphone.edit();
        httpBackend.expectPUT(/.*/).respond(201, responseSuccess);
        httpBackend.flush();
        expect(scope.$parent.hideThis).toBe('cellphoneEdit');
        expect(scope.$parent.showThis).toBe('sendSms');
    });

    it('Verifica o erro do método edição de celular', function () {
        scope.fields.cellphone.value = '16999998888';
        scope.cellphone.edit();
        httpBackend.expectPUT(/.*/).respond(404, responseError);
        httpBackend.flush();
        expect(notify[0].type).toBe('danger');
        expect(notify[0].title).toBe('Erro!');
        expect(notify[0].message).toBeDefined();
    });


    it('Testa o método da máscara de telefone celular', function () {
        var cellphoneNumber = '16999998888'
        expect( scope.cellphone.maskCellphoneLabel(cellphoneNumber) ).toBe('(16) 99999-8888');
    });

    // //SMS
    it('Verifica o sucesso do método de envio de sms', function () {
        scope.sms.send();
        httpBackend.expectPOST(/.*/).respond(201);
        httpBackend.flush();
        expect(scope.notifyBelow).toBe(true);
        expect(scope.notifyBelowMessage).toBe('Um token foi enviado por SMS para seu celular.');
        expect(scope.notifyBelowType).toBe('success');
    });

    it('Verifica o sucesso do método de reenvio de sms', function () {
        scope.sms.sendAgain();
        httpBackend.expectPOST(/.*/).respond(201);
        httpBackend.flush();
        expect(scope.notifyBelow).toBe(true);
        expect(scope.notifyBelowMessage).toBe('Um novo token foi enviado por SMS para seu celular.');
        expect(scope.notifyBelowType).toBe('success');
    });

    it('Verifica o erro do método de reenvio de sms', function () {
        scope.sms.sendAgain();
        httpBackend.expectPOST(/.*/).respond(404, responseError);
        httpBackend.flush();
        expect(scope.notifyBelow).toBe(true);
        expect(scope.notifyBelowMessage).toBeDefined();
        expect(scope.notifyBelowType).toBe('warning');
    });

});
