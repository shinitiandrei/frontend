'use strict';
angular.module('uolsacApp')
    .controller('socialNetworksCtrl', ['$scope', 'FieldHandler', '$modal', '$rootScope',
        function($scope, FieldHandler, $modal, $rootScope) {

            FieldHandler.instantiateScope($scope); //> Instancia o Controller em uso no FieldHandler

			$scope.socialNetworks = {

				unlink : function unlink(id){

					this.init = function(){
						$scope.openUnlinkModal(id);
					};

					this.init();
				}
            };

            $scope.tooltipMessage = 'Esta opção aparece quando você acessa algum produto UOL usando suas redes sociais';

            $scope.showStatus = false;

			$scope.openUnlinkModal = function(id){

				var modalInstance;

				modalInstance = $modal.open({
					templateUrl: 'socialNetworksModal',
					controller: 'modalInstanceCtrl',
					scope: (function() {
						var scope = $rootScope.$new();
						scope.showStatus = $scope.showStatus;
						scope.itemId = id;
						scope.items = $scope.items;
						scope.showNotify = $scope.showNotify;
						return scope;
					})()
				});
			};

			/*Mock redes sociais*/
			$scope.items = [
				{
					'id': '1',
					'name': 'Facebook',
					'urlMediaImage': 'https://p.simg.uol.com.br/apisocial/icons/facebook.gif'
				},
				{
					'id': '2',
					'name': 'Google',
					'urlMediaImage': 'https://p.simg.uol.com.br/apisocial/icons/google.gif'
				}
				// {
				// 	'id': '3',
				// 	'name': 'Yahoo',
				// 	'urlMediaImage': 'https://p.simg.uol.com.br/apisocial/icons/yahoo.gif'
				// },
				// {
				// 	'id': '4',
				// 	'name': 'Linkedin',
				// 	'urlMediaImage': 'https://p.simg.uol.com.br/apisocial/icons/linkedin.gif'
				// },
				// {
				// 	'id': '5',
				// 	'name': 'Twitter',
				// 	'urlMediaImage': 'https://p.simg.uol.com.br/apisocial/icons/twitter.gif'
				// },
				// {
				// 	'id': '6',
				// 	'name': 'Orkut',
				// 	'urlMediaImage': 'https://p.simg.uol.com.br/apisocial/icons/orkut.gif'
				// },
				// {
				// 	'id': '7',
				// 	'name': 'UOL',
				// 	'urlMediaImage': 'https://p.simg.uol.com.br/apisocial/icons/uol.gif'
				// }
			];

			if($scope.items.length < 1){
				$scope.showNotify = true;
			}
        }
])
    .controller('modalInstanceCtrl', ['$scope', '$modalInstance', '$timeout',
        function($scope, $modalInstance, $timeout) {

			$scope.unlinkModal = {

				confirmation : function confirmation(){

					this.init = function(){
						$scope.showStatus = true;
						console.log($scope.itemId);

						for(var i=0 ; i<$scope.items.length; i++)
					    {
					        if($scope.items[i].id===$scope.itemId){
					            $scope.items.splice(i, 1);
					        }
					    }

					    console.log($scope.items);

					    if($scope.items.length < 1){
							$scope.showNotify = true;
						}
					    
						$timeout(function(){
							$modalInstance.close();
						}, 3000);

					};

					this.init();
				},

				cancel : function cancel(){

					this.init = function(){
						$modalInstance.dismiss('cancel');
					};

					this.init();
				}
			};
		}
]);