'use strict';
angular.module('uolsacApp').config(
    function($provide) {
        $provide.factory('HttpInterceptor', ['Notify', '$q', 'Util', 'ErrorHandler', 'FieldHandler', '$location', '$analytics',
            function(Notify, $q, Util, ErrorHandler, FieldHandler, $location, $analytics) {

                return {

                    'responseError': function(responseError) {

                        var notify = Notify.setNewNotifyObject();

                        // responseError.status = 503; // ========  --- !!! MOCK IT
                        switch (responseError.status) {

                            case 400:

                                if (responseError.data.errors.messages) {
									FieldHandler.add(responseError, {'focus' : true});
									ErrorHandler.add(responseError, {});
                                }

                                break;


                            case 401:

                                notify.title = 'Você tentou acessar uma url que requer autenticação.';
                                notify.message = 'Por favor, acesse sua conta';
                                notify.code = 1;
                                notify.type = 'warning';
                                notify.response = responseError;
                                Notify.add(notify);

								$analytics.eventTrack('error', { message: notify.title });
                                $location.path('/login');
                                break;


                            case 403:

                                if (responseError.data.errors.messages){
                                    Notify.removeAllNotifies();
                                    FieldHandler.add(responseError, {'focus' : true});
									ErrorHandler.add(responseError, {
										sufix: '<br> Se os problemas persistirem, fale com a nossa Central de Atendimento por meio dos nossos <a href="#/atendimento">telefones de contato</a>.',
										type: 'block',
                                        exclusiveContent: true
									});
                                }

                                break;


                            case 404:

                                if (responseError.data.errors.messages) {
									FieldHandler.add(responseError, {'focus' : true});
                                } else {
                                    notify.title = 'P&aacute;gina n&atilde;o encontrada. (404)';
                                    notify.message = 'A url: <i>' + Util.cacheSlayer.clean(responseError.config.url) + '</i> não foi encontrada.';
                                    notify.code = 1;
                                    notify.type = 'warning';
                                    notify.response = responseError;
                                    Notify.add(notify);

									$analytics.eventTrack('error', { message: notify.title });
                                }

                                break;


                            case 500:
                            case 501:
                            case 503:

                                notify.title = 'Erro Interno. (' + responseError.status + ')';
                                notify.message = 'O serviço: <b>' + Util.cacheSlayer.clean(responseError.config.url) + '</b> apresentou erros. ';
                                notify.message += 'Por favor, entre em contato com a <a href="#/atendimento">Central de Atendimento</a>.';
                                notify.code = 1;
                                notify.type = 'danger';
                                notify.response = responseError;
                                Notify.add(notify);

								$analytics.eventTrack('error', { app: notify.title });
                                break;

                        }

                        return $q.reject(responseError);
                    },

                    'response': function(response) {
                        return response;
                    },

                    'request': function(request) {

                        request.timeout = Util.getCamaleonProperty('TIMEOUT');
                        request.headers['X-Skin'] = Util.getCamaleonProperty('SKIN');
                        request.headers['X-Validation-Version'] = 'v0.0.20';

                        if( request.url.indexOf('sac.uol.com.br/api/') > 0 || request.url.indexOf('fixture') > 0 ){
                            var urlJoiner = request.url.indexOf('?') > 0 ? '&' : '?';
                            request.url = request.url + urlJoiner + 'cacheSlayer=' + new Date().getTime();
                        }

                        return request;

                    }

                };
            }
        ]);
    }
);
