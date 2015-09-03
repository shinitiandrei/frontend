'use strict';
angular.module('uolsacApp')
    .controller('homephoneCtrl', ['$scope', 'FieldHandler', 'Validator',
        function($scope, FieldHandler, Validator) {

            FieldHandler.instantiateScope($scope);

            $scope.telephoneInput = [
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

            $scope.homephone = {

                change: function change(){

                    this.init = function(){

                        FieldHandler.instantiateScope($scope);

                        if($scope.homephoneChangeMethod === 'create'){
                            $scope.homephone.create();
                        }
                        else {
                            $scope.homephone.edit();
                        }
                    };

                    this.init();
                },

                create: function create(){

                    this.init = function(){

                        if(!$scope.validateHomePhone()) {
                            return null;
                        }

                        $scope.homephoneLabel = $scope.homephone.maskHomephoneLabel($scope.telephoneInput[0].value+$scope.telephoneInput[1].value);

                        $scope.$parent.show = 'contactInformationHomephoneInfo';
                        $scope.$parent.hide = 'contactInformationHomephoneEdit';

                        $scope.registered = true;

                        $scope.homephoneChangeMethod = 'edit';

                    };

                    this.init();
                },

                edit: function edit(){

                    this.init = function(){

                        if(!$scope.validateHomePhone()) {
                            return null;
                        }

                        $scope.homephoneLabel = $scope.homephone.maskHomephoneLabel($scope.telephoneInput[0].value+$scope.telephoneInput[1].value);

                        $scope.$parent.show = 'contactInformationHomephoneInfo';
                        $scope.$parent.hide = 'contactInformationHomephoneEdit';
                    };

                    this.init();
                },

                maskHomephoneLabel: function maskHomephoneLabel ( number ) {

                    var phoneLabel = number;
                    phoneLabel=phoneLabel.replace(/\D/g,'');
                    phoneLabel=phoneLabel.replace(/^(\d{2})(\d)/g,'($1) $2');
                    phoneLabel=phoneLabel.replace(/(\d)(\d{4})$/,'$1-$2');
                    return phoneLabel;
                }
            };

            $scope.registered = false;

            $scope.homephoneLabel = '';

            $scope.homephoneChangeMethod = 'create';

            $scope.validateHomePhone = function validateHomePhone(){
                return Validator.execute([$scope.fields.telephoneMultiple]);
            };

        }
]);
