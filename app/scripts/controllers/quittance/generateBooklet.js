'use strict';
angular.module('uolsacApp')
 .controller('generateBookletCtrl', ['$scope', '$http', 'FieldHandler', 'Validator', '$location', 'Quittance', '$timeout', 'User',
        function generateBookletCtrl($scope, $http, FieldHandler, Validator, $location, Quittance, $timeout, User) {

            function init() {
                FieldHandler.instantiateScope($scope);
                $timeout(function(){
                    var user = User.getCachedData();
                    $scope.fields.bookletEmail.value = formatEmail(user.namLogin);
                }, 0);
            }

            var booklet = {
                pay: function pay() {
                    this.init = function () {
                        FieldHandler.instantiateScope($scope);
                        if(!validateBooklet()) {
                            return null;
                        }

                        Quittance.setPaymentData($scope.fields.bookletEmail.value);

                        var uriParameters = {
                            'id':  $scope.idtAccount
                        };

                        var bookletData = {
                            'value': $scope.debitValue,
                            'quittancePaymentMethod':{
                                'email': $scope.fields.bookletEmail.value,
                                'idPaymentMethod': 33,
                                'installments': 1
                            }
                        };

                        Quittance.resource.post(uriParameters, bookletData, this.onSuccess);

                    };

                    this.onSuccess = function () {
                        $location.path('/cobranca/boleto').search({idtAccount: $scope.idtAccount});
                    };

                    this.init();
                }
            };

            $scope.makePayment = function(){
                booklet.pay();
            };

            function formatEmail (namlogin) {
                var email;

                if(!namlogin.match(/[@]/)){
                    email = namlogin+'@uol.com.br';
                    return email;
                }
                else {
                    return namlogin;
                }
            }

            function validateBooklet(){
                return Validator.execute([$scope.fields.bookletEmail]);
            }

            init();

            return {
                _formatEmail : formatEmail,
                _validateBooklet : validateBooklet
            };
        }
]);
