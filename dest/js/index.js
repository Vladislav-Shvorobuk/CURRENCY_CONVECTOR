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
  $scope.currency = 'UAH';
  $scope.currencyReseived = 'USD';
  $scope.canRevert = false;
  $scope.temp = '';
  $scope.list = convertService.list;
  $scope.givenAmount;
  $scope.receivedAmount;
  $scope.commission = '0% commission';

  $scope.revert = canRevert => {
    if (canRevert) {
      $scope.canRevert = !$scope.canRevert;
      const labels = document.querySelectorAll('label');
      labels.forEach(label => label.classList.toggle('active'));
      $scope.temp = $scope.currency;
      $scope.currency = $scope.currencyReseived;
      $scope.currencyReseived = $scope.temp;
      $scope.convert();
    }
  };

  $scope.setStartPosition = () => {
    $scope.convert();
    const sellLabel = document.querySelector('.sell');
    const buyLabel = document.querySelector('.buy');

    if ($scope.currency === 'UAH' || $scope.currencyReseived === 'UAH') {
      if (!sellLabel.classList.contains('active')) {
        sellLabel.classList.add('active');
        buyLabel.classList.remove('active');
      }
    }
  };

  $scope.convert = () => {
    if ($scope.currency === 'UAH') {
      const result = $scope.givenAmount / $scope.list[$scope.currencyReseived].sale;
      $scope.receivedAmount = result + ((result / 100) * $scope.commission[0]);
    }

    if ($scope.currencyReseived === 'UAH') {
      const result = $scope.givenAmount * $scope.list[$scope.currency].buy;
      $scope.receivedAmount = result + ((result / 100) * $scope.commission[0]);
    }

    if ($scope.currency !== 'UAH' && $scope.currencyReseived !== 'UAH') {
      const result = $scope.givenAmount * $scope.list[$scope.currency].buy
      / $scope.list[$scope.currencyReseived].sale;
      $scope.receivedAmount = result + ((result / 100) * $scope.commission[0]);
    }
  };
}]);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpzL21haW4uanMiLCJqcy9zZXJ2aWNlLmpzIiwianMvY29udHJvbGxlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGFwcCA9IGFuZ3VsYXIubW9kdWxlKCdhcHAnLCBbXSk7IiwiXHJcbmFwcC5zZXJ2aWNlKCdjb252ZXJ0U2VydmljZScsIFsnJGh0dHAnLCBmdW5jdGlvbigkaHR0cCkge1xyXG4gIHRoaXMubGlzdCA9IHt9O1xyXG5cclxuICAkaHR0cC5nZXQoJ2h0dHBzOi8vYXBpLnByaXZhdGJhbmsudWEvcDI0YXBpL3B1YmluZm8/ZXhjaGFuZ2UmanNvbiZjb3Vyc2lkPTExJylcclxuICAgIC50aGVuKCh7IGRhdGEgfSkgPT4ge1xyXG4gICAgICBkYXRhLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgdGhpcy5saXN0W2l0ZW0uY2N5XSA9IGl0ZW07XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn1dKTtcclxuXHJcblxyXG4iLCJcclxuYXBwLmNvbnRyb2xsZXIoJ21haW4nLCBbJyRzY29wZScsICdjb252ZXJ0U2VydmljZScsIGZ1bmN0aW9uKCRzY29wZSwgY29udmVydFNlcnZpY2UpIHtcclxuICAkc2NvcGUuY3VycmVuY3kgPSAnVUFIJztcclxuICAkc2NvcGUuY3VycmVuY3lSZXNlaXZlZCA9ICdVU0QnO1xyXG4gICRzY29wZS5jYW5SZXZlcnQgPSBmYWxzZTtcclxuICAkc2NvcGUudGVtcCA9ICcnO1xyXG4gICRzY29wZS5saXN0ID0gY29udmVydFNlcnZpY2UubGlzdDtcclxuICAkc2NvcGUuZ2l2ZW5BbW91bnQ7XHJcbiAgJHNjb3BlLnJlY2VpdmVkQW1vdW50O1xyXG4gICRzY29wZS5jb21taXNzaW9uID0gJzAlIGNvbW1pc3Npb24nO1xyXG5cclxuICAkc2NvcGUucmV2ZXJ0ID0gY2FuUmV2ZXJ0ID0+IHtcclxuICAgIGlmIChjYW5SZXZlcnQpIHtcclxuICAgICAgJHNjb3BlLmNhblJldmVydCA9ICEkc2NvcGUuY2FuUmV2ZXJ0O1xyXG4gICAgICBjb25zdCBsYWJlbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdsYWJlbCcpO1xyXG4gICAgICBsYWJlbHMuZm9yRWFjaChsYWJlbCA9PiBsYWJlbC5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKSk7XHJcbiAgICAgICRzY29wZS50ZW1wID0gJHNjb3BlLmN1cnJlbmN5O1xyXG4gICAgICAkc2NvcGUuY3VycmVuY3kgPSAkc2NvcGUuY3VycmVuY3lSZXNlaXZlZDtcclxuICAgICAgJHNjb3BlLmN1cnJlbmN5UmVzZWl2ZWQgPSAkc2NvcGUudGVtcDtcclxuICAgICAgJHNjb3BlLmNvbnZlcnQoKTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICAkc2NvcGUuc2V0U3RhcnRQb3NpdGlvbiA9ICgpID0+IHtcclxuICAgICRzY29wZS5jb252ZXJ0KCk7XHJcbiAgICBjb25zdCBzZWxsTGFiZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2VsbCcpO1xyXG4gICAgY29uc3QgYnV5TGFiZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnV5Jyk7XHJcblxyXG4gICAgaWYgKCRzY29wZS5jdXJyZW5jeSA9PT0gJ1VBSCcgfHwgJHNjb3BlLmN1cnJlbmN5UmVzZWl2ZWQgPT09ICdVQUgnKSB7XHJcbiAgICAgIGlmICghc2VsbExhYmVsLmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJykpIHtcclxuICAgICAgICBzZWxsTGFiZWwuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgICAgICAgYnV5TGFiZWwuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9O1xyXG5cclxuICAkc2NvcGUuY29udmVydCA9ICgpID0+IHtcclxuICAgIGlmICgkc2NvcGUuY3VycmVuY3kgPT09ICdVQUgnKSB7XHJcbiAgICAgIGNvbnN0IHJlc3VsdCA9ICRzY29wZS5naXZlbkFtb3VudCAvICRzY29wZS5saXN0WyRzY29wZS5jdXJyZW5jeVJlc2VpdmVkXS5zYWxlO1xyXG4gICAgICAkc2NvcGUucmVjZWl2ZWRBbW91bnQgPSByZXN1bHQgKyAoKHJlc3VsdCAvIDEwMCkgKiAkc2NvcGUuY29tbWlzc2lvblswXSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCRzY29wZS5jdXJyZW5jeVJlc2VpdmVkID09PSAnVUFIJykge1xyXG4gICAgICBjb25zdCByZXN1bHQgPSAkc2NvcGUuZ2l2ZW5BbW91bnQgKiAkc2NvcGUubGlzdFskc2NvcGUuY3VycmVuY3ldLmJ1eTtcclxuICAgICAgJHNjb3BlLnJlY2VpdmVkQW1vdW50ID0gcmVzdWx0ICsgKChyZXN1bHQgLyAxMDApICogJHNjb3BlLmNvbW1pc3Npb25bMF0pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICgkc2NvcGUuY3VycmVuY3kgIT09ICdVQUgnICYmICRzY29wZS5jdXJyZW5jeVJlc2VpdmVkICE9PSAnVUFIJykge1xyXG4gICAgICBjb25zdCByZXN1bHQgPSAkc2NvcGUuZ2l2ZW5BbW91bnQgKiAkc2NvcGUubGlzdFskc2NvcGUuY3VycmVuY3ldLmJ1eVxyXG4gICAgICAvICRzY29wZS5saXN0WyRzY29wZS5jdXJyZW5jeVJlc2VpdmVkXS5zYWxlO1xyXG4gICAgICAkc2NvcGUucmVjZWl2ZWRBbW91bnQgPSByZXN1bHQgKyAoKHJlc3VsdCAvIDEwMCkgKiAkc2NvcGUuY29tbWlzc2lvblswXSk7XHJcbiAgICB9XHJcbiAgfTtcclxufV0pO1xyXG4iXX0=
