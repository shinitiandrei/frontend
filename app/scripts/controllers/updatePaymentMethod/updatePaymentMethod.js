'use strict';

angular.module('uolsacApp')
 .controller('updatePaymentMethodCtrl', ['$scope', 'UpdatePaymentMethodLook', 'FieldHandler', 'Notify',
        function updatePaymentMethodCtrl($scope, UpdatePaymentMethodLook, FieldHandler, Notify) {

            UpdatePaymentMethodLook.set();
            FieldHandler.instantiateScope($scope);
            Notify.removeAllNotifies();
            $scope.Notify = Notify;

            $scope.choosePaymentMethod = function(){
                $scope.showMethod = $scope.paymentMethod;
            };

            $scope.clear = function clear(scope){
                FieldHandler.clean(scope);
            };

        }
]);
