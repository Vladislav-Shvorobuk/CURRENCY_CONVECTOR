const app = angular.module('app', []);

app.config(['convertServiceProvider', function(convertServiceProvider) {
  convertServiceProvider.setURL('https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11');
}]);

app.run(['$window', '$rootScope', function($window, $rootScope) {
  $rootScope.isOffline = !navigator.onLine;

  $window.addEventListener('online', function(e) {
    $rootScope.$apply(function() {
      $rootScope.isOffline = false;
    });
  }, false);

  $window.addEventListener('offline', function(e) {
    $rootScope.$apply(function() {
      $rootScope.isOffline = true;
    });
  }, false);
}]);
app.constant('currency', ['UAH', 'USD', 'EUR', 'RUR']);
app.component('convertComponent', {
  templateUrl: 'main-container.html',
  replace: true
});
app.directive('isOfline', [function() {
  return {
    restrict: 'A'
  };
}]);



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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpzL21haW4uanMiLCJqcy9jb25zdGFudHMuanMiLCJqcy9jb21wb25lbnQuanMiLCJqcy9kaXJlY3RpdmVzLmpzIiwianMvZmlsdGVycy5qcyIsImpzL3NlcnZpY2UuanMiLCJqcy9jb250cm9sbGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3BCQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDM0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBhcHAgPSBhbmd1bGFyLm1vZHVsZSgnYXBwJywgW10pO1xyXG5cclxuYXBwLmNvbmZpZyhbJ2NvbnZlcnRTZXJ2aWNlUHJvdmlkZXInLCBmdW5jdGlvbihjb252ZXJ0U2VydmljZVByb3ZpZGVyKSB7XHJcbiAgY29udmVydFNlcnZpY2VQcm92aWRlci5zZXRVUkwoJ2h0dHBzOi8vYXBpLnByaXZhdGJhbmsudWEvcDI0YXBpL3B1YmluZm8/ZXhjaGFuZ2UmanNvbiZjb3Vyc2lkPTExJyk7XHJcbn1dKTtcclxuXHJcbmFwcC5ydW4oWyckd2luZG93JywgJyRyb290U2NvcGUnLCBmdW5jdGlvbigkd2luZG93LCAkcm9vdFNjb3BlKSB7XHJcbiAgJHJvb3RTY29wZS5pc09mZmxpbmUgPSAhbmF2aWdhdG9yLm9uTGluZTtcclxuXHJcbiAgJHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdvbmxpbmUnLCBmdW5jdGlvbihlKSB7XHJcbiAgICAkcm9vdFNjb3BlLiRhcHBseShmdW5jdGlvbigpIHtcclxuICAgICAgJHJvb3RTY29wZS5pc09mZmxpbmUgPSBmYWxzZTtcclxuICAgIH0pO1xyXG4gIH0sIGZhbHNlKTtcclxuXHJcbiAgJHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdvZmZsaW5lJywgZnVuY3Rpb24oZSkge1xyXG4gICAgJHJvb3RTY29wZS4kYXBwbHkoZnVuY3Rpb24oKSB7XHJcbiAgICAgICRyb290U2NvcGUuaXNPZmZsaW5lID0gdHJ1ZTtcclxuICAgIH0pO1xyXG4gIH0sIGZhbHNlKTtcclxufV0pOyIsImFwcC5jb25zdGFudCgnY3VycmVuY3knLCBbJ1VBSCcsICdVU0QnLCAnRVVSJywgJ1JVUiddKTsiLCJhcHAuY29tcG9uZW50KCdjb252ZXJ0Q29tcG9uZW50Jywge1xyXG4gIHRlbXBsYXRlVXJsOiAnbWFpbi1jb250YWluZXIuaHRtbCcsXHJcbiAgcmVwbGFjZTogdHJ1ZVxyXG59KTsiLCJhcHAuZGlyZWN0aXZlKCdpc09mbGluZScsIFtmdW5jdGlvbigpIHtcclxuICByZXR1cm4ge1xyXG4gICAgcmVzdHJpY3Q6ICdBJ1xyXG4gIH07XHJcbn1dKTtcclxuXHJcblxyXG4iLCJhcHAuZmlsdGVyKCdjdXJyZW5jeUZpbHRlcicsIGZ1bmN0aW9uKCkge1xyXG4gIHJldHVybiBmdW5jdGlvbihhcnJheSwgY29tcGFyZVZhbHVlKSB7XHJcbiAgICByZXR1cm4gYXJyYXkuZmlsdGVyKGl0ZW0gPT4gaXRlbSAhPT0gY29tcGFyZVZhbHVlKTtcclxuICB9O1xyXG59KTsiLCJhcHAucHJvdmlkZXIoJ2NvbnZlcnRTZXJ2aWNlJywgZnVuY3Rpb24oKSB7XHJcbiAgbGV0IFVSTCA9ICcnO1xyXG4gIHRoaXMuc2V0VVJMID0gdXJsID0+IChVUkwgPSB1cmwpO1xyXG5cclxuICB0aGlzLiRnZXQgPSBbJyRodHRwJywgZnVuY3Rpb24oJGh0dHApIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGxvYWRMaXN0OiAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgbGlzdCA9IHt9O1xyXG4gICAgICAgICRodHRwLmdldChVUkwpXHJcbiAgICAgICAgICAudGhlbigoeyBkYXRhIH0pID0+IHtcclxuICAgICAgICAgICAgZGF0YS5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICAgICAgICAgIGxpc3RbaXRlbS5jY3ldID0gaXRlbTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gbGlzdDtcclxuICAgICAgfSxcclxuXHJcbiAgICAgIGNvbnZlcnQ6IGFyZ3MgPT4ge1xyXG4gICAgICAgIGNvbnN0IHsgbGlzdCwgY3VycmVuY3lGcm9tLCBjdXJyZW5jeVRvLCBmZWUsIGdpdmVuQW1vdW50IH0gPSBhcmdzO1xyXG4gICAgICAgIGNvbnN0IGRhdGFGcm9tID0gbGlzdFtjdXJyZW5jeUZyb21dO1xyXG4gICAgICAgIGNvbnN0IGRhdGFUbyA9IGxpc3RbY3VycmVuY3lUb107XHJcblxyXG4gICAgICAgIGlmIChjdXJyZW5jeUZyb20gPT09ICdVQUgnKSB7XHJcbiAgICAgICAgICBjb25zdCByZXN1bHQgPSBnaXZlbkFtb3VudCAvIGRhdGFUby5zYWxlO1xyXG5cclxuICAgICAgICAgIHJldHVybiByZXN1bHQgLSAoKHJlc3VsdCAvIDEwMCkgKiBmZWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGN1cnJlbmN5VG8gPT09ICdVQUgnKSB7XHJcbiAgICAgICAgICBjb25zdCByZXN1bHQgPSBnaXZlbkFtb3VudCAqIGRhdGFGcm9tLmJ1eTtcclxuXHJcbiAgICAgICAgICByZXR1cm4gcmVzdWx0IC0gKChyZXN1bHQgLyAxMDApICogZmVlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGdpdmVuQW1vdW50ICogZGF0YUZyb20uYnV5IC8gZGF0YVRvLnNhbGU7XHJcblxyXG4gICAgICAgIHJldHVybiByZXN1bHQgLSAoKHJlc3VsdCAvIDEwMCkgKiBmZWUpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gIH1dO1xyXG59KTtcclxuXHJcblxyXG4iLCJhcHAuY29udHJvbGxlcignbWFpbicsIFsnJHNjb3BlJywgJ2NvbnZlcnRTZXJ2aWNlJywgJ2N1cnJlbmN5JywgZnVuY3Rpb24oJHNjb3BlLCBjb252ZXJ0U2VydmljZSwgY3VycmVuY3kpIHtcclxuICAkc2NvcGUuY3VycmVuY3kgPSBjdXJyZW5jeTtcclxuICAkc2NvcGUuY3VycmVuY3lGcm9tID0gY3VycmVuY3lbMF07XHJcbiAgJHNjb3BlLmN1cnJlbmN5VG8gPSBjdXJyZW5jeVsxXTtcclxuICAkc2NvcGUubGlzdCA9IGNvbnZlcnRTZXJ2aWNlLmxvYWRMaXN0KCk7XHJcbiAgJHNjb3BlLmdpdmVuQW1vdW50O1xyXG4gICRzY29wZS5yZWNlaXZlZEFtb3VudDtcclxuICAkc2NvcGUuZmVlID0gJzAnO1xyXG4gICRzY29wZS5jb252ZXJ0ID0gY29udmVydFNlcnZpY2UuY29udmVydDtcclxuXHJcbiAgJHNjb3BlLnJldmVydCA9ICgpID0+IHtcclxuICAgIGNvbnN0IHRlbXAgPSAkc2NvcGUuY3VycmVuY3lGcm9tO1xyXG4gICAgJHNjb3BlLmN1cnJlbmN5RnJvbSA9ICRzY29wZS5jdXJyZW5jeVRvO1xyXG4gICAgJHNjb3BlLmN1cnJlbmN5VG8gPSB0ZW1wO1xyXG4gIH07XHJcblxyXG4gICRzY29wZS4kd2F0Y2hHcm91cChbJ2N1cnJlbmN5RnJvbScsICdjdXJyZW5jeVRvJywgJ2ZlZScsICdnaXZlbkFtb3VudCddLCAoKSA9PiB7XHJcbiAgICBpZiAoISRzY29wZS5saXN0WyRzY29wZS5jdXJyZW5jeUZyb21dICYmICEkc2NvcGUubGlzdFskc2NvcGUuY3VycmVuY3lUb10pIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgJHNjb3BlLnJlY2VpdmVkQW1vdW50ID0gY29udmVydFNlcnZpY2UuY29udmVydChcclxuICAgICAgeyBsaXN0OiAkc2NvcGUubGlzdCxcclxuICAgICAgICBjdXJyZW5jeUZyb206ICRzY29wZS5jdXJyZW5jeUZyb20sXHJcbiAgICAgICAgY3VycmVuY3lUbzogJHNjb3BlLmN1cnJlbmN5VG8sXHJcbiAgICAgICAgZmVlOiAkc2NvcGUuZmVlWzBdLFxyXG4gICAgICAgIGdpdmVuQW1vdW50OiAkc2NvcGUuZ2l2ZW5BbW91bnQgfSk7XHJcbiAgfSk7XHJcbn1dKTtcclxuIl19
