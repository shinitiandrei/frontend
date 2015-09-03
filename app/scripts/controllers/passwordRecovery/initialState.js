'use strict';

angular.module('uolsacApp')

    .controller('passwordRecovery_initialStateCtrl', [ '$scope', 'FieldHandler', 'Recoveries', 'Util', 'Validator', 'Turing', '$location', '$http', '$timeout', '$routeParams', 'Notify', 'PasswordRecoveryLook', '$rootScope',
        function($scope, FieldHandler, Recoveries, Util, Validator, Turing, $location, $http, $timeout, $routeParams, Notify, PasswordRecoveryLook, $rootScope) {


            this.init = function() {
                FieldHandler.instantiateScope($scope);
                PasswordRecoveryLook.set();
                $scope.preloader = true;
				$scope.checkCaptchaNecessity();
                $scope.brandName = Util.getCamaleonProperty('BRAND_NAME');
			};

            $scope.initAfterCheckCaptcha = function(){
                $scope.preloader = false;
                PasswordRecoveryLook.set();
                Notify.removeAllNotifies();
                $scope.totalNumberOfMessagesOnDisplay = Notify.getTotalNumberOfMessagesOnDisplay();
                getLoginFromURLandAutoFill();
                setInvalidTokenMessage();
                Util.setFocusOnField('login');
                $scope.cleanUrlParameters();
            };


            $scope.cleanUrlParameters = function(){
                $location.search('token', null);
                $location.search('changeType', null);
            };

			$scope.checkCaptchaNecessity = function(){
				$http.get('https://sac.uol.com.br/api/captcha/check/recoveries')
                    .success(function(){
                        $scope.initAfterCheckCaptcha();

                    })
                    .error(function(){
                        $scope.initAfterCheckCaptcha();
                    });
			};


            /**
             * Prenche o campo com o login enviado por parametro na url
             * @return void
             */
            function getLoginFromURLandAutoFill(){

                var login = $routeParams.login;

                $timeout(function(){
                    if (login){
                        $scope.fields.login.value = login;
                    }
                }, 0);

            }

            function setInvalidTokenMessage(){

                var expiredToken = $routeParams.expiredToken;

                if (expiredToken){
                    var notify = Notify.setNewNotifyObject();
                    notify.title = 'Atenção!';
                    notify.message = 'O atalho para recuperar a sua senha é inválido ou expirou.';
                    notify.type = 'warning';
                    Notify.add(notify);
                }

            }

            $scope.getAvailableRecoveries = function(){

                if( !$scope.validate() ) {
                    return null;
                }

                Recoveries.setNamloginInUse($scope.fields.login.value);
                Recoveries.resource.get({'login' : Recoveries.getNamloginInUse() }, $scope.onSuccess, $scope.onError);

            };

            $scope.onError = function(){
                $rootScope.$broadcast('resetButton', { 'id' : 'submitInitialState'} );
            };

            $scope.onSuccess = function(recovery){
                Recoveries.stepBuilder.setUserSteps(recovery);
                $location.path( Recoveries.stepBuilder.getFirstStep(recovery) );
            };

            $scope.clear = function(scope){
                FieldHandler.clean(scope);
            };

            $scope.validate = function(){
                Util.autoCompleteCatcher($scope);
                $scope.fields.login.value = Util.trim($scope.fields.login.value);
                angular.element('input[name="login"]').val( Util.trim($scope.fields.login.value) );
                return Validator.execute([$scope.fields.login]);
            };

            this.init();

        }
]);
