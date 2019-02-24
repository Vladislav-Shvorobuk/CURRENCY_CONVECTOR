
app.controller('main', ['$scope', 'convertService', function($scope, convertService) {
  $scope.currency = 'UAH';
  $scope.currencyReseived = 'USD';
  $scope.canRevert = false;
  $scope.temp = '';

  $scope.revert = canRevert => {
    if (canRevert) {
      $scope.canRevert = !$scope.canRevert;
      const labels = document.querySelectorAll('label');
      labels.forEach(label => label.classList.toggle('active'));
      $scope.temp = $scope.currency;
      $scope.currency = $scope.currencyReseived;
      $scope.currencyReseived = $scope.temp;
    }
  };

  $scope.setStartPosition = () => {
    const labels = document.querySelectorAll('label');

    if (!labels[0].classList.contains('active')) {
      labels.forEach(label => label.classList.toggle('active'));
    }
  };
  // console.log(convertService.list);
}]);
