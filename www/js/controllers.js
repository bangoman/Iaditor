angular.module('iaditor.controllers', [])

.controller('DashCtrl', function($scope,$compile,$ionicGesture,$ionicPopup,$timeout,$rootScope,$http) {
    $scope.squares = []    ;
    $scope.squaresCount = 0;
    $scope.squareStyle = [];
    $scope.resizing = false;
    $scope.iadObj = {};
    $scope.rawData = {};
    $http.get('structure.json').
      success(function(data, status, headers, config) {
        // this callback will be called asynchronously
        $scope.iadObj =data;
        $scope.iadObj =[{"AppPlugMarkerID":"1","AppPlugMarkerStatus":"1","MarkerName":"AAA feeder demo","ActionSets":[{"ActionSetStatus":"1","ActionSetType":"1","ActionSetName":"AAA feeder demo","ActionSetOrder":"0","ActionSetImage":"http://sodyo.com/cms/InteractiveAd/Sodyo/BackScreenWIcons009 copy.gif","ActionSetActions":[]}],}]
        //$scope.iadObj =[{"appPlugMarkerIDs":["4375"],"AppPlugMarkerStatus":"1","MarkerName":"AAA feeder demo","ActionSets":[{"ActionSetStatus":"1","ActionSetType":"1","ActionSetName":"AAA feeder demo","ActionSetOrder":"0","ActionSetImage":"http://sodyo.com/cms/InteractiveAd/Sodyo/BackScreenWIcons009 copy.gif","ActionSetActions":[]}],}]
        $scope.rawData = data;
        console.log($scope.iadObj[0].MarkerName);        
        $scope.iadObj[0].MarkerName = "test1";         
        $scope.iadObj[0].AppPlugMarkerID = "1";  
        $scope.iadObj[0].ActionSets[0].ActionSetActions = []        
        console.log($scope.iadObj);
        // when the response is available
      }).
      error(function(data, status, headers, config) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });  

   //$rootScope.iadBackground = "http://localhost/sodyo_editor/www/img/test2.jpg";
    $scope.actions =[{"name":"Phone","value":"phone"},{"name":"Url","value":"url"},{"name":"Address","value":"address"}]
    //$scope.iadImg = {"background-image":"url('" + $rootScope.iadBackground + "')","background-size": "auto 100%","background-repeat": "no-repeat","background-position":"center"};
    $rootScope.$watch('$rootScope.iadBackground', function() {       
       $scope.iadImg = {"background-image":"url('"+ $rootScope.iadBackground +"')","background-size": "auto 100%","background-repeat": "no-repeat","background-position":"center"};
       console.log($rootScope.iadBackground);
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
          buttons: [
            {
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
            }
          ]
        });
        myPopup.then(function(res) {
          console.log(res);
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
        $scope.iadObj[0].ActionSets[0].ActionSetActions.push(ActionSetsAction);           
        var c = $scope.squaresCount;
        var square =  angular.element($compile('<div id="'+ c +'" ng-click="selectSquare" ng-style="squareStyle['+ $scope.squaresCount +']" on-drag="dragging($event,'+$scope.squaresCount+')"  style="width:100px;height:100px;background-color:'+action.bg+'; opacity: 0.6;position:absolute;top:'+ (e.gesture.center.pageY-50) +'px;left:'+(e.gesture.center.pageX -50) +'px;font-size:25px;color:#ffffff"><div style="position:relative;top:100%;left:100%;background-color:#000000;width:20px;height:20px;" on-drag="resize($event);"on-release="release()"></div>' + action.type +'</div>')($scope) )
        element.append( square);
        $scope.squaresCount+=1;
//       $ionicGesture.on('pinchout', function(event){$scope.resize(c,1,event)}, square);        
//       $ionicGesture.on('pinchin', function(event){$scope.resize(c,0,event)}, square);        
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
    $scope.markerImage = "";
    $scope.showMarker = false;
    $scope.saveActionsSet = function(){

      $scope.iadObj[0].ActionSets[0].ActionSetImage = $rootScope.iadBackground ;
      $scope.iadObj[0].ActionSets[0].ActionSetName = "test1";
      console.log(angular.toJson($scope.iadObj))
        $scope.appPlugMarkerID=[];
        $scope.appPlugMarkerID[0] = $rootScope.marker;
        console.log($scope.appPlugMarkerID[0]+"!!!!!");
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
        else{
          $http.post('http://test.sodyo.com/cms/ControlPanel/index.php/api/allocateMarkers/3/?AppToken=c296b77eba4525f21ba3ff8776728ba4&&user=ben@sodyo.com&pass=12345', {plugID:"1",content:angular.toJson($scope.iadObj)}).
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
      
      
    }




})

.controller('ChatsCtrl', function($scope,$ionicGesture,$ionicPosition,cropApi,$rootScope,$location,$http,$state) {
  $scope.imageUrl = null;
  //$scope.imageUrl = "https://fbcdn-sphotos-a-a.akamaihd.net/hphotos-ak-xfp1/t31.0-8/p640x640/10443228_744241129023907_7646658678965780801_o.jpg";
  $scope.chooseImage=true;
  $scope.getParameterByName = function(name) {
      name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
      var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
          results = regex.exec(location.hash);
      return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  }  
  $rootScope.marker = $scope.getParameterByName("marker");  
  console.log($rootScope.marker );
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
  $scope.uploadImage = function(){
    var e =  angular.element( document.querySelector( '#fileToUpload' ) );    
    $http.post('http://localhost/sodyo_editor/www/upload.php', {fileToUpload:e[0].value}).
      success(function(data, status, headers, config) {
        
        // this callback will be called asynchronously
        // when the response is available
      }).
      error(function(data, status, headers, config) {
        console.log(data);
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });

    console.log(e);

  }
  $scope.getStartPosition = function(e){
    $scope.imgY = e.gesture.center.pageY - e.srcElement.getBoundingClientRect().top;
    $scope.imgX = e.gesture.center.pageX - e.srcElement.getBoundingClientRect().left;

  }
  $scope.checkImageUrl($scope.imageUrl);
  $scope.imgStyle ={"height":"100%","left":"0px","top":"0px"};
  $scope.img1 =angular.element( document.querySelector( '#img1' ) )
  $ionicGesture.on('dragstart', function(event){$scope.getStartPosition(event)}, $scope.img1);  
  $scope.dragging = function(e){
    var height = document.getElementById('img1').offsetHeight;
    var width = document.getElementById('img1').offsetWidth;
    var topStr = $scope.imgStyle.top;
    var top =  parseInt(topStr.replace("px", ""), 10);
    var leftStr = $scope.imgStyle.left;
    var left =  parseInt(leftStr.replace("px", ""), 10);
    if(top + (e.gesture.center.pageY -$scope.imgY) <= 0 && height + (top + (e.gesture.center.pageY -$scope.imgY)) > 568 ){
      $scope.imgStyle.top = e.gesture.center.pageY -$scope.imgY + "px";
    }
    if(left + (e.gesture.center.pageX -$scope.imgX) <= 0 && width + (left + (e.gesture.center.pageX -$scope.imgX)) > 320 ){
      $scope.imgStyle.left = e.gesture.center.pageX -$scope.imgX+ "px";  
    }
    if($scope.imgStyle.left > "0px" ){
      $scope.imgStyle.left = "0px"
    } 
   // console.log($ionicPosition.pos ition(e));
  }
  $scope.zoom = function(inOut){
    var heightStr = $scope.imgStyle.height;
    var height =  parseInt(heightStr.replace("%", ""), 10);    
      if(height+inOut >= 100){
        $scope.imgStyle.height = (height+inOut) + "%";    
      }    
  };

  $scope.crop = function (imgUrl) {
      //Fake customer data
      
      cropApi.crop(imgUrl,$scope.img1[0].offsetLeft,$scope.img1[0].offsetTop,$scope.img1[0].offsetHeight,$scope.img1[0].offsetWidth)
          .success(function (e) {
              console.log(e);
              $rootScope.iadBackground = e;
              //$location.path('/#/tab/dash')
              $state.go('tab.dash')
              //$scope.status = 'Inserted Customer! Refreshing customer list.';
              //$scope.customers.push(cust);
          }).
          error(function(error) {
            console.log(error);
              //$scope.status = 'Unable to insert customer: ' + error.message;
          });
  };  
  //$scope.crop($scope.imageUrl);
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
