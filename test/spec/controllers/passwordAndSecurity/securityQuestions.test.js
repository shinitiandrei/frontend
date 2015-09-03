'use-strict'
describe('Testes do Controller: passwordAndSecurity_securityQuestionsCtrl - SAC UOL', function(){

    var passwordAndSecurity_securityQuestionsCtrl,
        scope,
        fieldHandler,
        securityQuestions,
        user,
        httpBackend;

    beforeEach( module('uolsacApp') );

    beforeEach(

          inject( function ($injector, $controller, $rootScope, SecurityQuestions, $http, FieldHandler, $compile, $httpBackend, User) {

                httpBackend = $injector.get('$httpBackend');
                scope = $rootScope.$new();
                fieldHandler = FieldHandler;
                user = User;
                securityQuestions = SecurityQuestions;

                user.data = {"logged":true,"namLogin":"mmessora","idtPerson":145192868,"namPerson":"matheus","status":0};

                var elm1 = angular.element('<div sac-input type="\'text\'" name="\'question\'" field="question" placeholder="\'Digite sua pergunta\'"></div>');
                $compile(elm1)(scope);

                var elm2 = angular.element(' <div sac-input length="\'25\'" ng-keyup="recoveryQuestions.characterCount()" type="\'text\'" name="\'answer\'" field="answer" placeholder="\'Digite sua resposta\'"></div>');
                $compile(elm2)(scope);

                passwordAndSecurity_securityQuestionsCtrl = $controller('passwordAndSecurity_securityQuestionsCtrl', {
                    $scope : scope
                });
          }

    ));


    //===============================================
    // ______---=====   Test Cases   =======---____
    //===============================================

    it('Verifica se a validação detecta uma questão não informada ou selecionada', function () {

        scope.fields.question.value = '';
        expect( scope.validateQuestion() ).toBe(false);
        expect( scope.fields.question.css ).toBe('has-error');
        expect( typeof scope.fields.question.message ).toBe('string');

        scope.fields.question.value = null;
        expect( scope.validateQuestion() ).toBe(false);
        expect( scope.fields.question.css ).toBe('has-error');
        expect( typeof scope.fields.question.message ).toBe('string');

        scope.fields.question.value = undefined;
        expect( scope.validateQuestion() ).toBe(false);
        expect( scope.fields.question.css ).toBe('has-error');
        expect( typeof scope.fields.question.message ).toBe('string');

    });

    it('Verifica se a validação detecta uma resposta não informada', function () {
        scope.fields.question.value = 'Qual é a pergunta?';

        scope.fields.answer.value = '';
        expect( scope.validateQuestion() ).toBe(true);
        expect( scope.validateAnswer() ).toBe(false);
        expect( scope.fields.answer.css ).toBe('has-error');
        expect( typeof scope.fields.answer.message ).toBe('string');

        scope.fields.answer.value = null;
        expect( scope.validateQuestion() ).toBe(true);
        expect( scope.validateAnswer() ).toBe(false);
        expect( scope.fields.answer.css ).toBe('has-error');
        expect( typeof scope.fields.answer.message ).toBe('string');

        scope.fields.answer.value = undefined;
        expect( scope.validateQuestion() ).toBe(true);
        expect( scope.validateAnswer() ).toBe(false);
        expect( scope.fields.answer.css ).toBe('has-error');
        expect( typeof scope.fields.answer.message ).toBe('string');

    });


});
