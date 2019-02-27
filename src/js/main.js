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