'use strict';
angular.module('uolsacApp')
    .controller('emailCtrl', ['$scope', 'FieldHandler', '$timeout',
        function($scope, FieldHandler, $timeout) {

            FieldHandler.instantiateScope($scope); //> Instancia o Controller em uso no FieldHandler

            $scope.init = function(){
                    
            };

            $scope.email = {

                requestInstructions : function requestInstructions(){

                    this.init = function(){

                        $scope.showStatusSuccess = false;
                        $scope.showStatusLoading = false;
                        $scope.showStatusWaitingConfirmation = false;

                        $scope.$parent.show = 'accessInformationEmailInfo';
                        $scope.$parent.hide = 'accessInformationEmailEdit';

                        $scope.showStatusLoading = true;
                        $scope.edited = true;

                        $timeout(function(){
                            $scope.showStatusLoading = false;
                        }, 3000);

                        $timeout(function(){
                            $scope.showStatusSuccess = true;
                        }, 3500);

                        $timeout(function(){
                            $scope.showStatusSuccess = false;
                        }, 6500);

                        $timeout(function(){
                            $scope.showStatusWaitingConfirmation = true;
                        }, 7000);
                    };

                    this.onSuccess = function(){
                        $scope.showStatusSuccess = true;
                    };

                    this.init();
                }
            };

            $scope.edited = false;

            $scope.showStatusSuccess = false;
            $scope.showStatusLoading = false;
            $scope.showStatusWaitingConfirmation = false;

            $scope.emailLabel = 'emaildeacesso@provedor.com.br';

            $scope.init();
        }

]);