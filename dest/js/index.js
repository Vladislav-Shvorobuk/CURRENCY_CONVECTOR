const app = angular.module('app', []);
app.constant('currency', ['UAH', 'USD', 'EUR', 'RUR']);
app.constant('URL', 'https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11');
app.filter('currencyFilter', function() {
  return function(array, compareValue) {
    return array.filter(item => item !== compareValue);
  };
});
app.service('convertService', ['$http', 'URL', function($http, URL) {
  this.list = {};

  this.loadList = () => {
    $http.get(URL)
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



app.controller('main', ['$scope', 'convertService', 'currency', function($scope, convertService, currency) {
  $scope.currency = currency;
  $scope.currencyFrom = currency[0];
  $scope.currencyTo = currency[1];
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpzL21haW4uanMiLCJqcy9jb25zdGFudHMuanMiLCJqcy9maWx0ZXJzLmpzIiwianMvc2VydmljZS5qcyIsImpzL2NvbnRyb2xsZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGFwcCA9IGFuZ3VsYXIubW9kdWxlKCdhcHAnLCBbXSk7IiwiYXBwLmNvbnN0YW50KCdjdXJyZW5jeScsIFsnVUFIJywgJ1VTRCcsICdFVVInLCAnUlVSJ10pO1xyXG5hcHAuY29uc3RhbnQoJ1VSTCcsICdodHRwczovL2FwaS5wcml2YXRiYW5rLnVhL3AyNGFwaS9wdWJpbmZvP2V4Y2hhbmdlJmpzb24mY291cnNpZD0xMScpOyIsImFwcC5maWx0ZXIoJ2N1cnJlbmN5RmlsdGVyJywgZnVuY3Rpb24oKSB7XHJcbiAgcmV0dXJuIGZ1bmN0aW9uKGFycmF5LCBjb21wYXJlVmFsdWUpIHtcclxuICAgIHJldHVybiBhcnJheS5maWx0ZXIoaXRlbSA9PiBpdGVtICE9PSBjb21wYXJlVmFsdWUpO1xyXG4gIH07XHJcbn0pOyIsImFwcC5zZXJ2aWNlKCdjb252ZXJ0U2VydmljZScsIFsnJGh0dHAnLCAnVVJMJywgZnVuY3Rpb24oJGh0dHAsIFVSTCkge1xyXG4gIHRoaXMubGlzdCA9IHt9O1xyXG5cclxuICB0aGlzLmxvYWRMaXN0ID0gKCkgPT4ge1xyXG4gICAgJGh0dHAuZ2V0KFVSTClcclxuICAgICAgLnRoZW4oKHsgZGF0YSB9KSA9PiB7XHJcbiAgICAgICAgZGF0YS5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICAgICAgdGhpcy5saXN0W2l0ZW0uY2N5XSA9IGl0ZW07XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gICAgcmV0dXJuIHRoaXMubGlzdDtcclxuICB9O1xyXG5cclxuICB0aGlzLmNvbnZlcnQgPSBhcmdzID0+IHtcclxuICAgIGNvbnN0IHsgbGlzdCwgY3VycmVuY3lGcm9tLCBjdXJyZW5jeVRvLCBmZWUsIGdpdmVuQW1vdW50IH0gPSBhcmdzO1xyXG4gICAgY29uc3QgZGF0YUZyb20gPSBsaXN0W2N1cnJlbmN5RnJvbV07XHJcbiAgICBjb25zdCBkYXRhVG8gPSBsaXN0W2N1cnJlbmN5VG9dO1xyXG5cclxuICAgIGlmIChjdXJyZW5jeUZyb20gPT09ICdVQUgnKSB7XHJcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGdpdmVuQW1vdW50IC8gZGF0YVRvLnNhbGU7XHJcblxyXG4gICAgICByZXR1cm4gcmVzdWx0IC0gKChyZXN1bHQgLyAxMDApICogZmVlKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoY3VycmVuY3lUbyA9PT0gJ1VBSCcpIHtcclxuICAgICAgY29uc3QgcmVzdWx0ID0gZ2l2ZW5BbW91bnQgKiBkYXRhRnJvbS5idXk7XHJcblxyXG4gICAgICByZXR1cm4gcmVzdWx0IC0gKChyZXN1bHQgLyAxMDApICogZmVlKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCByZXN1bHQgPSBnaXZlbkFtb3VudCAqIGRhdGFGcm9tLmJ1eSAvIGRhdGFUby5zYWxlO1xyXG5cclxuICAgIHJldHVybiByZXN1bHQgLSAoKHJlc3VsdCAvIDEwMCkgKiBmZWUpO1xyXG4gIH07XHJcbn1dKTtcclxuXHJcblxyXG4iLCJhcHAuY29udHJvbGxlcignbWFpbicsIFsnJHNjb3BlJywgJ2NvbnZlcnRTZXJ2aWNlJywgJ2N1cnJlbmN5JywgZnVuY3Rpb24oJHNjb3BlLCBjb252ZXJ0U2VydmljZSwgY3VycmVuY3kpIHtcclxuICAkc2NvcGUuY3VycmVuY3kgPSBjdXJyZW5jeTtcclxuICAkc2NvcGUuY3VycmVuY3lGcm9tID0gY3VycmVuY3lbMF07XHJcbiAgJHNjb3BlLmN1cnJlbmN5VG8gPSBjdXJyZW5jeVsxXTtcclxuICAkc2NvcGUubGlzdCA9IGNvbnZlcnRTZXJ2aWNlLmxvYWRMaXN0KCk7XHJcbiAgJHNjb3BlLmdpdmVuQW1vdW50O1xyXG4gICRzY29wZS5yZWNlaXZlZEFtb3VudDtcclxuICAkc2NvcGUuZmVlID0gJzAnO1xyXG4gICRzY29wZS5jb252ZXJ0ID0gY29udmVydFNlcnZpY2UuY29udmVydDtcclxuXHJcbiAgJHNjb3BlLnJldmVydCA9ICgpID0+IHtcclxuICAgIGNvbnN0IHRlbXAgPSAkc2NvcGUuY3VycmVuY3lGcm9tO1xyXG4gICAgJHNjb3BlLmN1cnJlbmN5RnJvbSA9ICRzY29wZS5jdXJyZW5jeVRvO1xyXG4gICAgJHNjb3BlLmN1cnJlbmN5VG8gPSB0ZW1wO1xyXG4gIH07XHJcblxyXG4gICRzY29wZS4kd2F0Y2hHcm91cChbJ2N1cnJlbmN5RnJvbScsICdjdXJyZW5jeVRvJywgJ2ZlZScsICdnaXZlbkFtb3VudCddLCAoKSA9PiB7XHJcbiAgICBpZiAoISRzY29wZS5saXN0WyRzY29wZS5jdXJyZW5jeUZyb21dICYmICEkc2NvcGUubGlzdFskc2NvcGUuY3VycmVuY3lUb10pIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgJHNjb3BlLnJlY2VpdmVkQW1vdW50ID0gY29udmVydFNlcnZpY2UuY29udmVydChcclxuICAgICAgeyBsaXN0OiAkc2NvcGUubGlzdCxcclxuICAgICAgICBjdXJyZW5jeUZyb206ICRzY29wZS5jdXJyZW5jeUZyb20sXHJcbiAgICAgICAgY3VycmVuY3lUbzogJHNjb3BlLmN1cnJlbmN5VG8sXHJcbiAgICAgICAgZmVlOiAkc2NvcGUuZmVlWzBdLFxyXG4gICAgICAgIGdpdmVuQW1vdW50OiAkc2NvcGUuZ2l2ZW5BbW91bnQgfSk7XHJcbiAgfSk7XHJcbn1dKTtcclxuIl19
