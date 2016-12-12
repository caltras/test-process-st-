(function(ng){
    'use strict' 
    var app = ng.module('app');
    var UploadController = ['$scope','$sce','wistiaService',function($scope,$sce,wistiaService){
        var pub = this;
        var priv = {};
        
        this.postUrl  = $sce.trustAsResourceUrl(window.WISTIA_URL_UPLOAD);
        pub.options = {
            url: window.WISTIA_URL,
            autoUpload:true
        };
        pub.loadingFiles = true;
        pub.files = [];
        pub.$onInit = function(){
            priv.loadData();
        };
        priv.loadData = function(){
            wistiaService.get()
            .then(
                    function (response) {
                        pub.loadingFiles = false;
                        pub.files = response.data || [];
                    },
                    function () {
                        pub.loadingFiles = false;
                    }
            );    
        };
        $scope.reload = function(){
          priv.loadData();
        };
        $scope.end = function(){
            var progress = this.progress();
            return progress.loaded === progress.total;
        };
    }];
    
    var uploadComponent = {
        templateUrl : 'assets/app/js/components/upload.html',
        controller : UploadController
    };

    app.component('wistiaUpload',uploadComponent);
    
})(angular);