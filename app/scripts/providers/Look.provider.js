'use strict';
angular.module('uolsacApp').config(
    function($provide) {
        $provide.factory('Look', [ 'Util', 'User', '$location', '$rootScope', function(Util, User, $location,$rootScope ) {

            var assets = {


                header : {

                    menu : {
                        isVisible : User.isLoggedIn(),
                        css : {},
                        active : null
                    },

                    userInfo : {
                        isVisible : false,
                        css : {}
                    }

                },



                colorHr : {

                    top : {
                        isVisible : false,
                        css : { 'border-top-color' : Util.getCamaleonProperty('BRAND_COLOR') }
                    },

                    bottom : {
                        isVisible : false,
                        css : { 'border-top-color' : '#EBEBEB' }
                    }

                },



                carouselAd : {
                    isVisible : false,
                    css : {}
                },



                carouselMessage : {
                    isVisible : false,
                    css : {}
                },



                footer : {

                    copyright : {
                        isVisible : false,
                        css : {}
                    },

                    menu : {
                        isVisible : false,
                        css : {}
                    },

                    disclaimer : {
                        isVisible : false,
                        css : {}
                    }

                }


            };


            var _set = function(newLookConfig){

                try{

                    var errorVarToConsole;
                    _showAndResetAll();
                    _resetHrColors();

                    for( var asset in newLookConfig ){

                        errorVarToConsole = asset;

                        for( var assetIn in newLookConfig[asset] ){

                            errorVarToConsole += '.' + assetIn;

                            if( $.isEmptyObject( newLookConfig[asset][assetIn] )){
                                assets[asset][assetIn] = newLookConfig[asset][assetIn];
                            }else{
                                for( var assetInner in newLookConfig[asset][assetIn] ){
                                    errorVarToConsole += '.' + assetInner;
                                    assets[asset][assetIn][assetInner] =  newLookConfig[asset][assetIn][assetInner];
                                }
                            }

                        }
                    }

                    _setAuthenticatedAssets();
                    $rootScope.$broadcast('lookReloaded');

                }catch(e){
                    console.log('Falha ao setar o Fixture: ' + errorVarToConsole );
                }

            };


            var _setAuthenticatedAssets = function(){

                var headerMenuValue = User.isLoggedIn();

                if( $location.path() === '/' ){
                    headerMenuValue = false; // Não exibe o menu nunca na Home, por regra de negocio
                }

                assets.header.menu.isVisible = headerMenuValue;

            };


            var _showAndResetAll = function(){

                for( var asset in assets ){
                    if( assets[asset].hasOwnProperty('isVisible') ){
                        assets[asset].isVisible = true;
                    }else{
                        for( var assetitem in assets[asset] ){
                            assets[asset][assetitem].isVisible = true;
                        }
                    }
                }

                _setAuthenticatedAssets();

            };


            var _resetHrColors = function(){
                assets.colorHr.top.css = { 'border-top-color' : Util.getCamaleonProperty('BRAND_COLOR') };
                assets.colorHr.bottom.css = { 'border-top-color' :'#EBEBEB' };
            };


            var _hideAll = function(){
                for( var asset in assets ){
                    for( var assetitem in assets[asset] ){
                        assets[asset][assetitem].isVisible = false;
                    }
                }
            };


            return {
                header    : assets.header,
                colorHr  : assets.colorHr,
                carouselAd : assets.carouselAd,
                carouselMessage : assets.carouselMessage,
                footer : assets.footer,
                set : _set,
                showAndResetAll : _showAndResetAll,
                hideAll : _hideAll,
                setAuthenticatedAssets : _setAuthenticatedAssets
            };


        }]);
    }
);
