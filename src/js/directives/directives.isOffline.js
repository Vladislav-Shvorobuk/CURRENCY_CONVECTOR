app.directive('isOffline', [function() {
  return {
    restrict: 'A',
    replace: true,
    templateUrl: `<div class="col-lg-8 modal-content" ng-show='isOffline'>
                 <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Ooops!</h5>
                 </div>
                 <div class="modal-body">
                    <h3>Internet connection does not exist!</h3>
                 </div>
               </div>`
  };
}]);


