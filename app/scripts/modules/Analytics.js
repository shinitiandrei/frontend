/* jshint undef: false */
'use strict';
(function(angular) {

    angular.module('angulartics.uol.analytics', ['angulartics', 'ng'])
        .config(['$analyticsProvider', function($analyticsProvider) {

			var $current = { analyticsBreadcrumb: [], analyticsTypepage: '' };

			$analyticsProvider.settings.on = true;
			$analyticsProvider.settings.pageTracking.autoTrackFirstPage = false;
			$analyticsProvider.settings.pageTracking.autoTrackVirtualPages = true;
			$analyticsProvider.settings.pageTracking.trackRelativePath = true;

            $analyticsProvider.registerPageTrack(function(current, path) {
				$current = current;
                pageTrack(path);
            });

            $analyticsProvider.registerEventTrack(function(action, properties) {

				if (!action || action === 'click' || action === 'event') {
					eventTrack(action, properties);
				} else if (action === 'search') {
					searchTrack(action, properties);
				} else if (action === 'error') {
					errorTrack(action, properties);
				}
            });

			/**
			 * Efetua o rastreio de navegacao.
			 * A cada nova pagina carregada uma nova metrica sera enviada para a Omniture.
			 */
			function pageTrack() {

                if ($analyticsProvider.settings.on && window.countMetrics) {

					var config = buildConfig();

					if (config.Metrics.breadCrumb || config.Metrics.typePage) {
						window.countMetrics(config.Metrics);
					}
				}
            }

			/**
			 * Efetua o rastreio de clicks.
			 * Ex.:
			 * <a analytics-on analytics-event="click" analytics-ref="" analytics-url="" analytics-pos="" href=""></a>
			 * OU
			 * module.controller('SampleCtrl', function ($analytics) {
			 *     $analytics.eventTrack('click', { ref: '', url: '', pos: '' });
			 */
			function eventTrack(action, properties) {

				properties = properties || {};

				if ($analyticsProvider.settings.on && window.omtrClickUOL) {

					properties.ref = slugify(properties.ref);
					window.omtrClickUOL(properties.ref, properties.url, properties.pos);
				}
            }

			/**
			 * Efetua o rastreio de eventos de busca.
			 * Ex.:
			 * <a analytics-on analytics-event="search" analytics-place="" analytics-key="" href=""></a>
			 * OU
			 * module.controller('SampleCtrl', function ($analytics) {
			 *    $analytics.eventTrack('search', { place: '', key: '' });
			 */
			function searchTrack(action, properties) {

				properties = properties || {};

                if ($analyticsProvider.settings.on && window.countMetrics) {

					var config = buildConfig();
					config.Metrics.search = {
						place: slugify(properties.place),
						key: properties.key
					};

					window.countMetrics(config.Metrics);
				}
			}

			/**
			 * Efetua o rastreio de erros gerados pelo usuario ou erros sistemicos.
			 * Ex.:
			 * module.controller('SampleCtrl', function ($analytics) {
			 *     $analytics.eventTrack('error', { app: '', client: '' });
			 */
			function errorTrack(action, properties) {

				properties = properties || {};

                if ($analyticsProvider.settings.on && window.countMetrics) {

					var config = buildConfig();
					config.Metrics.errors = {
						app: properties.app,
						client: [[properties.field, properties.message]]
					};

					window.countMetrics(config.Metrics);
				}
			}

			function buildConfig() {

				var config = {
					Metrics: {
						breadCrumb: $current.analyticsBreadcrumb,
						typePage: $current.analyticsTypepage,
						login: '',
						testAb: ''
					}
				};

				return config;
			}

			function slugify(str) {

				if (!str) { return null; }

				str = str.replace(/^\s+|\s+$/g, '');
				str = str.toLowerCase();

				var from = 'ãàáäâẽèéëêìíïîõòóöôùúüûñç_·/,:;';
				var to   = 'aaaaaeeeeeiiiiooooouuuunc------';
				for (var i=0, l=from.length ; i<l ; i++) {
					str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
				}

				str = str.replace(/[^a-z0-9 _-]/g, '')
					.replace(/\s+/g, '-')
					.replace(/-+/g, '-');

				return str;
			}

        }]);
})(angular);
