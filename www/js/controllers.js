angular.module('iaditor.controllers', [])

/* 
 * @DashCtrl
 *
 */
// .controller('DashCtrl', function($scope,$compile,$ionicGesture,$ionicPopup,$timeout,$rootScope,$http) {
.controller('DashCtrl', ['$scope', '$rootScope', '$compile', '$ionicGesture', '$ionicPopup', '$timeout', '$http', function($scope,$rootScope,$compile,$ionicGesture,$ionicPopup,$timeout,$http) {
  $scope.squares = [];
  $scope.squaresCount = 0;
  $scope.squareStyle = [];
  $scope.resizing = false;
  $scope.iadObj = {};
  $scope.rawData = {};

  $scope.iadObj =[{"AppPlugMarkerID":"1","AppPlugMarkerStatus":"1","MarkerName":"AAA feeder demo","ActionSets":[{"ActionSetStatus":"1","ActionSetType":"1","ActionSetName":"AAA feeder demo","ActionSetOrder":"0","ActionSetImage":"http://sodyo.com/cms/InteractiveAd/Sodyo/BackScreenWIcons009 copy.gif","ActionSetActions":[]}],}]
  //$scope.iadObj =[{"appPlugMarkerIDs":["4375"],"AppPlugMarkerStatus":"1","MarkerName":"AAA feeder demo","ActionSets":[{"ActionSetStatus":"1","ActionSetType":"1","ActionSetName":"AAA feeder demo","ActionSetOrder":"0","ActionSetImage":"http://sodyo.com/cms/InteractiveAd/Sodyo/BackScreenWIcons009 copy.gif","ActionSetActions":[]}],}]
  //$scope.rawData = data;

  // console.log($scope.iadObj[0].MarkerName);        
  $scope.iadObj[0].MarkerName = "test1";         
  $scope.iadObj[0].AppPlugMarkerID = "1";  
  $scope.iadObj[0].ActionSets[0].ActionSetActions = []        
  // console.log($scope.iadObj);
  // when the response is available

  $scope.createSquare = function( actions ){

    $scope.squaresCount = 0;
    var element =angular.element( document.querySelector( '#container' ) );
    angular.forEach( actions, function(action) {

      console.log(action.paramsValues);
      if ( action.ActionName == 'phone') {

        action.bg= "blue";
        action.type = "Phone";
      }else if ( action.ActionName == 'url') {

        action.bg= "green";
        action.type = "Url";
      }else if ( action.ActionName == 'address') {

        action.bg= "red";
        action.type = "Address";
      } 

    var c = $scope.squaresCount;
    var square =  angular.element($compile('<div id="'+ c +'" ng-click="selectSquare" ng-style="squareStyle['+ $scope.squaresCount +']" on-drag="dragging($event,'+$scope.squaresCount+')"  style="width:'+action.ActionButtonWidth+'px;height:'+action.ActionButtonHeight+'px;background-color:'+action.bg+'; opacity: 0.6;position:absolute;top:'+ action.ActionButtonPosY +'px;left:'+action.ActionButtonPosX +'px;font-size:25px;color:#ffffff"><div style="position:relative;top:100%;left:100%;background-color:#000000;width:20px;height:20px;" on-drag="resize($event);"on-release="release()"></div>' + action.type +'</div>')($scope) )
    element.append( square);
    $scope.squaresCount += 1;

    });
  };
  //if /dash is empty
  if(!$rootScope.iadBackground){

    if ( $rootScope.previewObj ) {
      // $scope.prevObj =[{"AppPlugMarkerID":"4451","AppPlugMarkerStatus":"1","PlugID":"1","ApplicationID":"3","AccountID":"1","MarkerID":"550","MarkerName":"test1","MarkerImageURL":"http:\/\/test.sodyo.com\/cms\/ControlPanel\/index.php\/api\/markerImage\/3\/?AppPlugMarkerID=4451","marker":{"MarkerID":"550","MarkerStatus":"1","MarkerName":"Kimbery Script","MarkerValue":"5143436215242436"},"ActionSets":[{"ActionSetID":"733","AppPlugMarkerID":"4451","ActionSetStatus":"1","ActionSetType":"1","ActionSetName":"test1","ActionSetOrder":"0","ActionSetImage":"http:\/\/test.sodyo.com\/iaditor\/www\/img\/cropped_sAk01cRY8a.jpg","ActionSetActions":[{"ActionSetActionID":"437","ActionSetID":"733","ActionID":"1","ActionStatus":"1","ActionName":"phone","ActionOrder":"0","ActionButtonPosX":"76","ActionButtonPosY":"284","ActionButtonWidth":"100","ActionButtonHeight":"100","ActionButtonImageURL":"","action":{"ActionID":"1","ActionStatus":"1","ActionIdentifier":"CallPhone","ActionName":"Call Phone"},"paramsValues":{"phone":"12312312"},"paramsValuesDefs":{"phone":{"ActionParamsValueID":"395","ActionSetActionID":"437","ActionParamID":"1","ActionParamsValue":"12312312"}}},{"ActionSetActionID":"438","ActionSetID":"733","ActionID":"1","ActionStatus":"1","ActionName":"phone","ActionOrder":"0","ActionButtonPosX":"59","ActionButtonPosY":"107","ActionButtonWidth":"195","ActionButtonHeight":"83","ActionButtonImageURL":"","action":{"ActionID":"1","ActionStatus":"1","ActionIdentifier":"CallPhone","ActionName":"Call Phone"},"paramsValues":{"phone":"12321321"},"paramsValuesDefs":{"phone":{"ActionParamsValueID":"396","ActionSetActionID":"438","ActionParamID":"1","ActionParamsValue":"12321321"}}}]}],"IsGeoFenced":"0"}]
      $scope.prevObj = $rootScope.previewObj;
      $scope.markerImage = $scope.prevObj.MarkerImageURL;
      $rootScope.iadBackground = $scope.prevObj.ActionSets[0].ActionSetImage;
      // console.log( $scope.prevObj[0].ActionSets[0].ActionSetActions );
      $scope.createSquare( $scope.prevObj.ActionSets[0].ActionSetActions );
      $scope.iadObj[0] = $scope.prevObj;
      console.log($scope.iadObj);
      // console.log( $scope.prevObj.ActionSets[0].ActionSetImage );
    } else {

      $scope.prevObj =[{"AppPlugMarkerID":"4451","AppPlugMarkerStatus":"1","PlugID":"1","ApplicationID":"3","AccountID":"1","MarkerID":"550","MarkerName":"test1","MarkerImageURL":"http:\/\/test.sodyo.com\/cms\/ControlPanel\/index.php\/api\/markerImage\/3\/?AppPlugMarkerID=4451","marker":{"MarkerID":"550","MarkerStatus":"1","MarkerName":"Kimbery Script","MarkerValue":"5143436215242436"},"ActionSets":[{"ActionSetID":"733","AppPlugMarkerID":"4451","ActionSetStatus":"1","ActionSetType":"1","ActionSetName":"test1","ActionSetOrder":"0","ActionSetImage":"http:\/\/test.sodyo.com\/iaditor\/www\/img\/cropped_sAk01cRY8a.jpg","ActionSetActions":[{"ActionSetActionID":"437","ActionSetID":"733","ActionID":"1","ActionStatus":"1","ActionName":"phone","ActionOrder":"0","ActionButtonPosX":"76","ActionButtonPosY":"284","ActionButtonWidth":"100","ActionButtonHeight":"100","ActionButtonImageURL":"","action":{"ActionID":"1","ActionStatus":"1","ActionIdentifier":"CallPhone","ActionName":"Call Phone"},"paramsValues":{"phone":"12312312"},"paramsValuesDefs":{"phone":{"ActionParamsValueID":"395","ActionSetActionID":"437","ActionParamID":"1","ActionParamsValue":"12312312"}}},{"ActionSetActionID":"438","ActionSetID":"733","ActionID":"1","ActionStatus":"1","ActionName":"phone","ActionOrder":"0","ActionButtonPosX":"59","ActionButtonPosY":"107","ActionButtonWidth":"195","ActionButtonHeight":"83","ActionButtonImageURL":"","action":{"ActionID":"1","ActionStatus":"1","ActionIdentifier":"CallPhone","ActionName":"Call Phone"},"paramsValues":{"phone":"12321321"},"paramsValuesDefs":{"phone":{"ActionParamsValueID":"396","ActionSetActionID":"438","ActionParamID":"1","ActionParamsValue":"12321321"}}}]}],"IsGeoFenced":"0"}]
      $scope.markerImage = $scope.prevObj[0].MarkerImageURL;
      $rootScope.iadBackground = $scope.prevObj[0].ActionSets[0].ActionSetImage;
      // console.log( $scope.prevObj[0].ActionSets[0].ActionSetActions );
      $scope.createSquare( $scope.prevObj[0].ActionSets[0].ActionSetActions );
    } 

  } else { 
    
    $scope.markerImage = "";
  }  // $rootScope.iadBackground image condition check ends here
    
  $scope.actions =[{"name":"Phone","value":"phone"},{"name":"Url","value":"url"},{"name":"Address","value":"address"}]

  $rootScope.$watch('$rootScope.iadBackground', function() {       
    $scope.iadImg = {"background-image":"url('"+ $rootScope.iadBackground +"')","background-size": "auto 100%","background-repeat": "no-repeat","background-position":"center"};
    // console.log($rootScope.iadBackground);
  });

  $scope.data = {}
  $scope.data.phone="";
  $scope.data.address="";
  $scope.data.url="";

  

  // An elaborate, custom popup
  $scope.actionPop = function(e){
    $scope.showActionsList = true;
    $scope.showPhone = false;
    $scope.showUrl = false;
    $scope.showAddress = false;
    $scope.data.phone ="";
    $scope.data.url = "";
    $scope.data.address="";

    var myPopup = $ionicPopup.show({
      //template: '<select type="password" ng-model="data.wifi" ng-options="a.name for a in actions">',
      templateUrl: "templates/popup.html",
      title: 'Choose action',
      subTitle: '',
      scope: $scope,
      buttons: [{
        text: '<b>Save</b>',
        type: 'button-positive',
        onTap: function(e) {
          console.log($scope.data.selectedAction + "!");
          if ($scope.data.phone.length > 0) {
            var res = {"obj":{"phone":$scope.data.phone},"type":"phone","value":$scope.data.phone,"bg":"blue","actionId":"1"}
            return res;
          }
          else if($scope.data.url.length > 0){
            var res = {"obj":{"url":$scope.data.url},"type":"url","value":$scope.data.url,"bg":"green","actionId":"2"}
            return res;

          }                
          else if($scope.data.address.length > 0){
            var res = {"obj":{"address":$scope.data.address},"type":"address","value":$scope.data.address,"bg":"red","actionId":"3"}
            return res;

          }                
        }
      }]
    });

    myPopup.then(function(res) {
      // console.log(res);
      $scope.addSquare(e,res)
    });        
  }

  $scope.actionPage = function(action){

    if(action=="phone"){
      $scope.showPhone=true;
    }
    else if(action=="url"){
      $scope.showUrl = true;
    }else if(action=="address"){
      $scope.showAddress = true;
    }
    $scope.showActionsList = false;
  }

  $scope.addSquare = function(e,action){ 
    // console.log(action);
    var element =angular.element( document.querySelector( '#container' ) );
    //$ionicGesture.on('hold', function(event){$scope.actionPop(event)}, element);        
    $scope.squareStyle.push({});
    $scope.squares.push(action);
    var paramValue = action.obj; 
    var ActionSetsAction = {"ActionID":"1",
    "ActionStatus": action.actionId,
    "ActionOrder":"0",
    "ActionName":action.type,
    "ActionButtonPosX":Math.round((e.gesture.center.pageX-50)).toString(),
    "ActionButtonPosY":Math.round((e.gesture.center.pageY-50)).toString(),
    "ActionButtonWidth":"100",
    "ActionButtonHeight":"100",
    "ActionButtonImageURL":"",
    "paramsValues":paramValue,}
    /*var ActionSetsAction = {
      "ActionID": action.actionId,
      "ActionName": "test" + action.actionId,
      "ActionStatus": "1",
      "ActionOrder": "0",
      "ActionButtonPosX": (e.gesture.center.pageX-50).toString() ,
      "ActionButtonPosY":  (e.gesture.center.pageY-50).toString() ,
      "ActionButtonWidth": "100",
      "ActionButtonHeight": "100",
      "ActionButtonImageURL": "",
      "paramsValues":paramValue,
      
    }*/
    // console.log(ActionSetsAction);
    $scope.iadObj[0].ActionSets[0].ActionSetActions.push(ActionSetsAction);           
    var c = $scope.squaresCount;
    // alert(c);
    var square =  angular.element($compile('<div id="'+ c +'" ng-click="selectSquare" ng-style="squareStyle['+ $scope.squaresCount +']" on-drag="dragging($event,'+$scope.squaresCount+')"  style="width:100px;height:100px;background-color:'+action.bg+'; opacity: 0.6;position:absolute;top:'+ (e.gesture.center.pageY-50) +'px;left:'+(e.gesture.center.pageX -50) +'px;font-size:25px;color:#ffffff"><div style="position:relative;top:100%;left:100%;background-color:#000000;width:20px;height:20px;" on-drag="resize($event);"on-release="release()"></div>' + action.type +'</div>')($scope) )
    element.append( square);
    $scope.squaresCount+=1;
    //$ionicGesture.on('pinchout', function(event){$scope.resize(c,1,event)}, square);        
    //$ionicGesture.on('pinchin', function(event){$scope.resize(c,0,event)}, square);        
    //$ionicGesture.on('pinchout', resize, square, {});
    //$scope.squares.push();
  }

  $scope.release = function(){
    $scope.resizing = false;
    $scope.lastDeltaY = 0;
    $scope.lastDeltaX = 0;
  }

  $scope.lastDeltaY = 0;
  $scope.resize = function(e){
    $scope.resizing = true;
    //alert(JSON.stringify(e.gesture))        
    var deltaX = e.gesture.deltaX;
    var deltaY = e.gesture.deltaY;        
    var parentSquare = e.srcElement.parentElement;
    var widthStr = parentSquare.style.width;
    var width =  parseInt(widthStr.replace("px", ""), 10);
    var heightStr = parentSquare.style.height;
    var height =  parseInt(heightStr.replace("px", ""), 10);
    parentSquare.style.height =((deltaY + height)-$scope.lastDeltaY ) +"px";
    parentSquare.style.width =((deltaX + width)-$scope.lastDeltaX ) +"px";
    $scope.lastDeltaY = deltaY;
    $scope.lastDeltaX = deltaX;
    var key = parseInt(e.srcElement.parentElement.id);
    $scope.iadObj[0].ActionSets[0].ActionSetActions[key].ActionButtonWidth =((deltaX + width)-$scope.lastDeltaX ).toString();
    $scope.iadObj[0].ActionSets[0].ActionSetActions[key].ActionButtonHeight =((deltaY + height)-$scope.lastDeltaY ).toString();        
  }

  // Drag square box on the top of the image
  $scope.dragging = function(e,count){
    if(!$scope.resizing){
      //console.log(e.gesture.center.pageX)
      var heightStr = e.srcElement.style.height;
      var height =  parseInt(heightStr.replace("px", ""), 10);
      var widthStr = e.srcElement.style.width
      var width =  parseInt(widthStr.replace("px", ""), 10);
      var top = ((e.gesture.center.pageY) - (height/2));
      var left = ((e.gesture.center.pageX) - (width/2));
      $scope.squareStyle[count] = {      

        //"transform": "translate(" + e.gesture.center.pageX + "px, " + e.gesture.center.pageY + "px)",
        //"-webkit-transform": "translate(" + e.gesture.center.pageX + "px, " + e.gesture.center.pageY + "px)"
        "top":top + "px",
        "left":left + "px"
      };
      var key = parseInt(e.srcElement.id);
      $scope.iadObj[0].ActionSets[0].ActionSetActions[key].ActionButtonPosX =  Math.round(left).toString();
      $scope.iadObj[0].ActionSets[0].ActionSetActions[key].ActionButtonPosY =  Math.round(top).toString();        

    }
  }

  // $scope.markerImage = "";
  $scope.showMarker = false;
  $scope.saveActionsSet = function(){
    $scope.iadObj[0].ActionSets[0].ActionSetImage = $rootScope.iadBackground ;
    $scope.iadObj[0].ActionSets[0].ActionSetName = "test1";    
    $scope.appPlugMarkerID=[];
    $scope.appPlugMarkerID[0] = $rootScope.marker;
    console.log($scope.appPlugMarkerID[0]+"!!!!!");
    
    console.log($scope.iadObj);
    console.log("!!!!!");

    if($rootScope.marker){
      $http.post('http://test.sodyo.com/cms/ControlPanel/index.php/api/updateMarkers/3/?AppToken=c296b77eba4525f21ba3ff8776728ba4&&user=ben@sodyo.com&pass=12345', {plugID:"1",appPlugMarkerIDs:angular.toJson($scope.appPlugMarkerID),content:angular.toJson($scope.iadObj)}).
      success(function(data, status, headers, config) {
        console.log(data);
        $scope.markerImage = data[0].markerImageLink;
        $scope.showMarker = true;
        // this callback will be called asynchronously
        // when the response is available
      }).
      error(function(data, status, headers, config) {
        console.log(data);

        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });        
    }
    else {

      $http.post('http://test.sodyo.com/cms/ControlPanel/index.php/api/allocateMarkers/3/?AppToken=c296b77eba4525f21ba3ff8776728ba4&&user=ben@sodyo.com&pass=12345', {plugID:"1",content:angular.toJson($scope.iadObj)}).
      success(function(data, status, headers, config) {
        console.log(data);
        $scope.markerImage = data[0].markerImageLink;
        $scope.showMarker = true;
      }).
      error(function(data, status, headers, config) {
        // console.log(data);
      });
    }
  }
}])

/* 
 * @ChatsCtrl
 *
 */
.controller('ChatsCtrl',[ '$scope','$ionicGesture','$ionicPosition','cropApi', '$rootScope', '$location', '$http', '$state', '$ionicGesture', '$interval', function($scope,$ionicGesture,$ionicPosition,cropApi,$rootScope,$location,$http,$state, $ionicGesture, $interval) {

  deviceWidth = window.innerWidth;
  deviceHeight = window.innerHeight;
  // alert(deviceHeight +'::'+deviceWidth);

  // $rootScope.screenWidth = '321px';
  // widthRatio = widthDiff/320
     $scope.calculateAspectRatioFit = function(srcWidth, srcHeight, maxWidth, maxHeight) {
        var ratio = [maxWidth / srcWidth, maxHeight / srcHeight ];
        ratio = Math.min(ratio[0], ratio[1]);

        return { width:srcWidth*ratio, height:srcHeight*ratio };
     };
     var dimensions = $scope.calculateAspectRatioFit(320,568,deviceWidth,deviceHeight);

    $rootScope.screenWidth  =  dimensions.width + "px";
    $rootScope.screenHeight   = dimensions.height + "px";


  console.log( $rootScope.screenWidth+'::'+$rootScope.screenHeight); 

  $scope.imageUrl = null;
  $scope.chooseImage=true;
  var element = angular.element(document.querySelector('#img1'));

  // Zoom In 
  $ionicGesture.on('pinchin', function (event) {
    $scope.$apply(function () {
      $scope.zoom(-1);
    });
  }, element);

  // Zoom Out
  $ionicGesture.on('pinchout', function (event) {
    $scope.$apply(function () {
      $scope.zoom( 1 );
    });
  }, element);

  // Get parameter By name
  $scope.getParameterByName = function(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.hash);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  }

  $rootScope.marker = $scope.getParameterByName("marker");  
  console.log($rootScope.marker );

  // Check if $root.scope.marker exist 
  if ( $rootScope.marker ) {
    $http.get('http://test.sodyo.com/cms/ControlPanel/index.php/api/markerContent/3/?AppToken=c296b77eba4525f21ba3ff8776728ba4&AppPlugMarkerID=' + $rootScope.marker ).then(function( resp) {

      // For JSON responses, resp.data contains the result
      if ( resp.data.ActionSets[0].ActionSetImage ) {
        $scope.ifActionSetImage = true ;
        $rootScope.previewObj = resp.data;
      };
    }, function(err) {
      console.error('ERR', err);
      // err.status will contain the status code
    })
   };

  // Check Image URL
  $scope.checkImageUrl = function(imgUrl){    

    if(imgUrl){
      cropApi.saveImage(imgUrl)
      .success(function (e) {
        $scope.imageUrl = e;
        $scope.chooseImage=false;
        console.log($scope.imageUrl);
      }).
      error(function(error) {
        console.log(error);
      });       
    }
  }

  // Image Upload method
  $scope.uploadImage = function(){
    var e =  angular.element( document.querySelector( '#fileToUpload' ) );    
    $http.post('http://localhost/sodyo_editor/www/upload.php', {fileToUpload:e[0].value}).
    success(function(data, status, headers, config) {
      console.log(data);
      // this callback will be called asynchronously
      // when the response is available
    }).
    error(function(data, status, headers, config) {
      console.log(data);
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    });
  }

  $scope.getStartPosition = function(e){
    $scope.imgY = e.gesture.center.pageY - e.srcElement.getBoundingClientRect().top;
    $scope.imgX = e.gesture.center.pageX - e.srcElement.getBoundingClientRect().left;
  }

  $scope.checkImageUrl($scope.imageUrl);
  $scope.imgStyle ={"height":"100%","left":"0px","top":"0px"};
  // alert($scope.imgStyle);
  $scope.img1 =angular.element( document.querySelector( '#img1' ) )
  $ionicGesture.on('dragstart', function(event){$scope.getStartPosition(event)}, $scope.img1);

  // Drag Uploaded Image
  $scope.dragging = function(e){

    // console.log(e.gesture);
    var height = document.getElementById('img1').offsetHeight;
    var width = document.getElementById('img1').offsetWidth;
    var topStr = $scope.imgStyle.top;
    var top =  parseInt(topStr.replace("px", ""), 10);
    var leftStr = $scope.imgStyle.left;
    var left =  parseInt(leftStr.replace("px", ""), 10);
    var right = left + width ; 
    var containerHeight = parseInt($rootScope.screenHeight.replace("px", ""), 10 );
    var containerWidth = parseInt($rootScope.screenWidth.replace("px", ""), 10 );

    var limitRight =  containerWidth ;

    if(top + (e.gesture.center.pageY -$scope.imgY) <= 0 && height + (top + (e.gesture.center.pageY -$scope.imgY)) > containerHeight ){
      $scope.imgStyle.top = e.gesture.deltaY+"px";
      $scope.imgStyle.top = e.gesture.center.pageY -$scope.imgY + "px";
    }
    // + (e.gesture.center.pageX -$scope.imgX)
    //console.log((right)  + "=" + limitRight);
    var l = (e.gesture.center.pageX -$scope.imgX);
    var r = l + width;
    console.log(r);
    if( (left - $rootScope.offsetLeft) + (e.gesture.center.pageX -$scope.imgX) <= 0 &&  r  > limitRight  ){

      // console.log('enter',width + ( (left + $rootScope.offsetLeft) + (e.gesture.center.pageX -$scope.imgX)) );
      $scope.imgStyle.left = e.gesture.center.pageX - $scope.imgX+ "px";  
    }
    if($scope.imgStyle.left > "0px" ){
        $scope.imgStyle.left = "0px"
    }
    // console.log($ionicPosition.pos ition(e));
    // console.log(topStr);
  }

  // Image zoom ( zoom in and zoom out )
  $scope.zoom = function(inOut){
    var heightStr = $scope.imgStyle.height;
    var height =  parseInt(heightStr.replace("%", ""), 10);

    if(height+inOut >= 100){
      $scope.imgStyle.height = (height+inOut) + "%";    
    }    
  };

  // Crop image
  $scope.crop = function (imgUrl) {
   //Fake customer data
    
    cropApi.crop(imgUrl,$scope.img1[0].offsetLeft,$scope.img1[0].offsetTop,$scope.img1[0].offsetHeight,$scope.img1[0].offsetWidth)
    .success(function (e) {
      console.log(e);
      $rootScope.iadBackground = e;
      $state.go('tab.dash')
    }).
      error(function(error) {
      console.log(error);
        //$scope.status = 'Unable to insert customer: ' + error.message;
    });
  };  

  // Go to Edit page
  $scope.goToEdit = function () {
    //Fake customer data
    $state.go('tab.dash');
  }; 

  // Rotate Image
  $scope.rotAngle = 0;
  $scope.angle = $scope.rotAngle;

  $scope.rotate = function ( direction ) {

    var height = document.getElementById('img1').offsetHeight;
    var width = document.getElementById('img1').offsetWidth;
    correction = width - height;

    if ( correction > 0) {

      correction = '-'+correction+'px';
    } else{
      correction = '0px';
    }

    if ( direction == 'left') {
      $scope.angle = $scope.angle - 90 ;
      $scope.imgRotationCss = '  height: 610px;left:'+correction+';';
    }else {
      $scope.angle = $scope.angle + 90 ;
      $scope.imgRotationCss = '  height: 610px;left:'+correction+';';
    };     
  };
}])


/* 
 * @ChatDetailCtrl
 *
 */
.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

/* 
 * @AccountCtrl
 *
 */
.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

/* 
 * @TabsCtrl
 *
 */
// .controller('TabsCtrl', function($scope,$rootScope) {
 .controller('TabsCtrl', ['$scope', '$rootScope',function($scope, $rootScope) {


  // var element =angular.element( document.querySelector( '#tabsContainer' ) );
  var deviceWidth = window.innerWidth;
  var screenW = 0;
  
  // $rootScope.offsetLeft = ( deviceWidth - screenW ) / 2;
  // console.log($rootScope.offsetLeft);
  $scope.tabsStyle = {'width':'320px','height':'568px'};
  $rootScope.$watch('screenWidth', function() {       
    // $scope.width  = $rootScope.screenWidth;
    if($rootScope.screenWidth){
      screenW = parseInt($rootScope.screenWidth.replace("px", ""), 10);
      $rootScope.offsetLeft = ( deviceWidth - screenW ) / 2;
    }

    // $scope.tabsStyle = {'width': $rootScope.screenWidth+'px','height':$rootScope.screenHeight+'px'};
    $scope.tabsStyle = {'width': $rootScope.screenWidth, 'height': $rootScope.screenHeight };
    console.log($rootScope.offsetLeft);
  });
}]);
