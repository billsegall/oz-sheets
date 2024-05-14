/* See https://github.com/billsegall/asx-sheets */

// Return the value of the attribute for the instrument from the ASX website
function ASX(instrument, attribute) {
  var json = ASX_json(instrument);
  return json[attribute];
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

// Returns all attribute/values as a 2d (vertical) array
// Use transpose(ASX_all(instrument) if you want it horizontal
// You can also directly access a field you want, e.g.
// '=index(ASX_all("BHP"), 12, 2)' will get you the eps
// Note that the asx are free to change the supported attributes and this might change
function ASX_all(instrument) {
  var json = ASX_json(instrument);
  // Convert to a sorted array
  var kv = [];
  for (k of Object.keys(json).sort()) {
    kv.push([k, json[k]]);
  }
  return kv;
}

//
// Attribute specific functions
//

// Returns annual_dividend_yield for the instrument
function ASX_annual_dividend_yield(instrument) {
  return ASX(instrument, "annual_dividend_yield")
}

// Returns average_daily_volume for the instrument
function ASX_average_daily_volume(instrument) {
  return ASX(instrument, "average_daily_volume")
}

// Returns bid_price for the instrument
function ASX_bid_price(instrument) {
  return ASX(instrument, "bid_price")
}

// Returns change_in_percent for the instrument
function ASX_change_in_percent(instrument) {
  return ASX(instrument, "change_in_percent")
}

// Returns change_price for the instrument
function ASX_change_price(instrument) {
  return ASX(instrument, "change_price")
}

// Returns code for the instrument
function ASX_code(instrument) {
  return ASX(instrument, "code")
}

// Returns day_high_price for the instrument
function ASX_day_high_price(instrument) {
  return ASX(instrument, "day_high_price")
}

// Returns day_low_price for the instrument
function ASX_day_low_price(instrument) {
  return ASX(instrument, "day_low_price")
}

// Returns deprecated_market_cap for the instrument
function ASX_deprecated_market_cap(instrument) {
  return ASX(instrument, "deprecated_market_cap")
}

// Returns deprecated_number_of_shares for the instrument
function ASX_deprecated_number_of_shares(instrument) {
  return ASX(instrument, "deprecated_number_of_shares")
}

// Returns desc_full for the instrument
function ASX_desc_full(instrument) {
  return ASX(instrument, "desc_full")
}

// Returns eps for the instrument
function ASX_eps(instrument) {
  return ASX(instrument, "eps")
}

// Returns isin_code for the instrument
function ASX_isin_code(instrument) {
  return ASX(instrument, "isin_code")
}

// Returns last_price for the instrument
function ASX_last_price(instrument) {
  return ASX(instrument, "last_price")
}

// Returns last_trade_date for the instrument
function ASX_last_trade_date(instrument) {
  return ASX(instrument, "last_trade_date")
}

// Returns market_cap for the instrument
function ASX_market_cap(instrument) {
  return ASX(instrument, "market_cap")
}

// Returns number_of_shares for the instrument
function ASX_number_of_shares(instrument) {
  return ASX(instrument, "number_of_shares")
}

// Returns offer_price for the instrument
function ASX_offer_price(instrument) {
  return ASX(instrument, "offer_price")
}

// Returns open_price for the instrument
function ASX_open_price(instrument) {
  return ASX(instrument, "open_price")
}

// Returns pe for the instrument
function ASX_pe(instrument) {
  return ASX(instrument, "pe")
}

// Returns previous_close_price for the instrument
function ASX_previous_close_price(instrument) {
  return ASX(instrument, "previous_close_price")
}

// Returns previous_day_percentage_change for the instrument
function ASX_previous_day_percentage_change(instrument) {
  return ASX(instrument, "previous_day_percentage_change")
}

// Returns suspended for the instrument
function ASX_suspended(instrument) {
  return ASX(instrument, "suspended")
}

// Returns volume for the instrument
function ASX_volume(instrument) {
  return ASX(instrument, "volume")
}

// Returns year_change_in_percentage for the instrument
function ASX_year_change_in_percentage(instrument) {
  return ASX(instrument, "year_change_in_percentage")
}

// Returns year_change_price for the instrument
function ASX_year_change_price(instrument) {
  return ASX(instrument, "year_change_price")
}

// Returns year_high_date for the instrument
function ASX_year_high_date(instrument) {
  return ASX(instrument, "year_high_date")
}

// Returns year_high_price for the instrument
function ASX_year_high_price(instrument) {
  return ASX(instrument, "year_high_price")
}

// Returns year_low_date for the instrument
function ASX_year_low_date(instrument) {
  return ASX(instrument, "year_low_date")
}

// Returns year_low_price for the instrument
function ASX_year_low_price(instrument) {
  return ASX(instrument, "year_low_price")
}

// Returns year_open_date for the instrument
function ASX_year_open_date(instrument) {
  return ASX(instrument, "year_open_date")
}

// Returns year_open_price for the instrument
function ASX_year_open_price(instrument) {
  return ASX(instrument, "year_open_price")
}
