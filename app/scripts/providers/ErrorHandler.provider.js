'use strict';
angular.module('uolsacApp').config(
    function($provide) {
        $provide.factory('ErrorHandler', ['$analytics', 'Notify', function($analytics, Notify) {

            function _add(response, config) {

				config = config || {};

				if (response.data.errors.messages) {

					for (var a = 0; a < response.data.errors.messages.length ; a++) {

						var item = response.data.errors.messages[a];

						if ( item && !item.field) {

							var notify = Notify.setNewNotifyObject();
							notify.title   = item.title ? item.title  : ' ';
							notify.message = item.message + (config.sufix ? config.sufix : '');
							notify.code    = item.code;
							notify.type    = config.type ? config.type : 'warning';
							notify.exclusiveContent = config.exclusiveContent ? config.exclusiveContent : false;
							Notify.add(notify);

							$analytics.eventTrack('error', { field: '', message: item.message });

						}

					}

				}
            }

            return {
                add : _add
            };

        }]);
    }

);