'use strict';
angular.module('uolsacApp')
 .controller('quittanceConclusionCtrl', ['$scope', '$http', 'FieldHandler', 'QuittanceLook', 'Notify', 'Quittance', 'Accounts', '$location', 'Util',
        function quittanceConclusionCtrl($scope, $http, FieldHandler, QuittanceLook, Notify, Quittance, Accounts, $location, Util) {

            var quittanceAccountsUrl = Util.getCamaleonProperty('QUITTANCE_ACCOUNTS_URL');

            function init() {
                QuittanceLook.set();
                $scope.Notify = Notify;
                FieldHandler.instantiateScope($scope);
                $scope.paymentValue = Quittance.getPaymentData();

                if(!$scope.paymentValue){
                    $location.path('/wrapper').search({url: quittanceAccountsUrl});
                }

                var accounts = Accounts.getCachedData();
                var accountInDebitCounter = 0;
                var checkIfIsLoaded = setInterval(function() {
                    if (accounts.items.length > 0) {
                        for(var accountsCounter= 0; accountsCounter < accounts.items.length; accountsCounter++){
                            if(accounts.items[accountsCounter].inDebit){
                                accountInDebitCounter++;
                            }
                        }
                        if (accountInDebitCounter<1){
                            Notify.removeOnlyPersistentNotifies();
                        }
                        clearInterval(checkIfIsLoaded);
                    }
                }, 100);
            }

            $scope.backToProductsAndServices = function(){
                $location.path('/wrapper').search({url: quittanceAccountsUrl});
            };


            init();
        }
]);
