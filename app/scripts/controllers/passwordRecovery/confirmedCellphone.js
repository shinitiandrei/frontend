'use strict';
angular.module('uolsacApp')
    .controller('passwordRecovery_confirmedCellphoneCtrl', ['$location', '$scope', 'FieldHandler', 'Recoveries', 'Util', 'User', 'Validator', 'Notify', 'PasswordRecoveryLook', '$rootScope',
        function( $location, $scope, FieldHandler, Recoveries, Util, User, Validator, Notify, PasswordRecoveryLook, $rootScope) {

            this.init = function(){

                PasswordRecoveryLook.set();
                Notify.removeAllNotifies();
                $scope.Notify = Notify;

                if( !Recoveries.stepBuilder.checkCurrent('cellphone') ){
                    $location.path('/recuperarsenha');
                }

                $scope.cellphoneMasked = Recoveries.data.item.cellphone || {};
                FieldHandler.instantiateScope($scope);
                Util.setFocusOnField('cellphone');

            };

            $scope.saveRecovery = function(){

                if( !$scope.validate() ) {
                    return null;
                }

                var cellphoneData = {
                    'cellphone' : $scope.fields.cellphone.value
                };

                var uriParameters = {
                    'login'  : Recoveries.getNamloginInUse(),
                    'method' : 'cellphone'
                };

                Recoveries.resource.save(uriParameters, cellphoneData, $scope.onSuccess, $scope.onError);

            };

            $scope.onError = function(){
                $rootScope.$broadcast('resetButton', { 'id' : 'submitConfirmedCellphone'} );
            };


            $scope.onSuccess = function (recovery){
                Recoveries.stepBuilder.setUserSteps(recovery);
                $location.path('/recuperarsenha/verificarsms');
            };


            $scope.validate = function(){
                return Validator.execute([$scope.fields.cellphone]);
            };


            $scope.nextStep = function(){
                $location.path( Recoveries.stepBuilder.getNext('cellphone') );
            };


            $scope.clear = function(scope){
                FieldHandler.clean(scope);
            };

            this.init();

        }
]);
