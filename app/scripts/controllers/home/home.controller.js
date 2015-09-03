/*global escape: true */
'use strict';
angular.module('uolsacApp')
    .controller('homeCtrl', ['$scope', 'Notify', '$analytics', 'HomeLook', 'Util',
        function($scope, Notify, $analytics, HomeLook, Util) {

            this.init = function() {
                this.getFixtures();
                this.setReacheableFromViewMethods();
                Notify.removeAllNotifies();
                HomeLook.set();
            };

            this.getFixtures = function(){

                try{
                    $scope.homeMessagesCarousel = UOL.SAC.fixtures.homeMessagesCarousel;
                    $scope.homeAdCarousel = UOL.SAC.fixtures.homeAdCarousel;
                    $scope.HomeThumbs = UOL.SAC.fixtures.homeThumbs;
                    $scope.HomeFaq = UOL.SAC.fixtures.homeFaq;
                    $scope.totalNumberOfMessagesOnDisplay = Notify.getTotalNumberOfMessagesOnDisplay();
                }catch(e){
                    console.info(e);
                }

            };


            this.setReacheableFromViewMethods = function(){

                $scope.HomeThumbs.click = function(scope) {
                    Util.scrollToTop();
                    $analytics.eventTrack('click', { ref: 'home-autoatendimento-' + scope.thumb.title, url: scope.thumb.href });
                    Util.goToUrl( scope.thumb.href );
                };

                $scope.HomeFaq.click = function(scope) {
                    Util.scrollToTop();
                    $analytics.eventTrack('click', { ref: scope.question.analyticsRef, url: scope.question.href });
                    Util.goToUrl( scope.question.href );
                };

                $scope.HomeFaq.openAll = function() {
                    Util.scrollToTop();
                    Util.goToUrl( UOL.SAC.fixtures.homeFaq.allQuestionsIndexUrl );
                };

                $scope.HomeFaq.search = function() {
                    Util.scrollToTop();
                    var query = $scope.query || '';
                    var href = UOL.SAC.fixtures.homeFaq.allQuestionsIndexUrl + '%3Fq%3D' + escape(escape(query) );
                    Util.goToUrl( href );
                };
            };

            this.init();

        }
    ]);
