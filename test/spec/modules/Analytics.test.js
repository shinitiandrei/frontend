'use strict';
describe('Module: angulartics.uol.analytics', function () {

	var analytics;

    beforeEach( module('uolsacApp') );

    beforeEach(
        inject(
            function($injector, $analytics) {
                analytics = $analytics;
            }
        )
	);

	afterEach( function() {
		delete window.countMetrics;
		delete window.omtrClickUOL;
	});




    it('PageTrack: Verifica que o método countMetrics será chamado.', function () {

		window.countMetrics = function () {};
		spyOn(window, 'countMetrics').and.callThrough();

		var $current = { analyticsBreadcrumb: ['home'], analyticsTypepage: 'card' };
        analytics.settings.on = true;
		analytics.pageTrack($current, '/abc');

		expect(window.countMetrics).toHaveBeenCalledWith({
			breadCrumb: ['home'],
			typePage: 'card',
			login: '',
			testAb: ''
		});

    });

    it('EventTrack CLICK: Verifica que o método omtrClickUOL será chamado.', function () {

        analytics.settings.on = true;
		window.omtrClickUOL = function () {};
		spyOn(window, 'omtrClickUOL').and.callThrough();
		analytics.eventTrack('click', {ref: 'ref', url: 'url', pos: 'pos'});
		expect(window.omtrClickUOL).toHaveBeenCalledWith('ref', 'url', 'pos');

    });

    it('EventTrack SEARCH: Verifica que o método countMetrics será chamado.', function () {

        analytics.settings.on = true;
		window.countMetrics = function () {};
		spyOn(window, 'countMetrics').and.callThrough();

		var $current = { analyticsBreadcrumb: ['home'], analyticsTypepage: 'card' };
		analytics.pageTrack($current, '/abc');
		analytics.eventTrack('search', {place: 'place', key: 'key'});

		expect(window.countMetrics).toHaveBeenCalledWith({
			breadCrumb: ['home'],
			typePage: 'card',
			login: '',
			testAb: '',
			search: {
				place: 'place',
				key: 'key'
			}
		});

    });

    it('EventTrack ERROR: Verifica que o método countMetrics será chamado. Repassando Erros.', function () {

        analytics.settings.on = true;
		window.countMetrics = function () {};
		spyOn(window, 'countMetrics').and.callThrough();

		var $current = { analyticsBreadcrumb: ['home'], analyticsTypepage: 'card' };
		analytics.pageTrack($current, '/abc');
		analytics.eventTrack('error', {app: 'app', field: 'field', message: 'message'});

		expect(window.countMetrics).toHaveBeenCalledWith({
			breadCrumb: ['home'],
			typePage: 'card',
			login: '',
			testAb: '',
			errors: {
				app: 'app',
				client: [['field', 'message']]
			}
		});

    });

});
