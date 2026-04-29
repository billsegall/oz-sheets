/* https://github.com/billsegall/oz-sheets — IB Gateway price functions */

// Set IB_BASE_URL and IB_API_KEY in Apps Script editor: Project Settings → Script Properties
var IB_BASE_URL = PropertiesService.getScriptProperties().getProperty('IB_BASE_URL');
var IB_API_KEY  = PropertiesService.getScriptProperties().getProperty('IB_API_KEY');

// Return last price from Interactive Brokers for an ASX equity.
// Accepts "CBA" or "CBA.AX" — .AX suffix stripped before lookup.
// Falls back to null if IB is unavailable.
function IB_last_price(instrument) {
  var symbol = instrument.toString().replace(/\.AX$/i, '').toUpperCase();
  var cache = CacheService.getScriptCache();
  var cacheKey = "ib:" + symbol;
  var cached = cache.get(cacheKey);
  if (cached != null) {
    Logger.log("IB cache hit: " + symbol);
    var parsed = JSON.parse(cached);
    return parsed.price;
  }

  var url = IB_BASE_URL + "/api/ib/price/" + symbol;
  var response;
  try {
    response = UrlFetchApp.fetch(url, {muteHttpExceptions: true, headers: {'X-API-Key': IB_API_KEY}});
  } catch (e) {
    Logger.log("IB_last_price fetch failed: " + e.message);
    return null;
  }

  var code = response.getResponseCode();
  if (code != 200) {
    Logger.log("IB_last_price " + symbol + " HTTP " + code);
    return null;
  }

  var content = response.getContentText();
  cache.put(cacheKey, content, 300 /* seconds */);
  var json = JSON.parse(content);
  return json.price;
}
