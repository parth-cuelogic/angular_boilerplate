var app = angular.module('angulardemo',['ui.bootstrap','ngRoute']);


app.config(['$locationProvider', '$routeProvider','$controllerProvider',function($locationProvider,$routeProvider,$controllerProvider){
    app.registerCtrl = $controllerProvider.register;

    $routeProvider.
    when('/home',{
        templateUrl:'templates/home/home.html',
        controller:'homeController',
        resolve: loader(['templates/home/home.controller.js'])
    }).
    otherwise('/home');
    
    



    function loadScript(path) {
      var result = $.Deferred(),
      script = document.createElement("script");
      script.async = "async";
      script.type = "text/javascript";
      script.src = path;
      script.onload = script.onreadystatechange = function (_, isAbort) {
          if (!script.readyState || /loaded|complete/.test(script.readyState)) {
             if (isAbort)
                 result.reject();
             else
                result.resolve();
        }
      };
      script.onerror = function () { result.reject(); };
      document.querySelector("head").appendChild(script);
      return result.promise();
    }
    
    function loader(arrayName){
    
        return {
          load: function($q){
                    var deferred = $q.defer(),
                    map = arrayName.map(function(path) {
                        return loadScript(path);
                    });
    
                    $q.all(map).then(function(r){
                        deferred.resolve();
                    });
    
                    return deferred.promise;
            }
        };
    }
}])