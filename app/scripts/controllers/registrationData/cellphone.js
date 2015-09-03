'use strict';
angular.module('uolsacApp')
    .controller('cellphoneCtrl', ['$scope', 'FieldHandler', 'Validator', '$timeout',
        function($scope, FieldHandler, Validator, $timeout) {

            FieldHandler.instantiateScope($scope);

            $scope.cellphoneInput = [
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
                        'mask': '?9?9?9?9?9?9?9?9?9',
                        'placeholder': '_________'
                    }
                ];

            $scope.cellphone = {

                change: function change(){

                    this.init = function () {

                        FieldHandler.instantiateScope($scope);

                        if($scope.cellphoneChangeMethod === 'create'){
                            $scope.cellphone.create();
                        }
                        else {
                            $scope.cellphone.edit();
                        }
                    };

                    this.init();

                },

                create: function create(){

                    this.init = function () {

                        if(!$scope.validateCellPhone()) {
                            return null;
                        }

                        $scope.cellphoneLabel = $scope.cellphone.maskCellphoneLabel($scope.cellphoneInput[0].value+$scope.cellphoneInput[1].value);

                        $scope.$parent.show = 'contactInformationSendSms';
                        $scope.$parent.hide = 'contactInformationCellphoneEdit';
                        $scope.$parent.hide = 'contactInformationCellphoneInfo';

                        $scope.registered = true;

                        $scope.cellphoneChangeMethod = 'edit';
                    };

                    this.init();

                },

                edit: function edit(){

                    this.init = function () {

                        if(!$scope.validateCellPhone()) {
                            return null;
                        }

                        $scope.cellphoneLabel = $scope.cellphone.maskCellphoneLabel($scope.cellphoneInput[0].value+$scope.cellphoneInput[1].value);

                        $scope.$parent.show = 'contactInformationSendSms';
                        $scope.$parent.hide = 'contactInformationCellphoneEdit';
                        $scope.$parent.hide = 'contactInformationCellphoneInfo';

                    };

                    this.init();

                },

                maskCellphoneLabel: function maskCellphoneLabel ( number ) {

                    var cellLabel = number;
                    cellLabel=cellLabel.replace(/\D/g,'');
                    cellLabel=cellLabel.replace(/^(\d{2})(\d)/g,'($1) $2');
                    cellLabel=cellLabel.replace(/(\d)(\d{4})$/,'$1-$2');
                    return cellLabel;
                }

            };

            $scope.token = {

                insert: function insert(){

                    this.init = function () {

                        if(!$scope.validateToken()) {
                            return null;
                        }

                        $scope.$parent.hide = 'contactInformationInsertToken';
                        $scope.$parent.show = 'contactInformationCellphoneInfo';

                        $scope.cellPhoneStatus = 'ACTIVE';
                    };

                    this.init();
                }

            };

            $scope.sms = {

                send: function send(){

                    this.init = function () {

                        $scope.fields.token.value = '';

                        $scope.$parent.show = 'contactInformationInsertToken';
                        $scope.$parent.hide = 'contactInformationSendSms';
                        $scope.$parent.hide = 'contactInformationCellphoneInfo';

                        $scope.notifyBelow = true;
                        $scope.notifyBelowMessage = 'SMS enviado';
                        $scope.notifyBelowType = 'success';

                        $timeout(function(){
                            $scope.notifyBelow = false;
                        }, 3000);

                        $scope.cellPhoneStatus = 'PENDING';

                    };

                    this.init();

                },

                sendAgain: function sendAgain(){

                    this.init = function(){

                        $scope.fields.token.value = '';

                        $scope.notifyBelow = true;
                        $scope.notifyBelowMessage = 'SMS reenviado';
                        $scope.notifyBelowType = 'success';

                        $timeout(function(){
                            $scope.notifyBelow = false;
                        }, 3000);
                    };

                    this.init();

                }

            };

            $scope.smsAuthorization = true;

            $scope.registered = false;

            $scope.cellphoneLabel = '';

            $scope.cellphoneChangeMethod = 'create';

            $scope.validateCellPhone = function validateCellPhone(){
                return Validator.execute([$scope.fields.cellphoneMultiple]);
            };

            $scope.validateToken = function validateToken(){
                return Validator.execute([$scope.fields.token]);
            };
        }
]);
