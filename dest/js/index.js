const app = angular.module('app', []);

app.service('convertService', ['$http', function($http) {
  this.list = {};

  $http.get('https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11')
    .then(({ data }) => {
      data.forEach(item => {
        this.list[item.ccy] = item;
      });
    });
}]);




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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpzL21haW4uanMiLCJqcy9zZXJ2aWNlLmpzIiwianMvY29udHJvbGxlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGFwcCA9IGFuZ3VsYXIubW9kdWxlKCdhcHAnLCBbXSk7IiwiXHJcbmFwcC5zZXJ2aWNlKCdjb252ZXJ0U2VydmljZScsIFsnJGh0dHAnLCBmdW5jdGlvbigkaHR0cCkge1xyXG4gIHRoaXMubGlzdCA9IHt9O1xyXG5cclxuICAkaHR0cC5nZXQoJ2h0dHBzOi8vYXBpLnByaXZhdGJhbmsudWEvcDI0YXBpL3B1YmluZm8/ZXhjaGFuZ2UmanNvbiZjb3Vyc2lkPTExJylcclxuICAgIC50aGVuKCh7IGRhdGEgfSkgPT4ge1xyXG4gICAgICBkYXRhLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgdGhpcy5saXN0W2l0ZW0uY2N5XSA9IGl0ZW07XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn1dKTtcclxuXHJcblxyXG4iLCJcclxuYXBwLmNvbnRyb2xsZXIoJ21haW4nLCBbJyRzY29wZScsICdjb252ZXJ0U2VydmljZScsIGZ1bmN0aW9uKCRzY29wZSwgY29udmVydFNlcnZpY2UpIHtcclxuICAkc2NvcGUuY3VycmVuY3lGcm9tID0gJ1VBSCc7XHJcbiAgJHNjb3BlLmN1cnJlbmN5VG8gPSAnVVNEJztcclxuICAkc2NvcGUubGlzdCA9IGNvbnZlcnRTZXJ2aWNlLmxpc3Q7XHJcbiAgJHNjb3BlLmdpdmVuQW1vdW50O1xyXG4gICRzY29wZS5yZWNlaXZlZEFtb3VudDtcclxuICAkc2NvcGUuZmVlID0gJzAnO1xyXG5cclxuICAkc2NvcGUucmV2ZXJ0ID0gKCkgPT4ge1xyXG4gICAgY29uc3QgdGVtcCA9ICRzY29wZS5jdXJyZW5jeUZyb207XHJcbiAgICAkc2NvcGUuY3VycmVuY3lGcm9tID0gJHNjb3BlLmN1cnJlbmN5VG87XHJcbiAgICAkc2NvcGUuY3VycmVuY3lUbyA9IHRlbXA7XHJcbiAgfTtcclxuXHJcbiAgJHNjb3BlLmNvbnZlcnQgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBkYXRhRnJvbSA9ICRzY29wZS5saXN0WyRzY29wZS5jdXJyZW5jeUZyb21dO1xyXG4gICAgY29uc3QgZGF0YVRvID0gJHNjb3BlLmxpc3RbJHNjb3BlLmN1cnJlbmN5VG9dO1xyXG4gICAgY29uc3QgZmVlID0gJHNjb3BlLmZlZVswXTtcclxuXHJcbiAgICBpZiAoJHNjb3BlLmN1cnJlbmN5RnJvbSA9PT0gJ1VBSCcpIHtcclxuICAgICAgY29uc3QgcmVzdWx0ID0gJHNjb3BlLmdpdmVuQW1vdW50IC8gZGF0YVRvLnNhbGU7XHJcbiAgICAgICRzY29wZS5yZWNlaXZlZEFtb3VudCA9IHJlc3VsdCArICgocmVzdWx0IC8gMTAwKSAqIGZlZSk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoJHNjb3BlLmN1cnJlbmN5VG8gPT09ICdVQUgnKSB7XHJcbiAgICAgIGNvbnN0IHJlc3VsdCA9ICRzY29wZS5naXZlbkFtb3VudCAqIGRhdGFGcm9tLmJ1eTtcclxuICAgICAgJHNjb3BlLnJlY2VpdmVkQW1vdW50ID0gcmVzdWx0ICsgKChyZXN1bHQgLyAxMDApICogZmVlKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHJlc3VsdCA9ICRzY29wZS5naXZlbkFtb3VudCAqIGRhdGFGcm9tLmJ1eSAvIGRhdGFUby5zYWxlO1xyXG4gICAgJHNjb3BlLnJlY2VpdmVkQW1vdW50ID0gcmVzdWx0ICsgKChyZXN1bHQgLyAxMDApICogZmVlKTtcclxuICB9O1xyXG59XSk7XHJcbiJdfQ==
