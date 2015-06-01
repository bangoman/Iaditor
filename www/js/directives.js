'use strict';

/* Directives */

angular.module('iaditor.directives', [])

  .directive('rotate', ['$http','$rootScope', function ($http, $rootScope) {

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
  }])
  
  // Directive to pinch zoom images
  .directive('pinchZoom', function() {

  var _directive =  {
    restrict : 'A',
    scope    : false,
    link     : _link
  };

  function _link(scope, element, attrs ) {
    // var elWidth = element[0].offsetWidth;
    // var elHeight = element[0].offsetHeight;

    var elWidth = scope.screenWidth;
    var elHeight = scope.screenHeight;

    var mode = '';

    var distance = 0;
    var initialDistance = 0;

    var scale = 1;
    var relativeScale = 1;
    var initialScale = 1;
    var MAX_SCALE = 3;

    var positionX = 0;
    var positionY = 0;

    var initialPositionX = 0;
    var initialPositionY = 0;

    var originX = 0;
    var originY = 0;

    var startX = 0;
    var startY = 0;
    var moveX = 0;
    var moveY = 0;

    element.css({
      '-webkit-transform-origin' : '0 0',
      'transform-origin'         : '0 0'
    });

    element.on('touchstart', function(evt) {
      startX = evt.touches[0].pageX;
      startY = evt.touches[0].pageY;
      initialPositionX = positionX;
      initialPositionY = positionY;
      moveX = 0;
      moveY = 0;
      mode = '';

      if (evt.touches.length === 2) {

        initialScale = scale;
        initialDistance = getDistance(evt);
        originX = evt.touches[0].pageX -
                 parseInt((evt.touches[0].pageX - evt.touches[1].pageX) / 2, 10) -
                 element[0].offsetLeft - initialPositionX;
        originY = evt.touches[0].pageY -
                 parseInt((evt.touches[0].pageY - evt.touches[1].pageY) / 2, 10) -
                 element[0].offsetTop - initialPositionY;

      }
    });

    element.on('touchmove', function(evt) {
      evt.preventDefault();

      if (mode === 'swipe' && scale > 1) {

        moveX = evt.touches[0].pageX - startX;
        moveY = evt.touches[0].pageY - startY;

        positionX = initialPositionX + moveX;
        positionY = initialPositionY + moveY;

        transformElement();

      } else if (mode === 'pinch') {

        distance = getDistance(evt);
        relativeScale = distance / initialDistance;
        scale = relativeScale * initialScale;

        positionX = originX * (1 - relativeScale) + initialPositionX + moveX;
        positionY = originY * (1 - relativeScale) + initialPositionY + moveY;

        transformElement();

      } else {

        if (evt.touches.length === 1) {
          mode = 'swipe';
        } else if (evt.touches.length === 2) {
          mode = 'pinch';
        }

      }

      transformElement();
    });

    element.on('touchend', function(evt) {

      if (mode === 'pinch') {

        if (scale < 1) {

          scale = 1;
          positionX = 0;
          positionY = 0;

        } else if (scale > MAX_SCALE) {

          scale = MAX_SCALE;
          relativeScale = scale / initialScale;
          positionX = originX * (1 - relativeScale) + initialPositionX + moveX;
          positionY = originY * (1 - relativeScale) + initialPositionY + moveY;

        }

      }

      if (scale > 1) {

        if (positionX > 0) {
          positionX = 0;
        } else if (positionX < elWidth * (1 - scale)) {
          positionX = elWidth * (1 - scale);
        }
        if (positionY > 0) {
          positionY = 0;
        } else if (positionY < elHeight * (1 - scale)) {
          positionY = elHeight * (1 - scale);
        }

      }

      transformElement(0.1);
    });

    function getDistance(evt) {
      var d = Math.sqrt(Math.pow(evt.touches[0].pageX - evt.touches[1].pageX, 2) +
                        Math.pow(evt.touches[0].pageY - evt.touches[1].pageY, 2));
      return parseInt(d, 10);
    }

    function transformElement(duration) {
      var transition  = duration ? 'all cubic-bezier(0,0,.5,1) ' + duration + 's' : '',
          matrixArray = [scale, 0, 0, scale, positionX, positionY],
          matrix      = 'matrix(' + matrixArray.join(',') + ')';

      element.css({
        '-webkit-transition' : transition,
        'transition'         : transition,
        '-webkit-transform'  : matrix + ' translate3d(0,0,0)',
        'transform'          : matrix
      });
    }
  }
  return _directive;
});
	