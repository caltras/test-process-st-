(function(module){
    'use strict'
    module.service('wistiaService',['$http',function($http){
        return {
            upload : function(file){
                return $http.post(window.WISTIA_URL_UPLOAD,{
                        contentType :'application/x-www-form-urlencoded', 
                        data : {
                            api_password:window.WISTIA_TOKEN_PASS,
                            file: file
                        }
                    });
            },
            get : function(){
                return $http.get(window.WISTIA_URL_DATA+"/v1/medias.json?api_password="+window.WISTIA_TOKEN_PASS);
            },
            delete : function(file){
                return $http.delete(window.WISTIA_URL_DATA+"/v1/medias/"+file.hashed_id+".json",{
                    api_password:window.WISTIA_TOKEN_PASS
                });
            }
        };
    }]);
})(angular.module('app'));