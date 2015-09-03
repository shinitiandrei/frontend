'use strict';

describe('Testes do Controller: passwordRecovery_confirmedCellphoneCtrl - SAC UOL', function () {

    var passwordRecovery_confirmedCellphoneCtrl,
        scope,
        recoveries,
        location,
        httpMock,
        user;

    beforeEach( module('uolsacApp') );

    beforeEach(

        inject( function ($location, $controller, $rootScope, Recoveries, User, $compile, $httpBackend) {

            scope = $rootScope.$new();
            httpMock = $httpBackend;

            recoveries = Recoveries;
            location = $location;
            user = User;

            // Injeta as Diretivas de sac-input utilizadas no Controller
            var elm = angular.element('<div sac-input mask="\'(99) 99999999?9\'" type="\'text\'" name="\'cellphone\'" field="cellphone" placeholder="\'(__) _________\'" class="col-xs-24 col-sm-10 col-md-5 col-lg-4 no-padding-left" ></div>');

            $compile(elm)(scope);

            // Linka o escopo do Controller com o contexto do Jasmine
            passwordRecovery_confirmedCellphoneCtrl = $controller('passwordRecovery_confirmedCellphoneCtrl', {
                $scope : scope
            });
        }
    ));



    //===============================================
    // ______---=====   Test Cases   =======---____
    //===============================================

    it('Verifica se a validação detecta um telefone vazio', function () {

        scope.fields.cellphone.value = '';
        expect( scope.validate() ).toBe(false);

        expect( scope.fields.cellphone.css ).toBe('has-error');
        expect( typeof scope.fields.cellphone.message ).toBe('string');
    });

    it('celular somente com ddd preenchido', function () {

        scope.fields.cellphone.value = '11';
        expect( scope.validate() ).toBe(false);

        expect( scope.fields.cellphone.css ).toBe('has-error');
        expect( typeof scope.fields.cellphone.message ).toBe('string');

    });

    it('celular nono digito INVALIDO', function () {

        scope.fields.cellphone.value = '1199154587';
        expect( scope.validate() ).toBe(false);

        expect( scope.fields.cellphone.css ).toBe('has-error');
        expect( typeof scope.fields.cellphone.message ).toBe('string');
    });

});
