'use strict';
angular.module('uolsacApp').config(
    function($provide) {
        $provide.factory('User', ['$resource', 'Accounts', '$rootScope', '$location',
            function($resource, Accounts, $rootScope, $location) {

                this.data = {
                    'logged':false,
                    'namLogin':null,
                    'idtPerson':null,
                    'namPerson':null,
                    'status':null
                };

                var self = this;

                var authentication = {

                    isAppAllReadyRunning : false,
                    isRequired : true,

                    redirectToLoginForm : function(){
                        var destString =  'REDIR|' +  window.location.href.toString() ;
                        $location.path('/login/').search({ dest: destString });
                    },

                    setRequirement : function(routeData){
                        this.isRequired = routeData.authenticated === undefined ? true : false;
                    },

                    checkRequirements : function(user) {

                        if ( user.logged ) {
                            if( authentication.isAppAllReadyRunning === false ){
                                Accounts.getAsync(user);
                                authentication.isAppAllReadyRunning = true;
                            }else{
                                $rootScope.$broadcast( 'userReloaded', self.getCachedData() );
                            }
                        } else if( authentication.isRequired ){
                            authentication.redirectToLoginForm();
                        }

                    }

                };

                var actions = {
                    'get' : {
                        method: 'GET',
                        url: 'https://sac.uol.com.br/api/login',
                        interceptor : {
                            response : function(response){
                                self.data = response.data;
                                $rootScope.$broadcast('userReloaded', response.data);
                                return self.data;
                            }
                        }
                    }
                };

                var decrypt = {
                    'get' : {
                        method: 'GET',
                        url: 'https://sac.uol.com.br/api/users',
                        interceptor : {
                            response : function(response){
                                self.data = response.data;
                                $rootScope.$broadcast('userReloaded', response.data);
                                return self.data;
                            }
                        }
                    }
                };

                this.resource = $resource( null, {}, actions );

                this.getUserData = function(routeData){
                    authentication.setRequirement(routeData);
                    self.resource.get(authentication.checkRequirements);
                };

                this.getLoginByGaudi = function(){
                    decrypt.get();

                }

                this.isLoggedIn = function(){
                    return self.data.logged;
                };

                this.getCachedData = function(){
                    return self.data;
                };

                return this;

            }


        ]);
    }
);
