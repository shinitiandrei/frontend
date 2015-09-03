'use strict';
angular.module('uolsacApp')
    .controller('footerCtrl', ['$scope', 'Look',
        function($scope, Look) {

            function init(){
                getFixtures();
                getLook();
                instantiateFooterOnDOM();
            }

            function instantiateFooterOnDOM(){

                var elem = document.getElementById('fullCopyright');

                try{
                    UOL.footer({target: elem});
                }catch(e){
                }

                try{
                    BOL.footer({target: elem});
                }catch(e){
                }

            }

            function getFixtures(){
                try{
                    $scope.disclaimerHtml = UOL.SAC.fixtures.footer.PasswordAlert.template;
                }catch(e){

                }
            }

            function getLook(){
                $scope.menuFooter = Look.footer.menu;
                $scope.disclaimerFooter = Look.footer.disclaimer;
                $scope.copyrightFooter = Look.footer.copyright;
            }

            init();

        }
]);
