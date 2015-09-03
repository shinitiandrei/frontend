'use strict';
angular.module('uolsacApp')
    .controller('passwordRecovery_changePasswordCtrl', ['$rootScope', '$scope', '$http', '$location', '$analytics', 'Util', 'User', 'FieldHandler', 'FieldMap', 'PasswordChange', '$routeParams', 'Recoveries', 'Validator', 'Notify', 'PasswordRecoveryLook',
        function($rootScope, $scope, $http, $location, $analytics, Util, User, FieldHandler, FieldMap, PasswordChange, $routeParams, Recoveries, Validator, Notify, PasswordRecoveryLook) {

            var loginParam = User.getLoginByGaudi();
            var tokenParam = $routeParams.token || Recoveries.getToken();
            var changeType = $routeParams.changeType || 'alternativeEmail' ;

            this.init = function(){
                $scope.preloader = true;
                PasswordRecoveryLook.set();
                FieldHandler.instantiateScope($scope);
                Notify.removeAllNotifies();
                $scope.Notify = Notify;
                $scope.checkFlowOrigin();
            };
            http://localhost:8080/api/users;cod=WT1LSqzwCBZA%3D%3D;k=2251;iv=eWbzZTeG%2BKnENj%2FtQE6yfQ%3D%3D
            api/users{var1}{var2}{var3}

            $scope.setRecomendationsMessage = function(){
                var notify = Notify.setNewNotifyObject();
                notify.title = 'Importante!';
                notify.message = 'Recomendamos que não utilize informações óbvias (nome próprio, datas comemorativas, endereços ou números de documentos).<br/>Não informe a sua senha para ninguém, nem mesmo aos funcionários a serviço do UOL.';
                notify.type = 'info';
                Notify.add(notify);
            };


            $scope.checkFlowOrigin = function(){

                if( loginParam ){
                    Recoveries.setNamloginInUse( loginParam );
                }else if( !Recoveries.getNamloginInUse() ) {
                    $location.path('/recuperarsenha');
                    return false;
                }

                $scope.token.checkIfIsValid();

            };


            $scope.passwordNonLogged = {

                change : function(){

                    $scope.userEmail = loginParam;

                    if( !$scope.validate() ) {
                        return null;
                    }

                    var sendPassword = $scope.fields.password;
                    var sendConfirmPassword = $scope.fields.passwordConfirmation;

                    var changePasswordData = {
                            'newPassword': sendPassword.value,
                            'newPasswordConfirmation': sendConfirmPassword.value,
                            'token': tokenParam,
                            'type': changeType
                        };

                    var uriParameters = {
                        'login' :  $scope.userEmail
                    };

                    PasswordChange.resource.patchNonLogged(uriParameters, changePasswordData, this.onSuccess, this.onError);
                },

                onSuccess : function () {

                    if (Util.getCamaleonProperty('RECOVERY_PASSWORD_SUCCESS_URL').indexOf('http') === 0) {
                        setTimeout(function () {
                            document.location.href = Util.getCamaleonProperty('RECOVERY_PASSWORD_SUCCESS_URL');
                        }, 0);
                    } else {
                        $location.path( Util.getCamaleonProperty('RECOVERY_PASSWORD_SUCCESS_URL') );
                    }

					$analytics.eventTrack('click', { ref: 'alterar-senha-sucesso' });
                },

                onError : function () {
                    $rootScope.$broadcast('resetButton', { 'id' : 'submitChangePassword'} );
                }
            };

            $scope.token = {

                checkIfIsValid : function (){

                    var checkTokenData = {
                        'value': tokenParam
                    };

                    var uriParameters = {
                        'login'  : loginParam,
                        'method' : changeType
                    };

                    Recoveries.resource.put(uriParameters, checkTokenData, this.onSuccess, this.onError);
                    User.isLoggedIn()

                },

                onSuccess : function(){
                    $scope.preloader = false;
                    $scope.userEmail = loginParam;
                    $scope.setRecomendationsMessage();
                    Util.setFocusOnField('password');
                },

                onError : function(){
                    $location.path('/recuperarsenha').search({login: loginParam, expiredToken: 'true' });
                }

            };


            $scope.clear = function(scope){
                FieldHandler.clean(scope);
            };


            $scope.validate = function(){
                Util.autoCompleteCatcher($scope);
                return Validator.execute([$scope.fields.password, $scope.fields.passwordConfirmation]);
            };

            this.init();

        }
    ]);
