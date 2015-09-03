'use strict';
angular.module('uolsacApp').config(
function($provide) {
    $provide.factory('PasswordChange', ['$resource',
        function($resource) {

            this.data = {};
            var self = this;

            var actions = {

                'patchLogged' : {
                    method: 'POST',
                    url: 'https://sac.uol.com.br/api/users/password',
                    interceptor : {
                        response : function(response){
                            self.data = response.data;
                            return self.data;
                        }
                    }
                },

                'patchNonLogged' : {
                    method: 'POST',
                    url: 'https://sac.uol.com.br/api/users;login=:login/password',
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
                    login : '@login'
                },

                actions
            );

            return this;

        }]);
});
