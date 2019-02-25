
app.controller('main', ['$scope', 'convertService', function($scope, convertService) {
  $scope.currency = 'UAH';
  $scope.currencyReseived = 'USD';
  $scope.canRevert = false;
  $scope.temp = '';
  $scope.list = convertService.list;
  $scope.givenAmount;
  $scope.receivedAmount;


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
      $scope.receivedAmount = $scope.givenAmount / $scope.list[$scope.currencyReseived].sale;
    }

    if ($scope.currencyReseived === 'UAH') {
      $scope.receivedAmount = $scope.givenAmount * $scope.list[$scope.currency].buy;
    }

    if ($scope.currency !== 'UAH' && $scope.currencyReseived !== 'UAH') {
      $scope.receivedAmount = $scope.givenAmount * $scope.list[$scope.currency].buy 
      / $scope.list[$scope.currencyReseived].sale;
    }
  };
}]);
