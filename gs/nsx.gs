// Returns last_price for the instrument by scraping the NSX website
function NSX_last_price(instrument) {
  var url = "https://www.nsx.com.au/summary/" + instrument;
  options = {muteHttpExceptions: true};
  var response = UrlFetchApp.fetch(url, options);
  var content = response.getContentText();

  // <span class="large">IEC</span><span class="large">1.350</span>
  var search = instrument + "</span><span class=\"large\">(\\d+\\.\\d+)";
  var price = content.match(search);

  return price[1];
}
