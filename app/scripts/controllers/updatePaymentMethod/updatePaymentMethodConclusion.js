'use strict';

angular.module('uolsacApp')
 .controller('updatePaymentMethodConclusionCtrl', ['$scope', 'UpdatePaymentMethodLook', 'FieldHandler', 'Notify', 'Recoveries',
        function updatePaymentMethodConclusionCtrl($scope, UpdatePaymentMethodLook, FieldHandler, Notify, Recoveries) {


			UpdatePaymentMethodLook.set();
            FieldHandler.instantiateScope($scope);
            Notify.removeAllNotifies();
            $scope.Notify = Notify;

            var paymentData = Recoveries.getPaymentData();

            $scope.showPaymentMethodConclusion = paymentData.paymentMethodConclusion;
            
            if($scope.showPaymentMethodConclusion === 'billet'){
	            $scope.billetConclusionData = {
					'flag': paymentData.flag,
					'expirationDate': paymentData.expirationDate,
					'street': paymentData.address.street,
					'number': paymentData.address.number,
					'neighborhood': paymentData.address.neighborhood,
					'complement': paymentData.address.complement,
					'city': paymentData.address.city,
					'state': paymentData.address.state,
					'zipcode': paymentData.address.zipcode,
	            };
            }

            if($scope.showPaymentMethodConclusion === 'creditCard'){
	            $scope.creditCardConclusionData = {
					'flag': paymentData.flag,
					'creditCardNumber': paymentData.creditCardNumber,
					'validity': paymentData.expirationDate
	            };
            }

            if($scope.showPaymentMethodConclusion === 'accountDebit'){
	            $scope.accountDebitConclusionData = {
					'debitDay': paymentData.accountInformationData.debitDay,
					'flag': paymentData.flag,
					'bank': paymentData.accountInformationData.bank,
					'agency': paymentData.accountInformationData.agency,
					'currentAccount': paymentData.accountInformationData.currentAccount
	            };
            }


        }
]);
