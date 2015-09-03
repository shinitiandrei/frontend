'use strict';

angular.module('uolsacApp').config(
function($provide) {
    $provide.factory('Contacts', ['$resource',
        function($resource) {

            this.data = {};
            var self = this;

            var actions = {

                'get' : {
                    method: 'GET',
                    url: 'https://sac.uol.com.br/api/users/contacts/:method/:typeParam',
                    interceptor : {
                        response : function(response){
                            self.data = response.data;
                            return self.data;
                        }
                    }
                },

                'put' : {
                    method: 'PUT',
                    url: 'https://sac.uol.com.br/api/users/contacts/:method/:typeParam'
                },

                'save' : {
                    method: 'POST',
                    url: 'https://sac.uol.com.br/api/users/contacts/:method/:typeParam'
                },

                'putConfirmation' : {
                    method: 'PUT',
                    url: 'https://sac.uol.com.br/api/users;login=:login/contacts/:method/:typeParam',
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
                    method : '@method',
                    typeParam : '@typeParam'
                },

                actions
            );

            return this;

        }]);
});
