'use strict';
angular.module('uolsacApp')
    .controller('passwordAndSecurity_alternativeEmailCtrl', ['$scope', '$http', '$location', 'FieldHandler','FieldMap', 'Util', 'Notify', 'Validator', 'User', 'Contacts',
        function passwordAndSecurityAlternativeEmailCtrl($scope, $http, $location, FieldHandler, FieldMap, Util, Notify, Validator, User, Contacts) {

            FieldHandler.instantiateScope($scope);

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

                create : function create(){

                    this.init = function () {

                        if(!$scope.validateEmail()) {
                            return null;
                        }

                        var alternativeEmail = $scope.fields.alternativeEmail;

                        var createAlternativeEmailData = {
                            'description': alternativeEmail.value,
                            'type' : 'alternativeEmail',
                            'login' : $scope.userEmail
                        };


                        Contacts.resource.save(createAlternativeEmailData, this.onSuccess, this.onError);

                    };

                    this.onSuccess = function ( request ) {

                        Notify.removeAllNotifies();
                        $scope.alternativeEmailLabel = request.item.description;
                        $scope.$parent.showThis = 'alternativeEmailRecovery';
                        $scope.$parent.hideThis = 'alternativeEmailEdit';

                        Notify.removeAllNotifies();
                        var notify = Notify.setNewNotifyObject();
                        notify.title = 'Sucesso!';
                        notify.message = 'Um e-mail de confirmação foi enviado para o novo e-mail alternativo.';
                        notify.type = 'success';
                        Notify.add(notify);

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

                    this.init = function (){

                        if(!$scope.validateEmail()) {
                            return null;
                        }

                        var alternativeEmail = $scope.fields.alternativeEmail;

                        var editAlternativeEmailData = {
                            'description': alternativeEmail.value,
                            'type' : 'alternativeEmail',
                            'login' : $scope.userEmail
                        };

                        var uriParameters = {
                            'method' : 'ALTERNATIVE'
                        };

                        Contacts.resource.put(uriParameters, editAlternativeEmailData, this.onSuccess, this.onError);

                    };

                    this.onSuccess = function ( request ) {

                        Notify.removeAllNotifies();
                        $scope.alternativeEmailLabel = request.item.description;
                        $scope.$parent.showThis = 'alternativeEmailRecovery';
                        $scope.$parent.hideThis = 'alternativeEmailEdit';

                        Notify.removeAllNotifies();
                        var notify = Notify.setNewNotifyObject();
                        notify.title = 'Sucesso!';
                        notify.message = 'Um e-mail de confirmação foi enviado para o novo e-mail alternativo.';
                        notify.type = 'success';
                        Notify.add(notify);

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

                }


            };

            $scope.validateEmail = function validateEmail(){
                return Validator.execute([$scope.fields.alternativeEmail]);
            };
        }
]);
