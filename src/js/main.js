const app = angular.module('app', ['ui.router']);

app.config(['convertServiceProvider', '$stateProvider', function(convertServiceProvider, $stateProvider) {
  $stateProvider
    .state({
      name: 'home',
      url: '',
      component: 'greetingComponent'
    })
    .state({
      name: 'converter',
      url: '/converter',
      component: 'convertComponent'
    });

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