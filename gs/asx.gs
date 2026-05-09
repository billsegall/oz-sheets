/* https://github.com/billsegall/oz-sheets */

// Return the value of the attribute for the instrument
function ASX_test(instrument, attribute) {
  // For testing
  if (instrument == null) {
    instrument = "GNMO.AX";
  }
  if (attribute == null) {
    attribute = "currentPrice";
  }
  var cache = CacheService.getScriptCache();
  // cache.removeAll([instrument]);
  var json = ASX_json(instrument);
  var val = json[attribute];
  return json[attribute];
}

// Returns all attribute/values as a 2d (vertical) array
// Use transpose(ASX_all(instrument) if you want it horizontal
// You can also directly access a field you want, e.g.
// '=index(ASX_all("BHP"), 12, 2)' will get you the eps
// Note that the asx are free to change the supported attributes and this might change
function ASX_all(instrument) {
  return json2array(ASX_json(instrument));
}

// Convert a json object to a sorted array
function json2array(json, kv = [], s = "") {
  for (k of Object.keys(json).sort()) {
    if (typeof json[k] !== 'object' || json[k] == null) {
      if (s.length === 0) {
         kv.push([k, json[k]]);
      } else {
         kv.push([s + "." + k, json[k]]);
      }
    } else {
      if (s.length === 0) {
        json2array(json[k], kv, k)
      } else {
      json2array(json[k], kv, s + "." + k);
      }
    }
  }
  return kv;
}

// Return the last known price (~20 min delayed)
function ASX_last_price(instrument) {
  var json = ASX_json(instrument);
  if (instrument.length == 3) { // Assume equities
    return json["currentPrice"];
  } else {
    if ((instrument.length == 4 && instrument[3] == 'O') || (instrument.length == 5 && instrument[4] == 'O')) { // Assume option (e.g, GNMO, EXROB)
      return 1.2345 // ASX_options(instrument)
    } else {
      return json["regularMarketPrice"];
    }
  }
}

// Return the last known price for crypto (~20 min delayed)
function ASX_crypto(coin) {
  var json = ASX_json(coin);
  return json["regularMarketPrice"];
}

// Return the last known price for crypto (~20 min delayed)
function ASX_etf(etf) {
  var json = ASX_json(etf);
  return json["regularMarketPrice"];
}

// Return the value of the attribute for the instrument
function ASX(instrument, attribute) {
  var json = ASX_json(instrument);
  if (attribute == null) {
    attribute = "currentPrice";
  }
  return json[attribute];
}


// Fetch the json from our yahoo finance service
function ASX_json(instrument, retry=1) {
  url = "http://mockingbirdinvestment.com:8000/yf/" + instrument;

  if (retry < 0) {
      return { "error": "timeout", "currentPrice": "-1001", };
  }
  var cache = CacheService.getScriptCache();
  // cache.removeAll(instrument)
  content = cache.get(instrument);
  if (content == null) {
    Logger.log("Cache miss");
    var response;
    try {
      response = UrlFetchApp.fetch(url);
    } catch (e) {
      Logger.log("Caught:" + e.message);
      // Try again
      Utilities.sleep(100) 
      return ASX_json(instrument, --retry);
    }
    if (typeof response === 'undefined') {
      Logger.log("UrlFetchApp() failed")
            return { "error": "UrlFetchApp() failed", "currentPrice": "-1003", };
    }
    if (response == null) {
      Logger.log("No response");
      return ASX_json(instrument, --retry)
    } else {
      var code = response.getResponseCode()
      if (code != 200) {
        return code;
      } else {
        var content = response.getContentText();
        cache.put(instrument, content, 300 /* seconds */ );
        Logger.log(content);
      }
    }
  } else {
    Logger.log("Cache hit");
  }
  json = JSON.parse(content);
  return json;
}

// Helper for url fetch options
function options() {
  return {
    method: "get",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
  };
}

/**
 * Fetches the last traded price for an ASX stock from TradingView.
 * 
 * @param {string} symbol - The ASX stock symbol (e.g., "EXROB", "CBA", "BHP")
 * @return {number} The last traded price
 * @customfunction
 */
function ASX_options(symbol) {
  if (!symbol) throw new Error("Symbol is required");
  
  symbol = symbol.toString().trim().toUpperCase();
  const url = `https://www.tradingview.com/symbols/ASX-${symbol}/`;
  
  try {
    const response = UrlFetchApp.fetch(url, {
      muteHttpExceptions: true,
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5"
      }
    });
    
    const code = response.getResponseCode();
    if (code !== 200) throw new Error(`HTTP ${code} for symbol ${symbol}`);
    
    const html = response.getContentText();
    
    // Strategy 1: Look for JSON-LD structured data
    const jsonLdMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
    if (jsonLdMatch) {
      try {
        const jsonData = JSON.parse(jsonLdMatch[1]);
        if (jsonData.price) return parseFloat(jsonData.price);
      } catch(e) { /* continue */ }
    }
    
    // Strategy 2: Look for price in meta tags
    const metaMatch = html.match(/<meta[^>]+property="og:description"[^>]+content="[^"]*?(\d+\.?\d*)[^"]*?"/);
    if (metaMatch) {
      const price = parseFloat(metaMatch[1]);
      if (price > 0) return price;
    }
    
    // Strategy 3: Scan for price patterns in the HTML near known class names
    // TradingView embeds price data in various ways — try multiple patterns
    const patterns = [
      /last-price[^>]*>([0-9]+\.?[0-9]*)</i,
      /"last":\s*([0-9]+\.?[0-9]*)/,
      /"close":\s*([0-9]+\.?[0-9]*)/,
      /itemprop="price"[^>]*content="([0-9]+\.?[0-9]*)"/,
      /"price":\s*"?([0-9]+\.?[0-9]*)"?/,
    ];
    
    for (const pattern of patterns) {
      const match = html.match(pattern);
      if (match) {
        const price = parseFloat(match[1]);
        if (price > 0) return price;
      }
    }
    
    throw new Error(`Could not parse price for ${symbol} from TradingView. The page structure may have changed.`);
    
  } catch (e) {
    throw new Error(`ASX_options(${symbol}): ${e.message}`);
  }
}

/**
 * Fetches prices for multiple ASX symbols at once (more efficient than calling
 * ASX_last_price individually in a loop).
 * 
 * @param {string[]} symbols - Array of ASX stock symbols
 * @return {Object} Map of symbol -> price
 */
function ASX_options_batch(symbols) {
  const results = {};
  symbols.forEach(sym => {
    try {
      results[sym] = ASX_last_price(sym);
    } catch(e) {
      results[sym] = e.message;
    }
  });
  return results;
}


// ── Quick test ───────────────────────────────────────────────────────────
function test_ASX_optionse() {
  const testSymbols = ["EXROB", "CBA", "BHP"];
  testSymbols.forEach(sym => {
    try {
      const price = ASX_last_price(sym);
      Logger.log(`${sym}: $${price}`);
    } catch(e) {
      Logger.log(`${sym}: ERROR - ${e.message}`);
    }
  });
}
