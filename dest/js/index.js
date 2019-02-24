const app = angular.module('app', []);

app.service('convertService', ['$http', function($http) {
  this.list = [];

  $http.get('https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11')
    .then(({ data }) => this.list.push(...data));
}]);




app.controller('main', ['$scope', 'convertService', function($scope, convertService) {
  $scope.currency = 'UAH';
  $scope.currencyReseived = 'USD';
  $scope.canRevert = false;
  $scope.temp = '';

  $scope.revert = canRevert => {
    if (canRevert) {
      $scope.canRevert = !$scope.canRevert;
      const labels = document.querySelectorAll('label');
      labels.forEach(label => label.classList.toggle('active'));
      $scope.temp = $scope.currency;
      $scope.currency = $scope.currencyReseived;
      $scope.currencyReseived = $scope.temp;
    }
  };

  $scope.setStartPosition = () => {
    const labels = document.querySelectorAll('label');

    if (!labels[0].classList.contains('active')) {
      labels.forEach(label => label.classList.toggle('active'));
    }
  };
  // console.log(convertService.list);
}]);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpzL21haW4uanMiLCJqcy9zZXJ2aWNlLmpzIiwianMvY29udHJvbGxlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBhcHAgPSBhbmd1bGFyLm1vZHVsZSgnYXBwJywgW10pOyIsIlxyXG5hcHAuc2VydmljZSgnY29udmVydFNlcnZpY2UnLCBbJyRodHRwJywgZnVuY3Rpb24oJGh0dHApIHtcclxuICB0aGlzLmxpc3QgPSBbXTtcclxuXHJcbiAgJGh0dHAuZ2V0KCdodHRwczovL2FwaS5wcml2YXRiYW5rLnVhL3AyNGFwaS9wdWJpbmZvP2V4Y2hhbmdlJmpzb24mY291cnNpZD0xMScpXHJcbiAgICAudGhlbigoeyBkYXRhIH0pID0+IHRoaXMubGlzdC5wdXNoKC4uLmRhdGEpKTtcclxufV0pO1xyXG5cclxuXHJcbiIsIlxyXG5hcHAuY29udHJvbGxlcignbWFpbicsIFsnJHNjb3BlJywgJ2NvbnZlcnRTZXJ2aWNlJywgZnVuY3Rpb24oJHNjb3BlLCBjb252ZXJ0U2VydmljZSkge1xyXG4gICRzY29wZS5jdXJyZW5jeSA9ICdVQUgnO1xyXG4gICRzY29wZS5jdXJyZW5jeVJlc2VpdmVkID0gJ1VTRCc7XHJcbiAgJHNjb3BlLmNhblJldmVydCA9IGZhbHNlO1xyXG4gICRzY29wZS50ZW1wID0gJyc7XHJcblxyXG4gICRzY29wZS5yZXZlcnQgPSBjYW5SZXZlcnQgPT4ge1xyXG4gICAgaWYgKGNhblJldmVydCkge1xyXG4gICAgICAkc2NvcGUuY2FuUmV2ZXJ0ID0gISRzY29wZS5jYW5SZXZlcnQ7XHJcbiAgICAgIGNvbnN0IGxhYmVscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2xhYmVsJyk7XHJcbiAgICAgIGxhYmVscy5mb3JFYWNoKGxhYmVsID0+IGxhYmVsLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpKTtcclxuICAgICAgJHNjb3BlLnRlbXAgPSAkc2NvcGUuY3VycmVuY3k7XHJcbiAgICAgICRzY29wZS5jdXJyZW5jeSA9ICRzY29wZS5jdXJyZW5jeVJlc2VpdmVkO1xyXG4gICAgICAkc2NvcGUuY3VycmVuY3lSZXNlaXZlZCA9ICRzY29wZS50ZW1wO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gICRzY29wZS5zZXRTdGFydFBvc2l0aW9uID0gKCkgPT4ge1xyXG4gICAgY29uc3QgbGFiZWxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnbGFiZWwnKTtcclxuXHJcbiAgICBpZiAoIWxhYmVsc1swXS5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGl2ZScpKSB7XHJcbiAgICAgIGxhYmVscy5mb3JFYWNoKGxhYmVsID0+IGxhYmVsLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpKTtcclxuICAgIH1cclxuICB9O1xyXG4gIC8vIGNvbnNvbGUubG9nKGNvbnZlcnRTZXJ2aWNlLmxpc3QpO1xyXG59XSk7XHJcbiJdfQ==
