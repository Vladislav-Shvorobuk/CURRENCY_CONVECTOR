
app.controller('main', ['$scope', 'convertService', function($scope, convertService) {
  $scope.currencyFrom = 'UAH';
  $scope.currencyTo = 'USD';
  $scope.list = convertService.list;
  $scope.givenAmount;
  $scope.receivedAmount;
  $scope.fee = '0';

  $scope.revert = () => {
    const temp = $scope.currencyFrom;
    $scope.currencyFrom = $scope.currencyTo;
    $scope.currencyTo = temp;
  };

  $scope.convert = () => {
    const dataFrom = $scope.list[$scope.currencyFrom];
    const dataTo = $scope.list[$scope.currencyTo];
    const fee = $scope.fee[0];

    if ($scope.currencyFrom === 'UAH') {
      const result = $scope.givenAmount / dataTo.sale;
      $scope.receivedAmount = result + ((result / 100) * fee);
      return;
    }

    if ($scope.currencyTo === 'UAH') {
      const result = $scope.givenAmount * dataFrom.buy;
      $scope.receivedAmount = result + ((result / 100) * fee);
      return;
    }

    const result = $scope.givenAmount * dataFrom.buy / dataTo.sale;
    $scope.receivedAmount = result + ((result / 100) * fee);
  };
}]);
