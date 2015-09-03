'use strict';
describe('Testes do Controller: passwordRecovery_relationshipQuestionsCtrl - SAC UOL', function () {

    var passwordRecovery_relationshipQuestionsCtrl,
        scope,
        fieldHandler,
        location,
        user,
        httpBackend;

    // Mock para erro na recuperação por perguntas de relacionamento
    var alternativeEmailResponseMock = {
                                         "item":{
                                            "questions":{
                                               "relationship":[
                                                  {
                                                     "id":201,
                                                     "order":2,
                                                     "question":"Qual é o meio pagamento que você utiliza?",
                                                     "options":[
                                                        {
                                                           "description":"Cartão de crédito",
                                                           "value":"1"
                                                        },
                                                        {
                                                           "description":"Boleto bancário",
                                                           "value":"2"
                                                        },
                                                        {
                                                           "description":"Débito automático",
                                                           "value":"3"
                                                        }
                                                     ],
                                                     "type":"MULTIPLE"
                                                  },
                                                  {
                                                     "id":203,
                                                     "order":2,
                                                     "question":"Informe o código da sua agência que você utiliza para débito automático?",
                                                     "type":"TEXT"
                                                  },
                                                  {
                                                     "id":109,
                                                     "order":1,
                                                     "question":"Há quanto tempo você possui cadastro conosco?",
                                                     "options":[
                                                        {
                                                           "description":"Menos de 3 meses",
                                                           "value":"1"
                                                        },
                                                        {
                                                           "description":"Entre 3 e 7 meses",
                                                           "value":"2"
                                                        },
                                                        {
                                                           "description":"Mais de 7 meses",
                                                           "value":"3"
                                                        }
                                                     ],
                                                     "type":"MULTIPLE"
                                                  }
                                               ],
                                               "signup":[
                                                  {
                                                     "id":115,
                                                     "order":1,
                                                     "question":"Seu cadastro é pessoa física ou pessoa jurídica?",
                                                     "options":[
                                                        {
                                                           "description":"Pessoa Física (PF)",
                                                           "value":"PF"
                                                        },
                                                        {
                                                           "description":"Pessoa Jurídica (PJ)",
                                                           "value":"PJ"
                                                        }
                                                     ],
                                                     "type":"MULTIPLE"
                                                  },
                                                  {
                                                     "id":112,
                                                     "order":1,
                                                     "question":"Qual é o número do seu CPF ou CNPJ?",
                                                     "type":"DOCUMENT_NUMBER"
                                                  },
                                                  {
                                                     "id":116,
                                                     "order":1,
                                                     "question":"Informe um telefone que você possua cadastrado.",
                                                     "type":"PHONE"
                                                  }
                                               ],
                                               "security":[
                                                  {
                                                     "id":305,
                                                     "order":3,
                                                     "question":"Qual a idade da vovó",
                                                     "type":"TEXT"
                                                  },
                                                  {
                                                     "id":302,
                                                     "order":3,
                                                     "question":"Qual o número do Renavam do seu veículo?",
                                                     "type":"TEXT"
                                                  },
                                                  {
                                                     "id":301,
                                                     "order":3,
                                                     "question":"Qual a marca do seu carro preferido?",
                                                     "type":"TEXT"
                                                  },
                                                  {
                                                     "id":303,
                                                     "order":3,
                                                     "question":"Qual o nome do seu bicho de estimação?",
                                                     "type":"TEXT"
                                                  },
                                                  {
                                                     "id":304,
                                                     "order":3,
                                                     "question":"Qual o nome do seu primeiro chefe?",
                                                     "type":"TEXT"
                                                  }
                                               ]
                                            }
                                         }
                                      };


    beforeEach( module('uolsacApp') );

    beforeEach(
        inject(
            function ($injector, $controller, $rootScope, FieldHandler, $compile, $location, $httpBackend, User) {

                scope = $rootScope.$new();
                fieldHandler = FieldHandler;
                location = $location;
                user = User;
                httpBackend = $injector.get('$httpBackend');

                passwordRecovery_relationshipQuestionsCtrl = $controller('passwordRecovery_relationshipQuestionsCtrl', { $scope : scope });

                spyOn(scope, 'onRightAnswered').and.callThrough();
                spyOn(scope, 'getAvailableQuestions').and.callThrough();
                spyOn(scope, 'checkAnswers').and.callThrough();

            }
        )
    );

    afterEach(function() {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

});
