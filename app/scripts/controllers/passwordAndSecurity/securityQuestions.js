'use strict';
angular.module('uolsacApp')
    .controller('passwordAndSecurity_securityQuestionsCtrl', ['$scope', '$http', 'FieldHandler','FieldMap', 'Util', 'Notify', 'Validator', 'User', 'SecurityQuestions', '$timeout', '$location',
        function passwordAndSecuritySecurityQuestionsCtrl($scope, $http, FieldHandler, FieldMap, Util, Notify, Validator, User, SecurityQuestions, $timeout, $location) {

            var questionList = [];
            var showList = [];
            $scope.predicate = 'pos';
            $scope.questionsAndAnswers = questionList;
            $scope.showQuestions = showList;

            $scope.recoveryQuestions = {

                init : function init(){
                    if( User.isLoggedIn() ){
                        FieldHandler.instantiateScope($scope);
                        SecurityQuestions.resource.getFixeds( null, $scope.recoveryQuestions.getFixeds, $scope.recoveryQuestions.onError  );
                    }else{
                        $location.path('/login').search({dest: 'REDIR|https://sac.uol.com.br/#/senhaeseguranca'});
                    }
                },

                verify : function verify(){

                    $scope.questionMessage = false;

                    if( $scope.selectedQuestion.type === 'EDITED' ){
                        $scope.questionPlaceholder = 'Crie sua própria pergunta';
                        $scope.toggleQuestion = true;
                    }else{
                        $scope.toggleQuestion = false;
                    }
                },

                add : function add(){

                    FieldHandler.instantiateScope($scope);

                    if ($scope.toggleQuestion === true){
                        if(!$scope.validateQuestion()) {
                            return null;
                        }
                    }

                    if( Util.isEmpty($scope.selectedQuestion) ){
                        $scope.questionMessage = true;
                        return null;
                    }

                    if( !$scope.validateAnswer() ){
                        return null;
                    }


                    if( $scope.selectedQuestion.type === 'EDITED' ){
                        $scope.selectedQuestion.question =  $scope.fields.question.value;
                    }


                    $scope.selectedQuestion.answer = $scope.fields.answer.value;
                    showList.push( $scope.selectedQuestion );


                    for(var i=0 ; i < questionList.length; i++){
                        if( questionList[i].type === 'EDITED' && $scope.selectedQuestion.type === 'EDITED' ){
                            questionList.splice(i, 1);
                        }else  if( questionList[i].idtSecretQuestion === $scope.selectedQuestion.idtSecretQuestion ){
                            questionList.splice(i, 1);
                        }
                    }

                    $scope.recoveryQuestions.resetScope();

                },

                resetScope : function resetScope(){
                    $scope.questionsAndAnswers = questionList;
                    $scope.showQuestions = showList;
                    $scope.toggleQuestion = false;
                    $scope.fields.answer.value = '';
                    $scope.fields.question.value = '';
                    $scope.selectedQuestion = '';
                    $scope.recoveryQuestions.setQuestionsLenght();
                    $scope.leftCharactersLabel = 25;
                },

                remove : function remove(selectedQuestion){

                    for( var i=0; i < showList.length; i++ ){
                        if( showList[i].type === 'EDITED' && selectedQuestion.type === 'EDITED' ){
                            showList.splice(i, 1);
                            $scope.recoveryQuestions.resetScope();
                        }else  if( showList[i].idtSecretQuestion === selectedQuestion.idtSecretQuestion ){
                            showList.splice(i, 1);
                            $scope.recoveryQuestions.resetScope();
                        }
                    }

                    if( selectedQuestion.type === 'EDITED' ){
                        $scope.recoveryQuestions.addFakeEditedQuestion();
                    }else{
                        questionList.push( selectedQuestion );
                    }

                    $scope.recoveryQuestions.resetScope();
                    $scope.recoveryQuestions.setQuestionsLenght();

                },

                characterCount : function characterCount(){

                    var answerLength = $scope.fields.answer.value.length;

                    var leftCharacaters = 25 - answerLength;

                    $scope.leftCharactersLabel = leftCharacaters;
                },

                getAnswered : function getAnswered (request){

                    var hasEditedQuestion = false;

                    for( var i = 0; i < request.items.length; i++ ){

                        for( var a = 0; a < questionList.length; a++ ) {
                            if( request.items[i].idtSecretQuestion === questionList[a].idtSecretQuestion ){
                                questionList.splice(a,1);
                            }
                        }

                        if( request.items[i].type === 'EDITED'){
                            hasEditedQuestion = true;
                        }

                        var question = request.items[i];
                        question.question = request.items[i].desSecretQuestion;
                        question.answer   = request.items[i].desSecretAnswer;
                        showList.push(question);

                    }

                    if( ! hasEditedQuestion ){
                        $scope.recoveryQuestions.addFakeEditedQuestion();
                    }

                    $scope.recoveryQuestions.setQuestionsLenght();

                },

                getFixeds : function getFixeds (request){

                    for( var i = 0; i < request.items.length; i++ ) {
                        var question = request.items[i];
                        question.question = request.items[i].desSecretQuestion;
                        question.answer = request.items[i].desSecretAnswer;
                        questionList.push(question);
                    }

                    $scope.recoveryQuestions.setQuestionsLenght();
                    SecurityQuestions.resource.getAnswered( null, $scope.recoveryQuestions.getAnswered, $scope.recoveryQuestions.onError );

                },

                addFakeEditedQuestion : function addFakeEditedQuestion (){

                    var editedQuestion = {
                        'idtPerson': null,
                        'idtSecretQuestion': null,
                        'desSecretQuestion': 'Crie sua própria pergunta',
                        'desSecretAnswer': '',
                        'type': 'EDITED',
                        'question': 'Crie sua própria pergunta',
                        'answer': ''
                    };

                    questionList.push(editedQuestion);
                },

                onError : function onError (request){
                    if( request.data.errors.messages[0].code === 404007 ){ // Caso não haja pergunta cadastrada ainda
                        $scope.recoveryQuestions.setQuestionsLenght();
                        $scope.hideQuestionFields = false;
                        $scope.recoveryQuestions.addFakeEditedQuestion();
                    }
                },

                setQuestionsLenght : function setQuestionsLenght (){

                    $scope.questionsLength = $scope.showQuestions.length;

                    if(questionList.length < 1){
                        $scope.hideQuestionFields = true;
                    }else{
                        $scope.hideQuestionFields = false;
                    }

                }

            };

            $scope.validateQuestion = function validateQuestion(){
                return Validator.execute([$scope.fields.question]);
            };

            $scope.validateAnswer = function validateAnswer(){
                return Validator.execute([$scope.fields.answer]);
            };

            $scope.recoveryQuestions.init();

        }
]);
