const app = angular.module('app', []);
app.constant('currency', ['UAH', 'USD', 'EUR', 'RUR']);
app.constant('URL', 'https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11');
app.filter('currencyFilter', function() {
  return function(array, str2) {
    return array.filter(item => item !== str2);
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpzL21haW4uanMiLCJqcy9jb25zdGFudHMuanMiLCJqcy9maWx0ZXJzLmpzIiwianMvc2VydmljZS5qcyIsImpzL2NvbnRyb2xsZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGFwcCA9IGFuZ3VsYXIubW9kdWxlKCdhcHAnLCBbXSk7IiwiYXBwLmNvbnN0YW50KCdjdXJyZW5jeScsIFsnVUFIJywgJ1VTRCcsICdFVVInLCAnUlVSJ10pO1xyXG5hcHAuY29uc3RhbnQoJ1VSTCcsICdodHRwczovL2FwaS5wcml2YXRiYW5rLnVhL3AyNGFwaS9wdWJpbmZvP2V4Y2hhbmdlJmpzb24mY291cnNpZD0xMScpOyIsImFwcC5maWx0ZXIoJ2N1cnJlbmN5RmlsdGVyJywgZnVuY3Rpb24oKSB7XHJcbiAgcmV0dXJuIGZ1bmN0aW9uKGFycmF5LCBzdHIyKSB7XHJcbiAgICByZXR1cm4gYXJyYXkuZmlsdGVyKGl0ZW0gPT4gaXRlbSAhPT0gc3RyMik7XHJcbiAgfTtcclxufSk7IiwiYXBwLnNlcnZpY2UoJ2NvbnZlcnRTZXJ2aWNlJywgWyckaHR0cCcsICdVUkwnLCBmdW5jdGlvbigkaHR0cCwgVVJMKSB7XHJcbiAgdGhpcy5saXN0ID0ge307XHJcblxyXG4gIHRoaXMubG9hZExpc3QgPSAoKSA9PiB7XHJcbiAgICAkaHR0cC5nZXQoVVJMKVxyXG4gICAgICAudGhlbigoeyBkYXRhIH0pID0+IHtcclxuICAgICAgICBkYXRhLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgICB0aGlzLmxpc3RbaXRlbS5jY3ldID0gaXRlbTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgICByZXR1cm4gdGhpcy5saXN0O1xyXG4gIH07XHJcblxyXG4gIHRoaXMuY29udmVydCA9IGFyZ3MgPT4ge1xyXG4gICAgY29uc3QgeyBsaXN0LCBjdXJyZW5jeUZyb20sIGN1cnJlbmN5VG8sIGZlZSwgZ2l2ZW5BbW91bnQgfSA9IGFyZ3M7XHJcbiAgICBjb25zdCBkYXRhRnJvbSA9IGxpc3RbY3VycmVuY3lGcm9tXTtcclxuICAgIGNvbnN0IGRhdGFUbyA9IGxpc3RbY3VycmVuY3lUb107XHJcblxyXG4gICAgaWYgKGN1cnJlbmN5RnJvbSA9PT0gJ1VBSCcpIHtcclxuICAgICAgY29uc3QgcmVzdWx0ID0gZ2l2ZW5BbW91bnQgLyBkYXRhVG8uc2FsZTtcclxuXHJcbiAgICAgIHJldHVybiByZXN1bHQgLSAoKHJlc3VsdCAvIDEwMCkgKiBmZWUpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChjdXJyZW5jeVRvID09PSAnVUFIJykge1xyXG4gICAgICBjb25zdCByZXN1bHQgPSBnaXZlbkFtb3VudCAqIGRhdGFGcm9tLmJ1eTtcclxuXHJcbiAgICAgIHJldHVybiByZXN1bHQgLSAoKHJlc3VsdCAvIDEwMCkgKiBmZWUpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHJlc3VsdCA9IGdpdmVuQW1vdW50ICogZGF0YUZyb20uYnV5IC8gZGF0YVRvLnNhbGU7XHJcblxyXG4gICAgcmV0dXJuIHJlc3VsdCAtICgocmVzdWx0IC8gMTAwKSAqIGZlZSk7XHJcbiAgfTtcclxufV0pO1xyXG5cclxuXHJcbiIsImFwcC5jb250cm9sbGVyKCdtYWluJywgWyckc2NvcGUnLCAnY29udmVydFNlcnZpY2UnLCAnY3VycmVuY3knLCBmdW5jdGlvbigkc2NvcGUsIGNvbnZlcnRTZXJ2aWNlLCBjdXJyZW5jeSkge1xyXG4gICRzY29wZS5jdXJyZW5jeSA9IGN1cnJlbmN5O1xyXG4gICRzY29wZS5jdXJyZW5jeUZyb20gPSBjdXJyZW5jeVswXTtcclxuICAkc2NvcGUuY3VycmVuY3lUbyA9IGN1cnJlbmN5WzFdO1xyXG4gICRzY29wZS5saXN0ID0gY29udmVydFNlcnZpY2UubG9hZExpc3QoKTtcclxuICAkc2NvcGUuZ2l2ZW5BbW91bnQ7XHJcbiAgJHNjb3BlLnJlY2VpdmVkQW1vdW50O1xyXG4gICRzY29wZS5mZWUgPSAnMCc7XHJcbiAgJHNjb3BlLmNvbnZlcnQgPSBjb252ZXJ0U2VydmljZS5jb252ZXJ0O1xyXG5cclxuICAkc2NvcGUucmV2ZXJ0ID0gKCkgPT4ge1xyXG4gICAgY29uc3QgdGVtcCA9ICRzY29wZS5jdXJyZW5jeUZyb207XHJcbiAgICAkc2NvcGUuY3VycmVuY3lGcm9tID0gJHNjb3BlLmN1cnJlbmN5VG87XHJcbiAgICAkc2NvcGUuY3VycmVuY3lUbyA9IHRlbXA7XHJcbiAgfTtcclxuXHJcbiAgJHNjb3BlLiR3YXRjaEdyb3VwKFsnY3VycmVuY3lGcm9tJywgJ2N1cnJlbmN5VG8nLCAnZmVlJywgJ2dpdmVuQW1vdW50J10sICgpID0+IHtcclxuICAgIGlmICghJHNjb3BlLmxpc3RbJHNjb3BlLmN1cnJlbmN5RnJvbV0gJiYgISRzY29wZS5saXN0WyRzY29wZS5jdXJyZW5jeVRvXSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICAkc2NvcGUucmVjZWl2ZWRBbW91bnQgPSBjb252ZXJ0U2VydmljZS5jb252ZXJ0KFxyXG4gICAgICB7IGxpc3Q6ICRzY29wZS5saXN0LFxyXG4gICAgICAgIGN1cnJlbmN5RnJvbTogJHNjb3BlLmN1cnJlbmN5RnJvbSxcclxuICAgICAgICBjdXJyZW5jeVRvOiAkc2NvcGUuY3VycmVuY3lUbyxcclxuICAgICAgICBmZWU6ICRzY29wZS5mZWVbMF0sXHJcbiAgICAgICAgZ2l2ZW5BbW91bnQ6ICRzY29wZS5naXZlbkFtb3VudCB9KTtcclxuICB9KTtcclxufV0pO1xyXG4iXX0=
