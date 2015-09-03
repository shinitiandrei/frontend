'use-strict'
describe('Testes do Controller: generateBookletCtrl - SAC UOL', function(){

    var generateBookletCtrl,
        scope,
        location,
        httpBackend,
        notify;

    beforeEach( module('uolsacApp') );

    beforeEach(

        inject(

            function ( $injector, $rootScope, $location, $controller, $compile, $httpBackend, Notify ) {

                    httpBackend = $injector.get('$httpBackend');
                    scope = $rootScope.$new();
                    location = $location;
                    notify = Notify.getAllNotifies();

                    var elm1 = angular.element('<div sac-input type="\'text\'" name="\'bookletEmail\'" field="bookletEmail" placeholder="\'E-mail\'"></div>');
                    $compile(elm1)(scope);

                    generateBookletCtrl = $controller('generateBookletCtrl', { $scope : scope } );

            }

        )
    );


    it('Verifica se o método de validação detecta um e-mail não informado', function () {
        scope.fields.bookletEmail.value = '';
        expect( generateBookletCtrl._validateBooklet() ).toBeFalsy();
        expect( scope.fields.bookletEmail.css ).toBe('has-error');
        expect( typeof scope.fields.bookletEmail.message ).toBe('string');

        scope.fields.bookletEmail.value = null;
        expect( generateBookletCtrl._validateBooklet() ).toBeFalsy();
        expect( scope.fields.bookletEmail.css ).toBe('has-error');
        expect( typeof scope.fields.bookletEmail.message ).toBe('string');

        scope.fields.bookletEmail.value = undefined;
        expect( generateBookletCtrl._validateBooklet() ).toBeFalsy();
        expect( scope.fields.bookletEmail.css ).toBe('has-error');
        expect( typeof scope.fields.bookletEmail.message ).toBe('string');
    });

    it('Verifica se a validação detecta um e-mail inválido sem arroba', function () {
        scope.fields.bookletEmail.value = 'teste.com';
        expect( generateBookletCtrl._validateBooklet() ).toBeFalsy();
        expect( scope.fields.bookletEmail.css ).toBe('has-error');
        expect( typeof scope.fields.bookletEmail.message ).toBe('string');

    });

    it('Verifica se o método de validação detecta um e-mail válido com arroba', function () {
         scope.fields.bookletEmail.value = 'teste@alternativo.com';
         expect( generateBookletCtrl._validateBooklet() ).toBeTruthy();
     });

    it('Verifica o sucesso do método de quitação por boleto bancário', function () {
         scope.fields.bookletEmail.value = 'teste@alternativo.com';
         scope.makePayment();
         httpBackend.expectPOST(/.*/).respond(200);
         httpBackend.flush();
         expect(location.path()).toBe('/cobranca/boleto');
     });

    it('Verifica o erro do método de quitação por boleto bancário', function () {
        scope.fields.bookletEmail.value = 'teste@alternativo.com';
        scope.makePayment();
        httpBackend.expectPOST(/.*/).respond(500);
        httpBackend.flush();
        expect(notify[0].type).toBe('danger');
        expect(notify[0].message).toBeDefined();
    });

    it('Verifica o método que formata o e-mail caso o namLogin seja @UOL', function () {
        scope.fields.bookletEmail.value = 'testeviena';
        var emailFormatted= generateBookletCtrl._formatEmail(scope.fields.bookletEmail.value);
        expect(emailFormatted).toBe('testeviena@uol.com.br');
    });

    it('Verifica o método que formata o e-mail caso o namLogin não seja UOL', function () {
        scope.fields.bookletEmail.value = 'teste@teste.com';
        var emailFormatted= generateBookletCtrl._formatEmail(scope.fields.bookletEmail.value);
        expect(emailFormatted).toBe('teste@teste.com');
    });

});
