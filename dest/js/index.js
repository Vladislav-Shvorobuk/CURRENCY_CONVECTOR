const app = angular.module('app', []);
app.constant('currency', ['UAH', 'USD', 'EUR', 'RUR']);
app.constant('URL', 'https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11');
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpzL21haW4uanMiLCJqcy9jb25zdGFudHMuanMiLCJqcy9zZXJ2aWNlLmpzIiwianMvY29udHJvbGxlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDckNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBhcHAgPSBhbmd1bGFyLm1vZHVsZSgnYXBwJywgW10pOyIsImFwcC5jb25zdGFudCgnY3VycmVuY3knLCBbJ1VBSCcsICdVU0QnLCAnRVVSJywgJ1JVUiddKTtcclxuYXBwLmNvbnN0YW50KCdVUkwnLCAnaHR0cHM6Ly9hcGkucHJpdmF0YmFuay51YS9wMjRhcGkvcHViaW5mbz9leGNoYW5nZSZqc29uJmNvdXJzaWQ9MTEnKTsiLCJhcHAuc2VydmljZSgnY29udmVydFNlcnZpY2UnLCBbJyRodHRwJywgJ1VSTCcsIGZ1bmN0aW9uKCRodHRwLCBVUkwpIHtcclxuICB0aGlzLmxpc3QgPSB7fTtcclxuXHJcbiAgdGhpcy5sb2FkTGlzdCA9ICgpID0+IHtcclxuICAgICRodHRwLmdldChVUkwpXHJcbiAgICAgIC50aGVuKCh7IGRhdGEgfSkgPT4ge1xyXG4gICAgICAgIGRhdGEuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgICAgIHRoaXMubGlzdFtpdGVtLmNjeV0gPSBpdGVtO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuICAgIHJldHVybiB0aGlzLmxpc3Q7XHJcbiAgfTtcclxuXHJcbiAgdGhpcy5jb252ZXJ0ID0gYXJncyA9PiB7XHJcbiAgICBjb25zdCB7IGxpc3QsIGN1cnJlbmN5RnJvbSwgY3VycmVuY3lUbywgZmVlLCBnaXZlbkFtb3VudCB9ID0gYXJncztcclxuICAgIGNvbnN0IGRhdGFGcm9tID0gbGlzdFtjdXJyZW5jeUZyb21dO1xyXG4gICAgY29uc3QgZGF0YVRvID0gbGlzdFtjdXJyZW5jeVRvXTtcclxuXHJcbiAgICBpZiAoY3VycmVuY3lGcm9tID09PSAnVUFIJykge1xyXG4gICAgICBjb25zdCByZXN1bHQgPSBnaXZlbkFtb3VudCAvIGRhdGFUby5zYWxlO1xyXG5cclxuICAgICAgcmV0dXJuIHJlc3VsdCAtICgocmVzdWx0IC8gMTAwKSAqIGZlZSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGN1cnJlbmN5VG8gPT09ICdVQUgnKSB7XHJcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGdpdmVuQW1vdW50ICogZGF0YUZyb20uYnV5O1xyXG5cclxuICAgICAgcmV0dXJuIHJlc3VsdCAtICgocmVzdWx0IC8gMTAwKSAqIGZlZSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcmVzdWx0ID0gZ2l2ZW5BbW91bnQgKiBkYXRhRnJvbS5idXkgLyBkYXRhVG8uc2FsZTtcclxuXHJcbiAgICByZXR1cm4gcmVzdWx0IC0gKChyZXN1bHQgLyAxMDApICogZmVlKTtcclxuICB9O1xyXG59XSk7XHJcblxyXG5cclxuIiwiYXBwLmNvbnRyb2xsZXIoJ21haW4nLCBbJyRzY29wZScsICdjb252ZXJ0U2VydmljZScsICdjdXJyZW5jeScsIGZ1bmN0aW9uKCRzY29wZSwgY29udmVydFNlcnZpY2UsIGN1cnJlbmN5KSB7XHJcbiAgJHNjb3BlLmN1cnJlbmN5ID0gY3VycmVuY3k7XHJcbiAgJHNjb3BlLmN1cnJlbmN5RnJvbSA9IGN1cnJlbmN5WzBdO1xyXG4gICRzY29wZS5jdXJyZW5jeVRvID0gY3VycmVuY3lbMV07XHJcbiAgJHNjb3BlLmxpc3QgPSBjb252ZXJ0U2VydmljZS5sb2FkTGlzdCgpO1xyXG4gICRzY29wZS5naXZlbkFtb3VudDtcclxuICAkc2NvcGUucmVjZWl2ZWRBbW91bnQ7XHJcbiAgJHNjb3BlLmZlZSA9ICcwJztcclxuICAkc2NvcGUuY29udmVydCA9IGNvbnZlcnRTZXJ2aWNlLmNvbnZlcnQ7XHJcblxyXG4gICRzY29wZS5yZXZlcnQgPSAoKSA9PiB7XHJcbiAgICBjb25zdCB0ZW1wID0gJHNjb3BlLmN1cnJlbmN5RnJvbTtcclxuICAgICRzY29wZS5jdXJyZW5jeUZyb20gPSAkc2NvcGUuY3VycmVuY3lUbztcclxuICAgICRzY29wZS5jdXJyZW5jeVRvID0gdGVtcDtcclxuICB9O1xyXG5cclxuICAkc2NvcGUuJHdhdGNoR3JvdXAoWydjdXJyZW5jeUZyb20nLCAnY3VycmVuY3lUbycsICdmZWUnLCAnZ2l2ZW5BbW91bnQnXSwgKCkgPT4ge1xyXG4gICAgaWYgKCEkc2NvcGUubGlzdFskc2NvcGUuY3VycmVuY3lGcm9tXSAmJiAhJHNjb3BlLmxpc3RbJHNjb3BlLmN1cnJlbmN5VG9dKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgICRzY29wZS5yZWNlaXZlZEFtb3VudCA9IGNvbnZlcnRTZXJ2aWNlLmNvbnZlcnQoXHJcbiAgICAgIHsgbGlzdDogJHNjb3BlLmxpc3QsXHJcbiAgICAgICAgY3VycmVuY3lGcm9tOiAkc2NvcGUuY3VycmVuY3lGcm9tLFxyXG4gICAgICAgIGN1cnJlbmN5VG86ICRzY29wZS5jdXJyZW5jeVRvLFxyXG4gICAgICAgIGZlZTogJHNjb3BlLmZlZVswXSxcclxuICAgICAgICBnaXZlbkFtb3VudDogJHNjb3BlLmdpdmVuQW1vdW50IH0pO1xyXG4gIH0pO1xyXG59XSk7XHJcbiJdfQ==
