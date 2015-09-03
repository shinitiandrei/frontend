'use strict';
angular.module('uolsacApp')
    .controller('passwordRecovery_relationshipQuestionsCtrl', [ '$scope', 'FieldHandler', 'Recoveries', 'Util', 'User', '$location', '$compile', 'Notify', 'PasswordRecoveryLook', '$rootScope',
        function($scope, FieldHandler, Recoveries, Util, User, $location, $compile, Notify, PasswordRecoveryLook, $rootScope){

            var questionsContainer = angular.element('div#relationshipQuestionsContainer');
            var relationshipQuestionsData;
            var shouldTheUserBeHere = Recoveries.stepBuilder.checkCurrent('questions');

            function init(){

                changeLook();

                if ( shouldTheUserBeHere ) {
                    getAvailableQuestions();
                }else{
                    goBackToHome();
                }

            }

            function goBackToHome(){
                $location.path('/recuperarsenha');
            }

            function parseBadRequest(){
                Notify.removeAllNotifies();
                $location.path('/atendimento');
            }

            function changeLook(){
                PasswordRecoveryLook.set();
                FieldHandler.instantiateScope($scope);
                $scope.totalNumberOfMessagesOnDisplay = Notify.getTotalNumberOfMessagesOnDisplay();
                Notify.removeAllNotifies();
            }

            function getAvailableQuestions(){
                $scope.preloader = true;
                Recoveries.resource.get({'login' : Recoveries.getNamloginInUse(), 'method' : 'questions' }, parseQuestions, parseBadRequest);
            }

            function resetAnsweredQuestions(){
                $scope.fields = {};
                angular.element('div#relationshipQuestionsContainer div').remove();
            }

            function parseQuestions(questions){

                $scope.preloader = false;
                resetAnsweredQuestions();

                var relationshipQuestion = questions.item.questions.relationship;
                for( var iRelationship = 0; iRelationship < relationshipQuestion.length; iRelationship++ ){
                    addQuestion(relationshipQuestion[iRelationship]);
                }

                var signupQuestion = questions.item.questions.signup;
                for( var iSignup = 0; iSignup < signupQuestion.length; iSignup++ ){
                    addQuestion(signupQuestion[iSignup]);
                }

                var securityQuestion = questions.item.questions.security;
                for( var iSecutiry = 0; iSecutiry < securityQuestion.length; iSecutiry++ ){
                    addQuestion(securityQuestion[iSecutiry]);
                }

            }

            function addQuestion(question){

                var template = '';
                var newQuestion = {};
                var options = {};

                if (question.type === 'TEXT' || question.type === 'DOCUMENT_NUMBER' ){

                    template = [
                        '<div class="v-margin-only-top-20 clearfix" >',
                        '    <div sac-input type="\'' + question.id + '\'" name="\'question' + question.id + '\'" control-label="\'' + question.question + '\'"  field="question' + question.id + '" ></div>',
                        '</div>'
                    ].join('\r\n');

                    newQuestion = $compile(template)($scope);
                    questionsContainer.append(newQuestion);

                }

                if(question.type === 'PHONE'){

                    template = [
                        '<div class="v-margin-only-top-20 clearfix" >',
                        '    <div sac-input placeholder="\'(__) _________\'"  mask="\'(99) 99999999?9\'" type="\'' + question.id + '\'" control-label="\'' + question.question + '\'" name="\'question' + question.id + '\'" field="question' + question.id + '" ></div>',
                        '</div>'
                    ].join('\r\n');

                    newQuestion = $compile(template)($scope);
                    questionsContainer.append(newQuestion);

                }

                if(question.type === 'DATE'){

                    template = [
                        '<div class="v-margin-only-top-20 clearfix" >',
                        '    <div sac-input placeholder="\'__/__/____\'"  mask="\'99/99/9999\'" type="\'' + question.id + '\'" control-label="\'' + question.question + '\'" name="\'question' + question.id + '\'" field="question' + question.id + '" ></div>',
                        '</div>'
                    ].join('\r\n');

                    newQuestion = $compile(template)($scope);
                    questionsContainer.append(newQuestion);

                }

                if(question.type === 'CEP'){
                    template = [
                        '<div class="v-margin-only-top-20 clearfix" >',
                        '    <div sac-input  mask="\'99999-999\'" type="\'' + question.id + '\'" control-label="\'' + question.question + '\'" name="\'question' + question.id + '\'" field="question' + question.id + '" ></div>',
                        '</div>'
                    ].join('\r\n');

                    newQuestion = $compile(template)($scope);
                    questionsContainer.append(newQuestion);
                }

                if(question.type === 'MULTIPLE'){

                    try {
                        options = JSON.stringify( question.options ).replace( /(\")/g, '\'');
                    }catch(e){
                        console.warn( 'Questão do tipo MULTIPLE sem options', question.id, question.question, '\r\n', e);
                        return false;
                    }

                    template = [
                        '<div class="v-margin-only-top-20 clearfix" >',
                        '    <div sac-select  name="\'question' + question.id + '\'" control-label="\'' + question.question + '\'"  field="question' + question.id + '" optionlist="' + options + '"  ></div>',
                        '</div>'
                    ].join('\r\n');

                    newQuestion = $compile( template )($scope);
                    questionsContainer.append(newQuestion);
                }

            }

            function onRightAnswered(resource) {
                $location
					.path('/recuperarsenha/alterarsenha')
					.search({ token: resource.item.token, changeType: 'idpos' });
            }

            function onWrongAnswered(){
                $rootScope.$broadcast('resetButton', { 'id' : 'submitRelationshipQuestions'} );
            }

            function addSendData(questionId, answer){
                questionId = questionId.replace('question', '');
                questionId = parseInt( questionId );
                relationshipQuestionsData.answers.push({ 'questionId' : questionId , 'answer' : answer });
            }

            function cleanSendData(){
                relationshipQuestionsData = {
                    answers : []
                };
            }

            $scope.checkAnswersBeforeSend = function(){
                if ($scope.validate()) {
                    Recoveries.resource.save({'login' : Recoveries.getNamloginInUse(), 'method' : 'questions' }, relationshipQuestionsData, onRightAnswered, onWrongAnswered);
                } else {
                    return null;
                }
            };

            $scope.clear = function(scope){
                FieldHandler.clean(scope);
            };

            $scope.validate = function(){

                var validateResult = true;
                Util.autoCompleteCatcher($scope);
                cleanSendData();

                for( var fielder in $scope.fields ){

                    var finalValue = {};

                    if( typeof $scope.fields[fielder].value === 'object'  ){
                        finalValue = $scope.fields[fielder].value.value;
                    }else{
                        finalValue = $scope.fields[fielder].value;
                    }

                    if( finalValue ) {
                        addSendData( fielder, finalValue );
                    }else{
                        var message = new FieldHandler.createMessage(fielder,'Campo de preenchimento obrigatório.','has-error');
                        FieldHandler.add( message, { 'focus' : true } );
                        validateResult = false;
                    }

                }

                return validateResult;

            };

            $scope.nextStep = function(){

                Notify.removeAllNotifies();
                var notify = Notify.setNewNotifyObject();
                notify.title = 'Infelizmente não foi possível confirmar sua identidade';
                notify.message = 'Para recuperar sua senha, você deve ligar para a Central de Atendimento em um dos telefones abaixo:';
                notify.type = 'warning';
                Notify.add(notify);
                $location.path('/atendimento');

            };

            init();

        }
]);
