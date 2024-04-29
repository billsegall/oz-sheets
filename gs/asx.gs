/* See https://github.com/billsegall/asx-sheets */

// Return the value of the attribute for the instrument from the ASX website
function ASX(instrument, attribute) {
  var json = ASX_json(instrument);
  return json[attribute];
}

// Attribute specific functions
function ASX_last_price(instrument) {
  return ASX(instrument, "last_price")
}

// Helper
function ASX_json(instrument) {
  var url = "https://www.asx.com.au/asx/1/share/" + instrument + ".json";
  var response = UrlFetchApp.fetch(url);
  var content = response.getContentText();
  Logger.log(content);
  var json = JSON.parse(content);
  return json;
}
