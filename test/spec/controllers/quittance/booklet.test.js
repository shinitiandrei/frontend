'use strict';

describe('Testes do Controller: bookletCtrl - SAC UOL', function () {

    // Seta as variaveis num escopo Global para ficarem acessíveis no contexto do Jasmine
    var bookletCtrl,
        scope,
        fieldHandler,
        location,
        httpBackend,
        quittance,
        creditCard,
        user;

    var requestHashMock =  {
        'items':[
            {
                'id':53310812,
                'debit':1200,
                'debitMinValue':10,
                'booklet':'dfee90e2d4f3fcb13c6f3b8148ca0f48a360158414dac1dd',
                'inDebit':true
            }
        ]
    };


    beforeEach( module('uolsacApp') );

    beforeEach(

        inject( function ($injector, $controller, $rootScope, FieldHandler, $compile, $location, $httpBackend, Quittance, CreditCard, $window, User) { // Inicializa o Controller e injeta no escopo do Jasmine o $escopo do Angular

                httpBackend = $injector.get('$httpBackend');
                scope = $rootScope.$new();
                fieldHandler = FieldHandler;
                location = $location;
                quittance = Quittance;
                creditCard = CreditCard;
                user = User;

                // Linka o escopo do Controller com o contexto do Jasmine
                bookletCtrl = $controller('bookletCtrl', {
                    $scope : scope
                });

            }
        ));


    //===============================================
    // ______---=====   Test Cases   =======---____
    //===============================================

    it('Verifica o sucesso do método de recuperação do hash', function () {
        scope.idtAccount = 53310812;
        spyOn(bookletCtrl._hash, 'get');
        bookletCtrl._hash.get();
        httpBackend.expectGET(/.*/).respond(200,requestHashMock);
        httpBackend.flush();
        expect(scope.bookletHash).toBe('dfee90e2d4f3fcb13c6f3b8148ca0f48a360158414dac1dd');
    });

    it('Verifica se a url do boleto é definida', function () {
        scope.bookletHash = '123456';
        bookletCtrl._createBookletLink();
        expect(scope.url).toBeDefined();
        expect(scope.url).toBe('https://sac.uol.com.br/conta/boleto.html?redirect=true&idBooklet=123456');
    });

});
