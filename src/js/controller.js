
app.controller('main', ['$scope', 'convertService', function($scope, convertService) {
  $scope.currencyFrom = 'UAH';
  $scope.currencyTo = 'USD';
  $scope.list = convertService.loadList();
  $scope.givenAmount;
  $scope.receivedAmount;
  $scope.fee = '0';
  $scope.convert = convertService.convert;

  $scope.revert = () => {
    const temp = $scope.currencyFrom;
    $scope.currencyFrom = $scope.currencyTo;
    $scope.currencyTo = temp;
  };

  $scope.$watch('currencyFrom', () => {
    if (!$scope.list[$scope.currencyFrom] && !$scope.list[$scope.currencyTo]) {
      return;
    }
    $scope.receivedAmount = convertService.convert(
      $scope.list,
      $scope.currencyFrom,
      $scope.currencyTo,
      $scope.fee[0],
      $scope.givenAmount);
  });

  $scope.$watch('currencyTo', () => {
    if (!$scope.list[$scope.currencyFrom] && !$scope.list[$scope.currencyTo]) {
      return;
    }
    $scope.receivedAmount = convertService.convert(
      $scope.list,
      $scope.currencyFrom,
      $scope.currencyTo,
      $scope.fee[0],
      $scope.givenAmount);
  });

  $scope.$watch('fee', () => {
    if (!$scope.list[$scope.currencyFrom] && !$scope.list[$scope.currencyTo]) {
      return;
    }
    $scope.receivedAmount = convertService.convert(
      $scope.list,
      $scope.currencyFrom,
      $scope.currencyTo,
      $scope.fee[0],
      $scope.givenAmount);
  });

  $scope.$watch('givenAmount', () => {
    if (!$scope.list[$scope.currencyFrom] && !$scope.list[$scope.currencyTo]) {
      return;
    }
    $scope.receivedAmount = convertService.convert(
      $scope.list,
      $scope.currencyFrom,
      $scope.currencyTo,
      $scope.fee[0],
      $scope.givenAmount);
  });
}]);
