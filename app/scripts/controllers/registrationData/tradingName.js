'use strict';
angular.module('uolsacApp')
    .controller('tradingNameCtrl', ['$scope', 'FieldHandler', '$timeout', 'Validator',
        function($scope, FieldHandler, $timeout, Validator) {

            FieldHandler.instantiateScope($scope);

            $scope.init = function(){

                //Mocks
                $scope.tradingNameChangeMethod = 'create';
                $scope.tradingNameLabel = 'UOL';

            };

            $scope.tradingName = {
                change: function change(){
                    
                    this.init = function(){

                        FieldHandler.instantiateScope($scope);

                        if($scope.tradingNameChangeMethod === 'create'){
                            $scope.tradingName.create();
                        } else {
                            $scope.tradingName.edit();
                        }
                    };

                    this.init();
                },

                create: function insert(){

                    this.init = function(){

                        if (!$scope.validateTradingName()){
                            return null;
                        }

                        $scope.tradingNameLabel = $scope.fields.tradingName.value;
                        $scope.registered = true;
                        $scope.tradingNameChangeMethod = 'edit';

                        $scope.$parent.show = 'juridicalInformationNameInfo';
                        $scope.$parent.hide = 'juridicalInformationNameRegister';

                        $scope.showStatusCreate = true;

                        $timeout(function(){
                            $scope.showStatusCreate = false;
                        }, 3000);
                    };

                    this.init();
                },

                edit: function edit(){

                    this.init = function(){

                        if (!$scope.validateTradingName()){
                            return null;
                        }

                        $scope.tradingNameLabel = $scope.fields.tradingName.value;
                        $scope.registered = true;

                        $scope.$parent.show = 'juridicalInformationNameInfo';
                        $scope.$parent.hide = 'juridicalInformationNameRegister';

                        $scope.showStatusEdit = true;

                        $timeout(function(){
                            $scope.showStatusEdit = false;
                        }, 3000);
                    };

                    this.init();
                }
            };

            $scope.validateTradingName = function validateTradingName(){
                return Validator.execute([$scope.fields.tradingName]);
            };

            $scope.init();
        }
]);