'use strict';
angular.module('uolsacApp')
    .directive('sacMultipleInput', function($compile) {

        var getTemplate = function() {


            var finalTemplate = [
                '   <div class="{{css}}">',
                '       <div ng-repeat="option in optionlist">',
                '           <div class="{{option.class}}">',
                '               <input class="form-control" ng-disabled="{{disabledinput}}" ng-model="option.value" maxlength="{{option.maxlength}}" ui-mask="{{option.mask}}" ng-change="clear(this.$parent)" type="{{option.type}}" name="{{option.name}}" placeholder="{{option.placeholder}}">',
                '           </div>',
                '       </div>',
                '       <span class="help-block {{helpblockclass}}">{{message}}</span>',
                '   </div>'
            ].join('\r\n');

            return finalTemplate;
        };

        var directive = {

            replace : true,
            transclude : true,
            restrict : 'EA',

            scope : {
                field : '=',
                helpblockclass : '=',
                name : '=',
                optionlist : '=',
                disabledinput : '='
            },

            link : function(scope, element, attrs) {
                scope.$parent.fields = scope.$parent.fields ? scope.$parent.fields : {};
                scope.$parent.fields[attrs.field] = scope;
                scope.fieldId = attrs.field;
                scope.clear = scope.$parent.clear;
                $compile(element.contents())(scope);
                scope.$watch('disabledinput', function() {
                    element.html( getTemplate( attrs.optionlist ) ).show();
                    $compile(element.contents())(scope);
                });
            }

        };

        return directive;


    });
