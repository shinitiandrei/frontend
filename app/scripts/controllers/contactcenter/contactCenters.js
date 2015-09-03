'use strict';
angular.module('uolsacApp')
    .controller('contactCentersCtrl', ['$scope', 'Notify', 'ContactCenterLook',
        function($scope, Notify, ContactCenterLook) {

            this.init = function(){
                ContactCenterLook.set();
                $scope.totalNumberOfMessagesOnDisplay = Notify.getTotalNumberOfMessagesOnDisplay();
            };

            this.init();
        }
    ]);
