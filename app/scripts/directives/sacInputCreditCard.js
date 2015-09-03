'use strict';
angular.module('uolsacApp')
    .directive('sacInputCreditCard', function($compile) {

        var getTemplate = function (tabIndex) {

            tabIndex = tabIndex ? ' tabindex="' + tabIndex + '" ' : '';

            var finalTemplate = [
                '<div class="{{css}}">',
                '    <div class="{{inputclass}}" >',
                '        <input ui-mask="{{mask}}" maxlength="{{maxlength}}" class="form-control creditCardInput" ng-keyup="getCardBrand()" ng-blur="getCardBrand()" ng-change="clear(this)" ' + tabIndex + '  type="text" name="{{name}}" ng-model="value" >',
                '        <span ng-show="brand" class="inputedCardFlag"><img ng-show="brand" src="https://imguol.com/p/sac/uol/images/paymentMethod/icon_sac_{{brand}}.svg" width="35"/></span>',
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
                name : '=',
                maxlength : '=',
                mask : '=',
                tabindexer : '=',
                brand : '='
            },

            link : function(scope, element, attrs) {
                scope.$parent.fields = scope.$parent.fields ? scope.$parent.fields : {};
                scope.$parent.fields[attrs.field] = scope;
                scope.fieldId = attrs.field;
                scope.clear = scope.$parent.clear;
                scope.getCardBrand = scope.$parent.getCardBrand;
                element.html( getTemplate( attrs.tabindexer ) ).show();
                $compile(element.contents())(scope);
            }

        };

        return directive;


    });
