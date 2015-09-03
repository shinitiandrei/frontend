'use strict';

describe('Testes do Controller: loginAttemptSuspectUserCtrl - SAC UOL', function () {

    // Seta as variaveis num escopo Global para ficarem acessíveis no contexto do Jasmine
    var loginAttemptSuspectUserCtrl,
        scope;


    beforeEach( module('uolsacApp') );

    beforeEach(

        inject( function ($controller, $rootScope) { // Inicializa o Controller e injeta no escopo do Jasmine o $escopo do Angular

            scope = $rootScope.$new();

            loginAttemptSuspectUserCtrl = $controller('loginAttemptSuspectUserCtrl', { // Linka o escopo do Controller com o contexto do Jasmine
                $scope : scope
            });

        }

    ));



    //===============================================
    // ______---=====   Test Cases   =======---_____
    //===============================================


  it('Verifica existência do Objeto Notify, que exibe a mensagem de Usuário Suspeito', function () {
      expect( typeof scope.notify ).toBe('object');
  });


  it('Verifica a configuração do title no Objeto Notify', function () {
      expect( typeof scope.notify.title ).toBe('string');
      expect( scope.notify.title ).toBe('Usuário bloqueado por suspeita de fraude ou por bloqueio judicial');
  });


  it('Verifica a configuração do message', function () {
      expect( typeof scope.notify.message ).toBe('string');
  });


  it('Verifica se foi inserido link para a Central de Atendimento', function () {
      expect( scope.notify.message.indexOf( 'href="#/atendimento"') ).toBeGreaterThan(-1);
  });


  it('Verifica a configuração do type', function () {
      expect( typeof scope.notify.type ).toBe('string');
      expect( scope.notify.type ).toBe('block');
  });


  it('Verifica a exibição da mensagem na tela, se o visible é verdadeiro', function () {
      expect( typeof scope.notify.visible ).toBe('boolean');
      expect( scope.notify.visible ).toBeTruthy();
  });

});