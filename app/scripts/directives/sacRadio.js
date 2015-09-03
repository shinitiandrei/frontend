'use strict';
angular.module('uolsacApp')
    .directive('sacRadio', function($compile) {

        var getTemplate = function() {
            

            var finalTemplate = [
                '   <div class="{{css}}">',
                '       <div ng-repeat="option in optionlist">',
                '           <div class="{{inputclass}}">',
                '               <label class="h-margin-only-right-10" >',
                '                   <input type="radio" ng-model="$parent.value" name="{{name}}" value="{{option.value}}" ng-change="clear(this.$parent)"> {{option.description}}',
                '               </label>',
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
                inputclass : '=',
                helpblockclass : '=',
                name : '=',
                optionlist : '='
            },

            link : function(scope, element, attrs) {
                scope.$parent.fields = scope.$parent.fields ? scope.$parent.fields : {};
                scope.$parent.fields[attrs.field] = scope;
                scope.fieldId = attrs.field;
                scope.clear = scope.$parent.clear;
                element.html( getTemplate( ) ).show();
                $compile(element.contents( ) )(scope);
            }
        };

        return directive;

    });
