function DOGE() {
  var url = 'https://api.coinmarketcap.com/v1/ticker/dogecoin/'

  var response = UrlFetchApp.fetch(url);
  // parse response and return the price.
  var json = response.getContentText();
  var data = JSON.parse(json);

  return data[0].price_usd
}  

