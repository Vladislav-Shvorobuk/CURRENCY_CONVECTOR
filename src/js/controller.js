
app.controller('main', function($scope) {
  $scope.currency = 'UAH';
  $scope.currencyReseived = 'USD';
  $scope.flagChecked = true;
  $scope.temp = '';


  $scope.revert = (canRevert, onlyOneRevert) => {
    if (canRevert) {
      if (onlyOneRevert) {
        $scope.flagChecked = !$scope.flagChecked;
      }

      $scope.temp = $scope.currency;
      $scope.currency = $scope.currencyReseived;
      $scope.currencyReseived = $scope.temp;
    }
  };
});
