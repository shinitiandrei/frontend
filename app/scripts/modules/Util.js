/* jshint undef: false, unused: false */
/* global exceptionHandler */
/* global escape: true */
'use strict';
angular.module('UOLsac.Util', [])
    .provider('Util', function() {
        this.$get = ['camaleonBridge', '$location',
            function(camaleonBridge, $location) {

                var self = this;

                /**
                 * Verifica se o Objeto é nulo, ou indefinido ou uma string vazia.
                 * @param object Object
                 * @returns Boolean
                 */
                this.isEmpty = function(object){
                    if(object !== null && object !== undefined && object !== ''){
                        return false;
                    }else{
                        return true;
                    }
                };


                /**
                 * Seta o foco automaticamente no field indicado
                 * @param {string} fieldName Nome do input - attr name
                 */
                this.setFocusOnField = function(fieldName){
                    setTimeout(function (){
                        angular.element( 'input[name="' + fieldName + '"]' ).focus();
                    }, 500);
                };


                /**
                 * Retira todos os espaços em branco tanto antes como depois da palavra
                 * @param text como String
                 * @returns uma String sem espaçamentos
                 */
                this.trim = function( text ) {
                    if (typeof text === 'string') {
                        return text.replace(/^\s+|\s+$/g, '');
                    } else{
                        return text;
                    }
                };


                /**
                 * Returna o equivalente Bootstrap do tamanho da Tela
                 * @return {string} xs = Xtra Small, sm = small, md = medium, lg = large
                 */
                this.getBootstrapGridSize = function(){

                    var sufix = {};

                    if( $(window).width() <= 320 ){
                        sufix.bootstrapFormat = 'xs';
                        sufix.monacoFormat = '740x230​';
                    }else if( $(window).width() > 321 && $(window).width() < 767  ){
                        sufix.bootstrapFormat = 'sm';
                        sufix.monacoFormat = '768x230';
                    }else if( $(window).width() > 767 && $(window).width() < 991  ){
                        sufix.bootstrapFormat = 'md';
                        sufix.monacoFormat = '992x230';
                    }else if( $(window).width() >= 992 ){
                        sufix.bootstrapFormat = 'lg';
                        sufix.monacoFormat = '1500x230';
                    }

                    return sufix;

                };


                this.scroll = {

                    enable : function(){
                        angular.element('body').removeClass('stop-scrolling');
                    },

                    disable : function(){
                        angular.element('body').addClass('stop-scrolling');
                    }

                };


                /**
                 * Função para contornar o problema dos browsers não dispararem nenhum evento quando usado o auto-complete
                 * @param  {$scope} scope
                 * @return void
                 */
                this.autoCompleteCatcher = function(scope){
                    var fieldOnDom = {};
                    try{
                        for(var field in scope.fields){

                            fieldOnDom = angular.element('input[name="' + scope.fields[field].name + '"]' );

                            if( fieldOnDom.size() > 0 ){
                                scope.fields[field].value = fieldOnDom.val();
                            }
                        }
                    }catch(e){
                        console.warn(e);
                    }
                };


                /**
                 * Exporta o CamaleonBridge, que contem as definições customizadas por skins
                 * @param  {string} A constante do setup.json do camaleão desejada
                 * @return String retorna o valor equivalente a constante no steup.json
                 */
                this.getCamaleonProperty = function(constant){
                    return camaleonBridge.getSharedConstant(constant);
                };


                this.cacheSlayer = {


                    /**
                     * Limpa o cacheSlayer para exibir urls ao usuário de forma mais clara
                     * @param  {string} endpointUrl a url suja com o cacheSlayer
                     * @return {string} retorna a url limpa sem o parâmetro cacheSlayer
                     */
                    clean : function( endpointUrl ){

                        if( /\?(cacheSlayer)\=\d*/g.test(endpointUrl) ){
                            endpointUrl = endpointUrl.replace(/\?(cacheSlayer)\=\d*/g, '');
                        }

                        if( /\&(cacheSlayer)\=\d*/g.test(endpointUrl) ){
                            endpointUrl = endpointUrl.replace(/\&(cacheSlayer)\=\d*/g, '');
                        }

                        return endpointUrl;

                    },



                    /**
                     * Adiciona o Parâmetro cachSlayer no final da URL de acordo com os parametros nela
                     * @param url
                     * @returns String Url final com o parâmetro cacheSlayer adicionado
                     */
                    add : function(link){

                        var  uncachedUrl = '';
                        link = link.replace(/\&cacheSlayer\=\d{3}/g, '');
                        link = link.replace(/\?cacheSlayer\=\d{3}.\&/g, '?');

                        if( link.indexOf('#/') >= 0 && link.indexOf('/#/wrapper') < 0 ){ // SAC 2.0 app link
                            uncachedUrl = link;
                        }else if( link.indexOf('/#/wrapper?url') >= 0 || link.indexOf('/#/wrapper/?url') >= 0 ){ // Wrapper Link
                            uncachedUrl = link;
                        }else if( link.indexOf('?') >= 0 ){
                            uncachedUrl = link + '&cacheSlayer=' + (new Date().getMilliseconds());
                        }else if( link.indexOf('?') < 0 && link.indexOf('&') < 0 ) {
                            uncachedUrl = link + '?cacheSlayer=' + (new Date().getMilliseconds());
                        }

                        return uncachedUrl;

                    },

                    click : function(link) {

                        if ( link && link.href ) {
                            link.href = self.cacheSlayer.add(link.href);
                        }

                        self.scrollToTop();
                        self.goToUrl( link.href );

                    }

                };


                /**
                 * Redireciona para a url informada, evitando loopings infinitos no ie e browsers Android antigosgoToUrl
                 * @param String href a url a que o usuário será redirecionado
                 */
                this.goToUrl = function( href ){

                    var isAWrapperUrl = href.indexOf( 'https://sac.uol.com.br/#/wrapper?url=' ) >= 0 || href.indexOf( 'https://sac.uol.com.br/#/wrapper/?url=' ) >= 0 ? true : false;
                    var isNotAnAngularUrl = href.indexOf('https://sac.uol.com.br/#/') < 0  &&  href.indexOf('http' ) >= 0 ? true : false;

                    if( isAWrapperUrl ){
                        //console.log('isAWrapperUrl');
                        href = self.cacheSlayer.clean(href);
                        var urlParam = href.replace( 'https://sac.uol.com.br/#/wrapper?url=', '' );
                        urlParam = urlParam.replace( 'https://sac.uol.com.br/#/wrapper/?url=', '' );
                        urlParam = decodeURIComponent( urlParam );
                        $location.path('/wrapper/').search( { url : urlParam } );
                    }else if( isNotAnAngularUrl ){
                        //console.log('isNotAnAngularUrl');
                        href = self.cacheSlayer.clean(href);
                        document.location.href = href;
                    }else{
                        //console.log('else');
                        href = self.cacheSlayer.clean(href);
                        href = href.replace('#', '');
                        $location.path(href);
                    }

                };


                /**
                 * Verifica se o Browser é compatível com a tag Audio de HTML5 e com o formato .wav, utilizzado pelo Turing do UOL
                 * @return {Boolean}
                 */
                this.isAudioCapableAndWavFormatCompatible = function () {
                    return ( navigator.userAgent.indexOf('MSIE') !== -1 ) || ( navigator.userAgent.indexOf('Trident') !== -1 ) || ( navigator.userAgent.indexOf('Safari') !== -1 );
                };


				this.location = {

					parse: function (location) {

						location = location || window.location;

						var hash = location.hash || '';
						hash = hash.split('?');

						var path = hash[0];
						path = path.indexOf('#') > -1 ? path.substring(1) : path;

						var search = {};
						var params = hash[1];

						if (params) {
							params = params.split('&');
							for (var i=0; i < params.length; i++) {
								var pair = params[i].split('=');
								search[pair[0]] = pair[1];
							}
						}

						return {
							path: path,
							search: search
						};

					}

				};

                /**
                 * Retorna o valor do débito formatado
                 * @param  Number value [Valor do débito não formato Ex: 10.5]
                 * @return String       [Valor do débito formatado Ex: 10,50]
                 */
                this.formatCurrency = function(value){
                    value += '';
                    var formattedValue = value.replace('.',',').split(',');

                    if(formattedValue[1]) {
                        if(formattedValue[1].length < 2) {
                            formattedValue[1] += '0';
                        }
                        formattedValue = formattedValue.join();
                    }
                    else {
                        formattedValue += ',00';
                    }
                    return formattedValue;
                };


                /**
                 * Rola a página até o topo de frorma animada
                 */
                this.scrollToTop = function(){
                    angular.element('html,body').animate({
                        scrollTop: 0
                    }, 1000);
                };

                return this;

            }];

    });
