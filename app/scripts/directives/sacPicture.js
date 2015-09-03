'use strict';
angular.module('uolsacApp')
    .directive('sacPicture', ['Util', function(Util) {
        return function(scope, element, attrs){

            var url = attrs.sacPicture;
            var actualSizePrefix = Util.getBootstrapGridSize().monacoFormat;

            function imgResize(element){

                actualSizePrefix = Util.getBootstrapGridSize().monacoFormat;
                var monacoRegex = /\_\d{3,4}x\d{3,4}\.[a-zA-Z]{3,4}$/g;
                var subMonacoRegex = /\d{3,4}x\d{3,4}/g;
                var firstMatch = url.match(monacoRegex);
                var secondMatch = firstMatch[0].replace(subMonacoRegex,actualSizePrefix);
                var finalUrl = url.replace(monacoRegex, secondMatch);

                element.css({
                    'background-image': 'url(' + finalUrl +')',
                    'background-repeat' : 'no-repeat',
                    'background-position' : 'center top',
                    'width' : '100%',
                    'height': '250px'
                });

            }

            imgResize(element);

            angular.element( window ).resize(function() {
                imgResize(element);
            });

        };

    }]);
