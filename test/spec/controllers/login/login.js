'use strict';

describe('Testes do Controller: loginCtrl - SAC UOL', function () {

    // Seta as variaveis num escopo Global para ficarem acessíveis no contexto do Jasmine
    var loginCtrl,
        scope,
        fieldHandler;


    beforeEach( module('uolsacApp') );

    beforeEach(

        inject( function ($controller, $rootScope, FieldHandler, $location) { // Inicializa o Controller e injeta no escopo do Jasmine o $escopo do Angular

            scope = $rootScope.$new();
            fieldHandler = FieldHandler;

            $location.path('/login');

            // Linka o escopo do Controller com o contexto do Jasmine
            loginCtrl = $controller('loginCtrl', {
                $scope : scope
            });

        }

    ));



    //===============================================
    // ______---=====   Test Cases   =======---____
    //===============================================


   it('Verifica a declaração dos fields', function () {
       expect( typeof scope.fields.pass ).toBe('object');
       expect( typeof scope.fields.user ).toBe('object');
   });



   it('Verifica se "não" há erros setados para os fields recem inicializados', function () {

       expect( scope.fields.pass.msg ).toBe('');
       expect( scope.fields.pass.css ).toBe('');
       expect( scope.fields.pass.field ).toBe('pass');

       expect( scope.fields.user.msg ).toBe('');
       expect( scope.fields.user.css ).toBe('');
       expect( scope.fields.user.field ).toBe('user');

   });



   it('Verifica se o método de validação detecta um login vazio e impede a submição', function () {
       scope.fields.user.value = '';
       expect( scope.validate() ).toBeFalsy();
   });



   it('Verifica se o método de validação detecta um login preenchido, porém uma senha vazia e impede a submição', function () {
       scope.fields.user.value = 'romulobordezani';
       scope.fields.pass.value = '';
       expect( scope.validate() ).toBeFalsy();
   });



   it('Verifica se o método de validação detecta uma senha preenchida, porém o login vazio e impede a submição', function () {
       scope.fields.user.value = '';
       scope.fields.pass.value = 'uol123';
       expect( scope.validate() ).toBeFalsy();
   });



   it('Verifica se o método de validação permite a submição mediante login e senha fornecidos corretamente', function () {
       scope.fields.user.value = 'romulobordezani';
       scope.fields.pass.value = 'uol123';
       expect( scope.validate() ).toBeTruthy();
   });



});



describe('Testes do Controller: loginCtrl / Authentication Failure - SAC UOL', function () {

   // Seta as variaveis num escopo Global para ficarem acessíveis no contexto do Jasmine
   var loginCtrl,
       scope,
       fieldHandler;


   beforeEach( module('uolsacApp') );

   beforeEach(

       inject( function ($controller, $rootScope, $location) { // Inicializa o Controller e injeta no escopo do Jasmine o $escopo do Angular

           $location.path('/login/verifique_login_senha');

           scope = $rootScope.$new();

           loginCtrl = $controller('loginCtrl', { // Linka o escopo do Controller com o contexto do Jasmine
               $scope : scope
           });

       }



   ));


   it('Verifica a declaração dos fields', function () {
       expect( typeof scope.fields.pass ).toBe('object');
       expect( typeof scope.fields.user ).toBe('object');
   });



   it('Verifica se há erros setados provenientes do acesso', function () {

       expect( scope.fields.pass.msg ).toBe('');
       expect( scope.fields.pass.css ).toBe('has-error');
       expect( scope.fields.pass.field ).toBe('pass');

       expect( scope.fields.user.msg ).toBe('');
       expect( scope.fields.user.css ).toBe('has-error');
       expect( scope.fields.user.field ).toBe('user');

   });


    it('Verifica se há Alertas setados provenientes do acesso', function () {
        expect( scope.notify.title ).toBe('E-mail ou senha incorretos');
        expect( scope.notify.message ).toBe('Verifique se o caps lock está ativado, pois diferenciamos letras maiúsculas e minúsculas. Se você esqueceu a senha, você pode <a href="/#/recuperarsenha">recuperá-la</a>.');
        expect( scope.notify.visible ).toBeTruthy();
        expect( scope.notify.type ).toBe('danger');
    });


   it('Verifica se o método de validação detecta login e senha vazios e impede a submição', function () {
       scope.fields.user.value = '';
       scope.fields.pass.value = '';
       expect( scope.validate() ).toBeFalsy();
   });



   it('Verifica se o método de validação detecta um login preenchido, porém uma senha vazia e impede a submição', function () {
       scope.fields.user.value = 'romulobordezani';
       scope.fields.pass.value = '';
       expect( scope.validate() ).toBeFalsy();
   });



   it('Verifica se o método de validação detecta uma senha preenchida, porém o login vazio e impede a submição', function () {
       scope.fields.user.value = '';
       scope.fields.pass.value = 'uol123';
       expect( scope.validate() ).toBeFalsy();
   });



   it('Verifica se o método de validação permite a submição mediante login e senha fornecidos corretamente', function () {
       scope.fields.user.value = 'romulobordezani';
       scope.fields.pass.value = 'uol123';
       expect( scope.validate() ).toBeTruthy();
   });



});
