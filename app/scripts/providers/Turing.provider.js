'use strict';
angular.module('uolsacApp').config(
    function($provide) {
        $provide.factory('Turing', ['Util', '$injector',
		function(Util, $injector) {

            var self = {};
            var scope = {};

            /**
              * Adiciona o turing no elemento dom sac-turing
              */
            function _add(response) {

                var captchaDemand = _check(response);

                if (captchaDemand) {
                    var turing = _getTuringObject(response);
                    _buildDirective(turing);
                }

            }



            /**
              * Verifica se existe a ocorrencia de turing no hearder do serviço
              */
            function _check(response) {
                return response.headers('X-Turing-Image') !== null;
            }



            /**
              * Constroi um objeto turing através do objeto response
              */
            function _getTuringObject(response) {
                return {
                    'imagem' : response.headers('X-Turing-Image'),
                    'audio'  : response.headers('X-Turing-Audio'),
                    'token'  : response.headers('X-Turing-Token')
                };
            }



			/**
              * Constroi a diretiva de turing dentro do container
              */
			function _buildDirective(turing) {

				var turingDOMContainer = angular.element('#sac-turing-container');

				scope = turingDOMContainer.scope();
				_buildScope(turingDOMContainer);

				var compile = $injector.get('$compile');
				var sacTuring = compile('<div sac-turing imagem="\'' + turing.imagem + '\'" audio="\'' + turing.audio + '\'" token="\'' + turing.token + '\'"></div>')(scope);
				turingDOMContainer.html(sacTuring);
            }



			/**
              * Adiciona metodos ao scope que sera usado na diretiva.
              */
            function _buildScope() {

				scope.refreshImage = _refreshImage;
                scope.playAudio = _playAudio;
                self.scope = scope;

            }




            /**
              * Atualiza a imagem do turing.
              */
            function _refreshImage() {

				var http =  $injector.get('$http');
				http.get('https://sac.uol.com.br/api/captcha')
				.success(function(resource) {

					var turing = {
						'imagem' : resource.item.urlMediaImage,
						'audio'  : resource.item.urlMediaAudio,
						'token'  : resource.item.token
					};

					_buildDirective(turing);
				})
				.error(function() {

					var turing = {
						'imagem' : 'https://imguol.com/p/sac/uol/images/27cdb67b.turingBlock.png',
						'audio'  : null,
						'token'  : null
					};

					_buildDirective(turing);
				});
            }




            /**
              * Reproduz o captcha em audio.
              */
            function _playAudio() {

				if (!Util.isAudioCapableAndWavFormatCompatible()) {
					var audio = new Audio(_audio());
					audio.play();
				} else {
					window.open(_audio(), '_blank', 'toolbar=no, scrollbars=no, resizable=yes, width=400, height=100');
				}
            }

            /**
              * @returns Token atual que identifica o captcha.
              */
            function _token() {
                return ((self.scope && self.scope.turing) ? self.scope.turing.token : '');
            }

            /**
              * @returns A resposta digitada pelo usuario.
              */
            function _answer() {
                return ((self.scope && self.scope.turing) ? self.scope.turing.answer : '');
            }

            /**
              * @returns URL do audio do captcha.
              */
            function _audio() {
                return ((self.scope && self.scope.turing) ? self.scope.turing.audio : '');
            }

            return {
                add    : _add,
                token  : _token,
                answer : _answer
            };

        }]);
    }
);
