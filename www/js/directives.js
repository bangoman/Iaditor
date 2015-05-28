'use strict';

/* Directives */

angular.module('iaditor.directives', [])

  .directive('rotate', ['$http', function ($http) {

    return {
      restrict: 'A',
      link: function (scope, element, attrs , rootScope) {
        scope.$watch(attrs.degrees, function (rotateDegrees) {
              // console.log(rotateDegrees);
			var height = document.getElementById('img1').offsetHeight;
			var width = document.getElementById('img1').offsetWidth;
			var left = document.getElementById('img1').offsetLeft
			var correction = 0;
			var heightMode =false
			if(height > width){			
				heightMode = true;
			}else if (width > height){
				correction = height-width;              
			}						
			if(correction > 0){
				correction = correction * -1;
			}else{
				correction = 0;
			}
			var r = 'rotate(' + rotateDegrees + 'deg)';
			if(heightMode){
				element.css({
				  '-moz-transform': r,
				  '-webkit-transform': r,
				  '-o-transform': r,
				  '-ms-transform': r,
				  'width': height + "px",

				});


			}else{
				scope.correction = correction ;
				
				element.css({
				  'transform-origin':'0% 0%',					
				  '-moz-transform': r,
				  '-webkit-transform': r,
				  '-o-transform': r,
				  '-ms-transform': r,
				  'margin-top' : width + 'px',

				  //'left': correction - 100 + 'px',

				});


			}
		});
          // console.log(element); // =575
      }
    }
  }]);