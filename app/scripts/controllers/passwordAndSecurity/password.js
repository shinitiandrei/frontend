'use strict';
angular.module('uolsacApp')
    .controller('passwordAndSecurity_passwordCtrl', ['$scope', '$http', '$location', '$analytics', 'FieldHandler','FieldMap', 'Util', 'Notify', 'Validator', 'User', 'PasswordChange', '$rootScope',
        function passwordAndSecurityPasswordCtrl($scope, $http, $location, $analytics, FieldHandler, FieldMap, Util, Notify, Validator, User, PasswordChange, $rootScope) {

            FieldHandler.instantiateScope($scope);
            $scope.userEmail = User.getCachedData().namLogin;

            $scope.passwordLogged = {

                change : function change(){

                    this.init = function () {

                        FieldHandler.instantiateScope($scope);
                        $scope.userEmail = User.getCachedData().namLogin;

                        if ( !$scope.validateCurrentPassword() ) {
                            return null;
                        } else if ( !$scope.validatePasswordAndPasswordConfirmation() ) {
                            return null;
                        }

                        var sendCurrentPassword = $scope.fields.passwordCurrent;
                        var sendNewPassword = $scope.fields.password;
                        var sendConfirmPassword = $scope.fields.passwordConfirmation;

                        var changePasswordData = {
                            'passwordCurrent' : sendCurrentPassword.value,
                            'newPassword': sendNewPassword.value,
                            'newPasswordConfirmation': sendConfirmPassword.value
                        };

                        PasswordChange.resource.patchLogged(changePasswordData, this.onSuccess, this.onError);

                    };

                    this.onSuccess = function () {

						Notify.removeAllNotifies();
						var notify = Notify.setNewNotifyObject();
                        notify.title = 'Sucesso!';
                        notify.message = 'Senha alterada com sucesso.';
                        notify.type = 'success';
                        Notify.add(notify);

                        FieldHandler.cleanValues($scope);
                        $analytics.eventTrack('click', { ref: 'alterar-senha-sucesso', url: 'https://sac.uol.com.br/#/senhaeseguranca' });

                    };

                    this.onError = function () {
                    };

                    this.init();

                }
            };

            $scope.validateCurrentPassword = function validateCurrentPassword () {
                $scope.userEmail = User.getCachedData().namLogin;
                return Validator.execute([$scope.fields.passwordCurrent]);
            };

            $scope.validatePasswordAndPasswordConfirmation = function validatePasswordAndPasswordConfirmation () {
                $scope.userEmail = User.getCachedData().namLogin;
				return Validator.execute([$scope.fields.password, $scope.fields.passwordConfirmation]);
            };

			$scope.clear = function (scope){
                FieldHandler.clean(scope);
                Notify.removeAllNotifies();
            };

            function reloadUserData(){
                $scope.userEmail = User.getCachedData().namLogin;
            }

            $rootScope.$on('userReloaded', reloadUserData);

        }
]);
