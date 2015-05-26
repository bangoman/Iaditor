'use strict';

/* Directives */

angular.module('iaditor.directives', [])

  .directive('rotate', ['$http', function ($http) {

    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
          scope.$watch(attrs.degrees, function (rotateDegrees) {
              // console.log(rotateDegrees);
              var r = 'rotate(' + rotateDegrees + 'deg)';
              element.css({
                  '-moz-transform': r,
                  '-webkit-transform': r,
                  '-o-transform': r,
                  '-ms-transform': r,

              });
          });
          // console.log(element); // =575
      }
    }
  }]);