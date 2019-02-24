
app.service('convertService', ['$http', function($http) {
  this.list = [];

  $http.get('https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11')
    .then(({ data }) => this.list.push(...data));
}]);


