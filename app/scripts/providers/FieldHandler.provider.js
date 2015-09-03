'use strict';
angular.module('uolsacApp').config(
    function($provide) {
        $provide.factory('FieldHandler', ['$analytics', 'Util', function($analytics, Util) {

            var errors = {};
            var scope = {};
            var fieldToFocus = {};

            function Message(field, msg, css){
                this.field = field;
                this.msg = msg;
                this.css = css;
            }


            function _instantiateScope($scope){
                scope = $scope;
            }


            function _add(response, config) {

                config = Util.isEmpty(config) ? {} : config;

                if ( Util.isEmpty(response.data) ) { // Verifica se é uma solicitação interna da aplicação, não um objeto do tipo http response, proveniente de uma requisição ao Back-end

                    errors[response.field] = response;

                    if( scope.fields[response.field] ){
                        fieldToFocus = response.field;
                    }

                } else {

                    for (var z = 0; z < response.data.errors.messages.length; z++) {

                        var item = response.data.errors.messages[z];

						if (item && item.field) {

							errors[item.field] = new Message(item.field, item.message, 'has-error');

							if (scope.fields[item.field]) {
								fieldToFocus = item.field;
							}

							$analytics.eventTrack('error', { field: item.field, message: item.message });
						}
                    }
                }

                if( config.focus && fieldToFocus && scope.fields && scope.fields[fieldToFocus] ){ // Trata a config responsável por setar o Focus no campo ou não ( Boolean ).
                    _setFocus( scope.fields[fieldToFocus] );
                }

                _applyOnScope(); // Liga a lista de erros a lista do escopo do controller

            }

            function _getErrors(){
                return errors;
            }

            function _applyOnScope(){
                for(var i in errors){
                    var erro = errors[i];
                    var field = scope.fields[erro.field];
                    if( !Util.isEmpty(field) ) {
                        field.message = erro.msg;
                        field.css = erro.css;
                        field.erro = true;
                    }
                }
            }

            function _setFocus(scope){
                setTimeout(function (){
                    angular.element( 'input[name="' + scope.name + '"]' ).focus();
                }, 500);
            }


            function _clean($scope){

                var field = {};

                if( $scope.fieldId ){
                    field = $scope;
                    field.message = null;
                    field.css = null;
                    field.erro = null;
                }else{
                    for( var i in errors ){

                        var erro = errors[i];
                        field = $scope.fields[erro.field];
                        field.message = null;
                        field.css = null;
                        field.erro = null;
                    }
                }

                errors = {};
            }


            function _cleanValues($scope){

                var field = {};

                if( $scope.fieldId ){
                    field = $scope;
                    field.value = '';
                }else{
                    for( var i in $scope.fields ){
                        field = $scope.fields[i];
                        field.value = null;
                    }
                }

            }


            return {
                getErrors: _getErrors,
                add : _add,
                applyOnScope : _applyOnScope,
                clean : _clean,
                cleanValues : _cleanValues,
                instantiateScope : _instantiateScope,
                createMessage : Message,
                setFocus : _setFocus
            };


        }]);
    }

);
