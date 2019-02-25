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
      $scope.receivedAmount = $scope.givenAmount / $scope.list[$scope.currencyReseived].sale;
    }

    if ($scope.currencyReseived === 'UAH') {
      $scope.receivedAmount = $scope.givenAmount * $scope.list[$scope.currency].buy;
    }

    if ($scope.currency !== 'UAH' && $scope.currencyReseived !== 'UAH') {
      $scope.receivedAmount = $scope.givenAmount * $scope.list[$scope.currency].buy 
      / $scope.list[$scope.currencyReseived].sale;
    }
  };
}]);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpzL21haW4uanMiLCJqcy9zZXJ2aWNlLmpzIiwianMvY29udHJvbGxlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGFwcCA9IGFuZ3VsYXIubW9kdWxlKCdhcHAnLCBbXSk7IiwiXHJcbmFwcC5zZXJ2aWNlKCdjb252ZXJ0U2VydmljZScsIFsnJGh0dHAnLCBmdW5jdGlvbigkaHR0cCkge1xyXG4gIHRoaXMubGlzdCA9IHt9O1xyXG5cclxuICAkaHR0cC5nZXQoJ2h0dHBzOi8vYXBpLnByaXZhdGJhbmsudWEvcDI0YXBpL3B1YmluZm8/ZXhjaGFuZ2UmanNvbiZjb3Vyc2lkPTExJylcclxuICAgIC50aGVuKCh7IGRhdGEgfSkgPT4ge1xyXG4gICAgICBkYXRhLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgdGhpcy5saXN0W2l0ZW0uY2N5XSA9IGl0ZW07XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn1dKTtcclxuXHJcblxyXG4iLCJcclxuYXBwLmNvbnRyb2xsZXIoJ21haW4nLCBbJyRzY29wZScsICdjb252ZXJ0U2VydmljZScsIGZ1bmN0aW9uKCRzY29wZSwgY29udmVydFNlcnZpY2UpIHtcclxuICAkc2NvcGUuY3VycmVuY3kgPSAnVUFIJztcclxuICAkc2NvcGUuY3VycmVuY3lSZXNlaXZlZCA9ICdVU0QnO1xyXG4gICRzY29wZS5jYW5SZXZlcnQgPSBmYWxzZTtcclxuICAkc2NvcGUudGVtcCA9ICcnO1xyXG4gICRzY29wZS5saXN0ID0gY29udmVydFNlcnZpY2UubGlzdDtcclxuICAkc2NvcGUuZ2l2ZW5BbW91bnQ7XHJcbiAgJHNjb3BlLnJlY2VpdmVkQW1vdW50O1xyXG5cclxuXHJcbiAgJHNjb3BlLnJldmVydCA9IGNhblJldmVydCA9PiB7XHJcbiAgICBpZiAoY2FuUmV2ZXJ0KSB7XHJcbiAgICAgICRzY29wZS5jYW5SZXZlcnQgPSAhJHNjb3BlLmNhblJldmVydDtcclxuICAgICAgY29uc3QgbGFiZWxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnbGFiZWwnKTtcclxuICAgICAgbGFiZWxzLmZvckVhY2gobGFiZWwgPT4gbGFiZWwuY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJykpO1xyXG4gICAgICAkc2NvcGUudGVtcCA9ICRzY29wZS5jdXJyZW5jeTtcclxuICAgICAgJHNjb3BlLmN1cnJlbmN5ID0gJHNjb3BlLmN1cnJlbmN5UmVzZWl2ZWQ7XHJcbiAgICAgICRzY29wZS5jdXJyZW5jeVJlc2VpdmVkID0gJHNjb3BlLnRlbXA7XHJcbiAgICAgICRzY29wZS5jb252ZXJ0KCk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgJHNjb3BlLnNldFN0YXJ0UG9zaXRpb24gPSAoKSA9PiB7XHJcbiAgICAkc2NvcGUuY29udmVydCgpO1xyXG4gICAgY29uc3Qgc2VsbExhYmVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlbGwnKTtcclxuICAgIGNvbnN0IGJ1eUxhYmVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ1eScpO1xyXG5cclxuICAgIGlmICgkc2NvcGUuY3VycmVuY3kgPT09ICdVQUgnIHx8ICRzY29wZS5jdXJyZW5jeVJlc2VpdmVkID09PSAnVUFIJykge1xyXG4gICAgICBpZiAoIXNlbGxMYWJlbC5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGl2ZScpKSB7XHJcbiAgICAgICAgc2VsbExhYmVsLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgICAgIGJ1eUxhYmVsLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgJHNjb3BlLmNvbnZlcnQgPSAoKSA9PiB7XHJcbiAgICBpZiAoJHNjb3BlLmN1cnJlbmN5ID09PSAnVUFIJykge1xyXG4gICAgICAkc2NvcGUucmVjZWl2ZWRBbW91bnQgPSAkc2NvcGUuZ2l2ZW5BbW91bnQgLyAkc2NvcGUubGlzdFskc2NvcGUuY3VycmVuY3lSZXNlaXZlZF0uc2FsZTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoJHNjb3BlLmN1cnJlbmN5UmVzZWl2ZWQgPT09ICdVQUgnKSB7XHJcbiAgICAgICRzY29wZS5yZWNlaXZlZEFtb3VudCA9ICRzY29wZS5naXZlbkFtb3VudCAqICRzY29wZS5saXN0WyRzY29wZS5jdXJyZW5jeV0uYnV5O1xyXG4gICAgfVxyXG5cclxuICAgIGlmICgkc2NvcGUuY3VycmVuY3kgIT09ICdVQUgnICYmICRzY29wZS5jdXJyZW5jeVJlc2VpdmVkICE9PSAnVUFIJykge1xyXG4gICAgICAkc2NvcGUucmVjZWl2ZWRBbW91bnQgPSAkc2NvcGUuZ2l2ZW5BbW91bnQgKiAkc2NvcGUubGlzdFskc2NvcGUuY3VycmVuY3ldLmJ1eSBcclxuICAgICAgLyAkc2NvcGUubGlzdFskc2NvcGUuY3VycmVuY3lSZXNlaXZlZF0uc2FsZTtcclxuICAgIH1cclxuICB9O1xyXG59XSk7XHJcbiJdfQ==
