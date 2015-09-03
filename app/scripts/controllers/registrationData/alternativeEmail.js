'use strict';
angular.module('uolsacApp')
    .controller('alternativeEmailCtrl', ['$scope', 'FieldHandler', '$timeout', 'Validator',
        function($scope, FieldHandler, $timeout, Validator) {

            FieldHandler.instantiateScope($scope); //> Instancia o Controller em uso no FieldHandler

            $scope.init = function(){

                //Mocks
                $scope.alternativeEmailChangeMethod = 'create';
            };

            $scope.alternativeEmail = {

                change: function change(){

                    this.init = function(){

                        FieldHandler.instantiateScope($scope);

                        if($scope.alternativeEmailChangeMethod === 'create'){
                            $scope.alternativeEmail.create();
                        }
                        else {
                            $scope.alternativeEmail.edit();
                        }

                    };

                    this.init();

                },

                create: function create(){

                    this.init = function(){

                        if(!$scope.validateEmail()) {
                            return null;
                        }
                        
                        $scope.alternativeEmailLabel = $scope.fields.alternativeEmail.value;

                        $scope.registered = true;

                        $scope.alternativeEmailStatus = 'PENDING';

                        $scope.$parent.show = 'contactInformationAlternativeEmailInfo';
                        $scope.$parent.hide = 'contactInformationAlternativeEmailEdit';

                        $scope.alternativeEmailChangeMethod = 'edit';
                    };

                    this.init();

                },

                edit: function edit(){

                    this.init = function(){

                        if(!$scope.validateEmail()) {
                            return null;
                        }
                        
                        $scope.alternativeEmailLabel = $scope.fields.alternativeEmail.value;

                        $scope.alternativeEmailStatus = 'PENDING';

                        $scope.$parent.show = 'contactInformationAlternativeEmailInfo';
                        $scope.$parent.hide = 'contactInformationAlternativeEmailEdit';

                    };

                    this.init();
                }
            };

            $scope.registered = true;

            $scope.alternativeEmailStatus = '';

            $scope.alternativeEmailLabel = 'emailalternativo@provedor.com.br';

            $scope.validateEmail = function validateEmail(){
                return Validator.execute([$scope.fields.alternativeEmail]);
            };

            $scope.init();
        }

]);