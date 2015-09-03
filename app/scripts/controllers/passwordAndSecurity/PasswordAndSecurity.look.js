'use strict';
angular.module('uolsacApp').config(
    function($provide) {
        $provide.factory('PasswordAndSecurityLook', ['Look', function(Look) {

            var assets =  UOL.SAC.fixtures.PasswordAndSecurityLook;

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
