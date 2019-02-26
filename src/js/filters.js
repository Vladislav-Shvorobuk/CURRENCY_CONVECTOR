app.filter('currencyFilter', function() {
  return function(array, compareValue) {
    return array.filter(item => item !== compareValue);
  };
});