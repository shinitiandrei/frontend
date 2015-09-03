'use strict';
angular.module('uolsacApp').config(
function($provide) {
    $provide.factory('SecurityQuestions', ['$resource',
        function($resource) {

            var actions = {

                'getAnswered' : {
                    method: 'GET',
                    url: 'https://sac.uol.com.br/api/users/securityquestions'
                },

                'getFixeds' : {
                    method: 'GET',
                    url: 'https://sac.uol.com.br/api/securityquestions'
                }

            };

            this.resource = $resource(

                null,

                {
                    idtperson : '@idtperson',
                    method : '@method',
                    typeParam : '@typeParam'
                },

                actions

            );

            return this;

        }]);
});
