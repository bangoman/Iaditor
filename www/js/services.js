angular.module('iaditor.services', [])

    .service('cropApi', ['$http', function ($http) {

        var urlBase = 'crop.php';


        this.getCustomer = function (id) {
            return $http.get(urlBase + '/' + id);
        };
        this.crop = function (imgUrl,y,x,height,width,angle) {
            
            return $http.post(urlBase+'?imgUrl=' + imgUrl +"&y=" + y + "&x="+ x + "&height="+ height +"&width=" + width + "&angle="+angle+"&action=crop");
        };
        this.rotate = function (imgUrl,angle) {
            
            return $http.post(urlBase+'?imgUrl=' + imgUrl +"&angle="+angle+"&action=rotate");
        };        
        this.saveImage = function(imgUrl){
          	console.log(imgUrl);
            return $http.post(urlBase+'?imgUrl=' + imgUrl  + "&action=save");
        };

    }]);