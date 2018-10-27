var app = angular.module("myApp",["ngRoute"]);
// factory
app.factory("GetData", function($http){
    return {
        photoData   :   function(id, response){
            var urlLink =   "https://jsonplaceholder.typicode.com/photos";
            switch(id){
                case 0  :
                    $http.get(urlLink).then(response);
                    break;
                default :
                    urlLink +=  "/" +   id;
                    $http.get(urlLink).then(response);
            }
        }
    };
});

// controller
app.controller("allPhotos", function($scope, GetData, $routeParams, $route, $location){
    GetData.photoData(0, function(response){
        $scope.photos   =   response.data;
    });

    $scope.gotoPhoto    =   function(id){
        $location.path("/photos/" + id);
    };
});
app.controller("singlePhoto", function($scope, GetData, $routeParams, $route, $location){
    GetData.photoData($routeParams.id, function(response){
        $scope.photo    =   response.data;
    });
});

//route
app.config(function($routeProvider){
    $routeProvider
    .when("/photos",{
        templateUrl :   "template/main.htm",
        controller  :   "allPhotos"
    })
    .when("/photos/:id",{
        templateUrl :   "template/single.htm",
        controller  :   "singlePhoto"
    })
    .otherwise({
        redirectTo  :   "/photos"
    });
});