'use strict';
angular.module('uolsacApp')
    .controller('registrationDataCtrl', ['$scope', 'Util', 'FieldHandler', 'Notify', 'RegistrationDataLook',
        function($scope, Util, FieldHandler, Notify, RegistrationDataLook) {

            RegistrationDataLook.set();
            FieldHandler.instantiateScope($scope); //> Instancia o Controller em uso no FieldHandler
            $scope.Notify = Notify;
            Notify.removeAllNotifies();
            $scope.Notify = Notify;

            $scope.preloader = false;

            $scope.init = function(){

                 /*
                variável que controla a visibilidade de pessoa física ou jurídica.
                true para mostrar pessoa jurídica e false para mostrar pessoa física.
                */
                $scope.personalType = true;

                $scope.show = '';
                $scope.hide = '';
                
            };

            $scope.clear = function clear(scope){
                FieldHandler.clean(scope);
            };

            $scope.init();
        }
]);