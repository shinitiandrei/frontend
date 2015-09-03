'use strict';
angular.module('uolsacApp').config(
    function($provide) {
        $provide.factory('RegistrationDataLook', ['Look', function(Look) {

            var assets = UOL.SAC.fixtures.RegistrationDataLook;

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