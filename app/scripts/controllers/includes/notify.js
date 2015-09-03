'use strict';
angular.module('uolsacApp')
	.controller('notifyCtrl', ['Notify', '$scope', 'Look',
		function(Notify, $scope, Look) {

			this.init = function(){
				$scope.alerts = Notify.getAllNotifies();
                $scope.isMessagesCarouselOnDisplay = Look.carouselMessage.isVisible;
			};

	        this.init();

	    }
]);
