'use strict';
angular.module('uolsacApp').config(
function($provide) {
    $provide.factory('Recoveries', ['$resource',
        function($resource) {

            this.data = {};
            var self = this;
            self.data = {};
            self.data.item = {};
            self.namloginInUse = undefined;
            self.token = undefined;

            this.stepBuilder = {

                userSteps  : null,

                stepOrderList : {
                    'mainEmail' : '/recuperarsenha/emailprincipal',
                    'cellphoneToken' : '/recuperarsenha/verificarsms',
                    'tip' : '/recuperarsenha/dicadesenha',
                    'cellphone' : '/recuperarsenha/celular',
                    'alternativeEmail' : '/recuperarsenha/emailalternativo',
                    'questions' : '/recuperarsenha/perguntas'
                },

                checkCurrent : function(step){

                    if( !self.getNamloginInUse() || !this.userSteps ){
                        return false;
                    }

                    for(var i=0; i < this.userSteps.length; i++) {
                        if(step === this.userSteps[i].rel){
                            return true;
                        }
                    }

                    return false;
                },

                getFirstStep : function(request){
                    for (var indexStep in this.stepOrderList) {
                        for(var indexLinks in request.item.links){
                            if(request.item.links[indexLinks].rel === indexStep){
                                return this.stepOrderList[indexStep];
                            }
                        }
                    }
                },

                getNext : function(currentStep){

                    var allreadyGotCurrentStep = false;

                    for (var indexStepCurentStep in this.stepOrderList) {

                        if(allreadyGotCurrentStep){
                            for( var indexGotStep in this.userSteps ){
                                if( this.userSteps[indexGotStep].rel === indexStepCurentStep ){
                                    return this.stepOrderList[indexStepCurentStep];
                                }
                            }
                        }

                        if(indexStepCurentStep === currentStep){
                            allreadyGotCurrentStep = true;
                        }
                    }
                },

                setUserSteps : function(request){
                    this.userSteps = request.item.links;
                }

            };

            this.getToken = function(){
                return self.token;
            };

            this.setToken = function(token){
                self.token =  token;
            };

            this.getNamloginInUse = function(){
                return self.namloginInUse;
            };

            this.setNamloginInUse = function(namLogin){
                self.namloginInUse =  namLogin;
            };

            var actions = {

                'get' : {
                    method: 'GET',
                    interceptor : {
                        response : function (response) {
                            self.data.item = angular.extend(self.data.item, response.data.item);
                            return self.data;
                        }
                    }
                },

                'put' : {
                    method: 'PUT'
                }

            };

            this.resource = $resource(
                'https://sac.uol.com.br/api/users;login=:login/recoveries/:method/:type',
                {
                    login : '@login',
                    method : '@method',
                    type : '@type'
                },
                actions
            );

            return this;

        }]);
});
