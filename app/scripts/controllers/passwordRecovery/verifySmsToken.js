'use strict';
angular.module('uolsacApp')
    .controller('passwordRecovery_verifySmsTokenCtrl', ['$scope', '$location', '$analytics', 'Util', 'FieldHandler', 'Validator', 'Recoveries', 'Notify', 'PasswordRecoveryLook', '$rootScope',
        function($scope, $location, $analytics, Util, FieldHandler, Validator, Recoveries, Notify, PasswordRecoveryLook, $rootScope) {

            $scope.init = function(){

                if(!Recoveries.stepBuilder.checkCurrent('cellphoneToken')){
                    $location.path('/recuperarsenha');
                }

                PasswordRecoveryLook.set();
                Notify.removeAllNotifies();
                FieldHandler.instantiateScope($scope);
                Notify.removeAllNotifies();
                $scope.Notify = Notify;
                Util.setFocusOnField('token');

                this.sms = {

                    /**
                     * Verifica se o token é válido e caso seja, direciona para tela de alteração de senha.
                     * @return void
                     */
                    checkAndSubmitToken : function() {

                        if(!$scope.validate()) {
                            return null;
                        }

                        var inputTokenSms = $scope.fields.token.value;

                        var tokenSmsData = {
                                'value': inputTokenSms
                            };

                        var uriParameters = {
                            'login'  :  Recoveries.getNamloginInUse(),
                            'method' : 'cellphone'
                        };

                        Recoveries.resource.put(uriParameters, tokenSmsData, this.onSuccess, this.onError);
                    },


                    onSuccess : function (){
                        Recoveries.setToken($scope.fields.token.value); //> Salva o o valor inputado para ser utilizado por outro controller
                        $location.path('/recuperarsenha/alterarsenha').search({ token: $scope.fields.token.value, changeType: 'cellphone' });
                    },

                    onError : function(){
                        $rootScope.$broadcast('resetButton', { 'id' : 'submitVerifySmsToken'} );
                    },


                    /**
                     * Método para reenvio do Token
                     * @return void
                     */
                    sendTokenAgain : function(){

                        var uriParameters = {
                            'login'  : Recoveries.getNamloginInUse(),
                            'method' : 'cellphone',
                            'type'   : 'novalidation'
                        };

                        Recoveries.resource.save(uriParameters, this.onSendTokenSuccess, this.onSendTokenError);

                    },

                    onSendTokenSuccess : function (){

                        Notify.removeAllNotifies();
                        var notify = Notify.setNewNotifyObject();
                        notify.title = 'Sucesso!';
                        notify.message = 'Enviamos um novo código de recuperação para o seu celular.';
                        notify.type = 'success';
                        Notify.add(notify);

                        $scope.fields.token.value = '';
                        $scope.clear($scope.fields.token);

						$analytics.eventTrack('click', { ref: 'verificar-sms-sucesso' });

                    },

                    onSendTokenError : function ( recovery ){

						Notify.removeAllNotifies();
                        var notify = Notify.setNewNotifyObject();
                        notify.title = 'Código de recuperação enviado';
                        notify.message =  recovery.data.errors.messages[0].message;
                        notify.type = 'warning';
                        Notify.add(notify);

                    }
                };


                this.clear = function(scope){
                    Notify.removeAllNotifies();
                    FieldHandler.clean(scope);
                };

                this.validate = function(){
                    Util.autoCompleteCatcher($scope);
                    return Validator.execute([$scope.fields.token]);
                };

                return this;

            };

            $scope.init();

        }
]);
