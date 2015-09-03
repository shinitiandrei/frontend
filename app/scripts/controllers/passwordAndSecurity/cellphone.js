'use strict';
angular.module('uolsacApp')
    .controller('passwordAndSecurity_cellphoneCtrl', ['$scope', '$http', '$location', 'FieldHandler','FieldMap', 'Util', 'Notify', 'Validator', 'User', 'Contacts',
        function passwordAndSecurityCellphoneCtrl($scope, $http, $location, FieldHandler, FieldMap, Util, Notify, Validator, User, Contacts) {

            FieldHandler.instantiateScope($scope);

            $scope.cellphone = {

                change: function change(){

                    this.init = function () {

                        FieldHandler.instantiateScope($scope);

                        if($scope.$parent.cellphoneChangeMethod === 'create'){
                            $scope.cellphone.create();
                        } else {
                            $scope.cellphone.edit();
                        }

                    };

                    this.init();

                },

                create : function create(){

                    this.init = function () {

                        if(!$scope.validateCellPhone()) {
                            return null;
                        }

                        var createCellphoneData = {
                            'description': $scope.fields.cellphone.value,
                            'type' : 'cellphone'
                        };

                        Contacts.resource.save(createCellphoneData, this.onSuccess, this.onError);

                    };

                    this.onSuccess = function ( request ) {

                        Notify.removeAllNotifies();
                        $scope.cellPhoneLabel = $scope.cellphone.maskCellphoneLabel(request.item.description);
                        $scope.$parent.showThis = 'sendSms';
                        $scope.$parent.hideThis = 'cellphoneEdit';

                    };

                    this.onError = function ( request ) {

                        Notify.removeAllNotifies();
                        var notify = Notify.setNewNotifyObject();
                        notify.title = 'Erro!';
                        notify.message = request.data.errors.messages[0].message;
                        notify.type = 'danger';
                        Notify.add(notify);

                    };

                    this.init();

                },

                edit : function edit(){

                    this.init = function () {

                        if(!$scope.validateCellPhone()) {
                            return null;
                        }

                        var editCellphoneData = {
                            'description': $scope.fields.cellphone.value,
                            'type' : 'cellphone'
                        };

                        var uriParameters = {
                            'method' : 'MOBILE'
                        };

                        Contacts.resource.put(uriParameters, editCellphoneData, this.onSuccess, this.onError);

                    };

                    this.onSuccess = function ( request ) {

                        Notify.removeAllNotifies();
                        $scope.cellPhoneLabel = $scope.cellphone.maskCellphoneLabel(request.item.description);
                        $scope.$parent.showThis = 'sendSms';
                        $scope.$parent.hideThis = 'cellphoneEdit';

                    };

                    this.onError = function ( request ){

                        Notify.removeAllNotifies();
                        var notify = Notify.setNewNotifyObject();
                        notify.title = 'Erro!';
                        notify.message = request.data.errors.messages[0].message;
                        notify.type = 'danger';
                        Notify.add(notify);

                    };



                    this.init();

                },

                maskCellphoneLabel : function ( number ) {

                    var cellLabel = number;
                    cellLabel=cellLabel.replace(/\D/g,'');
                    cellLabel=cellLabel.replace(/^(\d{2})(\d)/g,'($1) $2');
                    cellLabel=cellLabel.replace(/(\d)(\d{4})$/,'$1-$2');
                    return cellLabel;

                }

            };

            $scope.token = {

                insert : function insert(){

                    this.init = function () {

                        if(!$scope.validateToken()) {
                            return null;
                        }

                        var token = $scope.fields.token;

                        var validCellphoneData = {
                            'value': token.value
                        };

                        var uriParameters = {
                            'method' : 'MOBILE',
                            'typeParam' : 'confirmation'
                        };

                        Contacts.resource.put(uriParameters, validCellphoneData, this.onSuccess);

                    };


                    this.onSuccess = function () {

                        Notify.removeAllNotifies();
                        $scope.$parent.hideThis = 'insertSms';
                        $scope.$parent.showThis = 'cellphoneRecovery';

                    };

                    this.init();
                }

            };


            $scope.sms = {

                send : function send(){

                    this.init = function () {

                        var uriParameters = {
                            'method' : 'MOBILE',
                            'typeParam' : 'confirmation'
                        };

                        Contacts.resource.save(uriParameters, this.onSuccess, this.onError);

                    };

                    this.onSuccess = function () {

                        Notify.removeAllNotifies();
                        $scope.$parent.showThis = 'insertSms';
                        $scope.$parent.hideThis = 'sendSms';
                        $scope.$parent.hideThis = 'cellphoneRecovery';

                        $scope.notifyBelow = true;
                        $scope.notifyBelowMessage = 'Um token foi enviado por SMS para seu celular.';
                        $scope.notifyBelowType = 'success';

                    };

                    this.onError = function ( request ) {

                        Notify.removeAllNotifies();
                        $scope.$parent.showThis = 'insertSms';
                        $scope.$parent.hideThis = 'sendSms';
                        $scope.$parent.hideThis = 'cellphoneRecovery';

                        $scope.notifyBelow = true;
                        $scope.notifyBelowMessage = request.data.errors.messages[0].message;
                        $scope.notifyBelowType = 'warning';

                    };

                    this.init();

                },

                sendAgain: function sendAgain(){

                    this.init = function(){

                        var uriParameters = {
                            'method' : 'MOBILE',
                            'typeParam' : 'confirmation'
                        };

                        Contacts.resource.save(uriParameters, this.onSuccess, this.onError);

                    };

                    this.onSuccess = function () {

                        Notify.removeAllNotifies();

                        $scope.notifyBelow = true;
                        $scope.notifyBelowMessage = 'Um novo token foi enviado por SMS para seu celular.';
                        $scope.notifyBelowType = 'success';

                    };

                    this.onError = function ( request ) {

                        Notify.removeAllNotifies();

                        $scope.notifyBelow = true;
                        $scope.notifyBelowMessage = request.data.errors.messages[0].message;
                        $scope.notifyBelowType = 'warning';

                    };

                    this.init();

                }

            };

            $scope.validateCellPhone = function validateCellPhone(){
                return Validator.execute([$scope.fields.cellphone]);
            };


            $scope.validateToken = function validateToken(){
                return Validator.execute([$scope.fields.token]);
            };
        }
]);
