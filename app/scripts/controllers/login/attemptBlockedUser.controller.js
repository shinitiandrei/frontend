'use strict';
angular.module('uolsacApp')
    .controller('loginAttemptBlockedUserCtrl', ['$scope', 'Util', 'FieldHandler', '$routeParams', 'Notify', 'LoginLook',
        function($scope, Util, FieldHandler, $routeParams, Notify, LoginLook) {

            this.init = function(){
                Notify.removeAllNotifies();
                LoginLook.set();
                this.setMessage();
                this.hideFields();
                $scope.sacProductNameOnLoginScreen = Util.getCamaleonProperty('BRAND_NAME')  + ' SAC';
                $scope.productNameOnLoginScreen = Util.getCamaleonProperty('BRAND_NAME');
            };

            this.hideFields = function(){
                $scope.hideFileds = true;
            };

            this.setMessage = function(){
                $scope.notify = { //>  AUTO RUN de mensagens de erro provenientes do Acesso, após Login ou Senha errados na Autenticação
                    title : 'O acesso deste e-mail foi desativado',
                    message : 'O e-mail <strong>' + $routeParams.user + ' </strong> foi desativado pois está há muito tempo sem uso. Se tiver dúvidas, fale com a nossa Central de Atendimento por meio dos nossos <a href="#/atendimento" >telefones de contato</a>.',
                    type : 'block',
                    visible : true
                };
            };

            this.init();

        }
    ]);
