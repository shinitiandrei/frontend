'use strict';
angular.module('uolsacApp')
    .directive('sacTuring', function() {

        var directive = {

            template : [
                '<div class="turing {{css}}">',
                '    <div class="container">',
                '        <div class="col-xs-24 col-sm-24 col-md-24 col-lg-24">',
                '            <span class="control-label" >Digite abaixo as letras e números na ordem em que aparecem na imagem a seguir.</span>',
                '        </div>',
                '    </div>',
                '    <div class="container">',
                '        <div class="col-xs-24 col-sm-8 col-md-6 col-lg-6">',
                '            <div>',
                '                <input class="form-control" type="text" name="turing" ng-change="clear(this)" ng-model="answer">',
                '            </div>',
                '        </div>',
                '        <span class="help-block col-xs-24 col-sm-24 col-md-24 col-lg-24" >{{message}}</span>',
                '    </div>',
                '    <div class="container content v-margin-5">',
                '        <div class="col-xs-12 col-sm-8 col-md-6 col-lg-6">',
                '            <div class="image">',
                '                <img ng-src="{{imagem}}">',
                '            </div>',
                '        </div>',
                '        <div class="col-xs-12 col-sm-8 col-md-6 col-lg-6">',
                '            <div class="notice v-margin-5">',
                '                <span class="">Está com dificuldade para ler?</span>',
                '            </div>',
                '            <div class="change-image v-margin-5 ">',
                '                <a href="" class="icon" ng-click="refreshImage()">',
                '                    <span class="glyphicon glyphicon-refresh"></span>',
                '                </a>',
                '                <a href="" class="link" ng-click="refreshImage()">',
                '                    <span class="">Troque a imagem</span>',
                '                </a>',
                '            </div>',
                '            <div class="play-audio v-margin-5 ">',
                '                <a href="" class="icon" ng-click="playAudio()">',
                '                    <span class="glyphicon glyphicon-volume-up"></span>',
                '                </a>',
                '                <a href="" class="link" ng-click="playAudio()">',
                '                    <span class="">Ouça o que está escrito</span>',
                '                </a>',
                '            </div>',
                '        </div>',
                '    </div>',
                '    <div class="container footer v-margin-5">',
                '        <div class="col-xs-24 col-sm-24 col-md-24 col-lg-24">',
                '        </div>',
                '    </div>',
                '</div>'
            ].join('\r\n'),

            replace : true,
            transclude : true,
            restrict : 'EA',

            scope : {
                imagem : '=',
                audio : '=',
                token : '='
            },

            link : function(scope) {

                scope.name = 'turing';
                scope.field = 'turing';
                scope.fieldId = 'turing';

                scope.$parent.fields = scope.$parent.fields ? scope.$parent.fields : {};
                scope.$parent.fields.turing = scope;
                scope.$parent.turing = scope;

                scope.refreshImage = scope.$parent.refreshImage;
                scope.playAudio = scope.$parent.playAudio;
                scope.clear = scope.$parent.clear;
            }
        };

        return directive;
    });
