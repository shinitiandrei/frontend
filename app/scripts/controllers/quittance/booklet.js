'use strict';
angular.module('uolsacApp')
    .controller('bookletCtrl', ['$scope', 'FieldHandler', 'QuittanceLook', 'Notify', 'Quittance', 'Accounts', '$routeParams',
        function bookletCtrl($scope, FieldHandler, QuittanceLook, Notify, Quittance, Accounts, $routeParams) {

            $scope.idtAccount = parseInt($routeParams.idtAccount);

            function init(){
                QuittanceLook.set();
                $scope.Notify = Notify;
                FieldHandler.instantiateScope($scope);
                $scope.yourEmail = Quittance.getPaymentData();
                hash.get();

            }

            var hash = {
                get: function get() {
                    this.init = function(){
                        Quittance.resource.getAccounts(this.onSuccess);
                    };
                    this.onSuccess = function ( accounts ) {
                        var accountInDebitCounter = 0;
                        for(var accountsCounter= 0; accountsCounter < accounts.items.length; accountsCounter++){
                            if(accounts.items[accountsCounter].id === $scope.idtAccount){
                                $scope.bookletHash = accounts.items[accountsCounter].booklet;
                                createBookletLink();
                            }
                            if(accounts.items[accountsCounter].inDebit){
                                accountInDebitCounter++;
                            }
                        }
                        if (accountInDebitCounter<1){
                            Notify.removeOnlyPersistentNotifies();
                        }

                    };

                    this.init();
                }
            };

            function createBookletLink() {
                $scope.url = 'https://sac.uol.com.br/conta/boleto.html?redirect=true&idBooklet='+$scope.bookletHash;
            }

            init();

            return {
                _hash : hash,
                _createBookletLink: createBookletLink
            };
        }
]);
