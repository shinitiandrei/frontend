'use strict';
angular.module('UOLsac.LoaderCurtain', [])
    .provider('loaderCurtain', function() {

        function _hide(jquerySelector){

            jquerySelector = jquerySelector === undefined || jquerySelector === null || jquerySelector === '' ? '#loaderCurtain' : jquerySelector;

            var isOlderThanIE9 = angular.element( 'html').hasClass('lt-ie9');

            if( isOlderThanIE9 ) {
                clearDomForOldBrowsers();
            }else{
                removeCurtain(jquerySelector);
            }

        }

        function removeCurtain(jquerySelector){
            setTimeout( function(){
                angular.element(jquerySelector).animate({
                    opacity: 0.1
                }, 1200, function() {
                    angular.element(jquerySelector).remove();
                });
            }, 2000 );
        }

        function clearDomForOldBrowsers(){
            angular.element('#wrapper, .alert-loader-box, #header').remove();
        }

        this.$get = function () {
            return {
                hide : _hide
            };
        };

    });
