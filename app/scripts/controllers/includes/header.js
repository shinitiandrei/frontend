'use strict';
angular.module('uolsacApp')
    .controller('headerCtrl', ['$rootScope', '$scope', '$location', 'User', 'Util', 'Look',
        function ($rootScope, $scope, $location, User, Util, Look) {

            function init() {
                setInitialVariablesOnScope();
                setUrlVars();
                reloadUserData();
                setMenuListeners();
            }

            function setMenuListeners(){

                $scope.$watch( 'isCollapsedRight', function(value){

                    if( value ){
                        $scope.collapsedRightStyle = {'height':'0px'};
                        Util.scroll.enable();
                    }else{
                        $scope.collapsedRightStyle = {'height':'100px'};
                        Util.scroll.disable();
                    }

                });

                $scope.$watch( 'isCollapsedLeft', function(value){

                    if( value ){
                        $scope.collapsedLeftStyle = {'width':'0px'};
                        Util.scroll.enable();
                    }else{
                        if( Util.getBootstrapGridSize().bootstrapFormat === 'md' ){
                            $scope.collapsedLeftStyle = {'width':'320px'};
                        }else{
                            $scope.collapsedLeftStyle = {'width':'280px'};
                        }
                        Util.scroll.disable();
                    }

                });

                angular.element( window ).resize(function() {

                    if( Util.getBootstrapGridSize().bootstrapFormat === 'lg' ){
                        Util.scroll.enable();
                    }else{
                        if( !$scope.isCollapsedLeft || !$scope.isCollapsedRight ){
                            Util.scroll.disable();
                        }else{
                            Util.scroll.enable();
                        }
                    }

                });

            }

            function setInitialVariablesOnScope(){
                $scope.homeLink = Util.getCamaleonProperty('HOME_URL');
                $scope.skin = Util.getCamaleonProperty('SKIN');
                $scope.userInfoVisibility = true;
            }

            function setUrlVars(){
                $scope.getBootstrapGridSize = Util.getBootstrapGridSize;
                $scope.loginLink = '#/login?dest=REDIR|' + encodeURIComponent( window.location.href.toString() );
                $scope.logoutLink = 'https://acesso.uol.com.br/logout.html?dest=REDIR|https%3A%2F%2Fsac.uol.com.br' +  window.location.pathname;

            }

            function reloadUserData(){

                $scope.isLoggedIn = User.getCachedData().logged;
                Look.setAuthenticatedAssets();
                $scope.menuActive = Look.header.menu.active;
                $scope.isMenuVisible = Look.header.menu.isVisible;
                $scope.userInfoVisibility = Look.header.userInfo.isVisible;
                $scope.namPerson = User.getCachedData().namPerson;
                setUrlVars();

                try{
                    $scope.links = UOL.SAC.fixtures.menu;
                }catch(e){
                    console.info('Impossivel ler o Fixture: ', e);
                }

            }

            $scope.logoutClick = function(){
                window.location = $scope.logoutLink;
            };

            $scope.goBackToHome = function (){
                $location.path('/');
            };

            $scope.click = Util.cacheSlayer.click;

            $rootScope.$on('userReloaded', reloadUserData);
            $rootScope.$on('lookReloaded', reloadUserData);

            init();

        }]);
