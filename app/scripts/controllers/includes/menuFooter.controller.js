'use strict';
angular.module('uolsacApp')
    .controller('menuFooterCtrl', ['$scope', 'Look', 'Util',
        function($scope, Look, Util) {
            function init() {
                $scope.Look = Look;
                $scope.click = Util.cacheSlayer.click;
                try {
                    $scope.fixtures = $scope.fixtures || {};
                    $scope.fixtures.FooterMenu = UOL.SAC.fixtures.menuFooter;
                } catch (e) {
                    console.info('Impossivel ler o Fixture: ', e);
                }
            }
            init();
        }
    ]);
