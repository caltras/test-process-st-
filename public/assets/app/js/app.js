(function(ng){
    'use strict' 
    window.WISTIA_TOKEN_PASS = 'c2b491b5ca23576230d8815c43dac9e7f9ce5d208d58fd255c31ab1c6ea53f43';
    window.WISTIA_URL_UPLOAD = "https://upload.wistia.com?api_password="+window.WISTIA_TOKEN_PASS;
    window.WISTIA_URL_DATA ='https://api.wistia.com';

    var app = ng.module('app',[
        'blueimp.fileupload',
        'ngSanitize'
    ]);
    
    app.config([
        '$httpProvider', 'fileUploadProvider',
        function ($httpProvider, fileUploadProvider) {
            delete $httpProvider.defaults.headers.common['X-Requested-With'];
            
            fileUploadProvider.defaults.redirect = window.location.href.replace(
                /\/[^\/]*$/,
                '/cors/result.html?%s'
            );
            ng.extend(fileUploadProvider.defaults, {
                disableImageResize: /Android(?!.*Chrome)|Opera/
                    .test(window.navigator.userAgent),
                acceptFileTypes: /(\.|\/)(mp4|mkv|mpg|mpeg|ogi|wmv)$/i
            });
        }
    ]);
    app.filter('to_trusted', ['$sce', function($sce){
        return function(text) {
            return $sce.trustAsHtml(text);
        };
    }]);
    
    app.directive("resize",function($timeout){
        return {
            link: function(scope,element,attrs){
                $timeout(function(){
                    var embed = ng.element(element).find("embed");
                    if(embed[0]){
                        embed[0].width=attrs.width;
                        embed[0].height=attrs.height;
                    }
                },200);
            }
        };
    });
    
    /*document.addEventListener('DOMContentLoaded', function () {
    	ng.bootstrap(document,'app');
    });*/
})(angular);
