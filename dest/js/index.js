const app = angular.module('app', []);
app.service('convertService', ['$http', function($http) {
  this.list = {};

  this.loadList = () => {
    $http.get('https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11')
      .then(({ data }) => {
        data.forEach(item => {
          this.list[item.ccy] = item;
        });
      });
    return this.list;
  };


  this.convert = args => {
    const { list, currencyFrom, currencyTo, fee, givenAmount } = args;
    const dataFrom = list[currencyFrom];
    const dataTo = list[currencyTo];

    if (currencyFrom === 'UAH') {
      const result = givenAmount / dataTo.sale;

      return result - ((result / 100) * fee);
    }

    if (currencyTo === 'UAH') {
      const result = givenAmount * dataFrom.buy;

      return result - ((result / 100) * fee);
    }

    const result = givenAmount * dataFrom.buy / dataTo.sale;

    return result - ((result / 100) * fee);
  };
}]);



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

  $scope.$watchGroup(['currencyFrom', 'currencyTo', 'fee', 'givenAmount'], () => {
    if (!$scope.list[$scope.currencyFrom] && !$scope.list[$scope.currencyTo]) {
      return;
    }
    $scope.receivedAmount = convertService.convert(
      { list: $scope.list,
        currencyFrom: $scope.currencyFrom,
        currencyTo: $scope.currencyTo,
        fee: $scope.fee[0],
        givenAmount: $scope.givenAmount });
  });
}]);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpzL21haW4uanMiLCJqcy9zZXJ2aWNlLmpzIiwianMvY29udHJvbGxlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGFwcCA9IGFuZ3VsYXIubW9kdWxlKCdhcHAnLCBbXSk7IiwiYXBwLnNlcnZpY2UoJ2NvbnZlcnRTZXJ2aWNlJywgWyckaHR0cCcsIGZ1bmN0aW9uKCRodHRwKSB7XHJcbiAgdGhpcy5saXN0ID0ge307XHJcblxyXG4gIHRoaXMubG9hZExpc3QgPSAoKSA9PiB7XHJcbiAgICAkaHR0cC5nZXQoJ2h0dHBzOi8vYXBpLnByaXZhdGJhbmsudWEvcDI0YXBpL3B1YmluZm8/ZXhjaGFuZ2UmanNvbiZjb3Vyc2lkPTExJylcclxuICAgICAgLnRoZW4oKHsgZGF0YSB9KSA9PiB7XHJcbiAgICAgICAgZGF0YS5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICAgICAgdGhpcy5saXN0W2l0ZW0uY2N5XSA9IGl0ZW07XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gICAgcmV0dXJuIHRoaXMubGlzdDtcclxuICB9O1xyXG5cclxuXHJcbiAgdGhpcy5jb252ZXJ0ID0gYXJncyA9PiB7XHJcbiAgICBjb25zdCB7IGxpc3QsIGN1cnJlbmN5RnJvbSwgY3VycmVuY3lUbywgZmVlLCBnaXZlbkFtb3VudCB9ID0gYXJncztcclxuICAgIGNvbnN0IGRhdGFGcm9tID0gbGlzdFtjdXJyZW5jeUZyb21dO1xyXG4gICAgY29uc3QgZGF0YVRvID0gbGlzdFtjdXJyZW5jeVRvXTtcclxuXHJcbiAgICBpZiAoY3VycmVuY3lGcm9tID09PSAnVUFIJykge1xyXG4gICAgICBjb25zdCByZXN1bHQgPSBnaXZlbkFtb3VudCAvIGRhdGFUby5zYWxlO1xyXG5cclxuICAgICAgcmV0dXJuIHJlc3VsdCAtICgocmVzdWx0IC8gMTAwKSAqIGZlZSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGN1cnJlbmN5VG8gPT09ICdVQUgnKSB7XHJcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGdpdmVuQW1vdW50ICogZGF0YUZyb20uYnV5O1xyXG5cclxuICAgICAgcmV0dXJuIHJlc3VsdCAtICgocmVzdWx0IC8gMTAwKSAqIGZlZSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcmVzdWx0ID0gZ2l2ZW5BbW91bnQgKiBkYXRhRnJvbS5idXkgLyBkYXRhVG8uc2FsZTtcclxuXHJcbiAgICByZXR1cm4gcmVzdWx0IC0gKChyZXN1bHQgLyAxMDApICogZmVlKTtcclxuICB9O1xyXG59XSk7XHJcblxyXG5cclxuIiwiYXBwLmNvbnRyb2xsZXIoJ21haW4nLCBbJyRzY29wZScsICdjb252ZXJ0U2VydmljZScsIGZ1bmN0aW9uKCRzY29wZSwgY29udmVydFNlcnZpY2UpIHtcclxuICAkc2NvcGUuY3VycmVuY3lGcm9tID0gJ1VBSCc7XHJcbiAgJHNjb3BlLmN1cnJlbmN5VG8gPSAnVVNEJztcclxuICAkc2NvcGUubGlzdCA9IGNvbnZlcnRTZXJ2aWNlLmxvYWRMaXN0KCk7XHJcbiAgJHNjb3BlLmdpdmVuQW1vdW50O1xyXG4gICRzY29wZS5yZWNlaXZlZEFtb3VudDtcclxuICAkc2NvcGUuZmVlID0gJzAnO1xyXG4gICRzY29wZS5jb252ZXJ0ID0gY29udmVydFNlcnZpY2UuY29udmVydDtcclxuXHJcbiAgJHNjb3BlLnJldmVydCA9ICgpID0+IHtcclxuICAgIGNvbnN0IHRlbXAgPSAkc2NvcGUuY3VycmVuY3lGcm9tO1xyXG4gICAgJHNjb3BlLmN1cnJlbmN5RnJvbSA9ICRzY29wZS5jdXJyZW5jeVRvO1xyXG4gICAgJHNjb3BlLmN1cnJlbmN5VG8gPSB0ZW1wO1xyXG4gIH07XHJcblxyXG4gICRzY29wZS4kd2F0Y2hHcm91cChbJ2N1cnJlbmN5RnJvbScsICdjdXJyZW5jeVRvJywgJ2ZlZScsICdnaXZlbkFtb3VudCddLCAoKSA9PiB7XHJcbiAgICBpZiAoISRzY29wZS5saXN0WyRzY29wZS5jdXJyZW5jeUZyb21dICYmICEkc2NvcGUubGlzdFskc2NvcGUuY3VycmVuY3lUb10pIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgJHNjb3BlLnJlY2VpdmVkQW1vdW50ID0gY29udmVydFNlcnZpY2UuY29udmVydChcclxuICAgICAgeyBsaXN0OiAkc2NvcGUubGlzdCxcclxuICAgICAgICBjdXJyZW5jeUZyb206ICRzY29wZS5jdXJyZW5jeUZyb20sXHJcbiAgICAgICAgY3VycmVuY3lUbzogJHNjb3BlLmN1cnJlbmN5VG8sXHJcbiAgICAgICAgZmVlOiAkc2NvcGUuZmVlWzBdLFxyXG4gICAgICAgIGdpdmVuQW1vdW50OiAkc2NvcGUuZ2l2ZW5BbW91bnQgfSk7XHJcbiAgfSk7XHJcbn1dKTtcclxuIl19
