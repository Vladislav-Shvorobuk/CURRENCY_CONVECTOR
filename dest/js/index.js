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
// app.constant('URL', 'https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11');
app.component('mainContainerComponent', {
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpzL21haW4uanMiLCJqcy9jb25zdGFudHMuanMiLCJqcy9jb21wb25lbnQuanMiLCJqcy9kaXJlY3RpdmVzLmpzIiwianMvZmlsdGVycy5qcyIsImpzL3NlcnZpY2UuanMiLCJqcy9jb250cm9sbGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3BCQTtBQUNBO0FDREE7QUFDQTtBQUNBO0FBQ0E7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMzQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGFwcCA9IGFuZ3VsYXIubW9kdWxlKCdhcHAnLCBbXSk7XHJcblxyXG5hcHAuY29uZmlnKFsnY29udmVydFNlcnZpY2VQcm92aWRlcicsIGZ1bmN0aW9uKGNvbnZlcnRTZXJ2aWNlUHJvdmlkZXIpIHtcclxuICBjb252ZXJ0U2VydmljZVByb3ZpZGVyLnNldFVSTCgnaHR0cHM6Ly9hcGkucHJpdmF0YmFuay51YS9wMjRhcGkvcHViaW5mbz9leGNoYW5nZSZqc29uJmNvdXJzaWQ9MTEnKTtcclxufV0pO1xyXG5cclxuYXBwLnJ1bihbJyR3aW5kb3cnLCAnJHJvb3RTY29wZScsIGZ1bmN0aW9uKCR3aW5kb3csICRyb290U2NvcGUpIHtcclxuICAkcm9vdFNjb3BlLmlzT2ZmbGluZSA9ICFuYXZpZ2F0b3Iub25MaW5lO1xyXG5cclxuICAkd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ29ubGluZScsIGZ1bmN0aW9uKGUpIHtcclxuICAgICRyb290U2NvcGUuJGFwcGx5KGZ1bmN0aW9uKCkge1xyXG4gICAgICAkcm9vdFNjb3BlLmlzT2ZmbGluZSA9IGZhbHNlO1xyXG4gICAgfSk7XHJcbiAgfSwgZmFsc2UpO1xyXG5cclxuICAkd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ29mZmxpbmUnLCBmdW5jdGlvbihlKSB7XHJcbiAgICAkcm9vdFNjb3BlLiRhcHBseShmdW5jdGlvbigpIHtcclxuICAgICAgJHJvb3RTY29wZS5pc09mZmxpbmUgPSB0cnVlO1xyXG4gICAgfSk7XHJcbiAgfSwgZmFsc2UpO1xyXG59XSk7IiwiYXBwLmNvbnN0YW50KCdjdXJyZW5jeScsIFsnVUFIJywgJ1VTRCcsICdFVVInLCAnUlVSJ10pO1xyXG4vLyBhcHAuY29uc3RhbnQoJ1VSTCcsICdodHRwczovL2FwaS5wcml2YXRiYW5rLnVhL3AyNGFwaS9wdWJpbmZvP2V4Y2hhbmdlJmpzb24mY291cnNpZD0xMScpOyIsImFwcC5jb21wb25lbnQoJ21haW5Db250YWluZXJDb21wb25lbnQnLCB7XHJcbiAgdGVtcGxhdGVVcmw6ICdtYWluLWNvbnRhaW5lci5odG1sJyxcclxuICByZXBsYWNlOiB0cnVlXHJcbn0pOyIsImFwcC5kaXJlY3RpdmUoJ2lzT2ZsaW5lJywgW2Z1bmN0aW9uKCkge1xyXG4gIHJldHVybiB7XHJcbiAgICByZXN0cmljdDogJ0EnXHJcbiAgfTtcclxufV0pO1xyXG5cclxuXHJcbiIsImFwcC5maWx0ZXIoJ2N1cnJlbmN5RmlsdGVyJywgZnVuY3Rpb24oKSB7XHJcbiAgcmV0dXJuIGZ1bmN0aW9uKGFycmF5LCBjb21wYXJlVmFsdWUpIHtcclxuICAgIHJldHVybiBhcnJheS5maWx0ZXIoaXRlbSA9PiBpdGVtICE9PSBjb21wYXJlVmFsdWUpO1xyXG4gIH07XHJcbn0pOyIsImFwcC5wcm92aWRlcignY29udmVydFNlcnZpY2UnLCBmdW5jdGlvbigpIHtcclxuICBsZXQgVVJMID0gJyc7XHJcbiAgdGhpcy5zZXRVUkwgPSB1cmwgPT4gKFVSTCA9IHVybCk7XHJcblxyXG4gIHRoaXMuJGdldCA9IFsnJGh0dHAnLCBmdW5jdGlvbigkaHR0cCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbG9hZExpc3Q6ICgpID0+IHtcclxuICAgICAgICBjb25zdCBsaXN0ID0ge307XHJcbiAgICAgICAgJGh0dHAuZ2V0KFVSTClcclxuICAgICAgICAgIC50aGVuKCh7IGRhdGEgfSkgPT4ge1xyXG4gICAgICAgICAgICBkYXRhLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgICAgICAgbGlzdFtpdGVtLmNjeV0gPSBpdGVtO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBsaXN0O1xyXG4gICAgICB9LFxyXG5cclxuICAgICAgY29udmVydDogYXJncyA9PiB7XHJcbiAgICAgICAgY29uc3QgeyBsaXN0LCBjdXJyZW5jeUZyb20sIGN1cnJlbmN5VG8sIGZlZSwgZ2l2ZW5BbW91bnQgfSA9IGFyZ3M7XHJcbiAgICAgICAgY29uc3QgZGF0YUZyb20gPSBsaXN0W2N1cnJlbmN5RnJvbV07XHJcbiAgICAgICAgY29uc3QgZGF0YVRvID0gbGlzdFtjdXJyZW5jeVRvXTtcclxuXHJcbiAgICAgICAgaWYgKGN1cnJlbmN5RnJvbSA9PT0gJ1VBSCcpIHtcclxuICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGdpdmVuQW1vdW50IC8gZGF0YVRvLnNhbGU7XHJcblxyXG4gICAgICAgICAgcmV0dXJuIHJlc3VsdCAtICgocmVzdWx0IC8gMTAwKSAqIGZlZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoY3VycmVuY3lUbyA9PT0gJ1VBSCcpIHtcclxuICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGdpdmVuQW1vdW50ICogZGF0YUZyb20uYnV5O1xyXG5cclxuICAgICAgICAgIHJldHVybiByZXN1bHQgLSAoKHJlc3VsdCAvIDEwMCkgKiBmZWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gZ2l2ZW5BbW91bnQgKiBkYXRhRnJvbS5idXkgLyBkYXRhVG8uc2FsZTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdCAtICgocmVzdWx0IC8gMTAwKSAqIGZlZSk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgfV07XHJcbn0pO1xyXG5cclxuXHJcbiIsImFwcC5jb250cm9sbGVyKCdtYWluJywgWyckc2NvcGUnLCAnY29udmVydFNlcnZpY2UnLCAnY3VycmVuY3knLCBmdW5jdGlvbigkc2NvcGUsIGNvbnZlcnRTZXJ2aWNlLCBjdXJyZW5jeSkge1xyXG4gICRzY29wZS5jdXJyZW5jeSA9IGN1cnJlbmN5O1xyXG4gICRzY29wZS5jdXJyZW5jeUZyb20gPSBjdXJyZW5jeVswXTtcclxuICAkc2NvcGUuY3VycmVuY3lUbyA9IGN1cnJlbmN5WzFdO1xyXG4gICRzY29wZS5saXN0ID0gY29udmVydFNlcnZpY2UubG9hZExpc3QoKTtcclxuICAkc2NvcGUuZ2l2ZW5BbW91bnQ7XHJcbiAgJHNjb3BlLnJlY2VpdmVkQW1vdW50O1xyXG4gICRzY29wZS5mZWUgPSAnMCc7XHJcbiAgJHNjb3BlLmNvbnZlcnQgPSBjb252ZXJ0U2VydmljZS5jb252ZXJ0O1xyXG5cclxuICAkc2NvcGUucmV2ZXJ0ID0gKCkgPT4ge1xyXG4gICAgY29uc3QgdGVtcCA9ICRzY29wZS5jdXJyZW5jeUZyb207XHJcbiAgICAkc2NvcGUuY3VycmVuY3lGcm9tID0gJHNjb3BlLmN1cnJlbmN5VG87XHJcbiAgICAkc2NvcGUuY3VycmVuY3lUbyA9IHRlbXA7XHJcbiAgfTtcclxuXHJcbiAgJHNjb3BlLiR3YXRjaEdyb3VwKFsnY3VycmVuY3lGcm9tJywgJ2N1cnJlbmN5VG8nLCAnZmVlJywgJ2dpdmVuQW1vdW50J10sICgpID0+IHtcclxuICAgIGlmICghJHNjb3BlLmxpc3RbJHNjb3BlLmN1cnJlbmN5RnJvbV0gJiYgISRzY29wZS5saXN0WyRzY29wZS5jdXJyZW5jeVRvXSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICAkc2NvcGUucmVjZWl2ZWRBbW91bnQgPSBjb252ZXJ0U2VydmljZS5jb252ZXJ0KFxyXG4gICAgICB7IGxpc3Q6ICRzY29wZS5saXN0LFxyXG4gICAgICAgIGN1cnJlbmN5RnJvbTogJHNjb3BlLmN1cnJlbmN5RnJvbSxcclxuICAgICAgICBjdXJyZW5jeVRvOiAkc2NvcGUuY3VycmVuY3lUbyxcclxuICAgICAgICBmZWU6ICRzY29wZS5mZWVbMF0sXHJcbiAgICAgICAgZ2l2ZW5BbW91bnQ6ICRzY29wZS5naXZlbkFtb3VudCB9KTtcclxuICB9KTtcclxufV0pO1xyXG4iXX0=
