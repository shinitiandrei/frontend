'use strict';
describe('Module: Util > CacheSlayer', function () {

    var util;

    beforeEach( module('uolsacApp') );

    beforeEach(
        inject(
            function (Util) {
                util = Util;
            }
        )
    );

    it(' Verifica a inserção do param cacheSlayer numa url sem parametros', function () {

        var url =  'https://sac.uol.com.br/usuario/dados_pessoais.html';
        var paramFinderRegex = new RegExp( /\?cacheSlayer\=\d{2,3}/g );
        url = util.cacheSlayer.add(url);
        expect( paramFinderRegex.test(url) ).toBeTruthy();
        expect( url.match(paramFinderRegex).length ).toBe(1);

    });


    it(' Verifica a inserção do param cacheSlayer numa url simples com parâmetros', function () {

        var url =  'https://sac.uol.com.br/usuario/dados_pessoais.html?skin=bol';
        var paramFinderRegex = /\&cacheSlayer\=\d{2,3}/g;
        url = util.cacheSlayer.add(url);
        expect( paramFinderRegex.test(url) ).toBeTruthy();
        expect( url.match(paramFinderRegex).length ).toBe(1);

    });


    it(' Verifica a inserção do param cacheSlayer numa url simples com parâmetros, mas já com um cacheSlayer inserido previamente', function () {

        var url =  'https://sac.uol.com.br/usuario/dados_pessoais.html?skin=bol&cacheSlayer=712';
        var paramFinderRegex = /\&cacheSlayer\=\d{2,3}/g;
        url = util.cacheSlayer.add(url);
        expect( paramFinderRegex.test(url) ).toBeTruthy();
        expect( url.match(paramFinderRegex).length ).toBe(1);

    });


    it('Verifica a inserção do param cacheSlayer numa url do Wrapper', function () {

        var url =  'https://sac.uol.com.br/#/wrapper?url=https://sac.uol.com.br/usuario/dados_pessoais.html';
        var paramFinderRegex = /\&cacheSlayer\=\d{2,3}/g;
        url =  util.cacheSlayer.add(url);
        expect( paramFinderRegex.test(url) ).toBeFalsy();

    });


    it('Verifica a inserção e a limpeza do antigo param cacheSlayer numa url do wrapper que Já tem o parametro cacheSlayer', function () {

        var url =  'https://sac.uol.com.br/#/wrapper?url=https://sac.uol.com.br/usuario/dados_pessoais.html&cacheSlayer=712';
        var paramFinderRegex = /\&cacheSlayer\=\d{2,3}/g;
        url =  util.cacheSlayer.add(url);
        expect( paramFinderRegex.test(url) ).toBeFalsy();

    });


    it('Verifica a inserção e a limpeza do antigo param cacheSlayer numa url que o parametro cacheSlayer no começo da url', function () {

        var url =  'https://sac.uol.com.br/#/wrapper?cacheSlayer=712&url=https://sac.uol.com.br/usuario/dados_pessoais.html';
        var paramFinderRegex = /\?cacheSlayer\=\d{2,3}/g;
        url =  util.cacheSlayer.add(url);
        expect( paramFinderRegex.test(url) ).toBeTruthy();
        expect( url.match(paramFinderRegex).length ).toBe(1);

    });


    it('Verifica a inserção do param cacheSlayer numa url do acesso', function () {

        var url =  'https://acesso.uol.com.br/login.html?skin=sac&authenticate=1&dest=REDIR|https://sac.uol.com.br/inscricao/solicitar_cancelamento.html?skin=bol';
        var paramFinderRegex = /\&cacheSlayer\=\d{2,3}/g;
        url =  util.cacheSlayer.add(url);
        expect( paramFinderRegex.test(url) ).toBeTruthy();
        expect( url.match(paramFinderRegex).length ).toBe(1);

    });


    it('Verifica a inserção do param cacheSlayer numa url do acesso com wrapper', function () {

        var url =  'https://acesso.uol.com.br/login.html?skin=sac&authenticate=1&dest=REDIR|https://sac.uol.com.br/#/wrapper?url=https://sac.uol.com.br/usuario/dados_pessoais.html&varteste=123';
        var paramFinderRegex = /\&cacheSlayer\=\d{2,3}/g;
        url =  util.cacheSlayer.add(url);
        expect( paramFinderRegex.test(url) ).toBeFalsy();

    });

});
