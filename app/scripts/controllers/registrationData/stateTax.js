'use strict';
angular.module('uolsacApp')
    .controller('stateTaxCtrl', ['$scope', 'Util', 'FieldHandler', '$timeout', 'Validator',
        function($scope, Util, FieldHandler, $timeout, Validator) {

            FieldHandler.instantiateScope($scope); //> Instancia o Controller em uso no FieldHandler

            $scope.init = function(){
                
                //Mocks
                var estados = [
                    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
                ];

                $scope.estados = estados;
                $scope.stateTaxLabel = '110.042.490.114';
                $scope.stateTaxInputDisabled = true;


            };

            $scope.stateTax = {

                create: function create(){

                    this.init = function(){

                        FieldHandler.instantiateScope($scope);

                        if(!$scope.validateStateTax()){
                            return null;
                        }
                        
                        $scope.$parent.show = 'juridicalInformationStateTaxInfo';
                        $scope.$parent.hide = 'juridicalInformationStateTaxRegister';

                        $scope.showStatus = true;

                        /*variável que controla se o campo já está cadastrado ou não*/
                        $scope.registered = true;

                        $timeout(function(){
                            $scope.showStatus = false;
                        }, 3000);
                    };

                    this.init();
                },

                selectMask: function selectMask(){

                    this.init = function(){

                        $scope.stateTaxInputDisabled = false;

                        if($scope.estado === 'AC'){

                            $scope.stateTaxMask = '?9?9.?9?9?9.?9?9?9/?9?9?9-?9?9';
                            $scope.stateTaxMaskPlaceHolder = '__.___.___/___-__';
                            

                        } else if($scope.estado === 'AL' || $scope.estado === 'AP' || $scope.estado === 'AM' || $scope.estado === 'CE' || $scope.estado === 'ES' || $scope.estado === 'GO' || $scope.estado === 'MA' || $scope.estado === 'PA' || $scope.estado === 'PB' || $scope.estado === 'PI' || $scope.estado === 'RN' || $scope.estado === 'SE'){

                            $scope.stateTaxMask = '?9?9.?9?9?9.?9?9?9-?9';
                            $scope.stateTaxMaskPlaceHolder = '__.___.___-_';

                        } else if($scope.estado === 'BA'){

                            $scope.stateTaxMask = '?9?9?9?9?9?9?9?9';
                            $scope.stateTaxMaskPlaceHolder = '________';

                        } else if($scope.estado === 'DF'){

                            $scope.stateTaxMask = '?9?9?9?9?9?9?9?9?9?9?9?9';
                            $scope.stateTaxMaskPlaceHolder = '____________';

                        } else if($scope.estado === 'MT'){

                            $scope.stateTaxMask = '?9?9?9.?9?9?9.?9?9?9';
                            $scope.stateTaxMaskPlaceHolder = '___.___.___';

                        } else if($scope.estado === 'MS'){

                            $scope.stateTaxMask = '?9?9?9?9?9?9?9?9-?9';
                            $scope.stateTaxMaskPlaceHolder = '________-_';

                        } else if($scope.estado === 'MG'){

                            $scope.stateTaxMask = '?9?9?9.?9?9?9.?9?9?9.?9?9?9?9';
                            $scope.stateTaxMaskPlaceHolder = '___.___.___.____';

                        } else if($scope.estado === 'PR'){

                            $scope.stateTaxMask = '?9?9?9?9?9?9?9?9-?9?9';
                            $scope.stateTaxMaskPlaceHolder = '________-__';

                        } else if($scope.estado === 'PE'){

                            $scope.stateTaxMask = '?9?9.?9.?9?9?9.?9?9?9?9?9?9?9-?9';
                            $scope.stateTaxMaskPlaceHolder = '__._.___._______-_';

                        } else if($scope.estado === 'RJ'){

                            $scope.stateTaxMask = '?9?9.?9?9?9.?9?9?9';
                            $scope.stateTaxMaskPlaceHolder = '__.___.___';

                        } else if($scope.estado === 'RS'){

                            $scope.stateTaxMask = '?9?9?9.?9?9?9.?9?9?9.?9?9';
                            $scope.stateTaxMaskPlaceHolder = '___.___.___.__';

                        } else if($scope.estado === 'RO'){

                            $scope.stateTaxMask = '?9?9?9?9?9?9?9?9?9?9?9?9?9-?9';
                            $scope.stateTaxMaskPlaceHolder = '_____________-_';

                        } else if($scope.estado === 'RR'){

                            $scope.stateTaxMask = '?9?9.?9?9?9?9?9?9-?9';
                            $scope.stateTaxMaskPlaceHolder = '__.______-_';

                        } else if($scope.estado === 'SC'){

                            $scope.stateTaxMask = '?9?9?9?9?9?9?9?9?9';
                            $scope.stateTaxMaskPlaceHolder = '_________';

                        } else if($scope.estado === 'SP'){

                            $scope.stateTaxMask = '?9?9?9.?9?9?9.?9?9?9.?9?9?9';
                            $scope.stateTaxMaskPlaceHolder = '___.___.___.___';

                        } else if($scope.estado === 'TO'){

                            $scope.stateTaxMask = '?9?9?9.?9?9?9?9?9?9?9-?9';
                            $scope.stateTaxMaskPlaceHolder = '___._______-_';

                        } else {
                            $scope.stateTaxMask = '';
                            $scope.stateTaxMaskPlaceHolder = '';
                            $scope.stateTaxInputDisabled = true;
                        }

                    };

                    this.init();
                }
            };

            $scope.validateStateTax = function validateStateTax(){
                return Validator.execute([$scope.fields.stateTaxNumber]);
            };

            $scope.init();
            
        }
]);