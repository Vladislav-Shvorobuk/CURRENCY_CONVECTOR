
app.controller('main', ['$scope', 'convertService', function($scope, convertService) {
  $scope.currency = 'UAH';
  $scope.currencyReseived = 'USD';
  $scope.canRevert = false;
  $scope.temp = '';
  $scope.list = convertService.list;
  $scope.givenAmount;
  $scope.receivedAmount;
  $scope.commission = '0% commission';

  $scope.revert = canRevert => {
    if (canRevert) {
      $scope.canRevert = !$scope.canRevert;
      const labels = document.querySelectorAll('label');
      labels.forEach(label => label.classList.toggle('active'));
      $scope.temp = $scope.currency;
      $scope.currency = $scope.currencyReseived;
      $scope.currencyReseived = $scope.temp;
      $scope.convert();
    }
  };

  $scope.setStartPosition = () => {
    $scope.convert();
    const sellLabel = document.querySelector('.sell');
    const buyLabel = document.querySelector('.buy');

    if ($scope.currency === 'UAH' || $scope.currencyReseived === 'UAH') {
      if (!sellLabel.classList.contains('active')) {
        sellLabel.classList.add('active');
        buyLabel.classList.remove('active');
      }
    }
  };

  $scope.convert = () => {
    if ($scope.currency === 'UAH') {
      const result = $scope.givenAmount / $scope.list[$scope.currencyReseived].sale;
      $scope.receivedAmount = result + ((result / 100) * $scope.commission[0]);
    }

    if ($scope.currencyReseived === 'UAH') {
      const result = $scope.givenAmount * $scope.list[$scope.currency].buy;
      $scope.receivedAmount = result + ((result / 100) * $scope.commission[0]);
    }

    if ($scope.currency !== 'UAH' && $scope.currencyReseived !== 'UAH') {
      const result = $scope.givenAmount * $scope.list[$scope.currency].buy
      / $scope.list[$scope.currencyReseived].sale;
      $scope.receivedAmount = result + ((result / 100) * $scope.commission[0]);
    }
  };
}]);
