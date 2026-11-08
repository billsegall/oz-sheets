/* https://github.com/billsegall/oz-sheets — IB Gateway price functions */

// Set IB_BASE_URL and IB_API_KEY in Apps Script editor: Project Settings → Script Properties
var IB_BASE_URL = PropertiesService.getScriptProperties().getProperty('IB_BASE_URL');
var IB_API_KEY  = PropertiesService.getScriptProperties().getProperty('IB_API_KEY');

// Return the value of the attribute for the instrument
function IB_test(instrument) {
  // For testing
  if (instrument == null) {
    instrument = "GNMO";
  }
  var cache = CacheService.getScriptCache();
  cache.removeAll([instrument]);
  var val = IB_last_price(instrument);
  return val;
}

// Return last price from Interactive Brokers for an ASX equity.
// Accepts "CBA" or "CBA.AX" — .AX suffix stripped before lookup.
// Falls back to null if IB is unavailable.
function IB_last_price(instrument) {
  var symbol = instrument.toString().replace(/\.AX$/i, '').toUpperCase();
  var cache = CacheService.getScriptCache();
  var cached = cache.get(symbol);
  if (cached != null) {
    Logger.log("IB cache hit: " + symbol);
    var parsed = JSON.parse(cached);
    return parsed.price;
  }

  // Script Properties are per Apps Script project; a missing key otherwise
  // surfaces as UrlFetchApp's cryptic "Header:null".
  if (!IB_BASE_URL || !IB_API_KEY) {
    return "#ERROR: set IB_BASE_URL and IB_API_KEY in Project Settings → Script Properties";
  }
  var url = IB_BASE_URL + "/api/ib/price/" + symbol;
  var response;
  try {
    response = UrlFetchApp.fetch(url, {muteHttpExceptions: true, headers: {'X-API-Key': IB_API_KEY}});
  } catch (e) {
    Logger.log("IB_last_price fetch failed: " + e.message);
    return e.message;
  }

  var code = response.getResponseCode();
  if (code == 503) { // IB has no price and the server had no close to fall back on
    var cacheKey = "IB_EOD_" + symbol;
    cached = cache.get(cacheKey);
    if (cached != null) {
      Logger.log("IB EOD cache hit: " + symbol);
      return Number(cached);
    }
    var price = IB_eod(symbol);
    if (typeof price == 'number') {
      cache.put(cacheKey, String(price), 300 /* seconds */);
    }
    return price;
  }

  if (code != 200) {
    Logger.log("IB_last_price " + symbol + " HTTP " + code);
    return "Error " + code.toString();
  }

  var content = response.getContentText();
  cache.put(symbol, content, 300 /* seconds */);
  var json = JSON.parse(content);
  return json.price;
}

function IB_eod(symbol) {
  const IB_EOD_BASE   = 'https://ib.segall.net/api/eod/';

    if (!symbol) return '#ERROR: symbol required';
    if (!IB_API_KEY) return '#ERROR: set IB_API_KEY in Project Settings → Script Properties';
    // Key goes in a header, not the query string, so it stays out of server access logs
    const url = IB_EOD_BASE + encodeURIComponent(String(symbol).trim().toUpperCase());
    try {
      const resp = UrlFetchApp.fetch(url, { muteHttpExceptions: true, headers: {'X-API-Key': IB_API_KEY} });
      const data = JSON.parse(resp.getContentText());
      if (data.error) return '#ERROR: ' + data.error;
      return data.close;
    } catch (e) {
      return '#ERROR: ' + e.message;
    }
  }
