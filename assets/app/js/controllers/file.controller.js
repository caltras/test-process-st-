;(function(ng){
    'use strict'
    
    var app = ng.module('app');
    
    var FileController = ['$scope','wistiaService',function($scope,wistiaService){
        var file = $scope.file;
        var state;
        
        file.$destroy = function(){
            state = 'pending';
            wistiaService.delete(file).then(
                function () {
                    state = 'resolved';
                    $scope.clear(file);
                },
                function () {
                    state = 'rejected';
                }
            );
        };
        file.$cancel = function(){
            $scope.clear(file);
        };
        file.$state = function(){
            return state;
        };
    }];

    app.controller('fileController',FileController);
    
})(angular);