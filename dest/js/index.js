const app = angular.module('app', []);

app.config(['convertServiceProvider', function(convertServiceProvider) {
  convertServiceProvider.setURL('https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11');
}]);
app.constant('currency', ['UAH', 'USD', 'EUR', 'RUR']);
// app.constant('URL', 'https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11');
app.component('mainContainerComponent', {
  templateUrl: 'main-container.html',
  replace: true
});
app.filter('currencyFilter', function() {
  return function(array, compareValue) {
    return array.filter(item => item !== compareValue);
  };
});
app.provider('convertService', function() {
  let URL = '';
  this.setURL = url => (URL = url);

  this.$get = ['$http', function($http) {
    return {
      loadList: () => {
        const list = {};
        $http.get(URL)
          .then(({ data }) => {
            data.forEach(item => {
              list[item.ccy] = item;
            });
          });
        return list;
      },

      convert: args => {
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
      }
    };
  }];
});



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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpzL21haW4uanMiLCJqcy9jb25zdGFudHMuanMiLCJqcy9jb21wb25lbnQuanMiLCJqcy9maWx0ZXJzLmpzIiwianMvc2VydmljZS5qcyIsImpzL2NvbnRyb2xsZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ0pBO0FBQ0E7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDM0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBhcHAgPSBhbmd1bGFyLm1vZHVsZSgnYXBwJywgW10pO1xyXG5cclxuYXBwLmNvbmZpZyhbJ2NvbnZlcnRTZXJ2aWNlUHJvdmlkZXInLCBmdW5jdGlvbihjb252ZXJ0U2VydmljZVByb3ZpZGVyKSB7XHJcbiAgY29udmVydFNlcnZpY2VQcm92aWRlci5zZXRVUkwoJ2h0dHBzOi8vYXBpLnByaXZhdGJhbmsudWEvcDI0YXBpL3B1YmluZm8/ZXhjaGFuZ2UmanNvbiZjb3Vyc2lkPTExJyk7XHJcbn1dKTsiLCJhcHAuY29uc3RhbnQoJ2N1cnJlbmN5JywgWydVQUgnLCAnVVNEJywgJ0VVUicsICdSVVInXSk7XHJcbi8vIGFwcC5jb25zdGFudCgnVVJMJywgJ2h0dHBzOi8vYXBpLnByaXZhdGJhbmsudWEvcDI0YXBpL3B1YmluZm8/ZXhjaGFuZ2UmanNvbiZjb3Vyc2lkPTExJyk7IiwiYXBwLmNvbXBvbmVudCgnbWFpbkNvbnRhaW5lckNvbXBvbmVudCcsIHtcclxuICB0ZW1wbGF0ZVVybDogJ21haW4tY29udGFpbmVyLmh0bWwnLFxyXG4gIHJlcGxhY2U6IHRydWVcclxufSk7IiwiYXBwLmZpbHRlcignY3VycmVuY3lGaWx0ZXInLCBmdW5jdGlvbigpIHtcclxuICByZXR1cm4gZnVuY3Rpb24oYXJyYXksIGNvbXBhcmVWYWx1ZSkge1xyXG4gICAgcmV0dXJuIGFycmF5LmZpbHRlcihpdGVtID0+IGl0ZW0gIT09IGNvbXBhcmVWYWx1ZSk7XHJcbiAgfTtcclxufSk7IiwiYXBwLnByb3ZpZGVyKCdjb252ZXJ0U2VydmljZScsIGZ1bmN0aW9uKCkge1xyXG4gIGxldCBVUkwgPSAnJztcclxuICB0aGlzLnNldFVSTCA9IHVybCA9PiAoVVJMID0gdXJsKTtcclxuXHJcbiAgdGhpcy4kZ2V0ID0gWyckaHR0cCcsIGZ1bmN0aW9uKCRodHRwKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBsb2FkTGlzdDogKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGxpc3QgPSB7fTtcclxuICAgICAgICAkaHR0cC5nZXQoVVJMKVxyXG4gICAgICAgICAgLnRoZW4oKHsgZGF0YSB9KSA9PiB7XHJcbiAgICAgICAgICAgIGRhdGEuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgICAgICAgICBsaXN0W2l0ZW0uY2N5XSA9IGl0ZW07XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGxpc3Q7XHJcbiAgICAgIH0sXHJcblxyXG4gICAgICBjb252ZXJ0OiBhcmdzID0+IHtcclxuICAgICAgICBjb25zdCB7IGxpc3QsIGN1cnJlbmN5RnJvbSwgY3VycmVuY3lUbywgZmVlLCBnaXZlbkFtb3VudCB9ID0gYXJncztcclxuICAgICAgICBjb25zdCBkYXRhRnJvbSA9IGxpc3RbY3VycmVuY3lGcm9tXTtcclxuICAgICAgICBjb25zdCBkYXRhVG8gPSBsaXN0W2N1cnJlbmN5VG9dO1xyXG5cclxuICAgICAgICBpZiAoY3VycmVuY3lGcm9tID09PSAnVUFIJykge1xyXG4gICAgICAgICAgY29uc3QgcmVzdWx0ID0gZ2l2ZW5BbW91bnQgLyBkYXRhVG8uc2FsZTtcclxuXHJcbiAgICAgICAgICByZXR1cm4gcmVzdWx0IC0gKChyZXN1bHQgLyAxMDApICogZmVlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChjdXJyZW5jeVRvID09PSAnVUFIJykge1xyXG4gICAgICAgICAgY29uc3QgcmVzdWx0ID0gZ2l2ZW5BbW91bnQgKiBkYXRhRnJvbS5idXk7XHJcblxyXG4gICAgICAgICAgcmV0dXJuIHJlc3VsdCAtICgocmVzdWx0IC8gMTAwKSAqIGZlZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCByZXN1bHQgPSBnaXZlbkFtb3VudCAqIGRhdGFGcm9tLmJ1eSAvIGRhdGFUby5zYWxlO1xyXG5cclxuICAgICAgICByZXR1cm4gcmVzdWx0IC0gKChyZXN1bHQgLyAxMDApICogZmVlKTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuICB9XTtcclxufSk7XHJcblxyXG5cclxuIiwiYXBwLmNvbnRyb2xsZXIoJ21haW4nLCBbJyRzY29wZScsICdjb252ZXJ0U2VydmljZScsICdjdXJyZW5jeScsIGZ1bmN0aW9uKCRzY29wZSwgY29udmVydFNlcnZpY2UsIGN1cnJlbmN5KSB7XHJcbiAgJHNjb3BlLmN1cnJlbmN5ID0gY3VycmVuY3k7XHJcbiAgJHNjb3BlLmN1cnJlbmN5RnJvbSA9IGN1cnJlbmN5WzBdO1xyXG4gICRzY29wZS5jdXJyZW5jeVRvID0gY3VycmVuY3lbMV07XHJcbiAgJHNjb3BlLmxpc3QgPSBjb252ZXJ0U2VydmljZS5sb2FkTGlzdCgpO1xyXG4gICRzY29wZS5naXZlbkFtb3VudDtcclxuICAkc2NvcGUucmVjZWl2ZWRBbW91bnQ7XHJcbiAgJHNjb3BlLmZlZSA9ICcwJztcclxuICAkc2NvcGUuY29udmVydCA9IGNvbnZlcnRTZXJ2aWNlLmNvbnZlcnQ7XHJcblxyXG4gICRzY29wZS5yZXZlcnQgPSAoKSA9PiB7XHJcbiAgICBjb25zdCB0ZW1wID0gJHNjb3BlLmN1cnJlbmN5RnJvbTtcclxuICAgICRzY29wZS5jdXJyZW5jeUZyb20gPSAkc2NvcGUuY3VycmVuY3lUbztcclxuICAgICRzY29wZS5jdXJyZW5jeVRvID0gdGVtcDtcclxuICB9O1xyXG5cclxuICAkc2NvcGUuJHdhdGNoR3JvdXAoWydjdXJyZW5jeUZyb20nLCAnY3VycmVuY3lUbycsICdmZWUnLCAnZ2l2ZW5BbW91bnQnXSwgKCkgPT4ge1xyXG4gICAgaWYgKCEkc2NvcGUubGlzdFskc2NvcGUuY3VycmVuY3lGcm9tXSAmJiAhJHNjb3BlLmxpc3RbJHNjb3BlLmN1cnJlbmN5VG9dKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgICRzY29wZS5yZWNlaXZlZEFtb3VudCA9IGNvbnZlcnRTZXJ2aWNlLmNvbnZlcnQoXHJcbiAgICAgIHsgbGlzdDogJHNjb3BlLmxpc3QsXHJcbiAgICAgICAgY3VycmVuY3lGcm9tOiAkc2NvcGUuY3VycmVuY3lGcm9tLFxyXG4gICAgICAgIGN1cnJlbmN5VG86ICRzY29wZS5jdXJyZW5jeVRvLFxyXG4gICAgICAgIGZlZTogJHNjb3BlLmZlZVswXSxcclxuICAgICAgICBnaXZlbkFtb3VudDogJHNjb3BlLmdpdmVuQW1vdW50IH0pO1xyXG4gIH0pO1xyXG59XSk7XHJcbiJdfQ==
