'use strict';

angular.module('uolsacApp')
    .controller('wrapper_wrapperCtrl', [ '$scope', '$routeParams', '$location', '$timeout', 'Util', 'WrapperLook', 'Accounts', 'User', 'Notify',
        function($scope, $routeParams, $location, $timeout, Util, WrapperLook, Accounts, User, Notify) {

			var url = null;
			var iframe = null;
			var wrapper = null;
			var loadingImg = null;

			$scope.init = function() {
				WrapperLook.set();
				url = $routeParams.url;
				createIframe(url);
			};

			function createIframe (url) {
				$timeout(function() {

                    Notify.removeAllNotifies();

                    document.getElementById('viewport').setAttribute('content','width=620');

					wrapper = $('#iframe-wrapper');
					wrapper.hide();

					loadingImg = $('#iframe-loading');
					loadingImg.show();

					iframe = $('#iframe-element');
					iframe.remove();

					iframe = $('<iframe id="iframe-element" src="' + url + '" width="100%" height="300px" marginheight="0" frameborder="0" scrolling="no"></iframe>');
					iframe.bind('load', updateIframe);

					wrapper.append(iframe);

				}, 10);
			}

			function updateIframe () {

				$timeout(function() {

					var contentWindow = null;
					var location = null;
					var document = null;
					var body = null;
                    Notify.removeAllNotifies();

					location = iframe[0].contentWindow.location;

					if ( check(location) ) {

						contentWindow = iframe[0].contentWindow;
						document = iframe[0].contentWindow.document;
						body = iframe[0].contentWindow.document.body;

						loading(contentWindow);
						cleanUp(document);
						fill(body);
						autoresize(body);

					}

				}, 10);
			}

			function check (location) {

				if ( location && location.hash ) {
                    if (location.hash !== '') {

                        $timeout(function() {
                            var _location = Util.location.parse(location);
                            var _path = _location.path;
                            var _search = adaptSearch(_location.search);
                            $location.path(_path).search(_search);
                        }, 10);

                        return false;
					}
				}

				if ((location.href.indexOf('skin=bol') > -1) ||
					(location.href.indexOf('skin=zipmail') > -1) ||
					(location.href.indexOf('skin=folha') > -1)) {
					window.location = location;
					return false;
				}

				return true;
			}

			function loading (window) {
				$(window).unload(function () {
					wrapper.hide();
					loadingImg.show();
				});
			}

			function cleanUp (document) {
				try {

					var body = document.body;
					var location = document.location;
					var href = location.href;

					// SAC LEGACY
					$('.barrauol-bg', body).remove();
					$('#header-sac', body).remove();
					$('.orangeHr', body).remove();
					$('#naveg', body).remove();
					$('#menu', body).remove();
					$('#footer', body).remove();

					// SAC DOLPHIN
					$('#sac-menu', body).remove();
					$('#bread-crumb', body).remove();

					var outer = $('#outer', body);
					outer.css('width', '100%');
					outer.css('max-width', '588px');

					var main = $('#main', body);
					main.css('float', 'none');
					main.css('width', '100%');
					main.css('max-width', '588px');
					main.css('min-height', '0px');
					main.append($('<div style="clear:both;"></div>'));

					var content = $('#content', body);
					content.css('width', '100%');
					content.css('max-width', '588px');

					var maincontent = $('#content', main);
					maincontent.css('width', '100%');
					maincontent.css('max-width', '588px');

					var boxaviso = $('#box-aviso', body);
					boxaviso.css('margin', '0px');

					// Quitacao
					if (href.indexOf('https://sac.uol.com.br/conta/quitacao.html') > -1) {
						adaptQuittance( Accounts.getCachedData().items, body);
					}

					// Cancelamento
					if (href.indexOf('https://sac.uol.com.br/inscricao/solicitar_cancelamento.html') > -1) {
						adaptCancel(body);
					}

					// Endereço de Acesso
					if (href.indexOf('https://sac.uol.com.br/inscricao/endereco_acesso.html?id_insc=') > -1) {
						content.css('height', '590px');
					}

					// LINKS
					if (href.indexOf('https://sac.uol.com.br/info/') > -1) {
						sacLinks(body);
					}



				} catch (e) {}
			}

			function sacLinks (body) {

				// Remove o hash
				$('a', body).each(function () {
					$(this).attr('href', $(this).attr('href').replace(/\#.*$/g, ''));
				});

				$('a', body).each(function () {

					var hostname = $(this).prop('hostname');
					if ((hostname === 'sac.uol.com.br') || (hostname === 'cadastro.uol.com.br')) {
						// Referenciam o sac.uol.com.br
						$(this).attr('target', '_self');
					} else {
						// Não referenciam o sac.uol.com.br
						$(this).attr('target', '_blank');
					}
				});
			}

			function fill (body) {
				$timeout(function() {

					show();

					var newheight = $(body).css('height');
					if (iframe.attr('height') !== newheight) {
						iframe.attr('height', newheight);
					}

				}, 10);
			}

			function autoresize (body) {
				$timeout(function() {

					var newheight = $(body).css('height');

					if (newheight !== '0px') {
						if (iframe.attr('height') !== newheight) {
							iframe.attr('height', newheight);
							//console.log(newheight);
						}
					}

					autoresize(body);

				}, 500);
			}

			function show () {
				wrapper.show();
                loadingImg.hide();
			}

			function adaptSearch(search) {

				if (search && search.dest) {
					search.dest = decodeURI(search.dest);
					search.dest = 'REDIR|https://sac.uol.com.br/#/wrapper?url=' + search.dest.substring(6);
				}

				return search;

			}

			function adaptQuittance(accounts, body) {

				// Esconde todas as contas
				$('.account-debit-inside', body).hide();
				$('.account-debit-inside', body).html('Sem d&eacute;bitos pendentes.');

				if (accounts && accounts.length <= 0) {
					$('.account-debit-inside', body).show();
					return false;
				} else {

					var possuiDebito = false;
					var possuiBooklet = false;

					for (var j = 0; j < accounts.length; j++) {

						if (accounts[j].inDebit) {
							possuiDebito = true;
						}

						if (accounts[j].booklet && accounts[j].booklet !== '') {
							possuiBooklet = true;
						}
					}

					if (!possuiDebito && !possuiBooklet) {
						$('#account-debit-header', body).html('N&atilde;o h&aacute; d&eacute;bitos pendentes.');
						$('#loading-icon', body).hide();
						$('#outer', body).show();
						return false;
					}
				}

				try {

					for (var i = 0; i < accounts.length; i++) {

						if ((accounts[i].inDebit) || (accounts[i].booklet && accounts[i].booklet !== '')) {

							// Mostra link para quitacao
							if (accounts[i].inDebit) {
								$('#account-debit-' + accounts[i].id, body).html('<a href="https://sac.uol.com.br/conta/quitacao.html?id_acct=' + accounts[i].id + '" id="account-debit-' + accounts[i].id + '">Valor a ser quitado: R$ ' + accounts[i].debit.toFixed(2).replace('.', ',') + '</a>');
							} else {
								if (accounts[i].booklet !== '') {
									$('#account-debit-' + accounts[i].id, body).html('<a target="_blank" href="https://sac.uol.com.br/conta/boleto.html?redirect=true&idBooklet=' + accounts[i].booklet + '" id="account-debit-' + accounts[i].id + '">2&#170; via do boleto de quita&#231;&#227;o</a>');
								}
							}

							// Mostra contas em debito
							$('.account-holder-' + accounts[i].id, body).show();
							$('.account-debit-inside', body).show();
						}
					}

				} catch (err) {}

				// Mostra o conteudo
				$('#loading-icon', body).hide();
				$('#outer', body).show();
			}

			function adaptCancel(body) {
                var lista = $('.inscription-Ativa', body);
                for (var i = 0; i < lista.length; i++) {
                    var accountId = lista.eq(i).attr('account');
                    $('.account-holder-'+accountId, body).show();
                }
				$('#loading-icon', body).hide();
				$('#outer', body).show();
			}

            function receiveMessage(event) {

                if (event.origin !== 'https://sac.uol.com.br') {
                    return;
                }

                if (event.data === 'quittance') {
                    Accounts.getAsync( User.getCachedData() );
                }

            }

            window.addEventListener('message', receiveMessage, false);
        }
]);
