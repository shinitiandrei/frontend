'use strict';
angular.module('uolsacApp')
    .controller('passwordAndSecurity_passwordAndSecurityCtrl', ['$scope', '$http', '$location', 'FieldHandler','FieldMap', 'Util', 'Notify', 'Validator', 'User', 'Contacts', 'PasswordAndSecurityLook',
        function passwordAndSecurityPasswordAndSecurityCtrl($scope, $http, $location, FieldHandler, FieldMap, Util, Notify, Validator, User, Contacts, PasswordAndSecurityLook) {

            $scope.init = function init() {

                PasswordAndSecurityLook.set();
                FieldHandler.instantiateScope($scope);
                $scope.preloader = true;
                Notify.removeAllNotifies();
                $scope.Notify = Notify;

                if ( User.isLoggedIn() ) {
                    // $scope.contacts.loadContactData();
                } else {
                    //$location.path('/login').search({dest: 'REDIR|https://sac.uol.com.br/#/senhaeseguranca'});
                }

            };

            $scope.contacts = {

                loadContactData: function loadContactData() {
                    Contacts.resource.get($scope.contacts.setModel);
                },

                setModel: function setModel(request) {

                    var user = User.getCachedData();
                    $scope.userEmail = user.namLogin;
                    $scope.idtPerson = user.idtPerson;

                    for (var i=0; i < request.items.length; i++) {

                        if (request.items[i].method === 'EMAIL') {
                            if (request.items[i].type === 'ALTERNATIVE') {
                                $scope.preloader = false;
                                $scope.alternativeEmailLabel = request.items[i].description;
                                $scope.alternativeEmailStatus = request.items[i].status;
                                $scope.alternativeEmailLink = 'editar';
                                $scope.alternativeEmailChangeMethod = 'edit';
                            } else {
                                $scope.preloader = false;
                                $scope.alternativeEmailLabel = 'Nenhum e-mail alternativo cadastrado';
                                $scope.alternativeEmailLink = 'cadastrar';
                                $scope.alternativeEmailChangeMethod = 'create';
                            }
                        }

                        if (request.items[i].method === 'PHONE') {
                            if (request.items[i].type === 'MOBILE') {
                                $scope.preloader = false;
                                $scope.cellPhoneLabel = $scope.cellphone.maskCellphoneLabel(request.items[i].description);
                                $scope.cellPhoneStatus = request.items[i].status;
                                $scope.cellPhoneLink = 'editar';
                                $scope.cellphoneChangeMethod = 'edit';
                            } else {
                                $scope.preloader = false;
                                $scope.cellPhoneLabel = 'Nenhum telefone celular cadastrado';
                                $scope.cellPhoneLink = 'cadastrar';
                                $scope.cellphoneChangeMethod = 'create';
                            }
                        }
                    }
                }
            };

            $scope.clear = function clear(scope) {
                FieldHandler.clean(scope);
            };

            $scope.init();
        }
]);
