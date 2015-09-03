'use strict';
angular.module('uolsacApp')
    .controller('loginAttemptLimitExceededCtrl', ['$scope', '$routeParams', 'Notify', 'LoginLook', 'Util',
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
                $scope.notify = { //>  AUTO RUN de mensagens de erro provenientes do Acesso, após limite de Autenticações excedido
                    title : 'Foi excedido o número de tentativas originadas do endereço IP ' + $routeParams.ip +' realizadas pelo e-mail ' + $routeParams.user + '. ', // + ', em ' + $routeParams.time,
                    message : 'Realizamos esse controle para garantir sua segurança. Se os problemas persistirem, fale com a nossa Central de Atendimento por meio dos nossos <a href="#/atendimento" >telefones de contato</a>. <br><br> <a href="#/login" >Tentar novo acesso</a>',
                    type : 'block',
                    visible : true
                };
            };

            this.init();
        }
    ]);
