app.service('convertService', ['$http', function($http) {
  this.list = {};

  this.loadList = () => {
    $http.get('https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11')
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


