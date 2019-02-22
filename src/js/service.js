/* eslint-disable no-console */


const data = fetch('https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11');
data.then(result => result.json())
  .then(
    result => {
      console.log(result);
      console.log(`${result[0].ccy}: UAH - ${result[0].sale}`);
      console.log(`${result[1].ccy}: UAH - ${result[1].sale}`);
      console.log(`${result[2].ccy}: UAH - ${result[2].sale}`);
      console.log(`${result[3].ccy}: USD - ${result[3].sale}`);
      return result;
    }
  );

// $('.USD').html(`${result[0].ccy}: гривна - ${result[0].sale}`);
// $('.EUR').html(`${result[1].ccy}: гривна - ${result[1].sale}`);
// $('.RUB').html(`${result[2].ccy}: гривна - ${result[2].sale}`);