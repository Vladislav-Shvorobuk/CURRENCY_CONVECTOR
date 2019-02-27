const app = angular.module('app', []);

app.config(['convertServiceProvider', function(convertServiceProvider) {
  convertServiceProvider.setURL('https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11');
}]);