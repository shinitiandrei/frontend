/* jshint indent: false */
'use strict';
angular.module('uolsacApp', [

    'ngCookies',
    'ngResource',
    'ngAnimate',
    'ngSanitize',
    'ngRoute',
    'ui.bootstrap',
    'angular-loading-bar',
    'ui.mask',
    'compileAfterLoad',
    'angulartics',
    'angulartics.uol.analytics',

    // UOL custom Modules
    'UOLsac.Util',
    'UOLsac.LoaderCurtain',
    'UOLsac.CamaleonBridge',
    'UOLsac.Notify'


]).config(function($routeProvider, $httpProvider) {

    $httpProvider.interceptors.push('HttpInterceptor');
    $httpProvider.interceptors.push('TuringInterceptor');

    if (!$httpProvider.defaults.headers.get) {
        $httpProvider.defaults.headers.get = {};
    }

    $httpProvider.defaults.headers.get['If-Modified-Since'] = '0';
    //> Header

    $routeProvider

         /**
         * Home
         */
        .when('/', {
            templateUrl: 'views/home/home.html',
            controller: 'homeCtrl',
            analyticsBreadcrumb: ['home'],
            analyticsTypepage: 'home',
            authenticated : false
        })

        /**
         * Tela de telefones da central de atendimento
         */
        .when('/atendimento', {
            templateUrl: 'views/contactcenter/contactCenters.html',
            controller: 'contactCentersCtrl',
            analyticsBreadcrumb: ['atendimento'],
            analyticsTypepage: 'card',
            authenticated : false
        })

        /**
         * Porteira de login
         */
        .when('/login', {
            templateUrl: 'views/login/login.html',
            controller: 'loginCtrl',
            analyticsBreadcrumb: ['login'],
            analyticsTypepage: 'card',
            authenticated : false
        })

            .when('/login/dica-de-senha/:user', {
                templateUrl: 'views/login/login.html',
                controller: 'loginCtrl',
                analyticsBreadcrumb: ['login','dica-de-senha'],
                analyticsTypepage: 'card',
                authenticated : false
            })

            .when('/login/limite_excedido/:ip/:time/:user', {
                templateUrl: 'views/login/login.html',
                controller: 'loginAttemptLimitExceededCtrl',
                analyticsBreadcrumb: ['login','limite-excedido'],
                analyticsTypepage: 'card',
                authenticated : false
            })

            .when('/login/verifique_login_senha', {
                templateUrl: 'views/login/login.html',
                controller: 'loginCtrl',
                analyticsBreadcrumb: ['login','verifique-login-senha'],
                analyticsTypepage: 'card',
                authenticated : false
            })

            .when('/login/usuario_desativado/:user', {
                templateUrl: 'views/login/login.html',
                controller: 'loginAttemptBlockedUserCtrl',
                analyticsBreadcrumb: ['login','usuario-desativado'],
                analyticsTypepage: 'card',
                authenticated : false
            })

            .when('/login/usuario_suspeito/:user', {
                templateUrl: 'views/login/login.html',
                controller: 'loginAttemptSuspectUserCtrl',
                analyticsBreadcrumb: ['login','usuario-suspeito'],
                analyticsTypepage: 'card',
                authenticated : false
            })


         /**
         * Fluxo de Recuperação de senha
         */

        .when('/recuperarsenha', {
            templateUrl: 'views/passwordRecovery/initialState.html',
            controller: 'passwordRecovery_initialStateCtrl',
            analyticsBreadcrumb: ['recuperar-senha','informar-login'],
            analyticsTypepage: 'card',
            authenticated : false
        })

            .when('/recuperarsenha/dicadesenha', {
                templateUrl: 'views/passwordRecovery/passwordTip.html',
                controller: 'passwordRecovery_passwordTipCtrl',
                analyticsBreadcrumb: ['recuperar-senha','dica-de-senha'],
                analyticsTypepage: 'card',
                authenticated : false
            })

            .when('/recuperarsenha/celular', {
                templateUrl: 'views/passwordRecovery/confirmedCellphone.html',
                controller: 'passwordRecovery_confirmedCellphoneCtrl',
                analyticsBreadcrumb: ['recuperar-senha','celular'],
                analyticsTypepage: 'card',
                authenticated : false
            })

            .when('/recuperarsenha/verificarsms', {
                templateUrl: 'views/passwordRecovery/verifySmsToken.html',
                controller: 'passwordRecovery_verifySmsTokenCtrl',
                analyticsBreadcrumb: ['recuperar-senha','verificar-sms'],
                analyticsTypepage: 'card',
                authenticated : false
            })

            .when('/recuperarsenha/emailalternativo', {
                templateUrl: 'views/passwordRecovery/sendEmail.html',
                controller: 'passwordRecovery_sendEmailCtrl',
                analyticsBreadcrumb: ['recuperar-senha','email-alternativo'],
                analyticsTypepage: 'card',
                authenticated : false
            })

            .when('/recuperarsenha/perguntas', {
                templateUrl: 'views/passwordRecovery/relationshipQuestions.html',
                controller: 'passwordRecovery_relationshipQuestionsCtrl',
                analyticsBreadcrumb: ['recuperar-senha','perguntas'],
                analyticsTypepage: 'card',
                authenticated : false
            })

            .when('/recuperarsenha/alterarsenha', {
                templateUrl: 'views/passwordRecovery/changePassword.html',
                controller: 'passwordRecovery_changePasswordCtrl',
                analyticsBreadcrumb: ['recuperar-senha','alterar-senha'],
                analyticsTypepage: 'card',
                authenticated : false
            })

            .when('/recuperarsenha/emailprincipal', {
                templateUrl: 'views/passwordRecovery/mainMailVisitor.html',
                controller: 'passwordRecovery_mainMailVisitorCtrl',
                analyticsBreadcrumb: ['recuperar-senha','email-principal'],
                analyticsTypepage: 'card',
                authenticated : false
            })

            .when('/recuperarsenha/senhaalterada', {
                templateUrl: 'views/passwordRecovery/successfullChangedPassword.html',
                controller: 'passwordRecovery_successfullChangedPasswordCtrl',
                analyticsBreadcrumb: ['recuperar-senha','senha-alterada'],
                analyticsTypepage: 'card',
                authenticated : false
            })

         /**
         * Fluxo de alteração de senha e perguntas de seguranca
         */

        .when('/senhaeseguranca', {
            templateUrl: 'views/passwordAndSecurity/passwordAndSecurity.html',
            controller: 'passwordAndSecurity_passwordAndSecurityCtrl',
            analyticsBreadcrumb: ['senha-e-seguranca'],
            analyticsTypepage: 'card'
        })

        /**
         * Fluxo de confirmacao de email alternativo
         */
        .when('/confirmacao/emailalternativo', {
            templateUrl: '../views/emailConfirmation/emailConfirmation.html',
            controller: 'emailConfirmationCtrl',
            analyticsBreadcrumb: ['confirmacao-email-alternativo'],
            analyticsTypepage: 'card'
        })

        /**
         * Fluxo de Informações Pessoais
         */

        .when('/dadoscadastrais', {
            templateUrl: 'views/registrationData/registrationData.html',
            controller: 'registrationDataCtrl'
        })


        /**
         * Fluxo de quitação de débito
         */

        .when('/cobranca/quitardebito', {
            templateUrl: 'views/quittance/quittance.html',
            controller: 'quittanceCtrl'
        })

        .when('/cobranca/debitoquitado', {
            templateUrl: 'views/quittance/quittanceConclusion.html',
            controller: 'quittanceConclusionCtrl'
        })

        .when('/cobranca/boleto', {
            templateUrl: 'views/quittance/booklet.html',
            controller: 'bookletCtrl'
        })


        /**
         * Fluxo de alteração de meio de pagamento
         */

        .when('/cobranca/alterarpagamento', {
            templateUrl: 'views/updatePaymentMethod/updatePaymentMethod.html',
            controller: 'updatePaymentMethodCtrl'
        })

        .when('/cobranca/pagamentoalterado', {
            templateUrl: 'views/updatePaymentMethod/updatePaymentMethodConclusion.html',
            controller: 'updatePaymentMethodConclusionCtrl'
        })


        /**
         * Tela de integracao com os fluxos dos sistemas legados
         */

        .when('/wrapper', {
            templateUrl: 'views/wrapper/wrapper.html',
            controller: 'wrapper_wrapperCtrl',
            authenticated : false
        })


        .otherwise({
            redirectTo: '/'
        });


}).run(function(loaderCurtain, User, $rootScope){

    $rootScope.$on('$routeChangeStart', function(event, next){
        document.getElementById('viewport').setAttribute('content','width=device-width');
        User.getUserData(next);
    });

    loaderCurtain.hide('#loaderCurtain'); // Após o carregamento total do Angular, tira o Loading Fake da Camada #loaderCurtain

});


