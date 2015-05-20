angular.module('iaditor.services', [])

    .service('cropApi', ['$http', function ($http) {

        var urlBase = 'crop.php';


        this.getCustomer = function (id) {
            return $http.get(urlBase + '/' + id);
        };
        this.crop = function (imgUrl,y,x,height,width) {
            
            return $http.post(urlBase+'?imgUrl=' + imgUrl +"&y=" + y + "&x="+ x + "&height="+ height +"&width=" + width + "&action=crop");
        };
        this.saveImage = function(imgUrl){
          console.log(imgUrl);
            return $http.post(urlBase+'?imgUrl=' + imgUrl  + "&action=save");
        };

    }]);