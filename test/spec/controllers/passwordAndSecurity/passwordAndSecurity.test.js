'use-strict'

describe('Testes do Controller: passwordAndSecurity_passwordAndSecurityCtrl - SAC UOL', function(){

    // Seta as variaveis num escopo Global para ficarem acessíveis no contexto do Jasmine
    var passwordAndSecurity_passwordAndSecurityCtrl,
        scope,
        fieldHandler,
        recoveries,
        http,
        rootScope,
        location,
        route,
        httpBackend,
        user,
        data,
        idt;


    userMock = {
        "logged": true,
        "namLogin": "johnnytestuol@gmail.com",
        "idtPerson": 131305546,
        "namPerson": "Jonny",
        "status": 0
    };

    dataMock = {
        "items":[
            {
                "method":"EMAIL",
                "type":"MAIN",
                "confirmed":true,
                "status":"ACTIVE",
                "description":"teste@teste.com",
                "external":false
            },
            {
                "method":"EMAIL",
                "type":"ALTERNATIVE",
                "confirmed":false,
                "status":"NOT_CONFIRMED",
                "description":"teste@alternativo.com",
                "external":true
            },
            {
                "id":41824693,
                "method":"PHONE",
                "type":"HOME",
                "confirmed":false,
                "status":"NOT_CONFIRMED",
                "description":"1633665544",
                "external":false
            }
        ]
    };

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

    idt = {
        'logged':true,
        'namLogin':'testeviena',
        'idtPerson':202421164,
        'namPerson':'Teste',
        'status':0
    };


    beforeEach( module('uolsacApp') );

    beforeEach(

          inject( function ($injector, $controller, $rootScope, Recoveries, $http, FieldHandler, $compile, $location, $httpBackend, User) { // Inicializa o Controller e injeta no escopo do Jasmine o $escopo do Angular

            httpBackend = $injector.get('$httpBackend');
            scope = $rootScope.$new();
            fieldHandler = FieldHandler;
            location = $location;
            recoveries = Recoveries;
            user = User;


            // Linka o escopo do Controller com o contexto do Jasmine
            passwordAndSecurity_passwordAndSecurityCtrl = $controller('passwordAndSecurity_passwordAndSecurityCtrl', {
                $scope : scope
            });

            spyOn(scope.contacts, 'getLoggedUserData').and.callThrough();

        }

    ));

    afterEach(function() {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    //===============================================
    // ______---=====   Test Cases   =======---____
    //===============================================


    //Contacts
    // it('Verifica o método que recupera os contatos', function () {

    //     scope.contacts.getLoggedUserData();
    //     httpBackend.expect('GET', /.*/, userMock).respond(200, dataMock);
    //     httpBackend.flush();
    //     expect(scope.idtPerson).toBeDefined();
    // });

});
