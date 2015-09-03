'use strict';
angular.module('uolsacApp')
    .directive('sacInputPassword', function($compile) {

        var getTemplate = function(tabIndex, controlLabel) {

            tabIndex = tabIndex ? ' tabindex="' + tabIndex + '" ' : '';
            controlLabel = controlLabel ? '<label class="control-label col-xs-24 col-sm-24 col-md-24 col-lg-24" >' + controlLabel.replace(/'/g, '') + '</label>' : '';

            var finalTemplate = [
                '<div class="{{css}}" id="password">',
                '    ' + controlLabel,
                '   <div class="row">',
                '       <div class="col-xs-24 col-sm-10 col-md-8 col-lg-8 ">',
                '           <div class="row">',
                '               <div class="col-xs-24 col-sm-24 col-md-24 col-lg-24 no-padding-left no-padding-right">',
                '                   <div class="input-group">',
                '                       <input ng-hide="sacPasswordShow" ' + tabIndex + ' id="passwordField" class="form-control" ng-change="clear(this)" type="password" name="{{name}}" ng-model="value" tabindex="1" >',
                '                       <input ng-show="sacPasswordShow" ' + tabIndex + ' class="form-control" ng-change="clear(this)" type="text" name="{{name}}" ng-model="value">',
                '                       <span class="input-group-addon passwordStrength">',
                '                           <span>Força de senha</span>',
                '                           <div class="passwordStrengthBar">&nbsp;</div>',
                '                       </span>',
                '                       <div class="passwordTip-lg hidden-xs">',
                '                           <span class="passwordTip"></span>',
                '                       </div>',
                '                   </div>',
                '               </div>',
                '               <div class="col-xs-24 col-sm-24 col-md-24 col-lg-24 no-padding-left no-padding-right">',
                '                   <span class="help-block">{{message}}</span>',
                '               </div>',
                '           </div>',
                '       </div>',
                '       <div class="col-xs-24 col-sm-10 col-md-8 col-lg-8" ng-show="showcheckbox">',
                '           <div class="checkbox">',
                '               <label><input type="checkbox" ng-model="sacPasswordShow">Exibir senha</label>',
                '           </div>',
                '       </div>',
                '   </div>',
                '</div>'
            ].join('\r\n');

            return finalTemplate;
        };

        var directive = {

            replace : true,
            transclude : true,
            restrict : 'EA',

            scope : {
                field : '=',
                placeholder : '=',
                userlogin : '=',
                name : '=',
                showcheckbox : '=',
                tabindexer : '=',
                controlLabel : '='
            },


            link : function(scope, element, attrs) {

                scope.$parent.fields = scope.$parent.fields ? scope.$parent.fields : {};
                scope.$parent.fields[attrs.field] = scope;
                scope.fieldId = attrs.field;
                scope.clear = scope.$parent.clear;
                element.html(
                    getTemplate(
                        attrs.tabindexer,
                        attrs.controlLabel
                    )
                ).show();
                $compile(element.contents())(scope);

                //Cache dos seletores
                var loginField = angular.element('#emailHidden');
                var targetField = angular.element('#passwordField');
                var messageContainer = angular.element('#password .help-block');
                var tipContainer = angular.element('.passwordTip');

                //Inicialização do componente de força de senha
                UOL.signup.fields.desPassword({
                    target: targetField,
                    loginField: loginField,
                    message: angular.element('#password .help-block'),
                    tipContainer: tipContainer,
                    strength: angular.element('.passwordStrength:eq(0) span'),
                    strengthGauge: angular.element('.passwordStrength:eq(0) .passwordStrengthBar'),
                    callbacks: {
                        validationSuccess: function(){
                            targetField.parent().removeClass('has-error');
                            messageContainer.parent().removeClass('has-error');
                            messageContainer.hide();
                            tipContainer.show();
                        },
                        validationError: function(){
                            targetField.parent().addClass('has-error');
                            messageContainer.parent().addClass('has-error');
                            tipContainer.hide();
                            messageContainer.show();
                        },
                        onFocus: function(){
                            tipContainer.fadeIn(300);
                        },
                        onBlur: function(){
                            tipContainer.fadeOut(300);
                        }
                    }
                });

            }
        };

        return directive;
    });
