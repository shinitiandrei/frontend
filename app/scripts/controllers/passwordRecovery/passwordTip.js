'use strict';
angular.module('uolsacApp')
    .controller('passwordRecovery_passwordTipCtrl', ['$location', '$scope', 'FieldHandler', 'Recoveries', 'Util', 'Notify', 'PasswordRecoveryLook',
        function passwordRecoveryPasswordTipCtrl ($location, $scope, FieldHandler, Recoveries, Util, Notify, PasswordRecoveryLook) {

            this.init = function passwordRecoveryPasswordTipInit (){

                if( Recoveries.stepBuilder.checkCurrent('tip') ){

                    PasswordRecoveryLook.set();
                    FieldHandler.instantiateScope($scope);
                    Notify.removeAllNotifies();
                    $scope.Notify = Notify;
                    $scope.passwordTip = Recoveries.data.item.passwordTip || {};

                }else{
                    $location.path('/recuperarsenha');
                }

            };


            $scope.goToLoginForm = function goToLoginForm(){
                $location.path('login').search( { user : Recoveries.getNamloginInUse() } );
            };



            $scope.nextStep = function(){
                Util.autoCompleteCatcher($scope);
                $location.path( Recoveries.stepBuilder.getNext('tip') );
            };

            this.init();

        }
]);
