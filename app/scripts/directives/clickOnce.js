'use strict';
angular.module('uolsacApp').directive('clickOnce', function($timeout, $rootScope) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {

            var buttonId = element.attr('id');
            var clickOnceValidate = scope[attrs.clickOnceValidate];

            $rootScope.$on('resetButton', function(event, args){
                if( args.id === buttonId ){
                    element.removeAttr('disabled');
                }
            });

            element.bind('click', function() {
                $timeout(function() {
                    if( clickOnceValidate !== undefined ){
                        if( clickOnceValidate() === false ){
                            return null;
                        }
                    }
                    element.attr('disabled', true);
                }, 0);
            });
        }
    };
});
