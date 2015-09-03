'use strict';
angular.module('uolsacApp')
    .directive('sacButton', function($compile) {

        var getTemplate = function(inputType, tabIndex) {

            tabIndex = tabIndex ? ' tabindex="' + tabIndex + '" ' : '';

            var finalTemplate = [
                '<div class="{{css}}">',
                '    <div class="{{inputclass}}" >',
                '        <input maxlength="{{maxlength}}" ng-disabled="{{disabledinput}}" class="form-control " ui-mask="{{mask}}" ng-change="clear(this)" ' + tabIndex + '  type="' + inputType.replace(/\'/g, '') + '" name="{{name}}" placeholder="{{placeholder}}" ng-model="value" >',
                '    </div>',
                '    <span class="help-block {{helpblockclass}}" >{{message}}</span>',
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
                disabledinput : '='
            },

            link : function(scope, element, attrs) {
                scope.$parent.fields = scope.$parent.fields ? scope.$parent.fields : {};
                scope.$parent.fields[attrs.field] = scope;
                scope.fieldId = attrs.field;
                scope.clear = scope.$parent.clear;
                element.html( getTemplate( attrs.type, attrs.tabindexer) ).show();
                $compile(element.contents())(scope);
                scope.$watch('disabledinput', function() {
                    element.html( getTemplate( attrs.type, attrs.tabindexer) ).show();
                    $compile(element.contents())(scope);
                });
            }

        };

        return directive;


    });
