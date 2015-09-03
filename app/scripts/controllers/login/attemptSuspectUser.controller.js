'use strict';
angular.module('uolsacApp')
    .controller('loginAttemptSuspectUserCtrl', ['$scope', '$routeParams', 'Notify', 'LoginLook', 'Util',
        function($scope, $routeParams, Notify, LoginLook, Util) {

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
                $scope.notify = {
                    title : 'Usuário bloqueado por suspeita de fraude ou por bloqueio judicial',
                    message : 'O e-mail <strong> ' + $routeParams.user + ' </strong> está bloqueado por violação das <a href="http://regras.uol.com.br/" >Regras de Uso</a>. Para entender o motivo, fale com a nossa Central de Atendimento por meio dos nossos <a href="#/atendimento" >telefones de contato</a>.',
                    type : 'block',
                    visible : true
                };
            };

            this.init();
        }
    ]);
