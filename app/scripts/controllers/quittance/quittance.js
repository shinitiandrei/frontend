'use strict';
angular.module('uolsacApp')
 .controller('quittanceCtrl', ['$scope', '$http', 'FieldHandler', 'QuittanceLook', 'Notify', 'Quittance', 'Accounts', '$routeParams','Util', '$location',
        function quittanceCtrl($scope, $http, FieldHandler, QuittanceLook, Notify, Quittance, Accounts, $routeParams, Util, $location) {

            var quittanceAccountsUrl = Util.getCamaleonProperty('QUITTANCE_ACCOUNTS_URL');

            if(!$routeParams.idtAccount){
                $location.path('/wrapper').search({url: quittanceAccountsUrl});
            } else {
                $scope.idtAccount = parseInt($routeParams.idtAccount);
            }

            function init (){
                QuittanceLook.set();
                FieldHandler.instantiateScope($scope);
                Notify.removeAllNotifies();
                $scope.Notify = Notify;
                $scope.preloader = true;
                quittance.getDebts();

            }

            /**
            * Método que carrega o débito e os métodos de pagamento.
            * @type {Object}
            */
            var quittance = {

                getDebts: function getDebts(){

                    this.init = function(){
                        var accounts = Accounts.getCachedData();
                        var accountsCounter = 0;
                        var checkIfIsLoaded = setInterval(function() {
                            if (accounts.items.length > 0) {
                                for(var i= 0; i<accounts.items.length; i++){
                                    if(accounts.items[i].id === $scope.idtAccount){
                                        $scope.preloader = false;
                                        $scope.debitValue = accounts.items[i].debit;
                                        $scope.debitValueFormatted = Util.formatCurrency($scope.debitValue);
                                        Quittance.setPaymentData($scope.debitValueFormatted);
                                        accountsCounter++;
                                    }
                                }
                                if(Quittance.getPaymentData() === '0,00'){
                                    $location.path('/wrapper').search({url: quittanceAccountsUrl});
                                }
                                if(accountsCounter < 1){
                                    $location.path('/wrapper').search({url: quittanceAccountsUrl});
                                }
                                clearInterval(checkIfIsLoaded);
                            }
                        }, 100);
                        quittance.loadPaymentMethods();
                    };
                    this.init();
                },
                loadPaymentMethods: function loadPaymentMethods(){

                    this.init = function() {
                        Quittance.resource.getQuittance(null, this.onSuccess);
                    };

                    this.onSuccess = function ( request ) {
                        Quittance.setQuittanceOptions(request.items);
                    };

                    this.init();
                }
            };

            $scope.clear = function clear(scope){
                if(!(scope.name === 'number' && scope.value.length>5 && scope.css === 'has-error')){
                    FieldHandler.clean(scope);
                }
            };

            init();

            return {
                _quittance : quittance
            };
        }
]);

