'use strict';

describe('Testes do Controller: wrapperCtrl - SAC UOL', function () {

    // Seta as variaveis num escopo Global para ficarem acessíveis no contexto do Jasmine
    var ctrl,
        scope,
		routeParams,
		location;

    beforeEach( module('uolsacApp') );

    beforeEach(

        inject( function ($controller, $rootScope, $routeParams, $location) {

            scope = $rootScope.$new();
			routeParams = $routeParams;
			location = $location;

            // Linka o escopo do Controller com o contexto do Jasmine
            ctrl = $controller('wrapper_wrapperCtrl', {
                $scope : scope
            });
        }

    ));

    //===============================================
    // ______---=====   Test Cases   =======---____
    //===============================================

    it('Verifica a criação do iframe.', function () {

		routeParams.url = 'https:%2F%2Fsac.uol.com.br%2Finfo%2Fajuda%2Ffaq%2Findex.jhtm';
		scope.init();

    });

});
