const app = angular.module('app', []);
/* eslint-disable max-params */
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


  this.convert = (list, currencyFrom, currencyTo, fee, givenAmount) => {
    const dataFrom = list[currencyFrom];
    const dataTo = list[currencyTo];

    if (currencyFrom === 'UAH') {
      const result = givenAmount / dataTo.sale;

      return result + ((result / 100) * fee);
    }

    if (currencyTo === 'UAH') {
      const result = givenAmount * dataFrom.buy;

      return result + ((result / 100) * fee);
    }

    const result = givenAmount * dataFrom.buy / dataTo.sale;

    return result + ((result / 100) * fee);
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpzL21haW4uanMiLCJqcy9zZXJ2aWNlLmpzIiwianMvY29udHJvbGxlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgYXBwID0gYW5ndWxhci5tb2R1bGUoJ2FwcCcsIFtdKTsiLCIvKiBlc2xpbnQtZGlzYWJsZSBtYXgtcGFyYW1zICovXHJcbmFwcC5zZXJ2aWNlKCdjb252ZXJ0U2VydmljZScsIFsnJGh0dHAnLCBmdW5jdGlvbigkaHR0cCkge1xyXG4gIHRoaXMubGlzdCA9IHt9O1xyXG5cclxuICB0aGlzLmxvYWRMaXN0ID0gKCkgPT4ge1xyXG4gICAgJGh0dHAuZ2V0KCdodHRwczovL2FwaS5wcml2YXRiYW5rLnVhL3AyNGFwaS9wdWJpbmZvP2V4Y2hhbmdlJmpzb24mY291cnNpZD0xMScpXHJcbiAgICAgIC50aGVuKCh7IGRhdGEgfSkgPT4ge1xyXG4gICAgICAgIGRhdGEuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgICAgIHRoaXMubGlzdFtpdGVtLmNjeV0gPSBpdGVtO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuICAgIHJldHVybiB0aGlzLmxpc3Q7XHJcbiAgfTtcclxuXHJcblxyXG4gIHRoaXMuY29udmVydCA9IChsaXN0LCBjdXJyZW5jeUZyb20sIGN1cnJlbmN5VG8sIGZlZSwgZ2l2ZW5BbW91bnQpID0+IHtcclxuICAgIGNvbnN0IGRhdGFGcm9tID0gbGlzdFtjdXJyZW5jeUZyb21dO1xyXG4gICAgY29uc3QgZGF0YVRvID0gbGlzdFtjdXJyZW5jeVRvXTtcclxuXHJcbiAgICBpZiAoY3VycmVuY3lGcm9tID09PSAnVUFIJykge1xyXG4gICAgICBjb25zdCByZXN1bHQgPSBnaXZlbkFtb3VudCAvIGRhdGFUby5zYWxlO1xyXG5cclxuICAgICAgcmV0dXJuIHJlc3VsdCArICgocmVzdWx0IC8gMTAwKSAqIGZlZSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGN1cnJlbmN5VG8gPT09ICdVQUgnKSB7XHJcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGdpdmVuQW1vdW50ICogZGF0YUZyb20uYnV5O1xyXG5cclxuICAgICAgcmV0dXJuIHJlc3VsdCArICgocmVzdWx0IC8gMTAwKSAqIGZlZSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcmVzdWx0ID0gZ2l2ZW5BbW91bnQgKiBkYXRhRnJvbS5idXkgLyBkYXRhVG8uc2FsZTtcclxuXHJcbiAgICByZXR1cm4gcmVzdWx0ICsgKChyZXN1bHQgLyAxMDApICogZmVlKTtcclxuICB9O1xyXG59XSk7XHJcblxyXG5cclxuIiwiXHJcbmFwcC5jb250cm9sbGVyKCdtYWluJywgWyckc2NvcGUnLCAnY29udmVydFNlcnZpY2UnLCBmdW5jdGlvbigkc2NvcGUsIGNvbnZlcnRTZXJ2aWNlKSB7XHJcbiAgJHNjb3BlLmN1cnJlbmN5RnJvbSA9ICdVQUgnO1xyXG4gICRzY29wZS5jdXJyZW5jeVRvID0gJ1VTRCc7XHJcbiAgJHNjb3BlLmxpc3QgPSBjb252ZXJ0U2VydmljZS5sb2FkTGlzdCgpO1xyXG4gICRzY29wZS5naXZlbkFtb3VudDtcclxuICAkc2NvcGUucmVjZWl2ZWRBbW91bnQ7XHJcbiAgJHNjb3BlLmZlZSA9ICcwJztcclxuICAkc2NvcGUuY29udmVydCA9IGNvbnZlcnRTZXJ2aWNlLmNvbnZlcnQ7XHJcblxyXG4gICRzY29wZS5yZXZlcnQgPSAoKSA9PiB7XHJcbiAgICBjb25zdCB0ZW1wID0gJHNjb3BlLmN1cnJlbmN5RnJvbTtcclxuICAgICRzY29wZS5jdXJyZW5jeUZyb20gPSAkc2NvcGUuY3VycmVuY3lUbztcclxuICAgICRzY29wZS5jdXJyZW5jeVRvID0gdGVtcDtcclxuICB9O1xyXG5cclxuICAkc2NvcGUuJHdhdGNoKCdjdXJyZW5jeUZyb20nLCAoKSA9PiB7XHJcbiAgICBpZiAoISRzY29wZS5saXN0WyRzY29wZS5jdXJyZW5jeUZyb21dICYmICEkc2NvcGUubGlzdFskc2NvcGUuY3VycmVuY3lUb10pIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgJHNjb3BlLnJlY2VpdmVkQW1vdW50ID0gY29udmVydFNlcnZpY2UuY29udmVydChcclxuICAgICAgJHNjb3BlLmxpc3QsXHJcbiAgICAgICRzY29wZS5jdXJyZW5jeUZyb20sXHJcbiAgICAgICRzY29wZS5jdXJyZW5jeVRvLFxyXG4gICAgICAkc2NvcGUuZmVlWzBdLFxyXG4gICAgICAkc2NvcGUuZ2l2ZW5BbW91bnQpO1xyXG4gIH0pO1xyXG5cclxuICAkc2NvcGUuJHdhdGNoKCdjdXJyZW5jeVRvJywgKCkgPT4ge1xyXG4gICAgaWYgKCEkc2NvcGUubGlzdFskc2NvcGUuY3VycmVuY3lGcm9tXSAmJiAhJHNjb3BlLmxpc3RbJHNjb3BlLmN1cnJlbmN5VG9dKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgICRzY29wZS5yZWNlaXZlZEFtb3VudCA9IGNvbnZlcnRTZXJ2aWNlLmNvbnZlcnQoXHJcbiAgICAgICRzY29wZS5saXN0LFxyXG4gICAgICAkc2NvcGUuY3VycmVuY3lGcm9tLFxyXG4gICAgICAkc2NvcGUuY3VycmVuY3lUbyxcclxuICAgICAgJHNjb3BlLmZlZVswXSxcclxuICAgICAgJHNjb3BlLmdpdmVuQW1vdW50KTtcclxuICB9KTtcclxuXHJcbiAgJHNjb3BlLiR3YXRjaCgnZmVlJywgKCkgPT4ge1xyXG4gICAgaWYgKCEkc2NvcGUubGlzdFskc2NvcGUuY3VycmVuY3lGcm9tXSAmJiAhJHNjb3BlLmxpc3RbJHNjb3BlLmN1cnJlbmN5VG9dKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgICRzY29wZS5yZWNlaXZlZEFtb3VudCA9IGNvbnZlcnRTZXJ2aWNlLmNvbnZlcnQoXHJcbiAgICAgICRzY29wZS5saXN0LFxyXG4gICAgICAkc2NvcGUuY3VycmVuY3lGcm9tLFxyXG4gICAgICAkc2NvcGUuY3VycmVuY3lUbyxcclxuICAgICAgJHNjb3BlLmZlZVswXSxcclxuICAgICAgJHNjb3BlLmdpdmVuQW1vdW50KTtcclxuICB9KTtcclxuXHJcbiAgJHNjb3BlLiR3YXRjaCgnZ2l2ZW5BbW91bnQnLCAoKSA9PiB7XHJcbiAgICBpZiAoISRzY29wZS5saXN0WyRzY29wZS5jdXJyZW5jeUZyb21dICYmICEkc2NvcGUubGlzdFskc2NvcGUuY3VycmVuY3lUb10pIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgJHNjb3BlLnJlY2VpdmVkQW1vdW50ID0gY29udmVydFNlcnZpY2UuY29udmVydChcclxuICAgICAgJHNjb3BlLmxpc3QsXHJcbiAgICAgICRzY29wZS5jdXJyZW5jeUZyb20sXHJcbiAgICAgICRzY29wZS5jdXJyZW5jeVRvLFxyXG4gICAgICAkc2NvcGUuZmVlWzBdLFxyXG4gICAgICAkc2NvcGUuZ2l2ZW5BbW91bnQpO1xyXG4gIH0pO1xyXG59XSk7XHJcbiJdfQ==
