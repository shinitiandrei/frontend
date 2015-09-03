'use strict';
angular.module('uolsacApp')
    .directive('sacSelect', function($compile) {

        var getTemplate = function( optionname, labeldefault, controlLabel, inputclass, helpblockclass ) {

            var optionvalue = optionname;
            controlLabel = controlLabel ? '<label class="control-label col-xs-24 col-sm-24 col-md-24 col-lg-24 no-padding-left no-padding-right" >' + controlLabel.replace(/'/g, '') + '</label>' : '';
            inputclass = inputclass ? inputclass :'col-xs-24 col-sm-24 col-md-24 col-lg-24 no-padding-left no-padding-right';
            helpblockclass = helpblockclass ? '<span class="help-block ' + helpblockclass +'" >{{message}}</span>' : '<span class="help-block col-xs-24 col-sm-24 col-md-24 col-lg-24 no-padding-left no-padding-right" >{{message}}</span>';

            if( !optionname ){
                optionvalue = 'option';
                optionname = 'option.description';
            }

            if( !labeldefault ){
                labeldefault = '--';
            }

            var finalTemplate = [
                '<div class="{{css}}">',
                '    ' + controlLabel,
                '    <div class="' + inputclass + '" >',
                '       <select class="form-control" ng-model="value" ng-change="clear(this)" ng-options="' + optionname.replace(/\'/g, '') + ' for ' + optionvalue.replace(/\'/g, '') + ' in optionlist">',

                '           <option value="">'+labeldefault.replace(/\'/g, '')+'</option>',
                '       </select>',
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
                name : '=',
                optionlist : '=',
                optionname : '=',
                labeldefault : '=',
                controlLabel : '=',
                disabledinput : '='

            },

            link : function(scope, element, attrs) {

                scope.$parent.fields = scope.$parent.fields ? scope.$parent.fields : {};
                scope.$parent.fields[attrs.field] = scope;
                scope.fieldId = attrs.field;
                scope.clear = scope.$parent.clear;

                if(scope.optionname){
                    scope.optionname = JSON.parse( attrs.optionname.replace( /(\')/g, '"') );
                }

                element.html(
                    getTemplate(
                        attrs.optionname,
                        attrs.labeldefault,
                        attrs.controlLabel,
                        attrs.inputclass,
                        attrs.helpblockclass
                    )
                ).show();

                $compile(element.contents())(scope);

            }
        };

        return directive;

    });
