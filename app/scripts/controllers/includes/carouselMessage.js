'use strict';
angular.module('uolsacApp')
    .controller('carouselMessageCtrl', ['$scope', 'Look',
        function ($scope, Look) {

            this.init = function () {
                this.getFixtures();
                this.getProviderData();
            };

            this.getFixtures = function(){
                try{
                    $scope.MessagesCarousel = UOL.SAC.fixtures.homeMessagesCarousel;
                }catch(e){

                }
            };

            this.getProviderData = function(){
                $scope.Look = Look;
            };

            this.init();
        }
    ]);
