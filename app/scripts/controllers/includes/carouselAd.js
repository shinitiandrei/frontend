'use strict';
angular.module('uolsacApp')
    .controller('carouselAdCtrl', ['$scope', 'Look',
        function ($scope, Look) {

            this.init = function () {
                this.getFixtures();
                this.getProviderData();
            };

            this.getFixtures = function(){
                try{
                    $scope.AdCarousel = UOL.SAC.fixtures.homeAdCarousel;
                }catch(e){

                }
            };

            this.getProviderData = function(){
                $scope.Look = Look;
            };

            this.init();
        }

    ]);
