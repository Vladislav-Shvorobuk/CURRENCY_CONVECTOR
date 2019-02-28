app.directive('isOffline', [function() {
  return {
    restrict: 'EA',
    replace: true,
    template: `<div class="modalWindow" ng-show='isOffline'>
                 <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Ooops!</h5>
                 </div>
                 <div class="modal-body">
                    <h3>Internet connection does not exist!</h3>
                 </div>
               </div>`
  };
}]);


