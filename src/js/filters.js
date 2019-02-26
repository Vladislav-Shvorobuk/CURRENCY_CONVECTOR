app.filter('currencyFilter', function() {
  return function(array, str2) {
    return array.filter(item => item !== str2);
  };
});