const app = angular.module('app', []);

app.service('convertService', ['$http', function($http) {
  this.list = {};

  $http.get('https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11')
    .then(({ data }) => {
      data.forEach(item => {
        console.log(item);
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
  $scope.fee = '0% fee';

  $scope.revert = () => {
    const temp = $scope.currencyFrom;
    $scope.currencyFrom = $scope.currencyTo;
    $scope.currencyTo = temp;
    $scope.convert();
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpzL21haW4uanMiLCJqcy9zZXJ2aWNlLmpzIiwianMvY29udHJvbGxlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBhcHAgPSBhbmd1bGFyLm1vZHVsZSgnYXBwJywgW10pOyIsIlxyXG5hcHAuc2VydmljZSgnY29udmVydFNlcnZpY2UnLCBbJyRodHRwJywgZnVuY3Rpb24oJGh0dHApIHtcclxuICB0aGlzLmxpc3QgPSB7fTtcclxuXHJcbiAgJGh0dHAuZ2V0KCdodHRwczovL2FwaS5wcml2YXRiYW5rLnVhL3AyNGFwaS9wdWJpbmZvP2V4Y2hhbmdlJmpzb24mY291cnNpZD0xMScpXHJcbiAgICAudGhlbigoeyBkYXRhIH0pID0+IHtcclxuICAgICAgZGF0YS5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGl0ZW0pO1xyXG4gICAgICAgIHRoaXMubGlzdFtpdGVtLmNjeV0gPSBpdGVtO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG59XSk7XHJcblxyXG5cclxuIiwiXHJcbmFwcC5jb250cm9sbGVyKCdtYWluJywgWyckc2NvcGUnLCAnY29udmVydFNlcnZpY2UnLCBmdW5jdGlvbigkc2NvcGUsIGNvbnZlcnRTZXJ2aWNlKSB7XHJcbiAgJHNjb3BlLmN1cnJlbmN5RnJvbSA9ICdVQUgnO1xyXG4gICRzY29wZS5jdXJyZW5jeVRvID0gJ1VTRCc7XHJcbiAgJHNjb3BlLmxpc3QgPSBjb252ZXJ0U2VydmljZS5saXN0O1xyXG4gICRzY29wZS5naXZlbkFtb3VudDtcclxuICAkc2NvcGUucmVjZWl2ZWRBbW91bnQ7XHJcbiAgJHNjb3BlLmZlZSA9ICcwJSBmZWUnO1xyXG5cclxuICAkc2NvcGUucmV2ZXJ0ID0gKCkgPT4ge1xyXG4gICAgY29uc3QgdGVtcCA9ICRzY29wZS5jdXJyZW5jeUZyb207XHJcbiAgICAkc2NvcGUuY3VycmVuY3lGcm9tID0gJHNjb3BlLmN1cnJlbmN5VG87XHJcbiAgICAkc2NvcGUuY3VycmVuY3lUbyA9IHRlbXA7XHJcbiAgICAkc2NvcGUuY29udmVydCgpO1xyXG4gIH07XHJcblxyXG4gICRzY29wZS5jb252ZXJ0ID0gKCkgPT4ge1xyXG4gICAgY29uc3QgZGF0YUZyb20gPSAkc2NvcGUubGlzdFskc2NvcGUuY3VycmVuY3lGcm9tXTtcclxuICAgIGNvbnN0IGRhdGFUbyA9ICRzY29wZS5saXN0WyRzY29wZS5jdXJyZW5jeVRvXTtcclxuICAgIGNvbnN0IGZlZSA9ICRzY29wZS5mZWVbMF07XHJcblxyXG4gICAgaWYgKCRzY29wZS5jdXJyZW5jeUZyb20gPT09ICdVQUgnKSB7XHJcbiAgICAgIGNvbnN0IHJlc3VsdCA9ICRzY29wZS5naXZlbkFtb3VudCAvIGRhdGFUby5zYWxlO1xyXG4gICAgICAkc2NvcGUucmVjZWl2ZWRBbW91bnQgPSByZXN1bHQgKyAoKHJlc3VsdCAvIDEwMCkgKiBmZWUpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCRzY29wZS5jdXJyZW5jeVRvID09PSAnVUFIJykge1xyXG4gICAgICBjb25zdCByZXN1bHQgPSAkc2NvcGUuZ2l2ZW5BbW91bnQgKiBkYXRhRnJvbS5idXk7XHJcbiAgICAgICRzY29wZS5yZWNlaXZlZEFtb3VudCA9IHJlc3VsdCArICgocmVzdWx0IC8gMTAwKSAqIGZlZSk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCByZXN1bHQgPSAkc2NvcGUuZ2l2ZW5BbW91bnQgKiBkYXRhRnJvbS5idXkgLyBkYXRhVG8uc2FsZTtcclxuICAgICRzY29wZS5yZWNlaXZlZEFtb3VudCA9IHJlc3VsdCArICgocmVzdWx0IC8gMTAwKSAqIGZlZSk7XHJcbiAgfTtcclxufV0pO1xyXG4iXX0=
