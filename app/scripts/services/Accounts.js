'use strict';
angular.module('uolsacApp').config(
function ($provide) {
	$provide.factory('Accounts', ['$resource', 'Notify', '$rootScope',
	function ($resource, Notify, $rootScope) {

		var data = {};
        data.items = [];

		var hasDebit = function () {

			Notify.removeTypeNotifies('debit');

			for (var i = 0; i < data.items.length; i++) {

				var account = data.items[i];

                if (account.inDebit) {

					var notify = {
						title: 'Há débitos pendentes!',
						message: '<span class="hidden-xs hidden-sm">Evite ficar sem acesso aos seus produtos.</span> <a href="' + UOL.SAC.fixtures.quittanceBox.quittanceLandingPageUrl + '" >Regularize seus débitos</a>.',
						type: 'debit',
						persistent: true
					};

					Notify.add(notify);

					return true;

				}
			}

			return false;
		};

		var getAsync = function (user) {

			var quittanceBoxConfig = {};

            try {
				quittanceBoxConfig = UOL.SAC.fixtures.quittanceBox.activate || false;
			} catch (e) {}

			if (quittanceBoxConfig) {
				if (user.logged) {
					resource().get();
				}
			}

		};

		var actions = {

			'get': {
				method: 'GET',
				interceptor: {

                    response: function (response){
						data.items = angular.extend(data.items, response.data.items);
						hasDebit();
                        return data;
					},

					responseError: function (){
						Notify.removeTypeNotifies('danger');
					}

				}
			}

		};

		var resource = function () {
			return $resource('https://sac.uol.com.br/api/users/accounts', {}, actions);
		};

        var setCachedData = function(accounts) {
            data = accounts;
        };

        var getCachedData = function(){
            return data;
        };

        $rootScope.$on('userReloaded', function(event, args){
            if( !args.logged ){
                setCachedData(null);
                Notify.removeTypeNotifies('debit');
            }
        });

		return {
			resource: resource,
			getAsync: getAsync,
			hasDebit: hasDebit,
            setCachedData: setCachedData,
            getCachedData: getCachedData
		};

	}]);

});
