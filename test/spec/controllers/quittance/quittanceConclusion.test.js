'use strict';

describe('Testes do Controller: quittanceConclusionCtrl - SAC UOL', function () {

    var quittanceConclusionCtrl,
        scope,
        quittance;

    beforeEach( module('uolsacApp') );

    beforeEach(
        inject(
            function ($injector, $controller, $rootScope, Quittance) {
                scope = $rootScope.$new();
                quittance = Quittance;
                quittanceConclusionCtrl = $controller('quittanceConclusionCtrl', { $scope : scope });
            }
        )
    );

    it('Verifica se é recuperado o valor pago na tela de conclusão', function () {
        quittance.setPaymentData('1000.00');
        scope.paymentValue = quittance.getPaymentData();
        expect(scope.paymentValue).toBeDefined();
    });


});
