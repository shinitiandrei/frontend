'use strict';
angular.module('uolsacApp').config(
    function($provide) {
        $provide.factory('CreditCard', ['$resource',
            function($resource) {

                this.data = {};
                var self = this;

                var actions = {
                    'get' : {
                        method: 'GET',
                        url: 'https://sac.uol.com.br/api/creditcard/bin/:bin',
                        interceptor : {
                            response : function(response){
                                self.data = response.data;
                                return self.data;
                            }
                        }
                    }
                };

                this.resource = $resource(
                    null,
                    {
                        bin : '@bin'
                    },

                    actions
                );

                this.getBrand = function(){
                    return self.cardBrand;
                };

                this.setBrand = function(cardBrand){
                    self.cardBrand = cardBrand;
                };

                this.getCardNumber = function(){
                    return self.cardNumber;
                };

                this.setCardNumber = function(cardNumber){
                    self.cardNumber = cardNumber;
                };

                return this;

            }
        ]);
    }
);
