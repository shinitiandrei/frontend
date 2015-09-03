'use strict';
angular.module('uolsacApp')
    .controller('loginCtrl', ['$scope', 'Util', 'FieldHandler', '$location', 'Notify', 'LoginLook', '$rootScope', '$routeParams',
        function($scope, Util, FieldHandler, $location, Notify, LoginLook, $rootScope, $routeParams) {

            var isRouteInitialized = false;

            function init (){

                Notify.removeAllNotifies();
                LoginLook.set();
                setVarsOnScope();
                FieldHandler.instantiateScope($scope);
                parseDestUrlParam();
                checkAuthenticationFailure();
                setFocusOnRightField();
                $rootScope.$broadcast('resetButton', { 'id' : 'submitLogin'} );

            }

            function setFocusOnRightField(){
                if( isUserParamOnUrl() ){
                    Util.setFocusOnField('pass');
                }else{
                    Util.setFocusOnField('userb');
                }
            }

            function checkAuthenticationFailure(){
                if( $location.path() === '/login/verifique_login_senha' ){ //> Caso haja problemas na autenticação, como senha errada, login inexistente etc. inicia a controller com erro
                    setAuthenticationFailureAlert();
                }
            }

            function isUserParamOnUrl(){
                if( $location.search().user || $routeParams.user ){
                    return true;
                }else{
                    return false;
                }
            }

            function setVarsOnScope(){

                $scope.preloader = false;
                $scope.skin = Util.getCamaleonProperty('SKIN');
                var user = $location.search().user || $routeParams.user ;

                var fields = {

                    'pass' : {
                        field : 'pass',
                        name : 'pass',
                        msg : '',
                        css : '',
                        value : ''
                    },

                    'user' : {
                        field : 'user',
                        name : 'userb',
                        msg : '',
                        css : '',
                        value : user
                    }

                };

                $scope.fields = fields;

                $scope.notify = {
                    title : '',
                    message : '',
                    type : 'danger',
                    visible : false
                };

                try{
                    $scope.urlPasswordRecovery = UOL.SAC.fixtures.Login.passwordRecoveryUrl;
                    $scope.sacProductNameOnLoginScreen = Util.getCamaleonProperty('BRAND_NAME')  + ' SAC';
                    $scope.productNameOnLoginScreen = Util.getCamaleonProperty('BRAND_NAME');
                }catch(e){

                }

            }

            function setAuthenticationFailureAlert(){

                $scope.notify = {
                    title : 'E-mail ou senha incorretos',
                    message : 'Verifique se o caps lock está ativado, pois diferenciamos letras maiúsculas e minúsculas. Se você esqueceu a senha, você pode <a href="' + $scope.urlPasswordRecovery + '">recuperá-la</a>.',
                    type : 'danger',
                    visible : true
                };

                var message = new FieldHandler.createMessage('user','','has-error');
                FieldHandler.add(message);

                message = new FieldHandler.createMessage('pass','','has-error');
                FieldHandler.add(message);

            }


            /**
             * Parseia e corrige, se necessário, o parâmetro DEST proveniente do acesso.uol.com.br pela url
             * @return void
            */
            function parseDestUrlParam(){
                var dest = $location.search().dest || $location.protocol() + '://' + $location.host(); // Adiciona a URL atual do App do SAC caso não seja passada na URL do acesso
                try {
                    if (dest) {
                        $scope.dest = dest.indexOf('REDIR|') >= 0 ? dest : 'REDIR|' + dest; // Inclui o prefixo do REDIR  Acesso caso seja omitido
                    }
                } catch (e) {
                }
            }


            $scope.clear = function(scope){
                if( isRouteInitialized ){ // Gambiarra para os browsers que disparam o evento change dos models no onLoad
                    FieldHandler.clean(scope);
                    $scope.notify.visible = false;
                }
                isRouteInitialized = true;
            };


            $scope.validate = function(){

                var message = {};
                Util.autoCompleteCatcher($scope);

                if( Util.isEmpty($scope.fields.user.value) ){

                    message = new FieldHandler.createMessage('user','','has-error');
                    FieldHandler.add( message, { 'focus' : true } );

                    $scope.notify.title = false;
                    $scope.notify.type = 'danger';
                    $scope.notify.message = 'Por favor, preencha o campo abaixo com o seu e-mail.';
                    $scope.notify.visible = true;

                    return false;
                }

                if( Util.isEmpty($scope.fields.pass.value) ){

                    message = new FieldHandler.createMessage('pass','','has-error');
                    FieldHandler.add( message, { 'focus' : true } );

                    $scope.notify.title = false;
                    $scope.notify.type = 'danger';
                    $scope.notify.message = 'Por favor, preencha o campo abaixo com a sua senha';
                    $scope.notify.visible = true;

                    return false;

                }

                return true;

            };


            $scope.submitForm = function(){
                if( $scope.validate() ){
                    angular.element('#login form').attr('action', 'https://acesso.uol.com.br/login.html' );
                    angular.element('#login form').submit();
                }
            };

            init();

        }
    ]);
