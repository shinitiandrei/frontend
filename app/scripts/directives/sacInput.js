'use strict';
angular.module('uolsacApp')
    .directive('sacInput', function($compile) {

        var getTemplate = function(inputType, tabIndex, controlLabel, helpblockclass, inputclass ) {

            tabIndex = tabIndex ? ' tabindex="' + tabIndex + '" ' : '';
            controlLabel = controlLabel ? '<label class="control-label col-xs-24 col-sm-24 col-md-24 col-lg-24 no-padding-left no-padding-right" >' + controlLabel.replace(/'/g, '') + '</label>' : '';
            helpblockclass = helpblockclass ? '<span class="help-block ' + helpblockclass.replace(/'/g, '') +'" >{{message}}</span>' : '<span class="help-block col-xs-24 col-sm-24 col-md-24 col-lg-24 no-padding-left no-padding-right" >{{message}}</span>';
            inputclass = inputclass ? inputclass.replace(/'/g, '') : 'col-xs-24 col-sm-24 col-md-24 col-lg-24 no-padding-left no-padding-right'.replace(/'/g, '');

            var finalTemplate = [
                '<div class="{{css}}">',
                '    ' + controlLabel,
                '    <div class="' + inputclass + '" >',
                '        <input maxlength="{{maxlength}}" ng-disabled="{{disabledinput}}" class="form-control" ui-mask="{{mask}}" ng-change="clear(this)" ' + tabIndex + '  type="' + inputType.replace(/\'/g, '') + '" name="{{name}}" placeholder="{{placeholder}}" ng-model="value" >',
                '    </div>',
                '    ' + helpblockclass,
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
                inputclass : '=',
                helpblockclass : '=',
                placeholder : '=',
                name : '=',
                type : '=',
                mask : '=',
                maxlength : '=',
                tabindexer : '=',
                disabledinput : '=',
                controlLabel : '='
            },

            link : function(scope, element, attrs) {
                scope.$parent.fields = scope.$parent.fields ? scope.$parent.fields : {};
                scope.$parent.fields[attrs.field] = scope;
                scope.fieldId = attrs.field;
                scope.clear = scope.$parent.clear;
                element.html( getTemplate( attrs.type, attrs.tabindexer) ).show();
                $compile(element.contents())(scope);
                scope.$watch('disabledinput', function() {

                    element.html(
                        getTemplate(
                            attrs.type,
                            attrs.tabindexer,
                            attrs.controlLabel,
                            attrs.helpblockclass,
                            attrs.inputclass
                        )
                    ).show();

                    $compile(element.contents())(scope);

                });
            }

        };

        return directive;

    });
