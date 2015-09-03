'use strict';
angular.module('uolsacApp')
    .controller('passwordRecovery_successfullChangedPasswordCtrl', [ '$rootScope', '$scope', 'Util', 'Recoveries', '$location', 'User', 'Notify', 'PasswordRecoveryLook',
        function($rootScope, $scope, Util, Recoveries, $location, User, Notify, PasswordRecoveryLook) {

            function init(){
                Notify.removeAllNotifies();
                setSuccessMessage();
                $rootScope.$broadcast('userReloaded');
                PasswordRecoveryLook.set();
            }

            function setSuccessMessage(){
                $scope.preloader = false;
                var notify = Notify.setNewNotifyObject();
                notify.title = 'Você alterou a sua senha.';
                notify.message = 'Lembre-se de que quando você altera sua senha, ela é alterada para todos os produtos que você usa. Portanto, use sua nova senha na próxima vez que fizer acesso neles.';
                notify.type = 'success';
                Notify.add(notify);
            }

            $scope.goBackToHome = function () {
                if( Util.getCamaleonProperty('HOME_URL').indexOf('http') === 0 ){
                    setTimeout(function (){
                        document.location.href = Util.getCamaleonProperty('HOME_URL');
                        $rootScope.$broadcast('userReloaded');
                    }, 0);
                }else{
                    $location.path( Util.getCamaleonProperty('HOME_URL') );
                    $rootScope.$broadcast('userReloaded');
                }
            };

            init();

        }
]);
