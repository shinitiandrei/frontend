'use strict';
angular.module('uolsacApp')
	.controller('colorHrCtrl', ['$scope', 'Look',
		function($scope, Look) {

			this.init = function(){
				this.getProviderData();
			};

            this.getProviderData = function(){
                $scope.colorHrLook = Look.colorHr;
            };

	        this.init();
		}
	]);
