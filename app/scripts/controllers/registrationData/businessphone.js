'use strict';
angular.module('uolsacApp')
    .controller('businessphoneCtrl', ['$scope', 'FieldHandler', 'Validator',
        function($scope, FieldHandler, Validator) {

            FieldHandler.instantiateScope($scope);

            $scope.businessPhoneInput = [
                    {
                        'type': 'text',
                        'name': 'ddd',
                        'class':'col-xs-6 col-sm-3 col-md-2 col-lg-2 no-padding-left',
                        'mask' : '(?9?9)',
                        'placeholder': '(__)'
                    },
                    {
                        'type': 'text',
                        'name': 'number',
                        'class':'col-xs-18 col-sm-5 col-md-4 col-lg-4 no-padding-right',
                        'mask': '?9?9?9?9?9?9?9?9',
                        'placeholder': '________'
                    }
                ];

            $scope.businessphone = {

                change: function change(){

                    this.init = function(){

                        FieldHandler.instantiateScope($scope);

                        if($scope.businessphoneChangeMethod === 'create'){
                            $scope.businessphone.create();
                        }
                        else {
                            $scope.businessphone.edit();
                        }
                    };

                    this.init();
                },

                create: function create(){

                    this.init = function(){

                        if(!$scope.validateBusinessPhone()) {
                            return null;
                        }

                        $scope.businessphoneLabel = $scope.businessphone.maskBusinessphoneLabel($scope.businessPhoneInput[0].value+$scope.businessPhoneInput[1].value);

                        $scope.$parent.show = 'contactInformationBusinessphoneInfo';
                        $scope.$parent.hide = 'contactInformationBusinessphoneEdit';

                        $scope.registered = true;

                        $scope.businessphoneChangeMethod = 'edit';

                    };

                    this.init();
                },

                edit: function edit(){

                    this.init = function(){

                        if(!$scope.validateBusinessPhone()) {
                            return null;
                        }

                        $scope.businessphoneLabel = $scope.businessphone.maskBusinessphoneLabel($scope.businessPhoneInput[0].value+$scope.businessPhoneInput[1].value);

                        $scope.$parent.show = 'contactInformationBusinessphoneInfo';
                        $scope.$parent.hide = 'contactInformationBusinessphoneEdit';
                    };

                    this.init();
                },

                maskBusinessphoneLabel: function maskBusinessphoneLabel ( number ) {

                    var phoneLabel = number;
                    phoneLabel=phoneLabel.replace(/\D/g,'');
                    phoneLabel=phoneLabel.replace(/^(\d{2})(\d)/g,'($1) $2');
                    phoneLabel=phoneLabel.replace(/(\d)(\d{4})$/,'$1-$2');
                    return phoneLabel;
                }
            };

            $scope.registered = false;

            $scope.businessphoneLabel = '';

            $scope.businessphoneChangeMethod = 'create';

            $scope.validateBusinessPhone = function validateBusinessPhone(){
                return Validator.execute([$scope.fields.telephoneMultiple]);
            };

        }
]);
