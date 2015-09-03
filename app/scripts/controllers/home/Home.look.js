'use strict';
angular.module('uolsacApp').config(
    function($provide) {
        $provide.factory('HomeLook', ['Look', function(Look) {

            var assets = UOL.SAC.fixtures.HomeLook;

            function _set(newLookConfig){
                var newLookConfigToMerge = assets;
                if( newLookConfig ){
                    newLookConfigToMerge = angular.extend( newLookConfigToMerge, newLookConfig );
                }
                Look.set(newLookConfigToMerge);
            }

            return {
                set : _set
            };

        }]);
    }

);
