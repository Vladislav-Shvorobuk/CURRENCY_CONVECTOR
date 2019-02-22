
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpzL21haW4uanMiLCJqcy9zZXJ2aWNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIiLCIvKiBlc2xpbnQtZGlzYWJsZSBuby1jb25zb2xlICovXHJcblxyXG5cclxuY29uc3QgZGF0YSA9IGZldGNoKCdodHRwczovL2FwaS5wcml2YXRiYW5rLnVhL3AyNGFwaS9wdWJpbmZvP2V4Y2hhbmdlJmpzb24mY291cnNpZD0xMScpO1xyXG5kYXRhLnRoZW4ocmVzdWx0ID0+IHJlc3VsdC5qc29uKCkpXHJcbiAgLnRoZW4oXHJcbiAgICByZXN1bHQgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xyXG4gICAgICBjb25zb2xlLmxvZyhgJHtyZXN1bHRbMF0uY2N5fTogVUFIIC0gJHtyZXN1bHRbMF0uc2FsZX1gKTtcclxuICAgICAgY29uc29sZS5sb2coYCR7cmVzdWx0WzFdLmNjeX06IFVBSCAtICR7cmVzdWx0WzFdLnNhbGV9YCk7XHJcbiAgICAgIGNvbnNvbGUubG9nKGAke3Jlc3VsdFsyXS5jY3l9OiBVQUggLSAke3Jlc3VsdFsyXS5zYWxlfWApO1xyXG4gICAgICBjb25zb2xlLmxvZyhgJHtyZXN1bHRbM10uY2N5fTogVVNEIC0gJHtyZXN1bHRbM10uc2FsZX1gKTtcclxuICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuICApO1xyXG5cclxuLy8gJCgnLlVTRCcpLmh0bWwoYCR7cmVzdWx0WzBdLmNjeX06INCz0YDQuNCy0L3QsCAtICR7cmVzdWx0WzBdLnNhbGV9YCk7XHJcbi8vICQoJy5FVVInKS5odG1sKGAke3Jlc3VsdFsxXS5jY3l9OiDQs9GA0LjQstC90LAgLSAke3Jlc3VsdFsxXS5zYWxlfWApO1xyXG4vLyAkKCcuUlVCJykuaHRtbChgJHtyZXN1bHRbMl0uY2N5fTog0LPRgNC40LLQvdCwIC0gJHtyZXN1bHRbMl0uc2FsZX1gKTsiXX0=
