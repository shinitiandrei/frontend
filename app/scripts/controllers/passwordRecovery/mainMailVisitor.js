'use strict';
angular.module('uolsacApp')
    .controller('passwordRecovery_mainMailVisitorCtrl', [ '$scope', 'Util', 'Recoveries', '$location', 'Notify', 'PasswordRecoveryLook',
        function($scope, Util, Recoveries, $location, Notify, PasswordRecoveryLook) {

            var mainEmail = '';
            $scope.preloader = true;
            $scope.Notify = Notify;

            function setSuccessMessage(){
                Notify.removeAllNotifies();
                $scope.preloader = false;
                var notify = Notify.setNewNotifyObject();
                notify.title = 'Foi enviada uma mensagem para o e-mail: ' + mainEmail;
                notify.message = 'Em instantes você receberá uma mensagem no e-mail informado. Siga os passos contidos na mensagem para recuperar o seu acesso.';
                notify.type = 'success';
                notify.exclusiveContent = true;
                Notify.add(notify);
            }

            function sendEmailToUser(){
                mainEmail = Recoveries.data.item.mainEmail;
                var mainEmailObject = {
                    'mainEmail' : mainEmail
                };
                Recoveries.resource.save({'login' : Recoveries.getNamloginInUse(), 'method' : 'mainEmail' }, mainEmailObject, setSuccessMessage);
            }

            function init(){

                PasswordRecoveryLook.set();

                if( Recoveries.stepBuilder.checkCurrent('mainEmail') ){
                    sendEmailToUser();
                }else{
                    $location.path('/recuperarsenha');
                }

            }

            init();

        }
]);
