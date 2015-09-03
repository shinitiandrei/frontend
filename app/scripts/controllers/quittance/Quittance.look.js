'use strict';
angular.module('uolsacApp').config(
    function($provide) {
        $provide.factory('QuittanceLook', ['Look', function(Look) {

            var assets = UOL.SAC.fixtures.QuittanceLook;

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