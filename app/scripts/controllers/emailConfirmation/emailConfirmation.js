'use strict';

angular.module('uolsacApp')
    .controller('emailConfirmationCtrl', [ '$scope', '$location', '$routeParams', 'Util', 'Contacts', 'Notify', 'PasswordRecoveryLook',
        function($scope, $location, $routeParams, Util, Contacts, Notify, PasswordRecoveryLook) {


            $scope.init = function(){
                PasswordRecoveryLook.set();
                $scope.Notify = Notify;
                Notify.removeAllNotifies();
                $scope.token.checkIfIsValid();
            };


            $scope.token = {

                checkIfIsValid : function (){

                    var checkTokenData = {
                        'value': $routeParams.token
                    };

                    var uriParameters = {
                        'login'  : $routeParams.login,
                        'method' : 'ALTERNATIVE',
                        'typeParam' : 'confirmation'
                    };

                    Contacts.resource.putConfirmation(uriParameters, checkTokenData, $scope.token.onSuccess, $scope.token.onError);
                },

                onSuccess : function(){

                    Notify.removeAllNotifies();
                    var notify = Notify.setNewNotifyObject();
                    notify.title = 'Sucesso!';
                    notify.message = 'Seu e-mail foi confirmado com sucesso!';
                    notify.type = 'success';
                    Notify.add(notify);

                },

                onError : function(){

                    Notify.removeAllNotifies();
                    var notify = Notify.setNewNotifyObject();
                    notify.title = 'Erro!';
                    notify.message = 'Não foi possível a confirmação do seu e-mail.';
                    notify.type = 'danger';
                    Notify.add(notify);

                }

            };


            $scope.init();

        }
]);