'use strict';
describe('Testes do Controller: quittanceCtrl - SAC UOL', function () {

    var quittanceCtrl,
        scope,
        httpBackend,
        quittance,
        util,
        accounts;

    var getQuittanceOptionsMock = {
        'items':[
            {
                'description':'Mastercard',
                'idPaymentMethod':4,
                'installments':6,
                'minValue':10.0
            },
            {
                'description':'Diners',
                'idPaymentMethod':3,
                'installments':6,
                'minValue':10.0
            },
            {
                'description':'Visa',
                'idPaymentMethod':6,
                'installments':6,
                'minValue':10.0
            },
            {
                'description':'Boleto',
                'idPaymentMethod':33,
                'installments':1,
                'minValue':10.0
            },
            {
                'description':'American',
                'idPaymentMethod':52,
                'installments':6,
                'minValue':10.0
            },
            {
                'description':'Express',
                'idPaymentMethod':1,
                'installments':6,
                'minValue':10.0
            },
            {
                'description':'Hipercard',
                'idPaymentMethod':37,
                'installments':6,
                'minValue':10.0
            }
        ]
    };

    var accountsMock = {
        'items':
            [
                {
                    'id':53310812,
                    'debit':2089.5,
                    "debitMinValue":0.0,
                    'inDebit':true
                },
                {
                    'id':53803013,
                    'debit':0.0,
                    'debitMinValue':0.0,
                    'inDebit':false
                }
            ]
    };

    beforeEach( module('uolsacApp') );

    beforeEach(

        inject(

            function ($injector, $controller, $rootScope, $compile, $httpBackend, Quittance, Util, Accounts) { // Inicializa o Controller e injeta no escopo do Jasmine o $escopo do Angular

                httpBackend = $injector.get('$httpBackend');
                scope = $rootScope.$new();
                quittance = Quittance;
                util = Util;
                accounts = Accounts;

                quittanceCtrl = $controller('quittanceCtrl', {
                    $scope : scope
                });

            }

        )
    );


    it('Verifica se o método de busca do valor de quitação carrega o cache da contas do usuário', function () {
        accounts.setCachedData(accountsMock);
        scope.idtAccount = 53310812;
        spyOn(quittanceCtrl._quittance, 'getDebts');
        quittanceCtrl._quittance.getDebts();
        httpBackend.expectGET(/.*/).respond(200,accountsMock);
        httpBackend.flush();
        expect(accounts.getCachedData()).toBeDefined();
    });

    it('Verifica se o método que carrega as opções de pagamento é realizado com sucesso', function () {
        spyOn(quittanceCtrl._quittance, 'loadPaymentMethods');
        httpBackend.expectGET(/.*/).respond(200,getQuittanceOptionsMock);
        httpBackend.flush();
        expect(quittance.getQuittanceOptions()).toBeDefined();
    });

    it('Verifica se o valor recebido pelo backend é formatado com sucesso', function () {
        var value = '23.00'
        var formatted = util.formatCurrency(value);
        expect(formatted).toBe('23,00');
    });

});
