'use strict';
angular.module('uolsacApp').config(
    function($provide) {
        $provide.factory('LoginLook', ['Look', function(Look) {

            try {
                var assets = UOL.SAC.fixtures.LoginLook;
            } catch (e) {
                console.warn( 'Impossivel ler o Fixture: ', e );
            }

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
