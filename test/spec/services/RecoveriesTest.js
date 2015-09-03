'use strict';

describe('Testes do Service: Recoveries', function (){

    var recoveries;

    beforeEach(module('uolsacApp'));

    beforeEach(inject(function (Recoveries){
        recoveries = Recoveries;
    }));

    it('should return false if userSteps null', function () {
        expect(!!recoveries).toBe(true);
        var resultado = recoveries.stepBuilder.checkCurrent('mainEmail');
        expect(resultado).toBe(false);
    });

    it('should return false if User.namLogin null', function () {
        recoveries.setNamloginInUse(null);
        recoveries.stepBuilder.userSteps = 'A';
        var resultado = recoveries.stepBuilder.checkCurrent('mainEmail');
        expect(resultado).toBe(false);
    });


    it('should return true if mainEmail is correct', function () {
        recoveries.setNamloginInUse('teste@teste.com');
        recoveries.stepBuilder.userSteps = [{rel: 'mainEmail'}];
        var resultado = recoveries.stepBuilder.checkCurrent('mainEmail');
        expect(resultado).toBe(true);
    });

    it('should return FALSE if doesnt have mainEmail', function () {
        recoveries.setNamloginInUse('teste@teste.com');
        recoveries.stepBuilder.userSteps = [{rel: 'cellphoneToken'}];
        var resultado = recoveries.stepBuilder.checkCurrent('mainEmail');
        expect(resultado).toBe(false);
    });

    it('should return NEXT STEP if is in MAIN EMAIL and needs CELLPHONE TOKEN', function () {
        recoveries.setNamloginInUse('teste@teste.com');
        recoveries.stepBuilder.userSteps = [{rel: 'cellphoneToken'}];
        var resultado = recoveries.stepBuilder.getNext('mainEmail');
        expect(resultado).toBe('/recuperarsenha/verificarsms');
    });

    it('should return NEXT STEP if is in MAIN EMAIL and needs TIP', function () {
        recoveries.setNamloginInUse('teste@teste.com');
        recoveries.stepBuilder.userSteps = [{rel: 'cellphone'}, {rel: 'tip'}];
        var resultado = recoveries.stepBuilder.getNext('mainEmail');
        expect(resultado).toBe('/recuperarsenha/dicadesenha');
    });


    it('should return NEXT STEP all orders', function () {
        recoveries.setNamloginInUse('teste@teste.com');
        recoveries.stepBuilder.userSteps = [{rel: 'cellphone'}, {rel: 'tip'}, {rel: 'alternativeEmail'}, {rel: 'questions'}, {rel: 'cellphoneToken'}];
        var resultado = recoveries.stepBuilder.getNext('mainEmail');
        expect(resultado).toBe('/recuperarsenha/verificarsms');

        resultado = recoveries.stepBuilder.getNext('cellphoneToken');
        expect(resultado).toBe('/recuperarsenha/dicadesenha');

        resultado = recoveries.stepBuilder.getNext('tip');
        expect(resultado).toBe('/recuperarsenha/celular');

        resultado = recoveries.stepBuilder.getNext('cellphone');
        expect(resultado).toBe('/recuperarsenha/emailalternativo');

        resultado = recoveries.stepBuilder.getNext('alternativeEmail');
        expect(resultado).toBe('/recuperarsenha/perguntas');
    });
});
