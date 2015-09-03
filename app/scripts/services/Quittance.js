'use strict';

angular.module('uolsacApp').config(
function($provide) {
    $provide.factory('Quittance', ['$resource',
        function($resource) {

            this.data = {};
            var self = this;

            var actions = {

                'getAccounts' : {
                    method: 'GET',
                    url: 'https://sac.uol.com.br/api/users/accounts/',
                    interceptor : {
                        response : function(response){
                            self.data = response.data;
                            return self.data;
                        }
                    }
                },

                'getQuittance' : {
                    method: 'GET',
                    url: 'https://sac.uol.com.br/api/quittances/installments'
                },

                'post' : {
                    method: 'POST',
                    url: 'https://sac.uol.com.br/api/users/accounts/:id/quittances'
                }

            };

            this.resource = $resource(

                null,
                {
                    id : '@id'
                },

                actions
            );

            this.getQuittanceOptions = function(){
                return self.quittanceOptions;
            };

            this.setQuittanceOptions = function(quittanceOptions){
                self.quittanceOptions = quittanceOptions;
            };

            this.getPaymentData = function(){
                return self.paymentData;
            };

            this.setPaymentData = function(paymentData){
                self.paymentData =  paymentData;
            };

            this.setCurrentAccount = function(account){
                self.currentAccount =  account;
            };

            this.getCurrentAccount = function(){
                return self.currentAccount;
            };

            return this;

        }]);
});
