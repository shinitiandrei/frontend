'use strict';
angular.module('uolsacApp').config(
    function($provide) {
        $provide.factory('TuringInterceptor', ['$q', 'Turing',
            function($q, Turing) {
                return {

                    'responseError': function(responseError) {
                        Turing.add(responseError);
                        return $q.reject(responseError);
                    },

                    'response': function(response) {
                        Turing.add(response);
                        return response;
                    },

                    'request': function(request) {
                        request.headers['X-Turing-Response'] = Turing.answer();
                        request.headers['X-Turing-Token'] = Turing.token();
                        return request;
                    }

                };
            }
        ]);
    }
);
