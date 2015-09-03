'use strict';
angular.module('uolsacApp')
    .controller('passwordRecovery_sendEmailCtrl', ['$scope', '$http', '$location', 'FieldHandler', 'Util', 'Notify', 'Validator', 'FieldMap', 'User', 'Recoveries', 'PasswordRecoveryLook', '$rootScope',
        function($scope, $http, $location, FieldHandler, Util, Notify, Validator, FieldMap, User, Recoveries, PasswordRecoveryLook, $rootScope) {

            $scope.init = function(){

                $scope.Notify = Notify;
                PasswordRecoveryLook.set();
                Notify.removeAllNotifies();
                $scope.preloader = false;
                $scope.Notify = Notify;
                Util.setFocusOnField('alternativeEmail');


                if( (!Recoveries.stepBuilder.checkCurrent('alternativeEmail'))){
                    $location.path('/recuperarsenha');
                } else {
                    $scope.maskedAlternativeEmail = Recoveries.data.item.alternativeEmail || {}; //> Recupera o E-mail alernativo "mascarado" de acordo com o login informado no estado inicial
                }

                FieldHandler.instantiateScope($scope); //> Instancia o Controller em uso no FieldHandler

                $scope.setSuccessMessage = function(){
                    var notify = Notify.setNewNotifyObject();
                    notify.title = 'Foi enviada uma mensagem para seu e-mail alternativo ' + $scope.maskedAlternativeEmail;
                    notify.message = 'Em instantes você receberá uma mensagem no e-mail informado. Siga os passos contidos na mensagem para recuperar o seu acesso.';
                    notify.type = 'success';
                    notify.exclusiveContent = true;
                    Notify.add(notify);

                };

                this.alternativeEmail = {

                    /**
                     * Verifica se o e-mail é valido e caso seja, envia o e-mail para recuperação de senha para o usuário
                     * @return void
                     */
                    send : function(){

                        if(!$scope.validate()) {
                            return null;
                        }

                        var inputAlternativeEmail = $scope.fields.alternativeEmail;
                        var alternativeEmailData = {
                                'alternativeEmail': inputAlternativeEmail.value
                            };

                        var uriParameters = {
                            'login'  : Recoveries.getNamloginInUse(),
                            'method' : 'alternativeEmail'
                        };

                        $scope.preloader = true;

                        Recoveries.resource.save(uriParameters, alternativeEmailData, this.onSuccess, this.onError);
                    },

                    onSuccess : function (){
                        $scope.preloader = false;
                        $scope.fields.alternativeEmail.value = '';
                        $scope.setSuccessMessage();
                    },

					onError : function (){
                        $rootScope.$broadcast('resetButton', { 'id' : 'submitSendEmail'} );
                        $scope.preloader = false;
					}
                };


                this.nextStep = function(){
                    $location.path( Recoveries.stepBuilder.getNext('alternativeEmail') );
                };


                this.clear = function(scope){
                    FieldHandler.clean(scope);
                };


                this.validate = function(){
                    Util.autoCompleteCatcher($scope);
                    return Validator.execute([$scope.fields.alternativeEmail]);
                };

                return this;

            };

            $scope.init();

        }
]);
