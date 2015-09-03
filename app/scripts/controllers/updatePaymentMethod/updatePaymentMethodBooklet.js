'use strict';
angular.module('uolsacApp')
 .controller('updatePaymentMethodBookletCtrl', ['$scope', 'Validator', 'FieldHandler', '$location', 'Recoveries',
        function updatePaymentMethodBookletCtrl($scope, Validator, FieldHandler, $location, Recoveries) {

			FieldHandler.instantiateScope($scope);

            $scope.showCurrentAddress = true;

            $scope.showEmptyAddress = false;
            $scope.showIncompleteAddress = false;

            $scope.address = {

				search : function search(){

					this.init = function(){

                        FieldHandler.instantiateScope($scope);

                        if(!validateZipcode()) {
                            return null;
                        }

                        if($scope.fields.zipcode.value === $scope.mockAddress.zipcode){
							$scope.showAddress = 'incompleteAddress';

                        } else{
							$scope.showAddress = 'emptyAddress';
                        }
					};

					this.init();
				},

				update: function update(){

					this.init = function(){

                        FieldHandler.instantiateScope($scope);

                        if(!validateBilletExpirationDate()) {
                            return null;
                        }

                        if($scope.showCurrentAddress === true){

                            var paymentData = {
                                'address': $scope.mockAddress,
                                'paymentMethodConclusion': 'billet',
                                'flag': 'master',
                                'expirationDate': $scope.fields.billetExpirationDate.value
                            };

                            Recoveries.setPaymentData(paymentData);
                            
                            $location.path('/cobranca/pagamentoalterado');

                        } else{

                            if(!validateZipcode()) {
                                return null;
                            }

                            if($scope.showAddress === 'emptyAddress'){

                                $scope.address.updateEmpty();

                            } else if($scope.showAddress === 'incompleteAddress'){
                                
                                $scope.address.updateIncomplete();
                            }
                            
                        }

					};

					this.init();
				},

				updateEmpty : function updateEmpty(){

					this.init = function(){

						FieldHandler.instantiateScope($scope);

						if(!validateZipcode()) {
                            return null;
                        }
						if(!validateEmptyAddressStreet()) {
                            return null;
                        }
                        if(!validateEmptyAddressNumber()) {
                            return null;
                        }
                        if(!validateEmptyAddressNeighborhood()) {
                            return null;
                        }

                        $scope.mockAddress.zipcode = $scope.fields.zipcode.value;
                        $scope.mockAddress.street = $scope.fields.emptyAddressStreet.value;
                        $scope.mockAddress.number = $scope.fields.emptyAddressNumber.value;
                        $scope.mockAddress.complement = $scope.fields.emptyAddressComplement.value;
                        $scope.mockAddress.neighborhood = $scope.fields.emptyAddressNeighborhood.value;

                        var paymentData = {
                                'address': $scope.mockAddress,
                                'paymentMethodConclusion': 'billet',
                                'flag': 'visa',
                                'expirationDate': $scope.fields.billetExpirationDate.value
                            };

                        Recoveries.setPaymentData(paymentData);

                        $location.path('/cobranca/pagamentoalterado');
					};

					this.init();
				},

				updateIncomplete: function updateIncomplete(){

					this.init = function(){

						FieldHandler.instantiateScope($scope);

						if(!validateZipcode()) {
                            return null;
                        }
                        if(!validateIncompleteAddressNumber()) {
                            return null;
                        }

                        $scope.mockAddress.zipcode = $scope.fields.zipcode.value;
                        $scope.mockAddress.number = $scope.fields.incompleteAddressNumber.value;
                        $scope.mockAddress.complement = $scope.fields.incompleteAddressComplement.value;

                        var paymentData = {
                                'address': $scope.mockAddress,
                                'paymentMethodConclusion': 'billet',
                                'flag': 'visa',
                                'expirationDate': $scope.fields.billetExpirationDate.value
                            };

                        Recoveries.setPaymentData(paymentData);

                        $location.path('/cobranca/pagamentoalterado');
					};

					this.init();
				}
            };
            
            var validateZipcode = function validateZipcode(){
                return Validator.execute([$scope.fields.zipcode]);
            };

            var validateEmptyAddressStreet = function validateEmptyAddressStreet(){
                return Validator.execute([$scope.fields.emptyAddressStreet]);
            };

            var validateEmptyAddressNumber = function validateEmptyAddressNumber(){
                return Validator.execute([$scope.fields.emptyAddressNumber]);
            };

            var validateEmptyAddressNeighborhood = function validateEmptyAddressNeighborhood(){
                return Validator.execute([$scope.fields.emptyAddressNeighborhood]);
            };

            var validateIncompleteAddressNumber = function validateIncompleteAddressNumber(){
                return Validator.execute([$scope.fields.incompleteAddressNumber]);
            };

            var validateBilletExpirationDate = function validateBilletExpirationDate(){
                return Validator.execute([$scope.fields.billetExpirationDate]);
            };

            //Mock
            $scope.mockAddress = {
                'street':'Av. Brigadeiro Faria Lima',
                'number':'1280',
                'neighborhood':'Jardim Paulistano',
                'complement':'2º andar',
                'city':'São Paulo',
                'state':'SP',
                'zipcode':'01002123'
            };

            $scope.expirationDate = [
                '22/01/2015',
                '15/02/2015',
                '18/03/2015',
                '20/04/2015',
                '17/05/2015'
            ];

        }
]);
